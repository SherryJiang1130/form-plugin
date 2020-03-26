const isType = type => target => `[object ${type}]` === Object.prototype.toString.call(target)

export const isArray = isType('Array')
export const isObject = isType('Object')
export const isEmpty = val => val == void 0 || val == ''
export const isDate = isType('Date')