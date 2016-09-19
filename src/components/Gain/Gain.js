import React from 'react'

const Gain = (props) => {
  const {type, time, ratePerHour} = props

  // string value wrapper
  const wrap = (string) => <div>{string}</div>

  switch(type) {
    case 'RUB':
      return wrap(`${getGain(time, ratePerHour)} Rub`)
    default:
      return wrap(`${getGain(time, ratePerHour)} Rub`)
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

// how much money we've raised by completing the task
const getGain               = (secs, priceForHour) => {
  return priceForHour       * getHoursBySeconds(secs)
    + (priceForHour / 60) * getMinutesBySeconds(secs)
}

export default Gain