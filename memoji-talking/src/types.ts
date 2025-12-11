import { EmotionType, MouthShape } from './constants'

export type { EmotionType, MouthShape }

export type AudioSource = 'mic' | 'system'

export interface TalkingFaceProps {
  /** Current viseme from lipsync (e.g., 'viseme_aa') */
  viseme?: string
  /** Current emotion state */
  emotion?: EmotionType
  /** Whether audio source is active */
  isActive?: boolean
  /** Render size in pixels */
  size?: number
  /** Show debug information */
  showDebug?: boolean
  /** Additional CSS class */
  className?: string
}

export interface SystemAudioSupport {
  supported: boolean
  limited: boolean
  unsupported: boolean
  browser: string
}

export interface UseLipsyncOptions {
  sensitivity?: number
}

export interface UseLipsyncReturn {
  viseme: string
  isActive: boolean
  error: string | null
  audioLevel: number
  currentSource: AudioSource | null
  startLipsync: (source?: AudioSource) => Promise<void>
  stopLipsync: () => void
  systemAudioSupport: SystemAudioSupport
}
