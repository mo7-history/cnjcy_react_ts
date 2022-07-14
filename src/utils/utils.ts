/*
 * @LastEditors: Mark
 * @Description: 常用的工具类函数
 * @Author: Mark
 * @Date: 2019-05-05 11:53:31
 * @LastEditTime: 2019-05-23 19:14:30
 */

import Qs from 'qs';
import { baseUrl } from '../config/baseUrl';
import store from 'store';

export const localStore = store;

export const getUrlParam = (searchStr = window.location.search) => {
  /**
   * @description: 获取当前页面的路由或者指定页面的路由
   * @param null
   * @return: {*}
   */
  return Qs.parse(searchStr, { ignoreQueryPrefix: true });
};

export const filterImageUrl = (param: any) => {
  /**
   * @description: 图片链接过滤器,专门针对dookay接口制定
   * @param
              "[{"title":"1556601754","file":"/upxxx
              ||
              url
   * @return:  url
  */
  let returnUrl = '';
  if (param.indexOf('[{') > -1) {
    const obj = JSON.parse(param);
    returnUrl = obj[0].file;
  } else {
    returnUrl = param;
  }
  if (returnUrl.indexOf('http') > -1) {
  } else {
    if (returnUrl) {
      returnUrl = baseUrl + returnUrl;
    } else {
      return '';
    }
  }
  return returnUrl;
};

export const formatDate = (timeUnix: any) => {
  /**
   * @description: 时间戳格式化
   * @param timeUnix
   * @return: string
   */
  const now = new Date(timeUnix);
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();

  return `${year}-${month}-${date}   ${hour}:${minute}`;
};

export const fs_overflow = (str: any, num: any) => {
  /**
   * @description:  文字超出个数点点点
   *
   * @str  //需要裁切的文字
   * @num   //裁切个数
   *
   * @return: string
   */
  if (str) {
    if (str.length > num) {
      return `${str.slice(0, num)}...`;
    } else {
      return str;
    }
  } else {
    return '';
  }
};
