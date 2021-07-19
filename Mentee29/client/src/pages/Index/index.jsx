import React from 'react';
import { Layout, Menu } from 'antd';
import ContentMain from '../../component/ContentMain'
import {logout} from '../../utils/Session'
import HeaderBar from "../../component/HeaderBar"
const { Footer, Content } = Layout;

export default class Index extends React.Component{
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick = () => {
    logout()
    this.props.history.push({pathname:'/'})
  }

  render() {
    return (
      <div>
        <Layout>
          <HeaderBar/>
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 600,
            }}
          >
              <ContentMain/>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Mentee29 ©2021 Created by Group 29
          </Footer>
        </Layout>
      </div>
    );
  }
}