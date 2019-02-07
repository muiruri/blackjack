import React, { Component } from 'react'
import { connect } from 'react-redux'

import MainPageComponent from './MainPageComponent'

import { loadData } from '../actions/'

class MainPageContainer extends Component {

  render() {
    return <MainPageComponent {...this.props}/>
  }
}

const mapStateToProps = state => {
  return {
    data : state.reducer.data
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadData: () => {
      dispatch(loadData())
    },
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPageContainer)
