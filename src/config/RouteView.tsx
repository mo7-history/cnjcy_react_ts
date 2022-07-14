/*
 * @LastEditors: Mark
 * @Description: 中心化的路由渲染插件
 * @Author: Mark
 * @Date: 2019-04-08 11:33:38
 * @LastEditTime: 2019-05-23 19:06:10
 */
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { inspectRouter } from '@/utils/inspectRouter.ts';
//此处用来处理路由和子路由的组件渲染

interface routeList {
  children: any;
  path: any;
  component: any;
}

class RouteView extends Component {
  static propTypes = {
    match: PropTypes.object,
  };
  static defaultProps = {
    match: {
      path: '',
    },
  };
  findRoutes = () => {
    //第一遍循环查找一层,第二遍循环查找二层,第三遍循环查找三层
    const { match } = this.props as any;
    return inspectRouter({ pathname: match.path });
  };
  render() {
    const { match } = this.props as any;
    let routeList: any = this.findRoutes();
    const path = match.path;
    return routeList.map((item: any, index: any) => {
      return (
        <Route
          exact={!item.children}
          key={index}
          path={path + item.path}
          component={item.component}
        />
      );
    });
  }
}
export default RouteView;
