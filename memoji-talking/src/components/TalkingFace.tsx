'use client'

import { OPENMOJI, EMOTION_TYPES, EmotionType } from '../constants'
import { FaceBase } from './FaceBase'
import { Eyes } from './Eyes'
import { Eyebrows } from './Eyebrows'
import { Mouth } from './Mouth'
import { Extras } from './Extras'

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

/**
 * TalkingFace - Main composite SVG face component
 *
 * Composites independent layers:
 * - FaceBase: Static head shape
 * - Eyes: Emotion-reactive
 * - Eyebrows: Emotion-reactive
 * - Mouth: Viseme-reactive with smooth transitions
 * - Extras: Blush, tears based on emotion
 */
export function TalkingFace({
  viseme = 'viseme_sil',
  emotion = EMOTION_TYPES.neutral,
  isActive = false,
  size = 200,
  showDebug = false,
  className = '',
}: TalkingFaceProps) {
  return (
    <div
      className={`talking-face ${isActive ? 'talking-face--active' : ''} ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox={OPENMOJI.viewBox}
        width={size}
        height={size}
        className="talking-face__svg"
      >
        {/* Layer 1: Base face shape */}
        <FaceBase />

        {/* Layer 2: Extras (behind eyes) - blush, etc. */}
        <Extras emotion={emotion} />

        {/* Layer 3: Eyebrows */}
        <Eyebrows emotion={emotion} />

        {/* Layer 4: Eyes */}
        <Eyes emotion={emotion} />

        {/* Layer 5: Mouth (topmost for visibility) */}
        <Mouth viseme={viseme} emotion={emotion} />
      </svg>

      {showDebug && (
        <div className="talking-face__debug">
          <span>Viseme: {viseme}</span>
          <span>Emotion: {emotion}</span>
        </div>
      )}
    </div>
  )
}

export default TalkingFace
