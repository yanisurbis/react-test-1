import React, { Component } from 'react'
import { connect } from 'react-redux'


class Task extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editingTaskName: false,
      focus: true,
    }
  }

  onTaskNameClick = () => {
    // debugger;
    // add taskName to the state to handle input change
    // TODO - find out, do we need add editingTaskName to the state?
    this.setState({
      taskName: this.props.taskName,
      editingTaskName: true,
    })

    document.addEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = (e) => {
    if (e.keyCode === 27) {
      this.setState({
        editingTaskName: false,
        focus: true,
      })

      document.removeEventListener('keydown', this.handleKeyPress);
    }
  }

  onTaskNameChange = (event) => {
    //debugger;
    this.setState({
      taskName: event.target.value,
      focus: false,
    })
  }

  onTaskNameBlur = () => {

    this.setState({
      editingTaskName: false,
      focus: true,
    })

    if (this.props.taskName != this.state.taskName) {
      this.props.changeTaskName(this.props.taskId, this.state.taskName)
      document.removeEventListener('keydown', this.handleKeyPress);
    }
  }

  onTaskNameKeyPress = (event) => {
    let { charCode } = event
    debugger;

    if (charCode == 13) {
      this.setState({
        editingTaskName: false,
        focus: true,
      })

      if (this.props.taskName != this.state.taskName) {
        this.props.changeTaskName(this.props.taskId, this.state.taskName)
        document.removeEventListener('keydown', this.handleKeyPress);
      }
    }

  }
  
  render() {
    let { taskTime, taskName, taskPrice } = this.props

    return (
      <div className="">
        { (this.state.editingTaskName) ?
          <input
            // ref={(input) => {
            //   console.log("HI")
            //   this.taskName1 = input
            // }}
            onChange={this.onTaskNameChange.bind(this)}
            onBlur={this.onTaskNameBlur}
            onKeyPress={this.onTaskNameKeyPress}
            ref={(input) => this.state.editingTaskName && this.state.focus ? input.focus() : null}
            className=""
            type="text"
            placeholder="Task name"
            value={this.state.taskName}
          />
        :
          <div className=""
            onClick={this.onTaskNameClick}
          >
            {taskName}
          </div>
        }
        <div className="">
          <div className="">
            <div className="">{this.props.taskPrice} rub/hr</div>
            <div className="">{this.props.renderTime(taskTime)}</div>
            <div className="">{this.props.renderGain(taskTime, taskPrice)} rub</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Task