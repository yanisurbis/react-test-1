import React from 'react'

const Price = (props) => {
  const {type, ratePerHour} = props

  // string value wrapper
  const wrap = (string) => <div>{string}</div>

  switch(type) {
    case 'RUB':
      return wrap(`${ratePerHour} Rub / Hr`)
    default:
      return wrap(`Rate per hour : ${ratePerHour}`)
  }
}

export default Price