import React ,{Component}from 'react'
import { Layout , Menu , Badge , Button} from 'antd'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { logout } from '../../utils/Session'
import Icon , { NotificationTwoTone } from '@ant-design/icons';
import Logo from '../Logo'
import './index.css'
const { Header } = Layout;

@withRouter @inject('appStore') @observer
class HeaderBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      count : true
    };
  }
  
  onClick = () => {
    logout()
    this.props.history.push({pathname:'/'})
  }

  render () {
    return (
      <Header className='header'>
        <a href="./">
          <Icon component={Logo} className = "logo" />
        </a>
        <div style={{lineHeight: '64px', float: 'right'}}>
                  <Menu
                  theme='dark'
                  mode='horizontal'
                  style={{ lineHeight: '64px'}}
                  >
                  <Menu.Item key='1' onClick = {this.onClick}>
                    Log out
                  </Menu.Item>
                </Menu>
        </div>
      </Header>
    )
  }
}

export default HeaderBar