export function convertToUnit (str, unit = 'px') {
  if (str == null || str === '') {
    return undefined
  } else if (isNaN(str)) {
    return String(str)
  } else if (str < 0) {
    return undefined
  } else {
    return `${Number(str)}${unit}`
  }
}
