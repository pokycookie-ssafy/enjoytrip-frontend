interface IArea {
  code: number
  name: string
}

interface ISido extends IArea {
  details: IGugun[]
}

interface IGugun extends IArea {}

export type { IArea, ISido, IGugun }
