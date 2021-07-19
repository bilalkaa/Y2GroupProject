import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Drawer, Button, Radio } from 'antd';
import { Route, Switch} from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import AddMenteeForm  from './AddMenteeForm'
import AddMentorForm  from './AddMentorForm'
import { withRouter } from 'react-router-dom'
import {getCookie} from '../../utils/Session'
class DrawerForm extends React.Component {
    addMenteeForm = React.createRef();
    state = {visible: false, hasMenteeProfile : true , hasMentorProfile :true};
    constructor(props) {
        super(props);
        this.onClickMentee = this.onClickMentee.bind(this);
        this.onClickMentor = this.onClickMentor.bind(this);
    }

	componentWillMount() {
		const {user} = getCookie();
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
    
    showDrawer = () => {
        this.setState({
        visible: true,
        });
    };

    onClose = () => {
        this.setState({
        visible: false,
        });
    };

    onSubmit = () => {
        this.setState({
        visible: false,
        });
    };

    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            isMenteeForm: e.target.value
        });
    };

    onFinish = (values) => {
    console.log(values);
    };

    handleSubmitForm() {
        console.log("@")
        this.child.handleSubmit()
    }

    onClickMentee = () => {
        this.props.history.push({pathname:'/user/addMenteeProfile'})
    };

    onClickMentor = () => {
        this.props.history.push({pathname:'/user/addMentorProfile'})
    };


    render() {
        console.log(this.state)
        return (
            <>
            <Button type="text" onClick={this.showDrawer} disabled = {this.state.hasMenteeProfile&&this.state.hasMentorProfile}>
                <PlusOutlined /> New profile
            </Button>
            <Drawer
                title="Create a new profile"
                width={720}
                onClose={this.onClose}
                visible={this.state.visible}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                <div
                    style={{
                    textAlign: 'right',
                    }}
                >
                    <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                    Cancel
                    </Button>
                    <Button onClick={this.onSubmit} type="primary" htmlType="submit">
                    Submit
                    </Button>
                </div>
                // <Footer handleSubmitForm={this.handleSubmitForm.bind(this)} />
                }
            >
            <Radio.Group defaultValue = {true}>
                <Radio.Button onClick = {this.onClickMentee} value={true}  disabled = {this.state.hasMenteeProfile} > Mentee </Radio.Button>
                <Radio.Button onClick = {this.onClickMentor} value={true}  disabled = {this.state.hasMentorProfile} > Mentor </Radio.Button>
                {/* <NavLink to ="/user/addMenteeProfile"><Radio.Button onClick = {this.onClick1} value={true}  disabled = {this.state.hasMenteeProfile} > Mentee </Radio.Button></NavLink>
                <NavLink to ="/user/addMentorProfile"><Radio.Button onClick = {this.onClick1} value={true}  disabled = {this.state.hasMentorProfile} > Mentor </Radio.Button></NavLink> */}
            </Radio.Group>
            <Switch>
                <Route path="/user/addMenteeProfile" component={AddMenteeForm}/>
                <Route path="/user/addMentorProfile" component={AddMentorForm}/>
            </Switch>
            </Drawer>
        </>
        );
    }
}

export default withRouter(DrawerForm)