import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import DrawerForm from '../DrawerForm'
import {getCookie , isAuthenticated} from '../../utils/Session'
export default class MenuAddProfile extends Component {
	state = {hasMenteeProfile : true , hasMentorProfile :true};

	componentWillMount() {
		const {user} = getCookie();
		console.log(user)
		console.log("@",isAuthenticated())
		this.setState(user)
		if (Object.getOwnPropertyNames(user.mentee).length === 0)
		{
			this.setState({hasMenteeProfile : false});
		}
		if (Object.getOwnPropertyNames(user.mentor).length === 0)
		{
			this.setState({hasMentorProfile : false});
		}
	}

	handleClick = e => {
		console.log('click ', e);
	};

	render() {
		const {state} = this
		console.log(state)
		return (
		<Menu onClick={this.handleClick} mode="horizontal">
			<Menu.Item key="Mentee" disabled = {!this.state.hasMenteeProfile} icon={<UserOutlined />}>
				<NavLink to={{pathname:'/user/mentee',state:{state}}} >Mentee Profile</NavLink>
			</Menu.Item>
			<Menu.Item key="Mentor" disabled = {!this.state.hasMentorProfile} icon={<UserOutlined />}>
				<NavLink to={{pathname:'/user/mentor',state:{state}}}>Mentor Profile</NavLink>
			</Menu.Item>
			<DrawerForm dataPlaceholder={this.state}/>
		</Menu>
		)
	}
}