const getHoursBySeconds = seconds => parseInt(seconds / 3600)

const getMinutesBySeconds = seconds => parseInt((seconds % 3600) / 60)

const getSecondsBySeconds = seconds => seconds % 60

const getTime = (secodns) => [  getHoursBySeconds(secodns),
                                getMinutesBySeconds(secodns),
                                getSecondsBySeconds(secodns),
                              ]

const withZero = number => number < 10 ? `0${number}` : `${number}`

const getGain = (secs, priceForHour) => {
  return priceForHour       * getHoursBySeconds(secs)
      + (priceForHour / 60) * getMinutesBySeconds(secs)
}

// our time is represented by seconds, so we have seconds as input value
const getStringRepresentationOfTime1 = (secs) => {
  if (!secs) {
    secs = 0
  }
  
  //console.log(taskTime)
  const [hours, minutes, seconds] = getTime(secs)

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

export { 
  getStringRepresentationOfTime1, 
  getStringRepresentationOfTime2,
  getStringRepresentationOfGain
}