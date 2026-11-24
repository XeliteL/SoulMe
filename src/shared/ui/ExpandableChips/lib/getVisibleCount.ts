export const getVisibleCount = (
  chipsWidths: readonly number[],
  availableWidth: number,
  gap: number,
  lines: number,
  buttonWidth: number,
): number => {
  let row = 1
  let rowWidth = 0
  let isRowEmpty = true
  let countWithButton = 0

  for (const [idx, width] of chipsWidths.entries()) {
    const nextWidth = isRowEmpty ? width : rowWidth + gap + width

    if (!isRowEmpty && nextWidth > availableWidth) {
      row++
      rowWidth = width
    } else {
      rowWidth = nextWidth
    }

    if (row > lines) return countWithButton

    isRowEmpty = false

    if (row < lines || rowWidth + gap + buttonWidth <= availableWidth) {
      countWithButton = idx + 1
    }
  }

  return chipsWidths.length
}
