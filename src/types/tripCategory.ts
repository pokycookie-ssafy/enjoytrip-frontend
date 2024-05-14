export type TCategoryCode =
  | 'A01'
  | 'A02'
  | 'A03'
  | 'A04'
  | 'A05'
  | 'B02'
  | 'C01'

export interface ICategory {
  code: TCategoryCode
  name: string
}
