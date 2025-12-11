'use client'

import { useConversation } from '@elevenlabs/react'
import { TalkingFace, useLipsync, EMOTION_TYPES, EmotionType } from 'memoji-talking'
import 'memoji-talking/styles.css'
import { useCallback, useEffect, useState, useRef } from 'react'

type GameMode = 'guess' | 'talk' | null

export default function RobotDisplay() {
  const { viseme, startLipsync, stopLipsync, isActive, error: lipsyncError } = useLipsync()
  const [emotion, setEmotion] = useState<EmotionType>(EMOTION_TYPES.neutral)
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [currentMode, setCurrentMode] = useState<GameMode>(null)

  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected to ElevenLabs')
      setConnectionStatus('connected')
      setEmotion(EMOTION_TYPES.happy)
    },
    onDisconnect: () => {
      console.log('Disconnected from ElevenLabs')
      setConnectionStatus('disconnected')
      setEmotion(EMOTION_TYPES.neutral)
    },
    onMessage: (message) => {
      console.log('Message:', message)
    },
    onError: (error) => {
      console.error('ElevenLabs Error:', error)
      setEmotion(EMOTION_TYPES.sad)
      setErrorMessage(String(error))
    },
  })

  // Update emotion based on speaking state
  useEffect(() => {
    if (connectionStatus === 'connected') {
      if (conversation.isSpeaking) {
        setEmotion(EMOTION_TYPES.happy)
      } else {
        setEmotion(EMOTION_TYPES.thinking)
      }
    }
  }, [conversation.isSpeaking, connectionStatus])

  // Start session with specific mode
  const startSession = useCallback(async (mode: GameMode) => {
    if (!mode) return

    try {
      setErrorMessage('')
      setConnectionStatus('connecting')
      setEmotion(EMOTION_TYPES.thinking)
      setCurrentMode(mode)

      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true })

      // Get signed URL from API with mode parameter
      const response = await fetch(`/api/signed-url?mode=${mode}`)
      const data = await response.json()

      if (!data.signedUrl) {
        throw new Error('Failed to get signed URL')
      }

      // Start ElevenLabs conversation
      if (mode === 'guess') {
        // GUESS mode: agent with tools
        await conversation.startSession({
          signedUrl: data.signedUrl,
          clientTools: {
            robotYes: async () => {
              console.log("GESTURE: YES")
              await fetch('/api/robot/gesture/yes', { method: 'POST' })
            },
            robotNo: async () => {
              console.log("GESTURE: NO")
              await fetch('/api/robot/gesture/no', { method: 'POST' })
            },
          },
        })
      } else {
        // TALK mode: simple conversation, no tools
        await conversation.startSession({
          signedUrl: data.signedUrl,
        })
      }

      // Start system audio capture for lip sync
      try {
        await startLipsync('system')
      } catch (e) {
        console.warn('System audio capture failed, avatar will not lip sync:', e)
      }

    } catch (error: unknown) {
      console.error('Failed to start session:', error)
      const message = error instanceof Error ? error.message : 'Unknown error'
      setErrorMessage(message)
      setConnectionStatus('disconnected')
      setEmotion(EMOTION_TYPES.sad)
      setCurrentMode(null)
    }
  }, [conversation, startLipsync])

  // Stop session
  const stopSession = useCallback(async () => {
    await conversation.endSession()
    stopLipsync()
    setConnectionStatus('disconnected')
    setCurrentMode(null)
    setEmotion(EMOTION_TYPES.neutral)
  }, [conversation, stopLipsync])

  // Calculate size based on viewport
  const [size, setSize] = useState(300)

  useEffect(() => {
    const updateSize = () => {
      const minDimension = Math.min(window.innerWidth, window.innerHeight)
      setSize(Math.floor(minDimension * 0.6))
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-black overflow-hidden">
      {/* Main Avatar */}
      <TalkingFace
        viseme={viseme}
        emotion={emotion}
        isActive={isActive || conversation.isSpeaking}
        size={size}
      />

      {/* Mode Selection / Controls */}
      <div className="mt-8 flex flex-col items-center gap-4">
        {connectionStatus === 'disconnected' && !currentMode && (
          <>
            <p className="text-zinc-400 text-sm mb-2">Select mode:</p>
            <div className="flex gap-4">
              <button
                onClick={() => startSession('guess')}
                className="px-8 py-4 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/50 hover:bg-purple-600/40 transition-all duration-300 font-semibold text-lg"
              >
                🎯 GUESS
                <span className="block text-xs text-purple-300/70 mt-1">You guess</span>
              </button>
              <button
                onClick={() => startSession('talk')}
                className="px-8 py-4 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/50 hover:bg-blue-600/40 transition-all duration-300 font-semibold text-lg"
              >
                💬 TALK
                <span className="block text-xs text-blue-300/70 mt-1">Robot guesses</span>
              </button>
            </div>
          </>
        )}

        {connectionStatus === 'connecting' && (
          <div className="px-6 py-3 rounded-lg bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
            ○ Connecting to {currentMode?.toUpperCase()}...
          </div>
        )}

        {connectionStatus === 'connected' && (
          <div className="flex flex-col items-center gap-3">
            <div className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 border border-green-500/30 text-sm">
              ● Connected: {currentMode?.toUpperCase()}
            </div>
            <button
              onClick={stopSession}
              className="px-6 py-2 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/40 transition-all duration-300"
            >
              End Session
            </button>
          </div>
        )}

        {errorMessage && (
          <div className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 max-w-sm text-center text-sm">
            {errorMessage}
          </div>
        )}

        {lipsyncError && (
          <div className="px-4 py-2 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/30 text-sm">
            Lipsync: {lipsyncError}
          </div>
        )}
      </div>
    </div>
  )
}
