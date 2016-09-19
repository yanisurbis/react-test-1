import React from 'react'

// hi
const Time = (props) => {
  const {type, time} = props

  const [hours, minutes, seconds] = getTime(time)

  const wrap = (string) => <div>{string}</div>

  switch(type) {
    case 'HEADER':
      // user isn't doing anything
      if (seconds === 0
        && minutes == 0
        && hours == 0
      ) return wrap(`-> (ง'̀-'́)ง -> Enter Task Info `)
      
      // only seconds
      if (hours === 0 && minutes == 0) {
        return wrap(`${seconds} sec`)
        // minutes and seconds
      } else if (hours === 0) {
        return wrap(`${withZero(minutes)} : ${withZero(seconds)} min`)
      } else {
        return wrap(`${withZero(hours)} : ${withZero(minutes)} : ${withZero(seconds)} hrs`)
      }
    case 'TASK':
      if (hours === 0) {
        return wrap(`${hours}:${withZero(minutes)}:${withZero(seconds)}`)
      } else {
        return wrap(`${withZero(hours)}:${withZero(minutes)}:${withZero(seconds)}`)
      }
    default:
      return wrap(`0 sec`)
  }
}

// helpers functions

const getHoursBySeconds     = seconds => parseInt(seconds / 3600)

const getMinutesBySeconds   = seconds => parseInt((seconds % 3600) / 60)

const getSecondsBySeconds   = seconds => seconds % 60

const getTime               = secodns => [
  getHoursBySeconds(secodns),
  getMinutesBySeconds(secodns),
  getSecondsBySeconds(secodns),
]

// if only one digit -> concat with zero
// 8 -> 08
// 12 -> 12
const withZero              = number  => number < 10
  ? `0${number}`
  : `${number}`

export default Time