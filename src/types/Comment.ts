export interface ICommentContent {
  commentCreatedDate: string
  commentList: ICommentContent[]
  commentUpdatedDate: string
  content: string
  id: number
  writer: string
  writer_image: string | null
}

export interface ICommentResponse {
  content: ICommentContent[]
  totalElements: number
}

export interface IComment {
  id: number
  writer: string
  writer_image: string | null
  content: string
  created: Date
  isReply: boolean
}

export interface IMyComment {
  id: number
  boardId: number
  content: string
  created: Date
}
