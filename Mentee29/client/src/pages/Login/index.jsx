import React, { Component } from 'react';
import { Layout, Menu, message } from 'antd';
import Icon from '@ant-design/icons';
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router';
import {isAuthenticated} from '../../utils/Session'
import LoginForm from './LoginForm';
import  Logo from '../../component/Logo'
const { Header, Footer, Content } = Layout;

@inject('appStore') @observer
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mentee: {},
      mentor: {},
      isAuthenticated : false
    };
    this.onSubmit = this.onSubmit.bind(this);
  }


  componentDidMount () {
    if(isAuthenticated()){
      this.props.history.goBack()
    }
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

  render() {
    return (
        <Layout>
          <Header>
            <Icon component={Logo} className = "logo" />
          </Header>
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 600,
            }}
          >
            <div>
            <h1>Log in</h1>
                  <LoginForm/>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Mentee29 ©2021 Created by Group 29
          </Footer>
        </Layout>
    );
  }
}
export default withRouter(Login)