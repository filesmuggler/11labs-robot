'use client'

import { useConversation } from '@elevenlabs/react'
import { TalkingFace, useLipsync, EMOTION_TYPES, EmotionType } from 'memoji-talking'
import 'memoji-talking/styles.css'
import { useCallback, useEffect, useState, useRef } from 'react'

export default function RobotDisplay() {
  const { viseme, startLipsync, isActive, error: lipsyncError } = useLipsync()
  const [emotion, setEmotion] = useState<EmotionType>(EMOTION_TYPES.neutral)
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const hasStartedRef = useRef(false)

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
      // Update emotion based on message type if available
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
        // Agent is listening/thinking
        setEmotion(EMOTION_TYPES.thinking)
      }
    }
  }, [conversation.isSpeaking, connectionStatus])

  // Auto-start conversation and lipsync on mount
  const startSession = useCallback(async () => {
    if (hasStartedRef.current) return
    hasStartedRef.current = true

    try {
      setErrorMessage('')
      setConnectionStatus('connecting')
      setEmotion(EMOTION_TYPES.thinking)

      // Request microphone permission (required for ElevenLabs to hear user)
      await navigator.mediaDevices.getUserMedia({ audio: true })

      // Get signed URL from API
      const response = await fetch('/api/signed-url')
      const data = await response.json()

      if (!data.signedUrl) {
        throw new Error('Failed to get signed URL')
      }

      // Start ElevenLabs conversation
      await conversation.startSession({
        signedUrl: data.signedUrl,
      })

      // Start system audio capture for lip sync
      // This captures the audio output (agent's voice)
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
      hasStartedRef.current = false
    }
  }, [conversation, startLipsync])

  // Auto-start on mount
  useEffect(() => {
    // Small delay to ensure component is fully mounted
    const timer = setTimeout(() => {
      startSession()
    }, 500)

    return () => clearTimeout(timer)
  }, [startSession])

  // Calculate size based on viewport
  const [size, setSize] = useState(300)

  useEffect(() => {
    const updateSize = () => {
      const minDimension = Math.min(window.innerWidth, window.innerHeight)
      setSize(Math.floor(minDimension * 0.75))
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-black overflow-hidden">
      {/* Main Avatar */}
      <TalkingFace
        viseme={viseme}
        emotion={emotion}
        isActive={isActive || conversation.isSpeaking}
        size={size}
      />

      {/* Status indicator - small, bottom corner */}
      <div className="fixed bottom-4 left-4 flex flex-col gap-1 text-xs font-mono">
        <div className={`px-2 py-1 rounded ${connectionStatus === 'connected'
            ? 'bg-green-500/20 text-green-400'
            : connectionStatus === 'connecting'
              ? 'bg-yellow-500/20 text-yellow-400'
              : 'bg-red-500/20 text-red-400'
          }`}>
          {connectionStatus === 'connected' && '● Connected'}
          {connectionStatus === 'connecting' && '○ Connecting...'}
          {connectionStatus === 'disconnected' && '○ Disconnected'}
        </div>

        {errorMessage && (
          <div className="px-2 py-1 rounded bg-red-500/20 text-red-400 max-w-[200px] truncate">
            {errorMessage}
          </div>
        )}

        {lipsyncError && (
          <div className="px-2 py-1 rounded bg-orange-500/20 text-orange-400 max-w-[200px] truncate">
            Lipsync: {lipsyncError}
          </div>
        )}
      </div>

      {/* Retry button if disconnected */}
      {connectionStatus === 'disconnected' && (
        <button
          onClick={() => {
            hasStartedRef.current = false
            startSession()
          }}
          className="fixed bottom-4 right-4 px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30 transition-colors text-sm"
        >
          Retry Connection
        </button>
      )}
    </div>
  )
}
