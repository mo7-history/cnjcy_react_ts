import * as React from 'react';
import styles from './index.module.scss';
import { getUrlParam, formatDate } from '@/utils/utils';
import { getDetail } from '@/api/apply';
import { Toast } from 'antd-mobile';
class Home extends React.Component {
  state = {
    id: '',
    info: {},
    status: {},
    statusList: {
      val_0: {
        label: '未受理',
        description: '我们正在快马加鞭处理！',
      },
      val_1: {
        label: '办理中',
        description: '我们正在快马加鞭处理！',
      },
      val_2: {
        label: '非受理范围',
        description: '感谢您在本平台的举报！',
      },
      val_3: {
        label: '办结',
        description: '感谢您在本平台的举报！',
      },
    },
    nowSteps: {},
    steps: [],
  };

  componentDidMount() {
    const { id } = getUrlParam();
    if (!id) {
      Toast.fail('错误,页面缺少ID', 5);
      return false;
    }
    const _this = this;
    _this.setState({
      id,
    });
    getDetail({
      id,
    }).then((res) => {
      const { statusList } = _this.state;
      const { data } = res;
      const info: any = data;
      _this.setState({
        info,
        status: statusList[`val_${info.status.value}`],
      });

      _this.filterStepData(info);
    });
  }

  filterStepData = (info) => {
    const process = info.process;
    const status = info.status;
    const steps: Array<any> = [];
    for (let i = 0; i < process.length; i++) {
      const el = process[i];
      const Obj = {
        ...el,
        createTime: formatDate(el.createTime),
        label: el.status.description,
        value: el.status.value,
        status: false,
      };
      if (status.value === Obj.value) {
        Obj.status = true;
      }
      steps.push(Obj);
    }
    this.setState({
      steps: steps.reverse(),
      nowSteps: status,
    });
  };

  render() {
    const { info, status, steps, nowSteps }: any = this.state;
    const { reportType, reportImage, videoFile, meetFlag } = info;
    if (reportType) {
    } else {
      return null;
    }

    return (
      <div className={styles.wrapper}>
        <ContentBox title="举报明细">
          <div className={styles.reportDetail}>
            {status.label && (
              <div className={`${styles.Item} ${styles.repot}`}>
                <div className={styles.title}>{status.label}</div>
                <div className={styles.cont}>{status.description}</div>
              </div>
            )}
            {info.createTime && (
              <Item title="举报时间">{formatDate(info.createTime)}</Item>
            )}
            {reportType.description && (
              <Item title="举报类型">{reportType.description}</Item>
            )}
            {info.defendant && <Item title="举报对象">{info.defendant}</Item>}
            {info.comment && <Item title="举报原因">{info.comment}</Item>}
            {info.happenAddress && (
              <Item title="发生地">{info.happenAddress}</Item>
            )}
          </div>
        </ContentBox>

        {reportImage.length ? (
          <ContentBox title="图片信息">
            <div className={styles.imageBox}>
              {reportImage.map((item, index) => {
                return (
                  <img
                    className={styles.cover}
                    key={index}
                    alt=""
                    src={item.url}
                  />
                );
              })}
            </div>
          </ContentBox>
        ) : null}

        {videoFile.length ? (
          <ContentBox title="视频信息">
            <div className={styles.imageBox}>
              {videoFile.map((item, index) => {
                return (
                  <div className={styles.cover} key={index}>
                    <div className={styles.strbox}>{item.title}</div>
                  </div>
                );
              })}
            </div>
          </ContentBox>
        ) : null}

        <ContentBox title="个人信息">
          <div className={styles.reportDetail}>
            {info.name && <Item title="姓名">{info.name}</Item>}
            {info.mobile && <Item title="手机号码">{info.mobile}</Item>}
            {info.identity && <Item title="身份证号">{info.identity}</Item>}
            {info.contactAddress && (
              <Item title="联系地址">{info.contactAddress}</Item>
            )}
            {info.description && (
              <Item title="是否愿意约谈">{meetFlag.description}</Item>
            )}
          </div>
        </ContentBox>

        {steps.length ? (
          <ContentBox title="办理情况">
            <div className={styles.reportDetail}>
              <Item title="受理单位">长宁人民检察院</Item>
              <Item title="受理时间">
                <div className={styles.timeStep}>
                  {steps.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={`${styles.Item} ${
                          nowSteps.value === item.value ? styles.on : styles.not
                        }`}
                      >
                        <div className={styles.label}>{item.label}</div>
                        <div className={styles.time}>{item.createTime}</div>
                        {nowSteps.value === item.value ? (
                          <img
                            className={styles.dotIcon}
                            alt=""
                            src={require('./img/nowstep.png')}
                          />
                        ) : (
                          <div className={styles.dot} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </Item>
            </div>
          </ContentBox>
        ) : null}
      </div>
    );
  }
}

export default Home;

function Item({ title, children }: { title?: any; children?: any }) {
  return (
    <div className={styles.Item}>
      <div className={styles.title}>{title}：</div>
      <div className={styles.cont}>{children}</div>
    </div>
  );
}

function ContentBox({ title, children }: { title?: any; children: any }) {
  return (
    <div className={styles.ContentBox}>
      <div className={styles.title}>
        <span className={styles.line} />
        {title}
      </div>
      <div className={styles.cont}>{children}</div>
    </div>
  );
}
