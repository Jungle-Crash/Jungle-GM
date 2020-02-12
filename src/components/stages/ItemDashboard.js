import React, { Component } from 'react';
import _ from 'lodash'
export default class ItemDashboard extends Component {

  renderItems = () => {
    return _.map(this.props.items, (amount, item) => {

      return (
      <p>
        {item} : {amount}
      </p>
      )
    })
  }

  render() {
    console.log(this.props.items)
    return (
    <div>
      <h1>Item Dashboard!</h1>
      {this.renderItems()}
    </div>
    )
  }
}