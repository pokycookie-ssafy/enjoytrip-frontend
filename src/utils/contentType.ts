import contentType from '@/assets/data/contentType'

export const typeColor = (typeId: number) => {
  return contentType.find((e) => e.code === typeId)?.color ?? null
}
