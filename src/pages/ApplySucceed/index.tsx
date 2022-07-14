import * as React from 'react';
import styles from './index.module.scss';
import { getUrlParam } from '@/utils/utils';
import { Icon, Toast } from 'antd-mobile';
import { Link } from 'react-router-dom';
class Home extends React.Component {
  state = {
    id: '',
  };

  componentDidMount() {
    const { id } = getUrlParam();
    if (!id) {
      Toast.fail('错误,页面缺少ID', 5);
      return false;
    }
    this.setState({
      id,
    });
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <Icon
          className={styles.icon}
          type="check-circle"
          size="lg"
          color="#67ca2c"
        />
        <div className={styles.hint}>已提交成功，长宁检察院会尽快处理！</div>
        <Link to={`/detail?id=${this.state.id}`} className={styles.link}>
          查看举报
        </Link>
      </div>
    );
  }
}

export default Home;
