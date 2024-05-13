export const telIncoder = (input: string) => {
  const length = input.length

  let v1 = input.substring(0, 3)
  let v2 = input.substring(3, 7)
  let v3 = input.substring(7)

  if (length < 4) {
    return input
  } else if (length < 8) {
    v2 = input.substring(3, 8)
    return `${v1}-${v2}`
  } else if (length < 11) {
    v2 = input.substring(3, 6)
    v3 = input.substring(6)
    return `${v1}-${v2}-${v3}`
  } else {
    return `${v1}-${v2}-${v3}`
  }
}

export const telDecoder = (input: string) => {
  return input.replace(/-/gi, '')
}

export const telRool = (key: string) => {
  const allowedKey = new Set(['Backspace', 'Delete', 'Tab'])

  return /^[0-9]$/.test(key) || allowedKey.has(key)
}
