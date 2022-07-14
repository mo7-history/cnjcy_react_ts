import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
@inject('store') // 将store注入到当前组件中
@observer // 将该组件变成响应式组件
class MobxTest1 extends Component {
  handelPlus = () => {
    (this.props as any).store.homeStore.plus();
  };
  handelMinus = () => {
    (this.props as any).store.homeStore.minus();
  };
  handleChange = () => {
    (this.props as any).store.homeStore.change('哈哈哈哈，成功！');
  };
  render() {
    return (
      <div>
        <h1>Mobx_1 Test</h1>
        <h2>homeStore.text: {(this.props as any).store.homeStore.text}</h2>
        <h2>homeStore.num: {(this.props as any).store.homeStore.num}</h2>
        <h3>otherStore.str: {(this.props as any).store.otherStore.str}</h3>
        <h3>
          homeStore.computed: {(this.props as any).store.homeStore.plusNum}
        </h3>
        调用action:
        <br />
        <button onClick={this.handelMinus}>减</button>
        <button onClick={this.handelPlus}>加</button>
        <button onClick={this.handleChange}>改变 homeStore.text</button>
      </div>
    );
  }
}

export default MobxTest1;
