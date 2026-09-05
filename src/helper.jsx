export function checkHeading(str) {
  return /^#{1,6}\s+.+/.test(str)
}

export function replaceHeading(str) {
  return str.replace(/^\s*#{1,6}\s+/, '')
}