import { COLORS, POSITIONS, EMOTION_TYPES, EmotionType } from '../constants'

interface ExtrasProps {
  emotion?: EmotionType
}

/**
 * Extras - Optional facial elements based on emotion
 * Includes blush, tears, and other emotion-specific details
 */
export function Extras({ emotion = EMOTION_TYPES.neutral }: ExtrasProps) {
  return (
    <g className="extras">
      {/* Blush for happy and excited */}
      {(emotion === EMOTION_TYPES.happy || emotion === EMOTION_TYPES.excited) && (
        <Blush />
      )}
      {/* Tears for sad */}
      {emotion === EMOTION_TYPES.sad && (
        <Tears />
      )}
      {/* Sweat drop for surprised */}
      {emotion === EMOTION_TYPES.surprised && (
        <SweatDrop />
      )}
      {/* Thinking hand under chin */}
      {emotion === EMOTION_TYPES.thinking && (
        <ThinkingHand />
      )}
    </g>
  )
}

/**
 * Blush - Rosy cheeks
 */
function Blush() {
  const { leftBlush, rightBlush } = POSITIONS

  return (
    <>
      <ellipse cx={leftBlush.cx} cy={leftBlush.cy} rx={6} ry={4} fill={COLORS.blush} opacity={0.4} />
      <ellipse cx={rightBlush.cx} cy={rightBlush.cy} rx={6} ry={4} fill={COLORS.blush} opacity={0.4} />
    </>
  )
}

/**
 * Tears - Single tear drop from each eye
 */
function Tears() {
  const { leftEye, rightEye } = POSITIONS

  return (
    <>
      <path
        d={`M${leftEye.cx - 2} ${leftEye.cy + 6}
            Q${leftEye.cx - 4} ${leftEye.cy + 12} ${leftEye.cx - 2} ${leftEye.cy + 16}
            Q${leftEye.cx} ${leftEye.cy + 14} ${leftEye.cx - 2} ${leftEye.cy + 6}`}
        fill={COLORS.tear}
        opacity={0.8}
      />
      <path
        d={`M${rightEye.cx + 2} ${rightEye.cy + 6}
            Q${rightEye.cx + 4} ${rightEye.cy + 12} ${rightEye.cx + 2} ${rightEye.cy + 16}
            Q${rightEye.cx} ${rightEye.cy + 14} ${rightEye.cx + 2} ${rightEye.cy + 6}`}
        fill={COLORS.tear}
        opacity={0.8}
      />
    </>
  )
}

/**
 * SweatDrop - Single sweat drop for nervous/surprised
 */
function SweatDrop() {
  return (
    <path
      d={`M56 20
          Q60 26 56 32
          Q52 26 56 20`}
      fill={COLORS.tear}
      opacity={0.7}
    />
  )
}

/**
 * ThinkingHand - OpenMoji style thinking hand
 */
function ThinkingHand() {
  return (
    <g className="thinking-hand" transform="scale(1.5), translate(2, 15)">
      {/* Main Hand Shape */}
      <path
        d="M17.276 35.149s1.265-.411 1.429-1.352c.173-.972-.624-1.167-.624-1.167s1.041-.208 1.172-1.376c.123-1.101-.861-1.363-.861-1.363s.97-.4 1.016-1.539c.038-.959-.995-1.428-.995-1.428s5.038-1.221 5.556-1.341c.516-.12 1.32-.615 1.069-1.694c-.249-1.08-1.204-1.118-1.697-1.003c-.494.115-6.744 1.566-8.9 2.068l-1.439.334c-.54.127-.785-.11-.404-.512c.508-.536.833-1.129.946-2.113c.119-1.035-.232-2.313-.433-2.809c-.374-.921-1.005-1.649-1.734-1.899c-1.137-.39-1.945.321-1.542 1.561c.604 1.854.208 3.375-.833 4.293c-2.449 2.157-3.588 3.695-2.83 6.973c.828 3.575 4.377 5.876 7.952 5.048l3.152-.681z"
        fill={COLORS.skin}
        stroke={COLORS.stroke}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  )
}
