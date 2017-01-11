import React from 'react'
import ReactDOM from 'react-dom'

import Slider from 'src/react-ui-slider'

export default class Container extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)

    this.state = {
      value: 0
    }
  }

  handleChange (value) {
    this.setState({
      value
    })
  }

  render () {
    return (
      <div>
        <Slider
          wrapperStyle={{
            width: '400px',
            background: 'rgba(200, 200, 200, 0.4)',
            borderRadius: '40px',
            padding: '10px',
            boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.5)',
            marginBottom: '2rem'
          }}
          eventStyle={{

          }}
          handleStyle={{
            background: 'purple',
            borderRadius: '50%',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
          }}
          trackStyle={{

          }}
          handleWidth={40}
          handleHeight={40}
          handleChange={this.handleChange}
        />
        <input type="text" value={this.state.value} />
      </div>
    )
  }
}