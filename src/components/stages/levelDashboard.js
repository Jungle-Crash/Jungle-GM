import React, { Component } from 'react';
import _ from 'lodash'

export default class LevelDashboard extends Component {
  render() {
    console.log(this.props.items)
    return (
    <div>
      <h1>Level Dashboard!</h1>
    </div>
    )
  }
}