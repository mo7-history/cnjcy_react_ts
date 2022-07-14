/*
 * @LastEditors: Mark
 * @Description: In User Settings Edit
 * @Author: Mark
 * @Date: 2019-05-05 10:25:14
 * @LastEditTime: 2019-06-24 12:30:53
 */

import React from 'react';
import styles from './tencenMoudle.module.scss';
interface Props {
  onChange: (any) => void;
  className?: any;
  style?: any;
}

class UpLoadFile extends React.Component<Props, object> {
  state = {
    selectMap: '',
  };

  onChange = () => {
    const { onChange } = this.props as any;
    const { selectMap } = this.state as any;
    if (selectMap.cityname) {
      onChange(selectMap);
    }
  };
  componentDidMount() {
    const _this = this;
    window.addEventListener(
      'message',
      (event) => {
        let loc = event.data;
        if (loc && loc.module === 'locationPicker') {
          _this.setState({
            selectMap: loc,
          });
        }
      },
      false
    );
  }
  render() {
    return (
      <div
        className={`${styles.wrapper} ${this.props.className}`}
        style={this.props.style}
      >
        <div className={styles.content} id="mayBox">
          <div className={styles.mapBox} id="mapBox">
            <iframe
              title="tencenMap"
              id="tencenMapBox"
              width="100%"
              height="100%"
              src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=WWLBZ-EMJEI-OBKGG-5TQ3V-HLG2Z-PKBI5&referer=cnjcyhjjh5"
            />
          </div>
          <div className={styles.footer}>
            <div className={styles.Btn} onClick={this.onChange}>
              确定
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpLoadFile;
