import * as React from 'react';
import {
  Picker,
  List,
  TextareaItem,
  InputItem,
  Switch,
  Toast,
} from 'antd-mobile';
import styles from './index.module.scss';
import { localStore } from '@/utils/utils';

import { upLoadImage, upLoadFile } from '@/api/UpLoad';
import { autoLogin } from '@/api/wechatLogin';

import { apply } from '@/api/apply';

import { getAreaJson } from '@/api/getLocalData';

import UpLoadFile from '@/components/UpLoadFile';

import MapMoudle from '@/components/MapMoudle';

const reporList = [
  { value: 0, label: '损害生态环境' },
  { value: 1, label: '损害自然环境' },
  { value: 2, label: '危害食品安全' },
  { value: 3, label: '危害药品安全' },
  { value: 4, label: '危害国家财产' },
  { value: 5, label: '违法出让国有土地使用权' },
  { value: 6, label: '侵害英雄烈士荣誉与尊严' },
  { value: 7, label: '损害消费者权益' },
  { value: 8, label: '其它' },
];

class Apply extends React.Component {
  state = {
    reporList,
    wechatCode: '',
    reportType: [],
    isSubmit: true,
    meetFlag: false,
    //图片上传
    images: [],
    maxImgNum: 8,
    //视频上传
    videos: [],
    //本地的地址数据
    localArea: [],
    //联系人地址
    contactAddress: [],
    //发送的数据
    fromData: {
      reportType: '',
      comment: '',
      defendant: '',
      name: '',
      mobile: '',
      identity: '',
      happenAddress: '',
      meetFlag: 0,
      contactAddress: '',
      reportImage: [],
      videoFile: [],
      contactProvince: '',
      contactCity: '',
      contactDistrict: '',
      happenCity: '上海市',
    },
    fromErr: {
      comment: '',
      happenAddress: '',
      name: '',
      mobile: '',
      identity: '',
    },
    MapModuleStatus: false,
    MapModuleShow: false,
  };

  main = () => {};

  submit = () => {
    const _this = this;
    const { isSubmit, fromData, images, videos, contactAddress } = this.state;
    if (!isSubmit) {
      return false;
    }
    //图片处理
    const reportImage: Array<any> = [];
    for (let i = 0; i < images.length; i++) {
      const el: any = images[i];
      if (el.state === 'SUCCESS') {
        reportImage.push(el);
      }
    }
    fromData.reportImage = reportImage as any;

    //视频处理
    const videoFile: Array<any> = [];

    for (let i = 0; i < videos.length; i++) {
      const el: any = videos[i];
      if (el.state === 'SUCCESS') {
        videoFile.push(el);
      }
    }
    fromData.videoFile = videoFile as any;

    //联系地址处理
    fromData.contactProvince = contactAddress[0];
    fromData.contactCity = contactAddress[1];
    fromData.contactDistrict = contactAddress[2];

    if (this.check()) {
      apply(fromData)
        .then((res) => {
          (_this.props as any).history.push(`/apply_succeed?id=${res.data}`);
        })
        .catch(() => {
          Toast.fail('提交失败，请检查网络', 1);
        });
    }
  };
  meetFlagFun = () => {
    const { meetFlag, fromData } = this.state;
    fromData.meetFlag = meetFlag ? 0 : 1;
    this.setState({
      meetFlag: !meetFlag,
      fromData,
    });
  };
  publicInput = (value, name) => {
    const { fromData } = this.state;
    fromData[name] = value;
    this.setState(
      {
        fromData,
      },
      () => {
        this.inputCheck(name);
      }
    );
  };

  inputCheck = (name?: string) => {
    const { fromData, fromErr } = this.state;
    const errArr: Array<string> = [];
    if (name && name !== 'identity') {
      if (fromData[name]) {
        fromErr[name] = '';
      } else {
        fromErr[name] = '此项不能为空';
      }
    }

    if (name === 'mobile') {
      //电话号码判断
      if ((/^1(3|4|5|6|7|8|9)\d{9}$/).test(fromData.mobile)) {
        fromErr.mobile = '';
      } else {
        fromErr.mobile = '电话号码格式不正确';
        errArr.push('mobile');
      }
    }

    if (name === 'identity') {
      //身份证校验
      if (this.isCardNo(fromData.identity) || fromData.identity.length === 0) {
        fromErr.identity = '';
      } else {
        fromErr.identity = '身份证格式不正确';
        errArr.push('identity');
      }
    }

    this.setState({
      fromErr,
    });
  };

  repor_fun = (value) => {
    const { fromData } = this.state;
    fromData.reportType = value[0];
    this.setState({
      reportType: value,
      fromData,
    });
  };

  //图片选择

  imageChange = (files, type) => {
    const _this = this;
    const { maxImgNum } = _this.state;
    const fileList = files;
    if (type === 'add') {
      for (let i = 0; i < fileList.length; i++) {
        const el = fileList[i];
        if (el.size - 10000000 < 0) {
          Toast.loading('正在上传...', 200);
          if (el.file) {
            upLoadImage(el.file)
              .then((res) => {
                if (res.data.size) {
                  Toast.hide();
                  fileList[i] = res.data;
                  updateFiles();
                } else {
                  Toast.fail(res.data.state, 1);
                }
              })
              .catch((err) => {
                fileList.splice(i, 1);
                updateFiles();
                Toast.fail('有一张图片上传失败', 1);
              });
          } else {
            updateFiles();
          }
        } else {
          fileList.splice(i, 1);
          updateFiles();
          Toast.fail('图片太大请重新选择', 1);
        }
      }
    } else {
      updateFiles();
    }
    function updateFiles() {
      _this.setState({
        images: fileList.slice(0, maxImgNum),
      });
    }
  };

  //视频选择
  videoChange = (files, type) => {
    const _this = this;
    const { maxImgNum } = _this.state;
    const fileList = files;
    if (type === 'add') {
      for (let i = 0; i < fileList.length; i++) {
        const el = fileList[i];
        if (el.size - 50000000 < 0) {
          Toast.loading('正在上传...', 200);
          if (el.file) {
            upLoadFile(el.file)
              .then((res) => {
                if (res.data.size) {
                  Toast.hide();
                  fileList[i] = res.data;
                  updateFiles();
                } else {
                  Toast.fail(res.data.state, 1);
                }
              })
              .catch((err) => {
                fileList.splice(i, 1);
                updateFiles();
                Toast.fail('有一个文件上传失败', 1);
              });
          } else {
            updateFiles();
          }
        } else {
          fileList.splice(i, 1);
          updateFiles();
          Toast.fail('视频太大请重新选择', 1);
        }
      }
    } else {
      updateFiles();
    }
    function updateFiles() {
      _this.setState({
        videos: fileList.slice(0, maxImgNum),
      });
    }
  };

  check = (): boolean => {
    const { fromData, fromErr } = this.state as any;
    const errArr: Array<string> = [];

    //举报类型判断
    if (fromData.reportType !== '' || fromData.reportType === 0) {
    } else {
      Toast.info('请选择举报类型!', 3);
      errArr.push('reportType');
      return false;
    }

    for (const key in fromErr) {
      if (fromErr.hasOwnProperty(key)) {
        if (fromData[key] || key === 'identity') {
          fromErr[key] = '';
        } else {
          errArr.push(key);
          fromErr[key] = '此项不能为空';
        }
      }
    }
    //电话号码判断
    if ((/^1(3|4|5|6|7|8|9)\d{9}$/).test(fromData.mobile)) {
      fromErr.mobile = '';
    } else {
      fromErr.mobile = '电话号码格式不正确';
      errArr.push('mobile');
    }
    //身份证校验

    if (this.isCardNo(fromData.identity) || fromData.identity.length === 0) {
      fromErr.identity = '';
    } else {
      fromErr.identity = '身份证格式不正确';
      errArr.push('identity');
    }

    this.setState({
      fromErr,
    });

    if (errArr.length) {
      Toast.info('请检查提交信息', 3);
      return false;
    } else {
      for (const key in fromErr) {
        if (fromErr.hasOwnProperty(key)) {
          fromErr[key] = '';
        }
      }
      this.setState({
        fromErr,
      });
      return true;
    }
  };

  isCardNo = (card) => {
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(card) === false) {
      return false;
    } else {
      return true;
    }
  };

  componentDidMount() {
    autoLogin({
      type: true,
      returnUrl: '/apply',
    });

    this.setLocalData();
  }

  setLocalData = () => {
    const _this = this;
    const localArea = localStore.get('area');
    if (localArea) {
      setAreaData(localArea);
    } else {
      getAreaJson().then((res) => {
        setAreaData(res.data);
        localStore.set('area', res.data);
      });
    }
    function setAreaData(localArea) {
      _this.setState({
        localArea,
      });
    }
  };

  //地址选择
  contactAddress_fun = (value) => {
    const _this = this;
    setTimeout(() => {
      _this.setState({
        contactAddress: value,
      });
    });
  };
  contactAddress_show = (visible) => {
    const { contactAddress } = this.state;
    if (visible) {
      if (contactAddress.length) {
      } else {
        this.setState({
          contactAddress: ['上海市',
            '上海市',
            '松江区'],
        });
      }
    } else {
      this.setState({
        contactAddress: [],
      });
    }
  };

  selectAddress = (address) => {
    const { fromData } = this.state;
    fromData.happenAddress = address.poiaddress;
    this.setState(
      {
        fromData,
      },
      () => {
        this.closeMapMoudle();
        this.inputCheck();
      }
    );
  };

  showMapMoudle = () => {
    this.setState({
      MapModuleShow: true,
      MapModuleStatus: true,
    });
  };

  closeMapMoudle = () => {
    this.setState({
      MapModuleShow: false,
    });
  };

  contactAddress_cancel = () => {
    this.setState({
      contactAddress: [],
    });
  };

  render() {
    const {
      reporList,
      reportType,
      fromData,
      meetFlag,
      images,
      maxImgNum,
      fromErr,
      videos,
      localArea,
      contactAddress,
      MapModuleStatus,
      MapModuleShow,
    } = this.state;

    return (
      <div className={styles.wrapper}>
        <InputBox notPdding>
          <Picker
            data={reporList}
            cols={1}
            value={reportType}
            onOk={this.repor_fun}
          >
            <List.Item arrow="horizontal">
              <span className={styles.reIcon}>*</span>请选择举报类型
            </List.Item>
          </Picker>
        </InputBox>

        <InputBox title="请上传图片信息">
          <UpLoadFile
            files={images}
            onChange={this.imageChange}
            quantity={maxImgNum}
            accept="image/*"
          />
          <div className={styles.hint}>单张图片大小10MB以内~</div>
        </InputBox>

        <InputBox title="请上传视频信息">
          <UpLoadFile
            files={videos}
            onChange={this.videoChange}
            quantity={maxImgNum}
            accept="video/*"
          />
          <div className={styles.hint}>单个视频大小50MB以内~</div>
        </InputBox>

        <InputBox title="举报原因" isMust errTxt={fromErr.comment}>
          <TextareaItem
            value={fromData.comment}
            className={styles.comment}
            count={100}
            rows={8}
            onChange={(e) => {
              return this.publicInput(e, 'comment');
            }}
            placeholder="请输入举报原因详细描述…"
          />
        </InputBox>

        <InputBox title="举报对象" notPdding>
          <InputItem
            value={fromData.defendant}
            className={styles.input}
            placeholder="请输入"
            onChange={(e) => {
              return this.publicInput(e, 'defendant');
            }}
          />
        </InputBox>

        <InputBox
          title="发生地址"
          titleRight=""
          notPdding
          isMust
          errTxt={fromErr.happenAddress}
          onClick={this.showMapMoudle}
        >
          {fromData.happenAddress && (
            <div className={styles.showAddress}>{fromData.happenAddress}</div>
          )}
          {/* <InputItem
            value={fromData.happenAddress}
            placeholder="请输入"
            onChange={(e) => {
              return this.publicInput(e, 'happenAddress');
            }}
          /> */}
        </InputBox>

        <div className={styles.pageHint}>
          <img className={styles.icon} src={require('./img/hint.png')} alt="" />
          请您填写相关信息，以便我们及时向您反馈办理情况
        </div>

        <InputBox title="姓名" isMust notPdding errTxt={fromErr.name}>
          <InputItem
            value={fromData.name}
            className={styles.input}
            placeholder="请输入"
            maxLength={20}
            onChange={(e) => {
              return this.publicInput(e, 'name');
            }}
          />
        </InputBox>

        <InputBox title="手机号码" isMust notPdding errTxt={fromErr.mobile}>
          <InputItem
            value={fromData.mobile}
            className={styles.input}
            placeholder="请输入"
            onChange={(e) => {
              return this.publicInput(e, 'mobile');
            }}
          />
        </InputBox>

        <InputBox title="身份证号" notPdding errTxt={fromErr.identity}>
          <InputItem
            value={fromData.identity}
            className={styles.input}
            placeholder="请输入"
            onChange={(e) => {
              return this.publicInput(e, 'identity');
            }}
          />
        </InputBox>

        <InputBox notPdding>
          <div className={styles.contactAddress}>
            <Picker
              data={localArea as any}
              title="联系地址"
              value={contactAddress}
              onOk={this.contactAddress_fun}
              onDismiss={this.contactAddress_cancel}
              onVisibleChange={this.contactAddress_show}
            >
              <List.Item arrow="horizontal">联系地址</List.Item>
            </Picker>
          </div>
          <InputItem
            value={fromData.contactAddress}
            className={styles.input}
            placeholder="请输入"
            onChange={(e) => {
              return this.publicInput(e, 'contactAddress');
            }}
          />
        </InputBox>

        <InputBox>
          <div className={styles.meetFlag}>
            <div className={styles.left}>
              <span className={styles.reIcon}>*</span>是否愿意约谈
            </div>
            <div className={styles.right}>
              {meetFlag ? '是' : '否'}&nbsp;&nbsp;&nbsp;
              <Switch checked={meetFlag} onChange={this.meetFlagFun} />
            </div>
          </div>
        </InputBox>

        <div className={styles.submit} onClick={this.submit}>
          提交
        </div>
        <div className={styles.pageEnd} />
        {MapModuleStatus ? (
          <MapMoudle
            style={{
              display: MapModuleShow ? 'block' : 'none',
            }}
            onChange={this.selectAddress}
          />
        ) : null}
      </div>
    );
  }
}

export default Apply;

function InputBox({
  title,
  isMust,
  children,
  notPdding,
  titleRight,
  errTxt,
  onClick,
}: {
title?: string;
children?: any;
isMust?: boolean;
notPdding?: boolean;
titleRight?: string;
errTxt?: string;
onClick?: any;
}) {
  return (
    <div className={styles.inputBox}>
      {title && (
        <div className={styles.title}>
          <div className={styles.left}>
            {isMust && <span className={styles.reIcon}>*</span>}
            {title}
            {errTxt && title ? <div className={styles.err}>{errTxt}</div> : ''}
          </div>
          <div className={styles.right} onClick={onClick}>
            {titleRight === '' ? (
              <span>请选择</span>
            ) : (
              <span className={styles.ctx}>{titleRight}</span>
            )}
          </div>
        </div>
      )}
      {children && (
        <div className={`${styles.boreTop} ${notPdding ? '' : styles.content}`}>
          {children}
        </div>
      )}
    </div>
  );
}
