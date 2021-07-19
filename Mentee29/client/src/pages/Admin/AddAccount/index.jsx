import React, { Component } from 'react';
import { withRouter } from 'react-router';
// import { Form, Input, Button, Checkbox } from 'antd';
class AddAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      jobRole: '',
      password: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = async (e) => {
    const { name, email, jobRole, password } = this.state;
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      jobRole: jobRole,
      password: password,
    };
    let response = await fetch(`http://localhost:5000/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    let result = await response.json();
    console.log(result);
    this.setState({ name: '', email: '', jobRole: '', password: '' });
    this.props.history.goBack();
  };

  onChange = (e) => {
    const { name } = e.target;
    this.setState({ [name]: e.target.value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label for='InputEmail'>Name</label>
            <input
              className='form-control'
              id='InputName1'
              name='name'
              value={this.state.name}
              placeholder='Enter name'
              onChange={this.onChange}
              required
            />
          </div>
          <div className='form-group'>
            <label for='InputEmail'>Email address</label>
            <input
              type='email'
              className='form-control'
              id='InputEmail1'
              name='email'
              value={this.state.email}
              aria-describedby='emailHelp'
              placeholder='Enter email'
              onChange={this.onChange}
              required
            />
          </div>
          <div className='form-group'>
            <label for='InputJobRole'>Job Role</label>
            <input
              class='form-control'
              id='InputJobRole1'
              name='jobRole'
              value={this.state.jobRole}
              placeholder='Enter Job Role'
              onChange={this.onChange}
              required
            />
          </div>
          <div className='form-group'>
            <label for='InputPassword'>Password</label>
            <input
              type='password'
              className='form-control'
              id='exampleInputPassword1'
              name='password'
              value={this.state.password}
              placeholder='Password'
              onChange={this.onChange}
              required
            />
          </div>
          <button type='submit' class='btn btn-primary'>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(AddAccount);
