/*
 * @LastEditors: Mark
 * @Description: none
 * @Author: Mark
 * @Date: 2019-05-05 11:53:31
 * @LastEditTime: 2019-05-23 13:21:27
 */
import React, { Component } from 'react';
import { Link /* , Route */ } from 'react-router-dom';
import RouteView from '../../../config/RouteView';
class StyleDemo extends Component {
  render() {
    const { match } = this.props;
    return (
      <div>
        <h1>这里是 StyleDemo_js ,欢迎光临 , 这里是二级路由 </h1>
        <ul>
          <li>
            <Link to="/demo/style_demo_js">css_style_demo_js</Link>
          </li>
          <li>
            <Link to="/demo/style_demo_js/js_style_demo">js_style_demo-js</Link>
          </li>
        </ul>
        <RouteView match={match} />
        {/* <Route
          exact
          path={match.path}
          render={() => <h3>这里是三级路由首页首页哦</h3>}
        /> */}
      </div>
    );
  }
}

export default StyleDemo;
