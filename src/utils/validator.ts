export function validateBlank(input: string) {
  if (input.trim().length === 0) return false
  return true
}

export function validateEmail(email: string) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return regex.test(email)
}

export function validatePassword(pw1: string, pw2: string) {
  return pw1 === pw2
}
