import React, { Component } from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import CardComp from './components/CardComp';
import Table2 from 'react-bootstrap/Table';
import { getCookie } from '../../utils/Session';
import { withRouter } from 'react-router';
import { Table, Button, Tag, PageHeader, Descriptions } from 'antd';

let columnRequests;
class Mentee extends Component {
  constructor() {
    super();
    const { user } = getCookie();
    user.allRequestedMentors = [];
    this.state = user;
    this.fetchMentorDetails(user);
    this.fetchMenteeRequests(user);
    if (Object.getOwnPropertyNames(this.state.mentee).length === 0) {
      this.state.hasMenteeProfile = false;
    }
    this.state.hasMenteeProfile === false && window.history.back();
  }

  componentWillReceiveProps() {
    const { user } = getCookie();
    this.setState(user);
    this.fetchMentorDetails(user);
    this.fetchMenteeRequests(user);
  }

  fetchMenteeRequests = (e) => {
    const data = e;
    console.log(e);
    fetch(`http://localhost:5000/users/viewrequestedmentors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        let dataRequest = new Array();
        if (data.length !== 0) {
          for (var i = 0; i < data.length; i++) {
            dataRequest[i] = {
              key: i,
              name: data[i].name,
              primarySkills: data[i].mentor.primarySkills,
              emailAddress: data[i].email,
              jobRole: [data[i].jobRole],
            };
          }
        }
        console.log(dataRequest);
        this.setState({ reqedMentors: data, allRequestedMentors: dataRequest });
      });
  };

  fetchMentorDetails = (e) => {
    const data = e;
    console.log(e);
    fetch(`http://localhost:5000/users/viewmentors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ results: data });
        console.log(data);
      });
  };
  render() {
    console.log('MenteePage', this.state);

    columnRequests = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Email Address',
        dataIndex: 'emailAddress',
        key: 'emailAddress',
        align: 'center',
        ellipsis: true,
      },
      {
        title: 'Job Role',
        key: 'jobRole',
        dataIndex: 'jobRole',
        align: 'center',
        ellipsis: true,
        render: (tags) => (
          <>
            {tags.map((tag) => {
              let color = tag.length > 5 ? 'magenta' : 'green';
              if (tag === '1') {
                color = 'volcano';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
      },
    ];

    const hasPair = this.state.mentee.mentoringPair[0];
    return (
      <div>
        <div className='site-page-header-ghost-wrapper'>
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title='Mentee Page'
            extra={[
              <Button key='1' type='primary'>
                Edit Profile
              </Button>,
            ]}
          >
            <Descriptions size='small' column={2}>
              <Descriptions.Item label='ID'>{this.state.id}</Descriptions.Item>

              <Descriptions.Item label='Name'>
                {this.state.name}
              </Descriptions.Item>

              <Descriptions.Item label='Desired Skills'>
                {this.state.mentee.desiredSkills[0]},{' '}
                {this.state.mentee.desiredSkills[1]},{' '}
                {this.state.mentee.desiredSkills[2]}
              </Descriptions.Item>

              <Descriptions.Item label='Email'>
                {this.state.email}
              </Descriptions.Item>

              <Descriptions.Item label='Job Role'>
                {this.state.jobRole}
              </Descriptions.Item>
            </Descriptions>
          </PageHeader>
        </div>

        <br />
        <br />
        <br />

        <div>
          {hasPair != null ? (
            <div>
              <h3> Paired Mentor </h3>

              <Table2 bordered hover striped>
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td colSpan='3'>
                      {' '}
                      {this.state.results != undefined &&
                        this.state.results[0].name}{' '}
                    </td>
                  </tr>
                  <tr>
                    <th>Job Role</th>
                    <td colSpan='3'>
                      {' '}
                      {this.state.results != undefined &&
                        this.state.results[0].jobRole}{' '}
                    </td>
                  </tr>
                  <tr>
                    <th>Contact Information</th>
                    <td colSpan='3'> 
                    <a href={"mailto:"+ (this.state.results != undefined &&
                        this.state.results[0].email)}>
                      {' '}
                      {this.state.results != undefined &&
                        this.state.results[0].email}{' '}
                        </a>
                    </td>
                  </tr>
                  <tr>
                    <th> Skills </th>
                    <td>
                      {' '}
                      {this.state.results != undefined &&
                        this.state.results[0].mentor.primarySkills[0]}{' '}
                    </td>
                    <td>
                      {' '}
                      {this.state.results != undefined &&
                        this.state.results[0].mentor.primarySkills[1]}{' '}
                    </td>
                    <td>
                      {' '}
                      {this.state.results != undefined &&
                        this.state.results[0].mentor.primarySkills[2]}{' '}
                    </td>
                  </tr>
                </tbody>
              </Table2>
            </div>
          ) : (
            <div>
              <div>
                <Table
                  columns={columnRequests}
                  dataSource={this.state.allRequestedMentors}
                  bordered
                  title={() => 'Pairing Requests Sent'}
                />
              </div>
            </div>
          )}
        </div>

        <br />
        <br />

        <CardDeck style={{ display: 'flex', flexDirection: 'row' }}>
          <CardComp
            src='../../../images/john.jpeg'
            btnTitle='Edit Profile'
            text='Edit information on your profile such as your primary goal or job role here.'
            path='#'
            backgroundC='light'
          />

          <CardComp
            src='../../../images/mentoring.jpg'
            btnTitle='Search for Mentor'
            text='Click the button below to go to the search for a mentor page.'
            path='/user/search'
            backgroundC='success'
          />
        </CardDeck>

        <CardDeck style={{ display: 'flex', flexDirection: 'row' }}>
          <CardComp
            src='../../../images/schedule.jpg'
            btnTitle='View Meeting Schedule'
            text='View your meeting schedule here.'
            path='#'
            backgroundC='light'
          />

          <CardComp
            src='../../../images/meeting.jpeg'
            btnTitle='View Meeting Requests'
            text='View your meeting requests here.'
            path='#'
            backgroundC='light'
          />
        </CardDeck>
      </div>
    );
  }
}

export default withRouter(Mentee);
