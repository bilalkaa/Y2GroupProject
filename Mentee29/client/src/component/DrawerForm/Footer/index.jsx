import { Button } from 'antd';
import React from 'react'


export default class Footer extends React.Component {
  handleSubmitForm() {
    this.props.handleSubmitForm()
  }
  render() {
    return <div>
      <Button>Cancel</Button>
      <Button type="primary" onClick={this.props.handleSubmitForm} >Submit</Button>
    </div>
  }
}