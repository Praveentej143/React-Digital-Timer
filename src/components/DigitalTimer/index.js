// Write your code here
import {Component} from 'react'
import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedSeconds: 0,
  timerLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimerLimitInMinutes = () => {
    const {timerLimitInMinutes} = this.state
    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncreaseTimerLimitInMinutes = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  renderTimerLimitController = () => {
    const {timerLimitInMinutes, timeElapsedSeconds} = this.state
    const isButtonsDisabled = timeElapsedSeconds > 0

    return (
      <div className="limit-controllers-container">
        <p className="heading">Set Timer limit</p>
        <div className="btn-controllers">
          <button
            type="button"
            className="limit-ctrl-btn"
            disabled={isButtonsDisabled}
            onClick={this.onDecreaseTimerLimitInMinutes}
          >
            -
          </button>
          <div className="limit-value-cont">
            <p className="limit-value">{timerLimitInMinutes}</p>
          </div>
          <button
            type="button"
            className="limit-ctrl-btn"
            disabled={isButtonsDisabled}
            onClick={this.onIncreaseTimerLimitInMinutes}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedSeconds} = this.state
    const isTimerCompleted = timeElapsedSeconds === timerLimitInMinutes * 60
    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedSeconds: prevState.timeElapsedSeconds + 1,
      }))
    }
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  onStartOrPauseTimer = () => {
    const {isTimerRunning, timeElapsedSeconds, timerLimitInMinutes} = this.state
    const isTimerCompleted = timeElapsedSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-controller-container">
        <button
          className="timer-ctrl-btn"
          type="button"
          onClick={this.onStartOrPauseTimer}
        >
          <img
            src={startOrPauseImgUrl}
            alt={startOrPauseAltText}
            className="ctrl-btn-img"
          />
          <p className="timer-ctrl-text">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          className="reset-ctrl-btn"
          type="button"
          onClick={this.onResetTimer}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="reset-btn-img"
          />
          <p className="reset-ctrl-btn-text">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeElapsedSeconds, timerLimitInMinutes} = this.state
    const totalRemainingSeconds = timerLimitInMinutes * 60 - timeElapsedSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'
    return (
      <>
        <div className="app-container">
          <div className="container">
            <h1 className="heading">Digital Timer</h1>
            <div className="timer-controllers-container">
              <div className="timer-bg-container">
                <div className="timer-cont">
                  <h1 className="timer">
                    {this.getElapsedSecondsInTimeFormat()}
                  </h1>
                  <p className="status">{labelText}</p>
                </div>
              </div>
              <div className="controllers-container">
                {this.renderTimerController()}
                {this.renderTimerLimitController()}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default DigitalTimer
