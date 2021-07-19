import React, { Component } from 'react';
import { Table } from 'antd';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';

@inject('appStore')
@observer
class ReqTable extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { columnPair: props.columns, data: [] };
  }

  componentWillReceiveProps() {
    this.setState = {
      columnPair: this.props.columns,
      data: this.props.dataSource,
    };
  }

  render() {
    return (
      <Table
        columns={this.props.columns}
        dataSource={this.props.dataSource}
        bordered
        title={() => 'Mentoring Requests'}
      />
    );
  }
}

export default withRouter(ReqTable);
