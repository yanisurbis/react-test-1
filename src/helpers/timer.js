

class Timer {
  static start = (component) => {
    
    const tick = () => {

      let [hours, minutes, seconds] = component.state.taskTime || [0, 0, 0]
      console.log(`${hours} ${minutes} ${seconds}`)

      seconds++

      if (seconds > 59) {
        seconds = 0
        minutes++
      }

      if (minutes > 59) {
        minutes = 0
        hours++
      }

      if (hours > 9999) {
        hours = 0
        minutes = 0
        seconds = 0
      }

      component.setState({
        taskTime: [hours, minutes, seconds]
      })
    }

    component.timer = setInterval(tick, 1000)
  }
  
  static stop = (component) => {
    // TODO: check on component.timer => error
    
    clearInterval(component.timer)
  }

  static getStringValue1 = (taskTime) => {
    //console.log(taskTime)
    const [hours, minutes, seconds] = taskTime || [0, 0, 0]

    const withZero = number => number < 10 ? `0${number}` : `${number}`

    if (hours === 0 && minutes == 0) {
      return `${seconds} sec`
    } else if (hours === 0) {
      return `${withZero(minutes)} : ${withZero(seconds)} min`
    } else {
      return `${withZero(hours)} : ${withZero(minutes)} : ${withZero(seconds)} hrs`
    }

  }

  static getStringValue2 = (taskTime) => {
      
      const [hours, minutes, seconds] = taskTime || [0, 0, 0]
    
      const withZero = number => number < 10 ? `0${number}` : `${number}`

      if (hours === 0) {
        return `${hours}:${withZero(minutes)}:${withZero(seconds)}`
      } else {
        return `${withZero(hours)}:${withZero(minutes)}:${withZero(seconds)}`
      }
  }
}

export default Timer