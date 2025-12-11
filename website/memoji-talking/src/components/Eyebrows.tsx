import { COLORS, POSITIONS, OPENMOJI, EMOTION_TYPES, EmotionType } from '../constants'

interface EyebrowPosition {
  x: number
  y: number
}

interface EyebrowsProps {
  emotion?: EmotionType
}

/**
 * Eyebrows - Emotion-driven eyebrow variants
 * Each emotion has unique eyebrow positioning and shape
 */
export function Eyebrows({ emotion = EMOTION_TYPES.neutral }: EyebrowsProps) {
  const { leftEyebrow, rightEyebrow } = POSITIONS

  return (
    <g className="eyebrows">
      {emotion === EMOTION_TYPES.neutral && (
        <NeutralEyebrows left={leftEyebrow} right={rightEyebrow} />
      )}
      {emotion === EMOTION_TYPES.happy && (
        <HappyEyebrows left={leftEyebrow} right={rightEyebrow} />
      )}
      {emotion === EMOTION_TYPES.sad && (
        <SadEyebrows left={leftEyebrow} right={rightEyebrow} />
      )}
      {emotion === EMOTION_TYPES.excited && (
        <ExcitedEyebrows left={leftEyebrow} right={rightEyebrow} />
      )}
      {emotion === EMOTION_TYPES.surprised && (
        <SurprisedEyebrows left={leftEyebrow} right={rightEyebrow} />
      )}
      {emotion === EMOTION_TYPES.thinking && (
        <ThinkingEyebrows left={leftEyebrow} right={rightEyebrow} />
      )}
    </g>
  )
}

/**
 * Neutral - Slight natural arch
 */
function NeutralEyebrows({ left, right }: { left: EyebrowPosition; right: EyebrowPosition }) {
  return (
    <>
      <path
        d={`M${left.x} ${left.y + 2} Q${left.x + 6} ${left.y} ${left.x + 12} ${left.y + 2}`}
        stroke={COLORS.stroke}
        strokeWidth={OPENMOJI.strokeWidth}
        strokeLinecap={OPENMOJI.strokeLinecap}
        fill="none"
      />
      <path
        d={`M${right.x} ${right.y + 2} Q${right.x + 6} ${right.y} ${right.x + 12} ${right.y + 2}`}
        stroke={COLORS.stroke}
        strokeWidth={OPENMOJI.strokeWidth}
        strokeLinecap={OPENMOJI.strokeLinecap}
        fill="none"
      />
    </>
  )
}

/**
 * Happy - Raised and relaxed
 */
function HappyEyebrows({ left, right }: { left: EyebrowPosition; right: EyebrowPosition }) {
  return (
    <>
      <path
        d={`M${left.x} ${left.y} Q${left.x + 6} ${left.y - 3} ${left.x + 12} ${left.y}`}
        stroke={COLORS.stroke}
        strokeWidth={OPENMOJI.strokeWidth}
        strokeLinecap={OPENMOJI.strokeLinecap}
        fill="none"
      />
      <path
        d={`M${right.x} ${right.y} Q${right.x + 6} ${right.y - 3} ${right.x + 12} ${right.y}`}
        stroke={COLORS.stroke}
        strokeWidth={OPENMOJI.strokeWidth}
        strokeLinecap={OPENMOJI.strokeLinecap}
        fill="none"
      />
    </>
  )
}

/**
 * Sad - Inner corners raised (worried look)
 */
function SadEyebrows({ left, right }: { left: EyebrowPosition; right: EyebrowPosition }) {
  return (
    <>
      <path
        d={`M${left.x} ${left.y + 3} Q${left.x + 6} ${left.y + 1} ${left.x + 12} ${left.y - 2}`}
        stroke={COLORS.stroke}
        strokeWidth={OPENMOJI.strokeWidth}
        strokeLinecap={OPENMOJI.strokeLinecap}
        fill="none"
      />
      <path
        d={`M${right.x} ${right.y - 2} Q${right.x + 6} ${right.y + 1} ${right.x + 12} ${right.y + 3}`}
        stroke={COLORS.stroke}
        strokeWidth={OPENMOJI.strokeWidth}
        strokeLinecap={OPENMOJI.strokeLinecap}
        fill="none"
      />
    </>
  )
}

/**
 * Excited - High and curved
 */
function ExcitedEyebrows({ left, right }: { left: EyebrowPosition; right: EyebrowPosition }) {
  return (
    <>
      <path
        d={`M${left.x} ${left.y - 1} Q${left.x + 6} ${left.y - 5} ${left.x + 12} ${left.y - 1}`}
        stroke={COLORS.stroke}
        strokeWidth={OPENMOJI.strokeWidth}
        strokeLinecap={OPENMOJI.strokeLinecap}
        fill="none"
      />
      <path
        d={`M${right.x} ${right.y - 1} Q${right.x + 6} ${right.y - 5} ${right.x + 12} ${right.y - 1}`}
        stroke={COLORS.stroke}
        strokeWidth={OPENMOJI.strokeWidth}
        strokeLinecap={OPENMOJI.strokeLinecap}
        fill="none"
      />
    </>
  )
}

/**
 * Surprised - Very high and arched
 */
function SurprisedEyebrows({ left, right }: { left: EyebrowPosition; right: EyebrowPosition }) {
  return (
    <>
      <path
        d={`M${left.x - 1} ${left.y - 3} Q${left.x + 6} ${left.y - 8} ${left.x + 13} ${left.y - 3}`}
        stroke={COLORS.stroke}
        strokeWidth={OPENMOJI.strokeWidth}
        strokeLinecap={OPENMOJI.strokeLinecap}
        fill="none"
      />
      <path
        d={`M${right.x - 1} ${right.y - 3} Q${right.x + 6} ${right.y - 8} ${right.x + 13} ${right.y - 3}`}
        stroke={COLORS.stroke}
        strokeWidth={OPENMOJI.strokeWidth}
        strokeLinecap={OPENMOJI.strokeLinecap}
        fill="none"
      />
    </>
  )
}

/**
 * Thinking - Asymmetric (right raised, left normal) for contemplative look
 */
function ThinkingEyebrows({ left, right }: { left: EyebrowPosition; right: EyebrowPosition }) {
  return (
    <>
      {/* Left eyebrow - normal/slightly furrowed */}
      <path
        d={`M${left.x} ${left.y + 1} Q${left.x + 6} ${left.y + 2} ${left.x + 12} ${left.y + 1}`}
        stroke={COLORS.stroke}
        strokeWidth={OPENMOJI.strokeWidth}
        strokeLinecap={OPENMOJI.strokeLinecap}
        fill="none"
      />
      {/* Right eyebrow - raised high (questioning) */}
      <path
        d={`M${right.x} ${right.y + 1} Q${right.x + 6} ${right.y - 5} ${right.x + 12} ${right.y - 1}`}
        stroke={COLORS.stroke}
        strokeWidth={OPENMOJI.strokeWidth}
        strokeLinecap={OPENMOJI.strokeLinecap}
        fill="none"
      />
    </>
  )
}
