export interface IBoard {
  id: number
  title: string
  writer: string
  content: string
  updated: Date
  readCount: number
  likeCount: number
  isOwner: boolean
  // commentCount: number
}

export interface IBoardResponse {
  content: {
    id: number
    writer: string
    title: string
    content: string
    likecount: number
    readcount: number
    regDate: string
    updateDate: string
  }[]
  totalPages: number
  totalElements: number
}

export interface IBoardDetailResponse {
  id: number
  writer: string
  title: string
  content: string
  likecount: number
  readcount: number
  regDate: string
  updateDate: string
  mine: boolean
}
