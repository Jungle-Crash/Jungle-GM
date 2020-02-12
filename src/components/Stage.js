import React, { Component } from 'react';

import Waiting from './stages/Waiting'
import ItemDashboard from './stages/ItemDashboard'
import LevelDashboard from './stages/levelDashboard'
import LoginForm from './forms/loginForm'


export default class Stage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      stage: 'login',
    }
  }

  changeStage = (stage) => {
    this.props.sendWsMsg('stageChange', stage)
    this.setState({stage: stage.stage})
  }

  handleLogin = (type, data) => {
    this.setState({stage: 'waitingForUsers'})
    this.props.sendWsMsg(type, data)
  }

  render() {
    switch(this.state.stage){
      case 'login':
        return <LoginForm handleLogin={this.handleLogin} />

      case 'waitingForUsers':
        return <Waiting 
          startItems={() => this.changeStage({stage: "items"})} 
          playerLimit={this.props.playerLimit}
          playersConnected={this.props.playersConnected}
        />

      case 'items':  
        return <ItemDashboard
          startJungle={() => this.changeStage({stage: "jungle"})} 
          items={this.props.items}
        />

      case 'jungle':  
        return <LevelDashboard endGame={() => this.changeStage({stage: "endGame"})} />
      
      case 'endGame':  
        return <h1>levels</h1>//<EndGame/>
    }
  }
}