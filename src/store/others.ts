/*
 * @LastEditors: Mark
 * @Description: none
 * @Author: Mark
 * @Date: 2019-05-15 16:31:20
 * @LastEditTime: 2019-05-23 19:20:35
 */

import { observable, action } from 'mobx';

class OthersStore {
  @observable str: any;

  constructor() {
    this.str = '这个值来自其他模块';
  }
  @action
  getData = () => {
    fetch('api/comments/show?id=4199740256395164&page=1').then((res) => {
      res.json().then(
        action((data: any) => {
          this.str = data.msg;
        })
      );
    });
  };
}

const otherStore = new OthersStore(); //通过new 创建一个homeStore对象实例通过export导出

export default otherStore;
