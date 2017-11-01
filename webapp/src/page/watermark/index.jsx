import React from 'react';
import styles from './index.less';

class Container extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="top">
          <div className="header">
            水水的证件
          </div>
          <p className="desc">
          加水印操作在本地完成，任何证件信息均不会上传到网站，请放心使用
          </p>
        </div>
      </div>
    );
  }
}

module.exports = Container;