export default function pagination(
  idx: number,
  countPerPage: number,
  totalCount: number
) {
  const minIdx = 1
  const maxIdx = Math.ceil(totalCount / countPerPage)

  if (idx < minIdx || idx > maxIdx) {
    throw new Error('Invalid page index')
  }

  const start = Math.floor((idx - 1) / 5) * 5 + 1
  const end = Math.min(maxIdx, start + 4)

  return { start, end }
}
