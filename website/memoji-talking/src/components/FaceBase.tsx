import { COLORS, POSITIONS, OPENMOJI } from '../constants'

/**
 * FaceBase - Static head shape following OpenMoji style
 * Renders the yellow elliptical face
 */
export function FaceBase() {
  const { head } = POSITIONS

  return (
    <g className="face-base">
      {/* Main head - yellow ellipse */}
      <ellipse
        cx={head.cx}
        cy={head.cy}
        rx={head.rx}
        ry={head.ry}
        fill={COLORS.skin}
        stroke={COLORS.stroke}
        strokeWidth={OPENMOJI.strokeWidth}
      />
    </g>
  )
}
