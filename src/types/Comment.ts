export interface ICommentResponse {
  commentCreatedDate: string
  commentList: ICommentResponse[]
  commentUpdatedDate: string
  content: string
  id: number
  writer: string
}

export interface IComment {
  id: number
  writer: string
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
