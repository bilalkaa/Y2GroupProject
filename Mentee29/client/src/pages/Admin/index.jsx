import React, { Component } from "react";
// import {Button, Row, Col, Divider } from 'antd';
import { Route, Switch } from "react-router-dom";
import AddAccount from "./AddAccount";
import Header from "./components/Header";
import MyNavLink from "./components/MyNavLink";

export default class Admin extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-offset-2 col-xs-8">
            <Header />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-2 col-xs-offset-2">
            <div className="list-group">
              <MyNavLink to="/admin/addAccount">Add Account</MyNavLink>
              <MyNavLink to="/admin">Search account</MyNavLink>
              <MyNavLink to="/admin">Allocate Mentee/Mentor pair</MyNavLink>
            </div>
          </div>
          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
                <Switch>
                  <Route path="/admin/addAccount" component={AddAccount} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
