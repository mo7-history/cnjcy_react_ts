import * as React from 'react';
import styles from './index.module.scss';
import { getReportList } from '@/api/apply';
import { autoLogin } from '@/api/wechatLogin';
import { formatDate } from '@/utils/utils';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  state = {
    list: [],
  };

  componentDidMount() {
    autoLogin({
      type: true,
      returnUrl: '/list',
    });
    getReportList({
      pageSize: 9999,
    }).then((res) => {
      this.setState({
        list: res.data.list,
      });
    });
  }

  render() {
    const { list } = this.state as any;
    if (list.length < 1) {
      return (
        <div className={styles.noData}>
          <img
            className={styles.icon}
            src={require('./img/noData.png')}
            alt=""
          />
          <div className={styles.hint}>您还没有举报过哦！</div>
        </div>
      );
    } else {
      return (
        <div className={styles.wrapper}>
          {list.map((item, index) => {
            return (
              <Link
                key={index}
                className={styles.Item}
                to={`/detail?id=${item.id}`}
              >
                <img
                  className={styles.icon}
                  alt=""
                  src={require(`./img/${item.reportType.value}.png`)}
                />
                <div className={styles.content}>
                  <div className={styles.title}>
                    <div className={styles.left}>
                      {item.reportType.description}
                    </div>
                    <div className={styles.right}>
                      {formatDate(item.createTime)}
                    </div>
                  </div>
                  <div className={styles.ctx}>{item.comment}</div>
                  <div className={styles.status}>
                    {item.status.description}
                    <img
                      className={styles.goIcon}
                      src={require('./img/go.png')}
                      alt=""
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      );
    }
  }
}

export default Home;
