export interface IResponse<T> {
  status: string
  data: T
}

export interface IResponseC<T> {
  cnt: number
  status: string
  data: T
}
