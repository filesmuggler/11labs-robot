from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import time
import base64
import json
import os

import cv2
from dotenv import load_dotenv
from openai import OpenAI

from lib.PCA9685 import PCA9685
from lib.alphabotlib.ws2812 import get_strip, colorWipe
from lib.alphabotlib.AlphaBot2 import AlphaBot2
from rpi_ws281x import Color

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Hardware Init - Servo Controller
try:
    pwm = PCA9685(0x40, debug=False)
    pwm.setPWMFreq(50)
except Exception as e:
    print(f"Failed to init PCA9685: {e}")
    pwm = None

# Hardware Init - Motor Controller (AlphaBot2)
try:
    alphabot = AlphaBot2()
except Exception as e:
    print(f"Failed to init AlphaBot2: {e}")
    alphabot = None

@app.get("/")
def read_root():
    return {"Hello": "AlphaBot2", "Status": "Online"}

@app.post("/led/on")
def led_on():
    try:
        strip = get_strip()
        colorWipe(strip, Color(0, 255, 0), wait_ms=10) # Green
        return {"status": "led_on"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/led/off")
def led_off():
    try:
        strip = get_strip()
        colorWipe(strip, Color(0, 0, 0), wait_ms=10)
        return {"status": "led_off"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/movement/scan")
def movement_scan():
    if not pwm:
        raise HTTPException(status_code=503, detail="Servo controller not initialized")
    
    try:
        # Center = 1500
        # 30 deg approx 333us delta
        center = 1500
        delta = 333
        
        # Center
        pwm.setServoPulse(0, center)
        time.sleep(0.5)
        
        # Left 30
        pwm.setServoPulse(0, center + delta) # Direction check needed, assuming + is left? Or -? Trial.
        time.sleep(0.5)
        
        # Center
        pwm.setServoPulse(0, center)
        time.sleep(0.5)
        
        # Right 30
        pwm.setServoPulse(0, center - delta)
        time.sleep(0.5)
        
        # Center
        pwm.setServoPulse(0, center)
        
        return {"status": "scan_complete"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/led/blink")
def led_blink():
    try:
        strip = get_strip()
        colorWipe(strip, Color(0, 0, 255), wait_ms=10) # Blue for blink
        time.sleep(5)
        colorWipe(strip, Color(0, 0, 0), wait_ms=10)
        return {"status": "led_blink_complete"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/movement/left")
def movement_left():
    if not pwm:
        raise HTTPException(status_code=503, detail="Servo controller not initialized")
    try:
        center = 1500
        delta = 333
        pwm.setServoPulse(0, center + delta)
        return {"status": "moved_left"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/movement/right")
def movement_right():
    if not pwm:
        raise HTTPException(status_code=503, detail="Servo controller not initialized")
    try:
        center = 1500
        delta = 333
        pwm.setServoPulse(0, center - delta)
        return {"status": "moved_right"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/movement/center")
def movement_center():
    if not pwm:
        raise HTTPException(status_code=503, detail="Servo controller not initialized")
    try:
        center = 1500
        pwm.setServoPulse(0, center)
        return {"status": "moved_center"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ============== GESTURE ENDPOINTS ==============

@app.post("/gesture/yes")
def gesture_yes():
    """
    Gest 'TAK': Robot jedzie 2cm do przodu, potem 2cm do tyłu.
    Symuluje kiwnięcie głową 'tak'.
    """
    if not alphabot:
        raise HTTPException(status_code=503, detail="Motor controller not initialized")
    
    try:
        # Ustaw niższą prędkość dla delikatnego ruchu (25% zamiast 50%)
        alphabot.setPWMA(25)
        alphabot.setPWMB(25)
        
        # Ruch do przodu - delikatny
        alphabot.forward()
        time.sleep(0.1)
        alphabot.stop()
        time.sleep(0.15)
        
        # Ruch do tyłu - delikatny
        alphabot.backward()
        time.sleep(0.1)
        alphabot.stop()
        
        # Przywróć domyślną prędkość
        alphabot.setPWMA(50)
        alphabot.setPWMB(50)
        
        return {"status": "gesture_yes_complete", "gesture": "yes"}
    except Exception as e:
        if alphabot:
            alphabot.stop()
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/gesture/no")
def gesture_no():
    """
    Gest 'NIE': Robot obraca się w lewo, potem w prawo.
    Symuluje potrząsanie głową 'nie'.
    """
    if not alphabot:
        raise HTTPException(status_code=503, detail="Motor controller not initialized")
    
    try:
        # Obrót w lewo (~20 stopni)
        alphabot.left()
        time.sleep(0.09)
        alphabot.stop()
        time.sleep(0.8)  # dłuższa pauza po lewej stronie
        
        # Obrót w prawo (~40 stopni - przechodzi przez środek)
        alphabot.right()
        time.sleep(0.18)
        alphabot.stop()
        time.sleep(0.8)  # dłuższa pauza po prawej stronie
        
        # Powrót do środka (kompensacja dryfu)
        alphabot.left()
        time.sleep(0.14)
        alphabot.stop()
        
        return {"status": "gesture_no_complete", "gesture": "no"}
    except Exception as e:
        if alphabot:
            alphabot.stop()
        raise HTTPException(status_code=500, detail=str(e))


# ============== CAMERA / VISION ENDPOINTS ==============

def capture_frames(num_frames: int = 8, delay: float = 0.15) -> list[bytes]:
    """
    Przechwytuje klatki z kamery.
    """
    cap = cv2.VideoCapture(0)
    
    if not cap.isOpened():
        raise RuntimeError("Nie można otworzyć kamery!")
    
    frames = []
    
    # Daj kamerze czas na rozgrzewkę
    time.sleep(0.5)
    
    for i in range(num_frames):
        ret, frame = cap.read()
        if not ret:
            continue
        
        # Konwertuj do JPEG
        _, buffer = cv2.imencode('.jpg', frame, [cv2.IMWRITE_JPEG_QUALITY, 80])
        frames.append(buffer.tobytes())
        
        time.sleep(delay)
    
    cap.release()
    return frames


def encode_image_to_base64(image_bytes: bytes) -> str:
    """Konwertuje bytes obrazu do base64"""
    return base64.b64encode(image_bytes).decode('utf-8')


def detect_character(frames: list[bytes]) -> dict:
    """
    Wysyła klatki do GPT-4o-mini i sprawdza spójność odczytanego tekstu.
    
    Returns:
        dict z kluczami: success, character, confidence, message
    """
    client = OpenAI()
    
    # Wybierz 4-5 klatek rozłożonych równomiernie
    if len(frames) >= 5:
        indices = [0, len(frames)//4, len(frames)//2, 3*len(frames)//4, -1]
        selected_frames = [frames[i] for i in indices]
    else:
        selected_frames = frames
    
    content = [
        {
            "type": "text",
            "text": """Analizujesz klatki z gry "Czółko" (Who Am I / Heads Up).

                        Na zdjęciach jest osoba z kartką na czole lub przy czole. Na kartce jest napisane imię/nazwa postaci.

                        ZADANIE:
                        1. Przeanalizuj KAŻDĄ klatkę osobno
                        2. Spróbuj odczytać tekst z kartki na każdej klatce
                        3. Sprawdź czy tekst jest SPÓJNY (taki sam) na co najmniej 3 klatkach

                        Odpowiedz w formacie JSON:
                        {
                            "detected_texts": ["tekst1", "tekst2", ...],
                            "consensus": true/false,
                            "character": "NAZWA",
                            "confidence": "high/medium/low",
                            "issue": "opis problemu"
                        }

                        WAŻNE: Zwróć TYLKO JSON, bez markdown, bez komentarzy."""
        }
    ]
    
    for frame in selected_frames:
        base64_image = encode_image_to_base64(frame)
        content.append({
            "type": "image_url",
            "image_url": {
                "url": f"data:image/jpeg;base64,{base64_image}",
                "detail": "low"
            }
        })
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": content}],
        max_tokens=300
    )
    
    # Parsuj JSON z odpowiedzi
    response_text = response.choices[0].message.content.strip()
    
    # Usuń markdown jeśli model go dodał
    if response_text.startswith("```"):
        response_text = response_text.split("```")[1]
        if response_text.startswith("json"):
            response_text = response_text[4:]
    
    try:
        result = json.loads(response_text)
    except json.JSONDecodeError:
        return {
            "success": False,
            "character": None,
            "message": f"Błąd parsowania odpowiedzi: {response_text[:100]}"
        }
    
    # Przygotuj wynik
    if result.get("consensus") and result.get("character"):
        return {
            "success": True,
            "character": result["character"],
            "confidence": result.get("confidence", "unknown"),
            "detected_texts": result.get("detected_texts", []),
            "message": "Postać rozpoznana!"
        }
    else:
        return {
            "success": False,
            "character": None,
            "detected_texts": result.get("detected_texts", []),
            "message": result.get("issue", "Nie udało się uzyskać spójnego odczytu z kilku klatek")
        }


@app.post("/camera/detect-character")
def camera_detect_character(num_frames: int = 8, delay: float = 0.15):
    """
    Endpoint do gry w Czółko - odczytuje tekst z kartki na czole.
    
    Przechwytuje klatki z kamery i używa GPT-4o-mini Vision do odczytania tekstu.
    
    Args:
        num_frames: Liczba klatek do przechwycenia (domyślnie 8)
        delay: Opóźnienie między klatkami w sekundach (domyślnie 0.15)
    
    Returns:
        dict z kluczami: success, character, confidence, detected_texts, message
    """
    if not os.getenv("OPENAI_API_KEY"):
        raise HTTPException(status_code=500, detail="Brak OPENAI_API_KEY w zmiennych środowiskowych!")
    
    try:
        # Przechwytywanie klatek
        frames = capture_frames(num_frames=num_frames, delay=delay)
        
        if len(frames) < 3:
            raise HTTPException(status_code=500, detail="Za mało klatek! Sprawdź kamerę.")
        
        # Analiza obrazów
        result = detect_character(frames)
        
        return result
        
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=f"Błąd kamery: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Błąd: {str(e)}")
