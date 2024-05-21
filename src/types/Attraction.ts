export interface IAttraction {
  contentId: number
  contentTypeId: number
  title: string
  tel: string
  sidoCode: number
  gugunCode: number
  addr1: string
  addr2: string
  firstImage: string
  firstImage2: string
  latitude: number
  longitude: number
  mlevel: number
  readcount: number
  zipcode: number
}

export interface IAttractionResponse {
  content: IAttraction[]
  totalElements: number
}
