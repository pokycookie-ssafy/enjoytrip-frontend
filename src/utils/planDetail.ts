import dayjs from 'dayjs'

const LEFT_MARGIN = 80
const TOP_MARGIN = 56
const HEIGHT = 24

export const getOffset = (
  start: Date,
  end: Date,
  startDate: Date,
  width: number
) => {
  const dayDiff = dayjs(start).diff(startDate, 'day')
  const offsetX = LEFT_MARGIN + dayDiff * width

  const startTime = dayjs(start).startOf('day')
  const timeDiff = dayjs(start).diff(startTime, 'minute')
  const offsetY = TOP_MARGIN + (timeDiff / 30) * HEIGHT

  const height = dayjs(end).diff(start, 'minute') / 30

  return { offsetX, offsetY, height }
}

export const getTimeIdx = (time: Date) => {
  const startTime = dayjs(time).startOf('day')
  const timeDiff = dayjs(time).diff(startTime, 'minute')

  return timeDiff / 30
}
