'use client'

import { useState, useEffect } from 'react'
import { COLORS, POSITIONS, OPENMOJI, EMOTION_TYPES, EmotionType } from '../constants'

interface EyePosition {
  cx: number
  cy: number
}

interface EyesProps {
  emotion?: EmotionType
}

/**
 * Eyes - Emotion-driven eye variants with occasional blinking
 * Each emotion has unique eye styling following OpenMoji aesthetic
 */
export function Eyes({ emotion = EMOTION_TYPES.neutral }: EyesProps) {
  const { leftEye, rightEye } = POSITIONS
  const [isBlinking, setIsBlinking] = useState(false)

  // Periodic blink effect (every 3-5 seconds)
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    const scheduleBlink = () => {
      const delay = 3000 + Math.random() * 2000 // 3-5 seconds
      timeoutId = setTimeout(() => {
        setIsBlinking(true)
        setTimeout(() => setIsBlinking(false), 150) // Blink duration
        scheduleBlink()
      }, delay)
    }

    timeoutId = setTimeout(scheduleBlink, 2000)
    return () => clearTimeout(timeoutId)
  }, [])

  // Show closed eyes when blinking (except for happy which already has closed eyes)
  const showBlink = isBlinking && emotion !== EMOTION_TYPES.happy

  return (
    <g className="eyes">
      {showBlink ? (
        <BlinkingEyes leftEye={leftEye} rightEye={rightEye} />
      ) : (
        <>
          {emotion === EMOTION_TYPES.neutral && (
            <NeutralEyes leftEye={leftEye} rightEye={rightEye} />
          )}
          {emotion === EMOTION_TYPES.happy && (
            <HappyEyes leftEye={leftEye} rightEye={rightEye} />
          )}
          {emotion === EMOTION_TYPES.sad && (
            <SadEyes leftEye={leftEye} rightEye={rightEye} />
          )}
          {emotion === EMOTION_TYPES.excited && (
            <ExcitedEyes leftEye={leftEye} rightEye={rightEye} />
          )}
          {emotion === EMOTION_TYPES.surprised && (
            <SurprisedEyes leftEye={leftEye} rightEye={rightEye} />
          )}
          {emotion === EMOTION_TYPES.thinking && (
            <ThinkingEyes leftEye={leftEye} rightEye={rightEye} />
          )}
        </>
      )}
    </g>
  )
}

/**
 * Blinking - Closed eyes (horizontal lines)
 */
function BlinkingEyes({ leftEye, rightEye }: { leftEye: EyePosition; rightEye: EyePosition }) {
  return (
    <>
      <path
        d={`M${leftEye.cx - 5} ${leftEye.cy} L${leftEye.cx + 5} ${leftEye.cy}`}
        stroke={COLORS.stroke}
        strokeWidth={OPENMOJI.strokeWidth}
        strokeLinecap={OPENMOJI.strokeLinecap}
      />
      <path
        d={`M${rightEye.cx - 5} ${rightEye.cy} L${rightEye.cx + 5} ${rightEye.cy}`}
        stroke={COLORS.stroke}
        strokeWidth={OPENMOJI.strokeWidth}
        strokeLinecap={OPENMOJI.strokeLinecap}
      />
    </>
  )
}

/**
 * Neutral - Normal open circles with pupils
 */
function NeutralEyes({ leftEye, rightEye }: { leftEye: EyePosition; rightEye: EyePosition }) {
  return (
    <>
      <ellipse cx={leftEye.cx} cy={leftEye.cy} rx={4} ry={5} fill={COLORS.stroke} />
      <ellipse cx={rightEye.cx} cy={rightEye.cy} rx={4} ry={5} fill={COLORS.stroke} />
    </>
  )
}

/**
 * Happy - Curved smiling eyes (^_^)
 */
function HappyEyes({ leftEye, rightEye }: { leftEye: EyePosition; rightEye: EyePosition }) {
  return (
    <>
      <path
        d={`M${leftEye.cx - 5} ${leftEye.cy + 2} Q${leftEye.cx} ${leftEye.cy - 4} ${leftEye.cx + 5} ${leftEye.cy + 2}`}
        stroke={COLORS.stroke}
        strokeWidth={OPENMOJI.strokeWidth}
        strokeLinecap={OPENMOJI.strokeLinecap}
        fill="none"
      />
      <path
        d={`M${rightEye.cx - 5} ${rightEye.cy + 2} Q${rightEye.cx} ${rightEye.cy - 4} ${rightEye.cx + 5} ${rightEye.cy + 2}`}
        stroke={COLORS.stroke}
        strokeWidth={OPENMOJI.strokeWidth}
        strokeLinecap={OPENMOJI.strokeLinecap}
        fill="none"
      />
    </>
  )
}

/**
 * Sad - Droopy, downturned eyes
 */
function SadEyes({ leftEye, rightEye }: { leftEye: EyePosition; rightEye: EyePosition }) {
  return (
    <>
      <ellipse cx={leftEye.cx} cy={leftEye.cy + 1} rx={4} ry={4} fill={COLORS.stroke} />
      <path
        d={`M${leftEye.cx - 5} ${leftEye.cy - 3} Q${leftEye.cx} ${leftEye.cy - 1} ${leftEye.cx + 5} ${leftEye.cy - 5}`}
        stroke={COLORS.skin}
        strokeWidth={3}
        strokeLinecap={OPENMOJI.strokeLinecap}
        fill="none"
      />
      <ellipse cx={rightEye.cx} cy={rightEye.cy + 1} rx={4} ry={4} fill={COLORS.stroke} />
      <path
        d={`M${rightEye.cx - 5} ${rightEye.cy - 5} Q${rightEye.cx} ${rightEye.cy - 1} ${rightEye.cx + 5} ${rightEye.cy - 3}`}
        stroke={COLORS.skin}
        strokeWidth={3}
        strokeLinecap={OPENMOJI.strokeLinecap}
        fill="none"
      />
    </>
  )
}

/**
 * Excited - Wide open with sparkle/shine
 */
function ExcitedEyes({ leftEye, rightEye }: { leftEye: EyePosition; rightEye: EyePosition }) {
  return (
    <>
      <ellipse cx={leftEye.cx} cy={leftEye.cy} rx={5} ry={6} fill={COLORS.stroke} />
      <circle cx={leftEye.cx + 1.5} cy={leftEye.cy - 2} r={1.5} fill="#FFFFFF" />
      <ellipse cx={rightEye.cx} cy={rightEye.cy} rx={5} ry={6} fill={COLORS.stroke} />
      <circle cx={rightEye.cx + 1.5} cy={rightEye.cy - 2} r={1.5} fill="#FFFFFF" />
    </>
  )
}

/**
 * Surprised - Very wide, raised eyes
 */
function SurprisedEyes({ leftEye, rightEye }: { leftEye: EyePosition; rightEye: EyePosition }) {
  return (
    <>
      <ellipse
        cx={leftEye.cx}
        cy={leftEye.cy - 2}
        rx={6}
        ry={7}
        fill="#FFFFFF"
        stroke={COLORS.stroke}
        strokeWidth={OPENMOJI.strokeWidth}
      />
      <circle cx={leftEye.cx} cy={leftEye.cy - 1} r={3} fill={COLORS.stroke} />
      <ellipse
        cx={rightEye.cx}
        cy={rightEye.cy - 2}
        rx={6}
        ry={7}
        fill="#FFFFFF"
        stroke={COLORS.stroke}
        strokeWidth={OPENMOJI.strokeWidth}
      />
      <circle cx={rightEye.cx} cy={rightEye.cy - 1} r={3} fill={COLORS.stroke} />
    </>
  )
}

/**
 * Thinking - Eyes looking up and to the side (contemplative)
 */
function ThinkingEyes({ leftEye, rightEye }: { leftEye: EyePosition; rightEye: EyePosition }) {
  return (
    <>
      {/* Eye whites */}
      <ellipse cx={leftEye.cx} cy={leftEye.cy} rx={5} ry={5} fill="#FFFFFF" stroke={COLORS.stroke} strokeWidth={1.5} />
      <ellipse cx={rightEye.cx} cy={rightEye.cy} rx={5} ry={5} fill="#FFFFFF" stroke={COLORS.stroke} strokeWidth={1.5} />
      {/* Pupils looking up and to the right */}
      <circle cx={leftEye.cx + 1.5} cy={leftEye.cy - 1.5} r={2.5} fill={COLORS.stroke} />
      <circle cx={rightEye.cx + 1.5} cy={rightEye.cy - 1.5} r={2.5} fill={COLORS.stroke} />
    </>
  )
}
