import { VISEMES } from 'wawa-lipsync'

/**
 * OpenMoji Design Specifications
 * Following https://openmoji.org/styleguide/
 */
export const OPENMOJI = {
  viewBox: '0 0 72 72',
  width: 72,
  height: 72,
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

/**
 * OpenMoji Color Palette
 */
export const COLORS = {
  skin: '#FCEA2B',
  stroke: '#000000',
  blush: '#EA5A47',
  tear: '#92D3F5',
  mouth: '#000000',
  teeth: '#FFFFFF',
  tongue: '#FF9999',
}

/**
 * Face geometry positions (within 72x72 viewbox)
 */
export const POSITIONS = {
  head: {
    cx: 36,
    cy: 36,
    rx: 32,
    ry: 32,
  },
  leftEye: {
    cx: 25,
    cy: 32,
  },
  rightEye: {
    cx: 47,
    cy: 32,
  },
  mouth: {
    cx: 36,
    cy: 52,
  },
  leftEyebrow: {
    x: 19,
    y: 22,
  },
  rightEyebrow: {
    x: 41,
    y: 22,
  },
  leftBlush: {
    cx: 16,
    cy: 42,
  },
  rightBlush: {
    cx: 56,
    cy: 42,
  },
}

/**
 * Emotion types
 */
export const EMOTION_TYPES = {
  neutral: 'neutral',
  happy: 'happy',
  sad: 'sad',
  excited: 'excited',
  surprised: 'surprised',
  thinking: 'thinking',
} as const

export type EmotionType = (typeof EMOTION_TYPES)[keyof typeof EMOTION_TYPES]

/**
 * Mouth shape types mapped from visemes
 */
export const MOUTH_SHAPES = {
  closed: 'closed',           // sil - Simple horizontal line
  pressed: 'pressed',         // PP - Lips pressed (M, B, P)
  teethLip: 'teethLip',       // FF - Upper teeth on lower lip (F, V)
  tongueOut: 'tongueOut',     // TH - Tongue between teeth
  openSmall: 'openSmall',     // DD - Small open mouth (D, T)
  openBack: 'openBack',       // kk - Open, tongue back (K, G)
  pursed: 'pursed',           // CH - Slightly pursed (CH, SH)
  teethClosed: 'teethClosed', // SS - Teeth together, visible (S, Z)
  closedSmile: 'closedSmile', // nn - Closed but slight smile (N)
  openRound: 'openRound',     // RR - Rounded open (R)
  openWide: 'openWide',       // aa - Wide open (Ahh)
  wideSmile: 'wideSmile',     // E - Wide grin showing teeth (EEE)
  openMid: 'openMid',         // I - Medium open (IH)
  roundedO: 'roundedO',       // O - Rounded O shape (OH)
  smallPucker: 'smallPucker', // U - Small pucker (OOO)
} as const

export type MouthShape = (typeof MOUTH_SHAPES)[keyof typeof MOUTH_SHAPES]

/**
 * Map wawa-lipsync visemes to mouth shapes
 */
export const VISEME_TO_MOUTH: Record<string, MouthShape> = {
  [VISEMES.sil]: MOUTH_SHAPES.closed,
  [VISEMES.PP]: MOUTH_SHAPES.pressed,
  [VISEMES.FF]: MOUTH_SHAPES.teethLip,
  [VISEMES.TH]: MOUTH_SHAPES.tongueOut,
  [VISEMES.DD]: MOUTH_SHAPES.openSmall,
  [VISEMES.kk]: MOUTH_SHAPES.openBack,
  [VISEMES.CH]: MOUTH_SHAPES.pursed,
  [VISEMES.SS]: MOUTH_SHAPES.teethClosed,
  [VISEMES.nn]: MOUTH_SHAPES.closedSmile,
  [VISEMES.RR]: MOUTH_SHAPES.openRound,
  [VISEMES.aa]: MOUTH_SHAPES.openWide,
  [VISEMES.E]: MOUTH_SHAPES.wideSmile,
  [VISEMES.I]: MOUTH_SHAPES.openMid,
  [VISEMES.O]: MOUTH_SHAPES.roundedO,
  [VISEMES.U]: MOUTH_SHAPES.smallPucker,
}

/**
 * Get mouth shape from viseme
 */
export function getMouthShape(viseme: string): MouthShape {
  return VISEME_TO_MOUTH[viseme] || MOUTH_SHAPES.closed
}

// Re-export VISEMES for convenience
export { VISEMES }
