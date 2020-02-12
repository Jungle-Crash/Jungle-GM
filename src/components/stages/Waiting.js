import React, { Component } from 'react';

import { Icon, Button } from 'antd';

export default class Waiting extends Component {

  render() {
    const {playersConnected, playerLimit} = this.props

    return (
      <div>
        <Icon type="loading" />
        Waiting for users... 
        <p>
          {playersConnected}/{playerLimit}
        </p>
        <Button 
          onClick={this.props.startItems} 
          disabled={playersConnected !== playerLimit}
        >
          Start Game
        </Button>
      </div>
    );
  }
}