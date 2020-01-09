import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Header, D3Create, Legend } from './index.js';

class Chart extends React.Component {
  constructor() {
    super()
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    const d = new Date();
    const totalMinutes = (d.getHours() * 60) + d.getMinutes();
    let background = '';
    if (totalMinutes < 360 || totalMinutes >= 900) {
      document.body.style.background = '#1b1b1d';
    } else {
      document.body.style.background = 'white';
    }
    fetch(`http://54.183.84.160:3006/earnings${window.location.search}`, {
      type: "GET",
    }).then((response) => {
      return response.json()
    }).then((data) => {
      console.log("got data")
      this.setState({
        data: data
      })
    })
    .catch((err) => {
      console.log('error with response')
      console.log(window.location.pathname)
    })

  }
  render(){
    return(
      <React.Fragment>
        <Header />
        <D3Create data={this.state.data} />
        <Legend />
      </React.Fragment>
    )
  }
}
export default Chart;
