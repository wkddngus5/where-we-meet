import React, { Component } from 'react';

import historyImg from './baseline-history-24px.svg';
import './History.css';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {...props};
  }

  render() {
    const historyList = this.state.historyList.map((history, i) => {
      const name = history.name;
      return (
        <li className="history" key={i} onClick={this.state.selectHistory}>{name}</li>
      );
    }).reverse();

    return (
      <div className="history-zone">
        <img className="history-btn" src={historyImg} onClick={this.state.onClick}/>
        <ul className="history-list">
          {historyList}
        </ul>
      </div>
    )
  }
}

export default History;