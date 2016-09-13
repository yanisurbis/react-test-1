

class Timer {
  static start = (component) => {
    const tick = () => {

      let [hours, minutes, seconds] = component.state.taskTime
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
    // check on timer
    
    clearInterval(component.timer)
  }

  static getStringValue1 = () => {

  }

  static getStringValue2 = () => {

  }
}

export default Timer