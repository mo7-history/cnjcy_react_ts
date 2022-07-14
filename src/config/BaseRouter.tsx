/*
 * @LastEditors: Mark
 * @Description: none
 * @Author: Mark
 * @Date: 2019-05-14 16:35:05
 * @LastEditTime: 2019-06-20 10:52:21
 */
import React, { Component } from 'react';

//路由切换

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { HashRouter as Router, Switch, Route } from 'react-router-dom';

//路由切换 -- end

import Inbox from './Inbox'; //页面集合全路由展示
import RouteView from './RouteView'; //路由渲染文件
import { project_detail } from '@/config/constants';
import { fondRoute, splitPath, storagePath } from '@/utils/inspectRouter';

// Mobx
import { Provider } from 'mobx-react';
import * as store from '@/store/index';

//加载请求的设置
import { $axios_set_default } from '@/utils/http';

class App extends Component {
  constructor(props: any) {
    super(props);
    $axios_set_default();
  }
  //全局的路由变化监听
  componentDidMount() {
    this.watchRouter();
  }
  componentWillReceiveProps() {
    this.watchRouter();
  }
  watchRouter = () => {
    const { pathname } = (this.props as any).history.location;
    this.titleAnd404(pathname);
  };
  titleAnd404 = (pathname: any) => {
    storagePath((this.props as any).history, pathname);
    const nowRouter = fondRoute(pathname);
    const nowPath = splitPath(pathname);
    if (nowRouter) {
    } else if (nowPath[0] !== '/inbox') {
      (this.props as any).history.replace('/404');
    }
    const title = nowRouter && nowRouter.title;
    if (title) {
      window.document.title = title || project_detail.name;
    }
  };
  render() {
    return (
      <Switch>
        <Route exact path="/inbox" component={Inbox} />
        <RouteView />
      </Switch>
    );
  }
}

class BaseRouter extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact component={App} />
        </Router>
      </Provider>
    );
  }
}
export default BaseRouter;
