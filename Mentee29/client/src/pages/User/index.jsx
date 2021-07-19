import React, { Component } from 'react'

import UserPageHeader from '../../component/UserPageHeader'
import UserPageMenu from '../../component/UserPageMenu'
export default class User extends Component {

    componentWillMount() {
		this.setState(this.props.location.state)
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <div><UserPageHeader /></div>
                <div><UserPageMenu dataPlaceholder={this.state} /> </div>
            </div>
        )
    }
}
