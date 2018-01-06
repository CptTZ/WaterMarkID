import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.less';

class Container extends React.Component{
  constructor(props){
    super();
  }
  render(){
    return(
      <div className="p-mobilePage">
        <img src="http://7xrsyo.com1.z0.glb.clouddn.com/2018-01-05-gh_8710fc406671_430.jpg" alt="" className="img"/>
        <p className="word">【长按图片】-【识别图片中的小程序码】即可使用</p>
      </div>
    );
  };
}

ReactDOM.render(<Container />, document.getElementById('app'));