import React, { Component } from 'react'

import styles from '../../css/App.css'
import { getWinner } from '../core/core'

export default class MainPageComponent extends Component {

  constructor(props) {
    super(props)
    this.state = { data : props.data }
    this.getResults = this.getResults.bind(this)
  }

  static getDerivedStateFromProps(props, state) {
    if(props.data == null) {
      props.loadData();
    }
    return null;
  }

  getResults() {
    const { data } = this.state
    const results = data.map((game, index) => {
      const win = getWinner(game['playerA'], game['playerB'])
      return (
        <div key={index}>
          Game {index} - Player A Wins : {win ? 'true' : 'false' } Correct - { `${game['playerAWins']}`}
        </div>
      )
    })
    return results
  }

  render() {
    const {data} = this.state;
    if(data == null) {
      return (
        <div>Loading data....</div>
      )
    }
    return (
      <div>
      { this.getResults()}
      </div>
    )
  }
}
