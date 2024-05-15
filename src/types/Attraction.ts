export type TContentCode = 'A01' | 'A02' | 'A03' | 'A04' | 'A05' | 'B02' | 'C01'

export interface IAttraction {
  contentId: number
  contentType: number
  title: string
  tel: string
  sidoCode: number
  gugunCode: number
  addr1: string
  addr2: string
  image1: string
  image2: string
  latitude: number
  longitude: number
  mLevel: number
  readCount: number
}
