'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Lipsync, VISEMES } from 'wawa-lipsync'
import type { AudioSource, SystemAudioSupport, UseLipsyncOptions, UseLipsyncReturn } from '../types'

/**
 * Check browser support for system audio capture
 */
export function getSystemAudioSupport(): SystemAudioSupport {
  if (typeof window === 'undefined') {
    return { supported: false, limited: false, unsupported: true, browser: 'server' }
  }

  const hasGetDisplayMedia = !!(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia)
  const userAgent = navigator.userAgent.toLowerCase()
  const isChrome = userAgent.includes('chrome') && !userAgent.includes('edg')
  const isEdge = userAgent.includes('edg')
  const isFirefox = userAgent.includes('firefox')
  const isSafari = userAgent.includes('safari') && !userAgent.includes('chrome')

  return {
    supported: hasGetDisplayMedia && (isChrome || isEdge),
    limited: hasGetDisplayMedia && isFirefox,
    unsupported: !hasGetDisplayMedia || isSafari,
    browser: isChrome ? 'chrome' : isEdge ? 'edge' : isFirefox ? 'firefox' : isSafari ? 'safari' : 'unknown'
  }
}

/**
 * Hook for lip sync audio processing
 * Supports both microphone and system audio capture
 */
export function useLipsync(options: UseLipsyncOptions = {}): UseLipsyncReturn {
  const { sensitivity = 1.0 } = options

  const [viseme, setViseme] = useState(VISEMES.sil)
  const [isActive, setIsActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [audioLevel, setAudioLevel] = useState(0)
  const [currentSource, setCurrentSource] = useState<AudioSource | null>(null)
  
  const lipsyncRef = useRef<Lipsync | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const sensitivityRef = useRef(sensitivity)

  // Update sensitivity ref when prop changes
  useEffect(() => {
    sensitivityRef.current = sensitivity
  }, [sensitivity])

  const stopLipsync = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop())
      mediaStreamRef.current = null
    }

    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {})
      audioContextRef.current = null
    }
    analyserRef.current = null

    lipsyncRef.current = null
    setIsActive(false)
    setCurrentSource(null)
    setViseme(VISEMES.sil)
    setAudioLevel(0)
  }, [])

  const startLipsync = useCallback(async (source: AudioSource = 'mic') => {
    try {
      setError(null)

      let stream: MediaStream

      if (source === 'system') {
        const support = getSystemAudioSupport()

        if (support.unsupported) {
          throw new Error('System audio capture is not supported in your browser. Please use Chrome or Edge.')
        }

        try {
          const displayStream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: {
              echoCancellation: false,
              noiseSuppression: false,
              autoGainControl: false,
            }
          })

          const audioTracks = displayStream.getAudioTracks()
          if (audioTracks.length === 0) {
            displayStream.getVideoTracks().forEach(track => track.stop())
            throw new Error('No audio track available. Make sure to share a tab with audio.')
          }

          stream = new MediaStream(audioTracks)
          displayStream.getVideoTracks().forEach(track => track.stop())

          audioTracks[0].onended = () => {
            stopLipsync()
          }
        } catch (err: unknown) {
          if (err instanceof Error && err.name === 'NotAllowedError') {
            throw new Error('Screen sharing was cancelled.')
          }
          throw err
        }
      } else {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      }

      mediaStreamRef.current = stream

      lipsyncRef.current = new Lipsync({
        fftSize: 2048,
        historySize: 10,
      })

      const lipsyncAudioContext = (lipsyncRef.current as unknown as { audioContext: AudioContext }).audioContext
      const lipsyncAnalyser = (lipsyncRef.current as unknown as { analyser: AnalyserNode }).analyser

      if (lipsyncAudioContext.state === 'suspended') {
        await lipsyncAudioContext.resume()
      }

      const sourceNode = lipsyncAudioContext.createMediaStreamSource(stream)
      sourceNode.connect(lipsyncAnalyser)

      audioContextRef.current = new AudioContext()
      const visualSource = audioContextRef.current.createMediaStreamSource(stream)
      analyserRef.current = audioContextRef.current.createAnalyser()
      analyserRef.current.fftSize = 256
      visualSource.connect(analyserRef.current)

      setIsActive(true)
      setCurrentSource(source)

      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
      const processLoop = () => {
        if (lipsyncRef.current) {
          lipsyncRef.current.processAudio()
          const currentViseme = lipsyncRef.current.viseme
          setViseme(currentViseme)

          if (analyserRef.current) {
            analyserRef.current.getByteFrequencyData(dataArray)
            const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length
            const normalizedLevel = Math.min((average / 128) * sensitivityRef.current, 1)
            setAudioLevel(normalizedLevel)
          }
        }
        animationFrameRef.current = requestAnimationFrame(processLoop)
      }
      processLoop()

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          if (source === 'system') {
            setError('Screen sharing permission denied.')
          } else {
            setError('Microphone permission denied. Please allow access.')
          }
        } else if (err.name === 'NotFoundError') {
          setError('No microphone found.')
        } else {
          setError(errorMessage)
        }
      } else {
        setError(errorMessage)
      }
      
      setIsActive(false)
      setCurrentSource(null)
    }
  }, [stopLipsync])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopLipsync()
    }
  }, [stopLipsync])

  return {
    viseme,
    isActive,
    error,
    audioLevel,
    currentSource,
    startLipsync,
    stopLipsync,
    systemAudioSupport: getSystemAudioSupport(),
  }
}

// Re-export VISEMES
export { VISEMES }
