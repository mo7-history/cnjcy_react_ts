import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('store') // 将store注入到当前组件中
@observer // 将该组件变成响应式组件
class MobxTest2 extends Component {
  handleClick = () => {
    (this.props as any).store.otherStore.getData();
  };
  render() {
    return (
      <div>
        <h1>Mobx_2 体现mobx的响应式</h1>
        <h2>homeStore.text: {(this.props as any).store.homeStore.text}</h2>
        <h2>homeStore.num: {(this.props as any).store.homeStore.num}</h2>
        <button onClick={this.handleClick}> 点击获取数据修改str</button>
      </div>
    );
  }
}

export default MobxTest2;
