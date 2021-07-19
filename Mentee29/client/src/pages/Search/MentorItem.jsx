import React, { Component } from 'react';
import { getCookie } from '../../utils/Session';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react'

@inject('appStore') @observer
class MentorItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: false,
    };
    this.onClick = this.onClick.bind(this);
  }
  componentWillMount() {
    const { user } = getCookie();
    this.setState({ user: user });
  }

    onClick = (e) => {
      e.preventDefault();
      console.log(this.state.user);
      const mentor = this.props;
      const data = {
        mentor,
        mentee: this.state.user,
      };
      fetch(`http://localhost:5000/users/requestmentor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then(resp => resp.json())
      .  then(result => {

        this.setState({ alert: true });
        result.isAuthenticated = true

        this.props.appStore.toggleLogin(true, result)
        console.log(getCookie().user)
        this.props.history.push( {pathname:'/user/mentee' , state : result})
      })
    };

  // the main render method for the search component
  render() {
    return (
      <div className='card bg-light'>
        <h4>Name: {this.props.mentor.name}</h4>
        <h4>Job Role: {this.props.mentor.jobRole}</h4>
        <h4>
          Skills: {this.props.mentor.mentor.primarySkills[0]},{' '}
          {this.props.mentor.mentor.primarySkills[1]},{' '}
          {this.props.mentor.mentor.primarySkills[2]}
        </h4>
        <h4>Bio: {this.props.mentor.bio}</h4>
        <div>
          <button onClick={this.onClick} className='btn btn-dark'>
            Request Mentor
          </button>
        </div>
        {this.state.alert === true && <div>Mentor Requested</div>}
      </div>
    );
  }
}

export default withRouter(MentorItem);
