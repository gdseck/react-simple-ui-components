import React from 'react'

import style from './style.css'

export default class Slider extends React.Component {
  constructor () {
    super()
    this.state = {
      dragging: false,
      x: 0
    }
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleDrag = this.handleDrag.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
  }

  handleMouseDown (e) {
    const event = Object.assign({}, e)
    this.setState(() => {
      const initialPos = event.clientX - event.target.getBoundingClientRect().left

      return {
        dragging: true,
        x: initialPos
      }
    })
  }

  handleMouseUp (e) {
    console.log('handleMouseUp')
    this.setState(() => {
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

    const currentPos = e.clientX - e.target.getBoundingClientRect().left
    if (currentPos > 0 && currentPos < 570) {
      this.setState({x: currentPos})
    }
  }

  render () {
    return (
      <div className='slider-container'>
        <div className='slider-wrapper'
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleDrag}
        >
          <div
            className='handle'
            style={{transform: `translate(${this.state.x}px, -50%)`}}
            ref={(input) => { this._input = input }}
            onMouseMove={() => true}
          ></div>
          <div className='slider'></div>
        </div>
      </div>
    )
  }
}
