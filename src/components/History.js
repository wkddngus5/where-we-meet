import React, { Component } from 'react';

import historyImg from './baseline-history-24px.svg';
import './History.css';

class History extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { historyList , selectHistory, onClick } = this.props;

    const historyListComponents = historyList.map((history, i) => {
      const name = history.name;
      return (
        <li className="history" key={i} onClick={selectHistory}>{name}</li>
      );
    }).reverse();

    return (
      <div className="history-zone">
        <img className="history-btn" src={historyImg} onClick={onClick}/>
        <ul className="history-list">
          {historyListComponents}
        </ul>
      </div>
    )
  }
}

export default History;