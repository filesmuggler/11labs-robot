import { COLORS, POSITIONS, OPENMOJI, MOUTH_SHAPES, EMOTION_TYPES, getMouthShape, EmotionType } from '../constants'

interface MouthProps {
  viseme?: string
  emotion?: EmotionType
}

interface MouthPosition {
  cx: number
  cy: number
}

/**
 * Mouth - Viseme and emotion driven mouth shapes
 * Uses CSS opacity crossfade for smooth transitions between shapes
 * When silent, shows emotion-appropriate idle mouth
 */
export function Mouth({ viseme = 'viseme_sil', emotion = EMOTION_TYPES.neutral }: MouthProps) {
  const visemeShape = getMouthShape(viseme)
  const { mouth } = POSITIONS

  // For silent/closed states, use emotion-specific idle mouth
  const isIdle = visemeShape === MOUTH_SHAPES.closed || visemeShape === MOUTH_SHAPES.pressed
  let currentShape: string = visemeShape

  if (isIdle) {
    switch (emotion) {
      case EMOTION_TYPES.happy:
      case EMOTION_TYPES.excited:
        currentShape = 'happyIdle'
        break
      case EMOTION_TYPES.sad:
        currentShape = 'sadIdle'
        break
      case EMOTION_TYPES.thinking:
        currentShape = 'thinkingIdle'
        break
      default:
        currentShape = visemeShape
    }
  }

  // All possible shapes including emotion-specific ones
  const allShapes = [...Object.values(MOUTH_SHAPES), 'happyIdle', 'sadIdle', 'thinkingIdle']

  return (
    <g className="mouth">
      {allShapes.map((shape) => (
        <g
          key={shape}
          className={`mouth-shape mouth-shape-${shape}`}
          style={{
            opacity: currentShape === shape ? 1 : 0,
            transition: 'opacity 60ms ease-out',
          }}
        >
          <MouthShapeComponent shape={shape} pos={mouth} />
        </g>
      ))}
    </g>
  )
}

/**
 * Render individual mouth shape
 */
function MouthShapeComponent({ shape, pos }: { shape: string; pos: MouthPosition }) {
  const { cx, cy } = pos

  switch (shape) {
    case MOUTH_SHAPES.closed:
      return <ClosedMouth cx={cx} cy={cy} />
    case MOUTH_SHAPES.pressed:
      return <PressedMouth cx={cx} cy={cy} />
    case MOUTH_SHAPES.teethLip:
      return <TeethLipMouth cx={cx} cy={cy} />
    case MOUTH_SHAPES.tongueOut:
      return <TongueOutMouth cx={cx} cy={cy} />
    case MOUTH_SHAPES.openSmall:
      return <OpenSmallMouth cx={cx} cy={cy} />
    case MOUTH_SHAPES.openBack:
      return <OpenBackMouth cx={cx} cy={cy} />
    case MOUTH_SHAPES.pursed:
      return <PursedMouth cx={cx} cy={cy} />
    case MOUTH_SHAPES.teethClosed:
      return <TeethClosedMouth cx={cx} cy={cy} />
    case MOUTH_SHAPES.closedSmile:
      return <ClosedSmileMouth cx={cx} cy={cy} />
    case MOUTH_SHAPES.openRound:
      return <OpenRoundMouth cx={cx} cy={cy} />
    case MOUTH_SHAPES.openWide:
      return <OpenWideMouth cx={cx} cy={cy} />
    case MOUTH_SHAPES.wideSmile:
      return <WideSmileMouth cx={cx} cy={cy} />
    case MOUTH_SHAPES.openMid:
      return <OpenMidMouth cx={cx} cy={cy} />
    case MOUTH_SHAPES.roundedO:
      return <RoundedOMouth cx={cx} cy={cy} />
    case MOUTH_SHAPES.smallPucker:
      return <SmallPuckerMouth cx={cx} cy={cy} />
    case 'happyIdle':
      return <HappyIdleMouth cx={cx} cy={cy} />
    case 'sadIdle':
      return <SadIdleMouth cx={cx} cy={cy} />
    case 'thinkingIdle':
      return <ThinkingIdleMouth cx={cx} cy={cy} />
    default:
      return <ClosedMouth cx={cx} cy={cy} />
  }
}

function ClosedMouth({ cx, cy }: MouthPosition) {
  return (
    <path
      d={`M${cx - 10} ${cy} Q${cx} ${cy + 2} ${cx + 10} ${cy}`}
      stroke={COLORS.stroke}
      strokeWidth={OPENMOJI.strokeWidth}
      strokeLinecap={OPENMOJI.strokeLinecap}
      fill="none"
    />
  )
}

function PressedMouth({ cx, cy }: MouthPosition) {
  return (
    <path
      d={`M${cx - 8} ${cy} L${cx + 8} ${cy}`}
      stroke={COLORS.stroke}
      strokeWidth={2.5}
      strokeLinecap={OPENMOJI.strokeLinecap}
      fill="none"
    />
  )
}

function TeethLipMouth({ cx, cy }: MouthPosition) {
  return (
    <>
      <rect x={cx - 8} y={cy - 3} width={16} height={5} fill={COLORS.teeth} stroke={COLORS.stroke} strokeWidth={1} />
      <line x1={cx - 4} y1={cy - 3} x2={cx - 4} y2={cy + 2} stroke={COLORS.stroke} strokeWidth={0.5} />
      <line x1={cx} y1={cy - 3} x2={cx} y2={cy + 2} stroke={COLORS.stroke} strokeWidth={0.5} />
      <line x1={cx + 4} y1={cy - 3} x2={cx + 4} y2={cy + 2} stroke={COLORS.stroke} strokeWidth={0.5} />
      <path
        d={`M${cx - 8} ${cy + 3} Q${cx} ${cy + 6} ${cx + 8} ${cy + 3}`}
        stroke={COLORS.stroke}
        strokeWidth={1.5}
        strokeLinecap={OPENMOJI.strokeLinecap}
        fill="none"
      />
    </>
  )
}

function TongueOutMouth({ cx, cy }: MouthPosition) {
  return (
    <>
      <ellipse cx={cx} cy={cy} rx={8} ry={4} fill={COLORS.mouth} />
      <ellipse cx={cx} cy={cy + 2} rx={5} ry={3} fill={COLORS.tongue} />
    </>
  )
}

function OpenSmallMouth({ cx, cy }: MouthPosition) {
  return <ellipse cx={cx} cy={cy} rx={6} ry={4} fill={COLORS.mouth} />
}

function OpenBackMouth({ cx, cy }: MouthPosition) {
  return (
    <>
      <ellipse cx={cx} cy={cy} rx={7} ry={5} fill={COLORS.mouth} />
      <ellipse cx={cx} cy={cy + 2} rx={4} ry={2} fill={COLORS.tongue} />
    </>
  )
}

function PursedMouth({ cx, cy }: MouthPosition) {
  return <ellipse cx={cx} cy={cy} rx={5} ry={4} fill={COLORS.mouth} />
}

function TeethClosedMouth({ cx, cy }: MouthPosition) {
  return (
    <>
      <rect x={cx - 10} y={cy - 4} width={20} height={8} rx={2} fill={COLORS.teeth} stroke={COLORS.stroke} strokeWidth={OPENMOJI.strokeWidth} />
      <line x1={cx - 10} y1={cy} x2={cx + 10} y2={cy} stroke={COLORS.stroke} strokeWidth={1} />
    </>
  )
}

function ClosedSmileMouth({ cx, cy }: MouthPosition) {
  return (
    <path
      d={`M${cx - 10} ${cy - 1} Q${cx} ${cy + 4} ${cx + 10} ${cy - 1}`}
      stroke={COLORS.stroke}
      strokeWidth={OPENMOJI.strokeWidth}
      strokeLinecap={OPENMOJI.strokeLinecap}
      fill="none"
    />
  )
}

function OpenRoundMouth({ cx, cy }: MouthPosition) {
  return <ellipse cx={cx} cy={cy} rx={6} ry={5} fill={COLORS.mouth} />
}

function OpenWideMouth({ cx, cy }: MouthPosition) {
  return (
    <>
      <ellipse cx={cx} cy={cy} rx={10} ry={8} fill={COLORS.mouth} />
      <ellipse cx={cx} cy={cy + 4} rx={6} ry={3} fill={COLORS.tongue} />
    </>
  )
}

function WideSmileMouth({ cx, cy }: MouthPosition) {
  return (
    <>
      <path d={`M${cx - 12} ${cy - 2} Q${cx} ${cy + 8} ${cx + 12} ${cy - 2}`} stroke={COLORS.stroke} strokeWidth={OPENMOJI.strokeWidth} fill={COLORS.mouth} />
      <path d={`M${cx - 10} ${cy - 1} Q${cx} ${cy + 4} ${cx + 10} ${cy - 1}`} fill={COLORS.teeth} />
      <path d={`M${cx - 9} ${cy + 1} L${cx + 9} ${cy + 1}`} stroke={COLORS.stroke} strokeWidth={0.5} />
    </>
  )
}

function OpenMidMouth({ cx, cy }: MouthPosition) {
  return <ellipse cx={cx} cy={cy} rx={7} ry={5} fill={COLORS.mouth} />
}

function RoundedOMouth({ cx, cy }: MouthPosition) {
  return <ellipse cx={cx} cy={cy} rx={6} ry={6} fill={COLORS.mouth} />
}

function SmallPuckerMouth({ cx, cy }: MouthPosition) {
  return <ellipse cx={cx} cy={cy} rx={4} ry={5} fill={COLORS.mouth} />
}

function HappyIdleMouth({ cx, cy }: MouthPosition) {
  return (
    <path
      d={`M${cx - 12} ${cy - 2} Q${cx} ${cy + 8} ${cx + 12} ${cy - 2}`}
      stroke={COLORS.stroke}
      strokeWidth={OPENMOJI.strokeWidth}
      strokeLinecap={OPENMOJI.strokeLinecap}
      fill="none"
    />
  )
}

function SadIdleMouth({ cx, cy }: MouthPosition) {
  return (
    <path
      d={`M${cx - 10} ${cy + 3} Q${cx} ${cy - 4} ${cx + 10} ${cy + 3}`}
      stroke={COLORS.stroke}
      strokeWidth={OPENMOJI.strokeWidth}
      strokeLinecap={OPENMOJI.strokeLinecap}
      fill="none"
    />
  )
}

function ThinkingIdleMouth({ cx, cy }: MouthPosition) {
  // Sideways contemplative smirk - shifted to the side
  return (
    <path
      d={`M${cx - 6} ${cy} Q${cx + 2} ${cy + 2} ${cx + 8} ${cy - 2}`}
      stroke={COLORS.stroke}
      strokeWidth={OPENMOJI.strokeWidth}
      strokeLinecap={OPENMOJI.strokeLinecap}
      fill="none"
    />
  )
}
