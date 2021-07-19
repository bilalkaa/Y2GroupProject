import React, { Component } from 'react'

import { Table } from 'antd';

export default class PairTable extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {columnPair : props.columns , data :[] }
  }

  componentWillReceiveProps() {
    console.log("@@",this.props)
    this.setState = {columnPair : this.props.columns, data : this.props.dataSource}
  }
  
  render() {
    console.log("@@@",this.props)
    return (
      <Table columns={this.props.columns} dataSource={this.props.dataSource} bordered title={() => 'Mentoring Pairs'}/>
    )
  }

}
