import type { IAttraction } from './Attraction'
import type { ICommentResponse } from './Comment'

export interface IReview {
  attractionDto: IAttraction
  like: boolean
  likecount: number
  point: number
  review_content: string
  review_date: Date
  review_id: number
  writer: string
  writer_image: string
  images: string[]
  // comment_count: number
  // comments: ICommentResponse[]
}

export interface IReviewResponse {
  content: {
    attractionDto: IAttraction
    likecount: number
    like: boolean
    point: number
    review_content: string
    review_date: string
    review_id: number
    writer: string
    writer_image: string
    images: string[]
    // comment_count: number
    // comments: ICommentResponse[]
  }[]
  numberOfElements: number
}

export interface IReviewPreview {
  reviewId: number
  writer: string
  writerImage: string
  time: Date
  content: string
  point: number
}
