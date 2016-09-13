import React, { Component } from 'react';

import TimeTracker from './time_tracker'

export default class App extends Component {
  render() {
    return (
      <div className="flex-center">
        <div className="container">
          <TimeTracker />
        </div>
      </div>
    )
  }
}
