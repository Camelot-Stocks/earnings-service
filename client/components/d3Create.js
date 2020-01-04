import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import chart from './createChart';

const ChartArea = styled.div`
  padding: 10px 10px 74px 85px;
`

const formatData = (data) => {
  let formatted = data.map((data, idx) => {
    return {
      name: `${data.year} Q${data.quarter}`,
      x: `${data.year} Q${data.quarter}`,
      y: data.estimated,
      type: "estimated"
    }
  })
  data.forEach((data, idx) => {
    formatted.push({
      name: `${data.year} Q${data.quarter}`,
      x: `${data.year} Q${data.quarter}`,
      y: data.actual,
      type: "actual"
    })
  })
  return formatted
}

const D3Create = (props) => {
  let { data } = props
  let formatted = formatData(data)
  chart(formatted)
  return (
    <ChartArea>
      <div id="earnings-graph" />
    </ChartArea>
  )
}


export default D3Create;
