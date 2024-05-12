export type TStatus = 'prev' | 'curr' | 'next'

export interface ICalendar {
  value: number
  date: Date
  status: TStatus
}

export function dailyArr(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay()
  const lastDate = new Date(year, month + 1, 0).getDate()
  const prevLastDate = new Date(year, month, 0).getDate()

  const result: ICalendar[] = []

  for (let i = 0; i < 42; i++) {
    let value: number
    let date: Date
    let status: TStatus

    if (i < firstDay) {
      // prev month
      value = prevLastDate - firstDay + i + 1
      date = new Date(year, month - 1, value)
      status = 'prev'
    } else if (i - firstDay + 1 <= lastDate) {
      // current month
      value = i - firstDay + 1
      date = new Date(year, month, value)
      status = 'curr'
    } else {
      // next month
      value = i - firstDay - lastDate + 1
      date = new Date(year, month + 1, value)
      status = 'next'
    }
    result.push({ value, date, status })
  }
  return result
}

export function getLastYear() {
  return new Date().getFullYear()
}

export function getLastDate(year: number, month: number) {
  const date = new Date(year, month + 1, 0)
  return date.getDate()
}
