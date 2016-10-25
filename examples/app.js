
import React from 'react'
import ReactDOM from 'react-dom'
import {LineChart} from '../'

class App extends React.Component {

  componentDidMount () {
    this.a = new LineChart({
      target: this.refs.a
    })
  }

  render () {
    return (
      <div>
        <svg ref='a' />
      </div>
    )
  }

}

ReactDOM.render(
  <App />,
  document.getElementById('react')
)
