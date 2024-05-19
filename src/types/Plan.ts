import type { IAttraction } from '@/types/Attraction'

export interface IPlan {
  id: number
  title: string
  startDate: Date
  endDate: Date
  attractions: IAttraction[]
  details: IPlanDetail[]
}

export interface IPlanRequest {
  title: string
  startDate: Date
  endDate: Date
}

export interface IPlanDetail {
  attraction: IAttraction
  start: Date
  end: Date
}
