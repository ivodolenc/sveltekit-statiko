export const createHash = ({ length = 8, mode } = {}) => {
  let result = ''
  let numeric = '0123456789'
  let alphabetic = 'abcdefghijklmnopqrstuvwxyz'
  let chars = numeric + alphabetic

  if (mode === 'a') chars = alphabetic
  if (mode === 'n') chars = numeric

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return result
}
