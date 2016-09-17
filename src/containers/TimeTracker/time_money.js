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

// how much money we've raised by completing the task
const getGain               = (secs, priceForHour) => {
  return priceForHour       * getHoursBySeconds(secs)
      + (priceForHour / 60) * getMinutesBySeconds(secs)
}

// our time is represented by seconds, so we have seconds as input value
const getStringRepresentationOfTime1 = (secs) => {
  if (!secs) {
    secs = 0
  }
  
  const [hours, minutes, seconds] = getTime(secs)

  if (seconds === 0
      && minutes == 0
      && hours == 0
  ) return `-> (ง'̀-'́)ง -> Enter Task Info `

  if (hours === 0 && minutes == 0) {
    return `${seconds} sec`
  } else if (hours === 0) {
    return `${withZero(minutes)} : ${withZero(seconds)} min`
  } else {
    return `${withZero(hours)} : ${withZero(minutes)} : ${withZero(seconds)} hrs`
  }
}

const getStringRepresentationOfTime2 = (secs) => {
  if (!secs) {
    secs = 0
  }

  const [hours, minutes, seconds] = getTime(secs)

  if (hours === 0) {
    return `${hours}:${withZero(minutes)}:${withZero(seconds)}`
  } else {
    return `${withZero(hours)}:${withZero(minutes)}:${withZero(seconds)}`
  }
}

const getStringRepresentationOfGain = (secs, priceForHour) => {
  return `${getGain(secs, priceForHour)} Rub`
}

const getStringRepresentationOfPrice = (taskPrice) => {
  return `${taskPrice} Rub`
}

export { 
  getStringRepresentationOfTime1, 
  getStringRepresentationOfTime2,
  getStringRepresentationOfGain,
  getStringRepresentationOfPrice,
}