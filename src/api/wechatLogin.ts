import { ajax_json } from '@/utils/http';
import { localStore, getUrlParam } from '@/utils/utils';

export const wechatLogin = async (data: { returnUrl: string }) => {
  const req = await ajax_json({
    url: '/api/passport/wechatUrl',
    data,
    method: 'get',
  });
  // localStore.set('token', 'req.data.token');
  return req;
};

export const wechatVerify = async (data: { jsCode: string }) => {
  const req = await ajax_json({
    url: '/api/passport/auth',
    data,
    method: 'post',
  });
  console.info(req);
  localStore.set('token', req.data);
  return req;
};

export const autoLogin = ({
  type,
  returnUrl,
}: {
type: boolean;
returnUrl: string;
}) => {
  /*
   * @description: 微信公众号授权登录,必须放在 componentDidMount 生命周期内
   * @param :
   * type : true --- 自动登录 , false --- 非自动登录
   * returnUr : 登陆成功后扽回调地址 . 一般为当前页面的路径
   * @return: Promise({token, userInfo})
   */
  return new Promise((resolve, reject) => {
    const { code, test } = getUrlParam();
    if (test) {
      localStore.set(
        'token',
        'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvRG9FazFoOXhuT2oteGdvdkV0ZmZxRkExZ1hRIiwiY3JlYXRlZCI6MTU2MDkyNjAyODk5NiwiZXhwIjoxNTYxNTMwODI4fQ.CWC12E_Q_8skRa9KlKYZmOF85Q75TbjxL91a-Vn-7hmegSrljxlQuHEa6bJt7kYLAkRpSr3rebjOp2vhmwqTfQ'
      );
    }
    const token = localStore.get('token');
    if (code) {
      wechatVerify({
        jsCode: code,
      }).then((res) => {
        resolve({ token });
      });
    } else if (token) {
      resolve({ token });
    } else {
      if (type) {
        wechatLogin({
          returnUrl,
        }).then((res) => {
          window.location.href = res.data;
        });
      }
    }
  });
};

export const Login = (returnUrl) => {
  wechatLogin({
    returnUrl,
  }).then((res) => {
    window.location.href = res.data;
  });
};
