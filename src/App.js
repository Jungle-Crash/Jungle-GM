import React, { Component } from 'react';

import Stage from './components/Stage'
import { Layout, Icon } from 'antd';

import 'antd/dist/antd.css';
import './css/App.css';

const { Header, Footer, Content } = Layout;

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ws: {},
      visible: true,
      token: "",
      playerLimit: 0,
      playersConnected: 0,
    }
  }

  componentDidMount() {
    const ws = new WebSocket("ws://localhost:3001")

    ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data)
      const data = msg.data
      console.log(data)

      switch (msg.type) {
        case 'login confirmed':
          this.setState({
            playerLimit: data.playerLimit,
            token: data.token,
            visible: false
          })
          break
        case 'waiting':
          this.setState({ playersConnected: data.playersConnected })
        case 'items':
          this.setState({ items: data })
      }
    });

    this.setState({ ws })
  }

  sendWsMsg = (type, data) => {
    const obj = { source: "GM", type, data }

    if (type !== 'login') {
      obj['token'] = this.state.token
    }

    this.state.ws.send(JSON.stringify(obj))
  }

  render() {
    return (
      <div className="App" style={{ minHeight: "100vh" }}>
        <Header theme="light">
          Jungle Master
        </Header>
        <Content style={{ maxHeight: "93vh", minHeight: "93vh", height: "93vh" }}>
          <Stage
            sendWsMsg={this.sendWsMsg}
            playerLimit={this.state.playerLimit}
            playersConnected={this.state.playersConnected}
            items={this.state.items}
          />
        </Content>

        <Footer >
          Developed by DaveOuds.Dev
          <Icon style={{ float: 'right' }} type="setting" />
        </Footer>

      </div>
    );
  }
}
