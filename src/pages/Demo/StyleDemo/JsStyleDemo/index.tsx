/*
* @LastEditors: Mark
 * @Description: In User Settings Edit
 * @Author: Mark
 * @Date: 2019-04-08 11:33:38
* @LastEditTime: 2019-05-17 14:02:46
 */
import React, { Component } from 'react';
import { fondRoute } from '@/utils/inspectRouter';
class JsStyleDemo extends Component {
  componentDidMount() {
    window.document.title = 'JsStyleDemo';
  }
  fondRoute = () => {
    const path = '/demo';
    const route = fondRoute(path);
    console.info(route);
  };
  render() {
    return (
      <div>
        <h1>这里是 JsStyleDemo ,欢迎光临三级路由 </h1>
        <button onClick={this.fondRoute}>点我查找路由信息</button>
      </div>
    );
  }
}

export default JsStyleDemo;
