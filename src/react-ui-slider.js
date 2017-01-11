import React from 'react'

import style from './style.css'

export default class Slider extends React.Component {
  constructor () {
    super()
    this.state = {
      dragging: false,
      x: 0,
      handle: {
        width: 0
      }
    }

    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleDrag = this.handleDrag.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
  }

  handleMouseDown (e) {
    const event = Object.assign({}, e)
    this.setState(({slider, track}) => {
      const newPos = event.clientX - slider.left

      let initialPos = Math.max(event.clientX - track.left, 0)

      if(newPos < 0) {
        initialPos = 0
      }

      else if(newPos > this.state.track.width) {
        initialPos = this.state.track.width
      }

      return {
        dragging: true,
        pointer: 'all',
        x: initialPos
      }
    })
  }

  handleMouseUp (e) {
    this.setState((prevState, props) => {
      const value = Math.ceil(prevState.x / prevState.track.width * 100)
      props.handleChange(value)

      return {
        dragging: false
      }
    })
  }

  handleDrag (e) {
    e.preventDefault()
    if (!this.state.dragging) {
      return
    }

    const newPos = e.clientX - this.state.track.left
    this.setState((prevState, props) => {
      if(newPos < 0) {
        return {
          x: 0
        }
      }

      else if(newPos > this.state.track.width) {
        return {
          x: this.state.track.width
        }
      }

      return {
        x: newPos
      }
    }, () => {
      const value = Math.ceil(this.state.x / this.state.track.width * 100)
      this.props.handleChange(value)
    })


  }

  componentDidMount () {
    document.addEventListener('mousemove', this.handleDrag)
    document.addEventListener('mouseup', this.handleMouseUp)

    this.setState({
      slider: this._slider.getBoundingClientRect(),
      track: this._track.getBoundingClientRect(),
      handle: this._handle.getBoundingClientRect()
    })
  }

  componentWillUnmount () {
    document.removeEventListener('mousemove', this.handleDrag)
    document.removeEventListener('mouseup', this.handleMouseUp)
  }

  render () {
    const wrapperStyle = Object.assign({}, { position: 'relative' }, this.props.wrapperStyle)

    const handleStyle = Object.assign({}, this.props.handleStyle, {
      transform: `translateX(${this.state.x - this.state.handle.width / 2}px)`,
      pointerEvents: this.state.dragging ? 'none' : 'all',
      width: this.props.handleWidth ? this.props.handleWidth + 'px' : '20px',
      height: this.props.handleHeight ? this.props.handleHeight + 'px' : '20px'
    })

    const trackStyle = Object.assign({}, {
    }, this.props.trackStyle)

    const eventStyle = Object.assign({}, this.props.eventStyle, {
      padding: `0 ${this.props.handleWidth / 2}px`
    })

    return (
      <div className='slider-wrapper' style={wrapperStyle}>
        <div className='slider-events'
          style={eventStyle}
          onMouseDown={this.handleMouseDown}
          ref = {(slider) => this._slider = slider}
        >
          <div className='slider-track'
            style={trackStyle}
            ref = {(track) => this._track = track}
          >
            <div
              className='handle'
              style={handleStyle}
              ref = {(handle) => this._handle = handle}
            ></div>
            <div className='slider'></div>
          </div>
        </div>
      </div>
    )
  }
}

Slider.defaultProps = {
  wrapperStyle: {
    position: 'relative',
    width: '400px',
    height: '40px'
  },
  eventStyle: {},
  trackStyle: {},
  handleStyle: {}
}