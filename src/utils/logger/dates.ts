function toNormalDate(date: Date): string {
  // console.log(JSON.stringify(new Date(date.setHours(date.getHours() + 3))).replaceAll('"', '').replace(/(.*)T.+Z/gm, "$1"))
  return JSON.stringify(new Date(date.setHours(date.getHours() + 3))).replaceAll('"', '').replace(/(.*)T.+Z/gm, "$1")
}

function toNormalDateAndTime(date: Date): string {
  // console.log(JSON.stringify(new Date(date.setHours(date.getHours() + 3))).replace(/(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})Z/gm, "$1_$2-$3-$4"))
  return JSON.stringify(new Date(date.setHours(date.getHours() + 3))).replaceAll('"', '').replace(/(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})Z/gm, "$1_$2-$3-$4")
}

function toNormalTime(date: Date): string {
  // console.log(JSON.stringify(new Date(date.setHours(date.getHours() + 3))).replaceAll('"', '').replace(/.*T(.+)Z/gm, "$1"))
  return JSON.stringify(new Date(date.setHours(date.getHours() + 3))).replaceAll('"', '').replace(/.*T(.+)Z/gm, "$1")
}

export {
  toNormalDate,
  toNormalDateAndTime,
  toNormalTime
}