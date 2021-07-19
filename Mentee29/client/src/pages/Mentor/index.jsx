import React, { Component } from 'react';
import { getCookie, authenticateSuccess } from '../../utils/Session';
import { Table, Tag, Space, Button, PageHeader, Descriptions } from 'antd';
import PairTable from './PairTable';
import ReqTable from './ReqTable';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

let columnPair;
let columnRequests;

@inject('appStore')
@observer
class Mentor extends Component {
  constructor() {
    super();
    this.state = { user: getCookie().user };
    if (Object.getOwnPropertyNames(this.state.user.mentor).length === 0) {
      this.state.hasMentorProfile = false;
    }
    this.state.hasMentorProfile === false && window.history.back();
  }

  componentDidMount() {
    this.initDataPair();
    this.initDataReq();
  }

  onClickAccept = (id, e) => {
    let data = {
      mentor: this.state.user,
      menteeId: id,
      response: 'accept',
    };
    fetch(`http://localhost:5000/users/respondtomentee`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => {
        data.isAuthenticated = true;
        this.setState({ user: data });
        this.initDataPair();
        this.initDataReq();
        this.props.appStore.toggleLogin(true, data);
        console.log(getCookie().user);
      });
  };

  onClickDecline = (id, e) => {
    let data = {
      mentor: this.state.user,
      menteeId: id,
      response: 'decline',
    };
    fetch(`http://localhost:5000/users/respondtomentee`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => {
        data.isAuthenticated = true;
        console.log(getCookie().user);
        this.setState({ user: data });
        console.log(getCookie().user);
        this.initDataPair();
        console.log(getCookie().user);
        this.initDataReq();
        console.log(getCookie().user);
        this.props.appStore.toggleLogin(true, data);
        console.log(getCookie().user);
      });
  };

  initDataPair = (e) => {
    let data = this.state.user;
    fetch(`http://localhost:5000/users/viewmentees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => {
        let dataPair = new Array();
        if (data.length !== 0) {
          for (var i = 0; i < data.length; i++) {
            dataPair[i] = {
              key: data[i].id,
              bio: data[i].bio,
              name: data[i].name,
              desiredSkill: data[i].mentee.desiredSkills,
              emailAddress: data[i].email,
              jobRole: [data[i].jobRole],
            };
          }
        }
        this.setState({ dataPair: dataPair });
      });
  };

  initDataReq = (e) => {
    let data = this.state.user;
    fetch(`http://localhost:5000/users/viewmentorrequests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => {
        let dataRequest = new Array();
        if (data.length !== 0) {
          for (var i = 0; i < data.length; i++) {
            dataRequest[i] = {
              key: data[i].id,
              name: data[i].name,
              desiredSkill: data[i].mentee.desiredSkills,
              emailAddress: data[i].email,
              jobRole: [data[i].jobRole],
            };
          }
        }
        this.setState({ dataRequest: dataRequest });
      });
  };

  render() {
    console.log('MentorPage', this.state);

    columnPair = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
        align: 'center',
      },
      {
        title: 'Email Address',
        dataIndex: 'emailAddress',
        key: 'emailAddress',
        ellipsis: true,
        align: 'center',
      },
      {
        title: 'Desired Skills',
        key: 'desiredSkill',
        dataIndex: 'desiredSkill',
        align: 'center',
        render: (tags) => (
          <>
            {tags.map((tag) => {
              let color = tag.length > 9 ? 'geekblue' : 'gold';
              if (tag === 'Leadership') {
                color = 'volcano';
              }
              if (tag === 'Communication') {
                color = 'cyan';
              }
              if (tag === 'Motivation') {
                color = 'purple';
              }
              if (tag === 'Problem Solving') {
                color = 'lime';
              }
              if (tag === 'Teamwork') {
                color = 'blue';
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
      {
        title: 'Bio',
        key: 'bio',
        dataIndex: 'bio',
        align: 'center',
        ellipsis: true,
      },
      {
        title: 'Action',
        key: 'action',
        align: 'center',
        ellipsis: true,
        render: (text, record) => (
          <Space size='middle'>
            <Button type='link'> <a href={"mailto:" + record.emailAddress}>  Email {record.name} </a> </Button>
            {/* <Button type = "link" danger>Reject</Button> */}
          </Space>
        ),
      },
    ];

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
        title: 'Desired Skills',
        key: 'desiredSkill',
        dataIndex: 'desiredSkill',
        align: 'center',
        render: (tags) => (
          <>
            {tags.map((tag) => {
              let color = tag.length > 9 ? 'geekblue' : 'gold';
              if (tag === 'Leadership') {
                color = 'volcano';
              }
              if (tag === 'Communication') {
                color = 'cyan';
              }
              if (tag === 'Motivation') {
                color = 'purple';
              }
              if (tag === 'Problem Solving') {
                color = 'orange';
              }
              if (tag === 'Teamwork') {
                color = 'blue';
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
      {
        title: 'Action',
        key: 'action',
        align: 'center',
        ellipsis: true,
        render: (text, record) => (
          <Space size='middle'>
            <Button
              onClick={this.onClickAccept.bind(this, record.key)}
              type='primary'
              shape='round'
              size='small'
              icon={<CheckOutlined />}
            >
              Accept
            </Button>
            <Button
              onClick={this.onClickDecline.bind(this, record.key)}
              type='primary'
              shape='round'
              size='small'
              icon={<CloseOutlined />}
              danger
            >
              Reject
            </Button>
          </Space>
        ),
      },
    ];

    let { user } = this.state;
    return (
      <div>
        <div className='site-page-header-ghost-wrapper'>
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title='Mentor Page'
            extra={[
              <Button key='1' type='primary'>
                Edit Profile
              </Button>,
            ]}
          >
            <Descriptions size='small' column={3}>
              <Descriptions.Item label='Name'>{user.name}</Descriptions.Item>
              <Descriptions.Item label='Email'>{user.email}</Descriptions.Item>
              <Descriptions.Item label='Skills'>
                {user.mentor.primarySkills[0]}, {user.mentor.primarySkills[1]},{' '}
                {user.mentor.primarySkills[2]}
              </Descriptions.Item>
              <Descriptions.Item label='Job Role'>
                {user.jobRole}
              </Descriptions.Item>
              <Descriptions.Item label='Number of pairs'>
                {user.mentor.mentoringPair.length}
              </Descriptions.Item>
              <Descriptions.Item label='Number of requests'>
                {user.mentor.requests.length}
              </Descriptions.Item>
            </Descriptions>
          </PageHeader>
        </div>

        <PairTable columns={columnPair} dataSource={this.state.dataPair} />
        <ReqTable
          columns={columnRequests}
          dataSource={this.state.dataRequest}
        />
        {/* <Table columns={columnPair} dataSource={this.state.dataPair} bordered title={() => 'Mentoring Pairs'}/>
            <Table columns={columnRequests} dataSource={this.state.dataRequest} bordered title={() => 'Pairing Requests'}/> */}
      </div>
    );
  }
}

export default withRouter(Mentor);
