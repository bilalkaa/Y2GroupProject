import React, { Component } from 'react';
import { Form, Input, Button, Select , message } from 'antd';
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router';

const layout = {
  labelCol: {
    span: 9,
  },
  wrapperCol: {
    span: 6,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 10,
    span: 4,
  },
};

@inject('appStore') @observer
class LoginForm extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      mentee: {},
      mentor: {},
      isAuthenticated : false
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = async (values) => {
    const data = {
      email: values.email,
      password: values.password,
    };
    let response = await fetch(`http://localhost:5000/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    var result
    try {
      result = await response.json();
    } catch(e) {
      message.error('Wrong Email or Password');
      this.onReset()
      return
    }
    // console.log(result);
    this.setState({isAuthenticated : true})
    this.setState(result)
    this.props.appStore.toggleLogin(true, this.state)
    result.accountType === 'user'
      ? this.props.history.push( {pathname:'/user/' , state : this.state})
      : this.props.history.push('/admin');
  }

  onReset = () => {
    this.formRef.current.resetFields();
  };

  render() {
    return (
      <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onSubmit}>
        <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                      required: true,
                      message: 'Please input your email!',
                      },
                    ]}
                  >
                  <Input 
                    type="email"
                    onChange={this.onChange} 
                  />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                    ]}
                  >
                  <Input
                    type="password"
                    onChange={this.onChange} 
                  />
                </Form.Item>
                <Form.Item
                  {...tailLayout}
                >
                  <Button type="primary" htmlType="submit" block>
                    Submit
                  </Button>
                </Form.Item>
      </Form>
    );
  }
}

export default withRouter(LoginForm)
