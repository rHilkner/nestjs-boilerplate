import bcrypt from 'bcrypt'

export function encrypt(text: string): Promise<string> {
  return bcrypt.hash(text, 10)
}

export function compare(text: string, encryptedText: string): Promise<boolean> {
  return bcrypt.compare(text, encryptedText)
}

export function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  let counter = 0
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
    counter += 1
  }
  return result
}
