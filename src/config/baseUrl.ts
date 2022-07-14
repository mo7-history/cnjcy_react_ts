/*
 * @LastEditors: Mark
 * @Description: 版本号管理和baseUrl管理
 * @Author: Mark
 * @Date: 2019-05-13 15:18:24
 * @LastEditTime: 2019-06-27 11:37:16
 */

//baseUrl
// const windowOrigin = window.location.origin;
// if (windowOrigin.indexOf(':300') > -1) {
//   console.log('本地');
// } else {
//   console.log('线上');
// }
// let url = 'https://xcx.joywaygym.com'; //生产服
let url = 'http://ip-29-cnjcyjj-app.coralcodes.com'; //测试服
// let url = 'http://ip-29-shanhusecurity-app.coralcodes.com'; //UAT

export const baseUrl = url;
export const imageUrl = url;

// 版本信息管理
const versionList = [
  {
    code: '1.0.1',
    describe: '修改默认地址',
    user: 'Mark',
  },
  {
    code: '1.0.0',
    describe: '正式服发一版本',
    user: 'Mark',
  },
  {
    code: '0.3.00000',
    describe: '修复BUG并发版',
    user: 'Mark',
  },
  {
    code: '0.3.0',
    describe: '修复BUG并发版',
    user: 'Mark',
  },
  {
    code: '0.2.9',
    describe: '完成开发',
    user: 'Mark',
  },
  {
    code: '0.2.8',
    describe: '上传视频OK',
    user: 'Mark',
  },
  {
    code: '0.2.7',
    describe: '完整流程跑通',
    user: 'Mark',
  },
  {
    code: '0.2.6',
    describe: '测试登录+提交流程',
    user: 'Mark',
  },
  {
    code: '0.2.5',
    describe: '微信登陆测试',
    user: 'Mark',
  },
  {
    code: '0.2.4',
    describe: '上传图片功能',
    user: 'Mark',
  },
  {
    code: '0.2.3',
    describe: '对接微信授权登录',
    user: 'Mark',
  },
  {
    code: '0.2.2',
    describe: '配置域名',
    user: 'Mark',
  },
  {
    code: '0.2.1',
    describe: '尝试第一版发布',
    user: 'Mark',
  },
  {
    code: '0.2.0',
    describe: '添加scss支持',
    user: 'Mark',
  },
  {
    code: '0.1.0',
    describe: 'Public_React_WebApp_TS',
    user: 'Mark',
  },
];

export const printVersion = () => {
  const version = versionList[0];
  console.groupCollapsed(
    `%c version -- ${version.code}`,
    'font-size:10;color:green;font-weight:bold;'
  );
  console.info(
    `%c describe -- ${version.describe}`,
    'font-size:10;color:green;font-weight:bold;'
  );
  console.info(
    `%c user -- ${version.user}`,
    'font-size:10;color:green;font-weight:bold;'
  );
  console.groupEnd();
};
