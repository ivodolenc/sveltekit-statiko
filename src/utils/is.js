export const isString = v => typeof v === 'string'
export const isArray = v => Array.isArray(v)
export const isObject = v => typeof v === 'object' && v !== null
export const isNull = v => v === null
export const isUndefined = v => typeof v === 'undefined'
export const isEmpty = v => {
  return (
    (isString(v) && v.trim().length === 0) ||
    (isObject(v) && Object.keys(v).length === 0) ||
    (isArray(v) && v.length === 0) ||
    isNull(v) ||
    isUndefined(v) ||
    Number.isNaN(v)
  )
}
