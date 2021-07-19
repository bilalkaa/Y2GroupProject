import React from 'react'
import { withRouter, Switch, Redirect } from 'react-router-dom'
import PrivateRoute from '../PrivateRoute'
import PrivateAdminRoute from '../PrivateAdminRoute'

import User from '../../pages/User';
import Admin from '../../pages/Admin';
import Mentor from '../../pages/Mentor';
import Search from '../../pages/Search/index';
import Mentee from '../../pages/Mentee/index';

class ContentMain extends React.Component {
  render () {
    return (
      <div>
        <Switch>
          <PrivateRoute exact path='/user' component={User}/>
          <PrivateAdminRoute path='/admin' exact={false} component={Admin}/>
          <PrivateRoute path='/user/mentor' exact={false} component={Mentor}/>
          <PrivateRoute path='/user/search' exact={false} component={Search}/>
          <PrivateRoute path='/user/mentee' exact={false} component={Mentee}/>
          <Redirect exact from='/' to='/user'/>
        </Switch>
      </div>
    )
  }
}

export default withRouter(ContentMain);