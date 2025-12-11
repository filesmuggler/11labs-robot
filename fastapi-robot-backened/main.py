from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import time
from lib.PCA9685 import PCA9685
from lib.alphabotlib.ws2812 import get_strip, colorWipe
from lib.alphabotlib.AlphaBot2 import AlphaBot2
from rpi_ws281x import Color

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
