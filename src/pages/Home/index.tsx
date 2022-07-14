/*
 * @LastEditors: Mark
 * @Description: inbox页面,可用的页面列表
 * @Author: Mark
 * @Date: 2019-05-05 11:53:31
 * @LastEditTime: 2019-06-20 10:58:01
 */
import * as React from 'react';
import { Link } from 'react-router-dom';
import routes from '@/pages/routes';

const Navigation = ({ list }: any) => {
  return (
    <ul>
      {list.map((item: any) => {
        return (
          <li key={item.path}>
            <h3>
              <Link to={item.from + item.path}>{item.name}</Link>
            </h3>
            <h4>title: {item.title}</h4>
            <h4>
              path: &nbsp;&nbsp;
              {item.from + item.path}
            </h4>
            <p>{item.description}</p>
            {item.children && <Navigation list={item.children.routes} />}
          </li>
        );
      })}
    </ul>
  );
};

class Inbox extends React.Component {
  render() {
    return (
      <div>
        <h1>该项目路由信息预览</h1>
        <Navigation list={routes} />
      </div>
    );
  }
}

export default Inbox;
