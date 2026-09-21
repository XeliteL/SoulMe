export const formatDurationEn = (value: number) =>
  `${Math.floor(value / 60)}h ${value % 60}min`
