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

  onTaskDelete = () => {
    const {
      taskId,

      deleteTask,
    }  = this.props

    deleteTask(taskId)
  }

  onTaskResume = () => {
    const {
      taskName,
      taskPrice,

      resumeTask
    } = this.props
    console.log(`task price HERE is ${taskPrice}`)
    resumeTask(taskName, taskPrice)
  }
  
  render() {
    // task properties
    const { taskTime, taskName, taskPrice, taskId } = this.props

    // time & money representation methods
    const { renderTime, renderGain, renderPrice } = this.props

    return (
      <div className="row mt-15">
        <div className="col">
          { (this.state.editingTaskName) ?
            <form className="form">
              <input
                // ref={(input) => {
                //   console.log("HI")
                //   this.taskName1 = input
                // }}
                onChange={this.onTaskNameChange.bind(this)}
                onBlur={this.onTaskNameBlur}
                onKeyPress={this.onTaskNameKeyPress}
                ref={(input) => this.state.editingTaskName && this.state.focus ? input.focus() : null}
                className="input"
                type="text"
                placeholder="Task name"
                value={this.state.taskName}
              />
            </form>
            :
            <div className=""
                 onClick={this.onTaskNameClick}
            >
              {taskName}
            </div>
          }
          <div className="">
            <div className="">
              <div className="">{renderPrice(taskPrice)}</div>
              <div className="">{renderTime(taskTime)}</div>
              <div className="">{renderGain(taskTime, taskPrice)}</div>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.onTaskResume}
          >
            Resume
          </button>
          <button
            type="click"
            className="btn btn-danger"
            onClick = {this.onTaskDelete}
          >
            Delete
          </button>
        </div>
      </div>
    )
  }
}

export default Task

Task.propTypes = {
  taskTime:       React.PropTypes.number,
  taskName:       React.PropTypes.string,
  taskPrice:      React.PropTypes.string,
  taskId    :     React.PropTypes.number,
  renderPrice:    React.PropTypes.func,
  renderTime:     React.PropTypes.func,
  renderGain:     React.PropTypes.func,
  changeTaskName: React.PropTypes.func
}