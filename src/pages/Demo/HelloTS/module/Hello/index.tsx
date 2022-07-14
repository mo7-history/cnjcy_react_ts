/*
 * @LastEditors: Mark
 * @Description: TS 组建的两种方式
 * @Author: Mark
 * @Date: 2019-06-17 14:08:30
 * @LastEditTime: 2019-06-17 14:42:20
 */

import * as React from 'react';
import styles from './index.module.scss';
//定义接口
export interface Props {
  name: string;
  enthusiasmLevel?: number;
}

// 无状态组件

// function Hello({ name, enthusiasmLevel = 1 }: Props) {
//   if (enthusiasmLevel <= 0) {
//     throw new Error('You could be a little more enthusiastic. :D');
//   }

//   return (
//     <div className="hello">
//       <div className="greeting">
//         Hello {name + getExclamationMarks(enthusiasmLevel)}
//       </div>
//     </div>
//   );
// }

// 类组件

class Hello extends React.Component<Props, object> {
  render() {
    const { name, enthusiasmLevel = 1 } = this.props;

    if (enthusiasmLevel <= 0) {
      throw new Error('You could be a little more enthusiastic. :D');
    }

    return (
      <div className={styles.hello}>
        <div className={styles.greeting}>
          Hello {name + getExclamationMarks(enthusiasmLevel)}
        </div>
      </div>
    );
  }
}

export default Hello;

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!');
}
