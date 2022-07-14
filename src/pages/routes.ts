/*
 * @LastEditors: Mark
 * @Description: In User Settings Edit
 * @Author: Mark
 * @Date: 2019-04-08 11:33:38
 * @LastEditTime: 2019-06-20 11:25:54
 */
import _import from '@/utils/_import';
const basePath = '';
const fatherPath = '';

const routes = [
  {
    path: '/',
    name: '首页',
    title: '',
    description: '',
    component: _import(`${basePath}/Home`),
    from: fatherPath,
  },
  {
    path: '/apply',
    name: '举报页面',
    title: '',
    description: '举报表单页面',
    component: _import(`${basePath}/Apply`),
    from: fatherPath,
  },
  {
    path: '/apply_succeed',
    name: '举报成功',
    title: '',
    description: '举报成功页面',
    component: _import(`${basePath}/ApplySucceed`),
    from: fatherPath,
  },
  {
    path: '/list',
    name: '我的举报列表',
    title: '',
    description: '举报列表页面',
    component: _import(`${basePath}/List`),
    from: fatherPath,
  },
  {
    path: '/detail',
    name: '详情页面',
    title: '',
    description: '查看举报详情',
    component: _import(`${basePath}/Detail`),
    from: fatherPath,
  },
  // {
  //   path: '/demo',
  //   name: 'Demo',
  //   description: '这里是演示页面',
  //   title: '演示',
  //   component: _import(`${basePath}/Demo`),
  //   from: fatherPath,
  //   children: {
  //     routes: _import(`${basePath}/Demo/routes`),
  //   },
  // },
  {
    path: '/404',
    name: '404',
    description: '404',
    title: 'Not Found',
    component: _import(`${basePath}/NotFound`),
    from: fatherPath,
  },
];

export default routes;
