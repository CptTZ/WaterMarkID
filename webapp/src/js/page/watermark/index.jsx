import React from 'react';
import styles from './index.less';
import DEFAULT_IMG_URL from '../../../images/example.jpg';
import { Layout, Form, Input, Button, Row, Col, Menu, Upload, message, Icon } from 'antd';
import WaterMark from './watermark';
import Jquery from 'jquery'
const { Header, Content, Footer } = Layout;
const FormItem = Form.Item;

const waterMark = new WaterMark();
message.config({
  top: 230
})

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '此证件仅供办理XX业务使用，他用无效',
      lastText: '此证件仅供办理XX业务使用，他用无效', //作对比，以免反复画图
      imgUrl: DEFAULT_IMG_URL
    };
    this.beforeUpload = this.beforeUpload.bind(this);
    this.getSomeConfig = this.getSomeConfig.bind(this);
    this.handleSaveImg = this.handleSaveImg.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTextPressEnter = this.handleTextPressEnter.bind(this);
    this.handleTextOnBlur = this.handleTextOnBlur.bind(this);
    this.dataURLtoBlob = this.dataURLtoBlob.bind(this);
    this.validateBeforeDraw = this.validateBeforeDraw.bind(this);
    this.log = this.log.bind(this);
  }
  render() {
    const formItemLayout = {
      labelCol: {
        lg: { span: 4 },
        xs: { span: 6 },
      },
      wrapperCol: {
        lg: { span: 20 },
        xs: { span: 18 },
      }
    };
    var state = this.state;
    return (
      <Layout className="p-waterMark" >
        <Header className="header">
          <div className="logo" />
          <Menu
            mode="horizontal"
            selectedKeys={['1']}
            style={{ lineHeight: '62px', display: 'inline-block' }}
          >
            <Menu.Item key="1">水水的证件</Menu.Item>
          </Menu>
        </Header>
        <Content className="container">
          <Row>
            <Col span={22} offset={1}>
              <div className="content">
                <div className="title">
                  <div className="logo"></div>
                </div>
                <p className="desc">加水印操作在本地完成，任何证件信息不会上传到网站，请放心使用</p>

                <Row className="formWrap">
                  <Col sm={{ span: 16, offset: 1 }} xs={{ span: 22, offset: 1 }}>
                    <FormItem
                      label="水印文字"
                      colon={true}
                      {...formItemLayout}>
                      <Input
                        value={state.text}
                        className="input-word"
                        onChange={this.handleTextChange}
                        onBlur={this.handleTextOnBlur}
                        onPressEnter={this.handleTextPressEnter}
                        ref="text" />
                    </FormItem>
                  </Col>
                  <Col sm={{ span: 2, offset: 1 }} xs={{ span: 22, offset: 1 }} >
                    <FormItem style={{ textAlign: 'right' }}>
                      <Upload
                        beforeUpload={this.beforeUpload}
                        showUploadList={false} >
                        <Button type="primary" className="btn">选择图片</Button>
                      </Upload>
                    </FormItem>
                  </Col>
                  <Col sm={{ span: 2, offset: 1 }} xs={{ span: 22, offset: 1 }}>
                    <FormItem style={{ textAlign: 'right' }}>
                      <a className="btn ant-btn" onClick={this.handleSaveImg}>保存水印</a>
                    </FormItem>
                  </Col>
                </Row>

                <img src={state.imgUrl} alt="" className="img" />
                <p className="desc2">水印效果实时预览</p>
              </div>
            </Col>
          </Row>
          <canvas id="myCanvas" style={{ display: 'none' }}></canvas>
        </Content>
        <Footer className="footer">
          <span>浙ICP备17043803号 © 2017 Simple Tool.</span>
          <div className="iconWrap">
            <a href="mailto:simpletool@126.com"><i className="icon email"></i></a>
            <a href="//shang.qq.com/wpa/qunwpa?idkey=52b2576d199ecc5702dd11ac7c42f1a0ec6356659015175ab635e3b21ae4f03c"><i className="icon qq"></i></a>
          </div>
        </Footer>
      </Layout>
    );
  }
  beforeUpload(file, fileList) {
    var that = this;
    var reader = new FileReader();
    if (file && file.type.match('image.*')) {
      reader.readAsDataURL(file);
    } else {
      return false;
    }
    reader.onload = function (e) {
      var data = e.target.result,
        image = new Image();

      image.src = data;
      image.onload = function () {
        var config = {
          text: that.state.text,
          id: "myCanvas",
          color: '#f9f9f9',
          xStart: 0,
          yStart: -(image.width * 0.71),
          rotate: 45,
          opacity: 0.4,
          width: image.width,
          height: image.height,
          imgUrl: data
        };
        var height = Math.min(image.width, image.height);
        Object.assign(config, that.getSomeConfig(height));
        waterMark.mark(config).then(function () {
          that.updateImgurl();
          that.setState({
            lastText: that.state.text
          });
        });
      }
    }

    return false;
  }
  handleTextChange(e) {
    var value = e.target.value;
    this.setState({
      text: value
    });
  }
  handleTextPressEnter(e) {
    e.target.blur();
  }
  handleTextOnBlur(e) {
    if (!this.validateBeforeDraw(true)) return;

    var that = this;
    waterMark.reRendering({
      text: this.state.text
    }).then(function () {
      that.updateImgurl();
      that.setState({
        lastText: that.state.text
      });
      message.success('水印文字已更新~');
    });
  }
  handleSaveImg(e) {
    if (!this.validateBeforeDraw()) return;
    this.log(this.state.text, 3);

    window.isSupportDownload = 'download' in document.createElement('a');
    if (!window.isSupportDownload){
      message.error('当前浏览器暂不兼容~请右键点击水印保存哦~');
      return false;
    }

    var target = e.target;
    var imgData = document.getElementById('myCanvas').toDataURL({
      format: 'png',
      multiplier: 4
    });
    var strDataURI = imgData.substr(22, imgData.length);
    var blob = this.dataURLtoBlob(imgData);
    var objurl = URL.createObjectURL(blob);
    target.download = 'SimpleTool.png';
    target.href = objurl;
  }
  getSomeConfig(imgHeight) {
    var fontSize = Math.floor(0.05 * imgHeight);
    return {
      xSpace: 2.5 * fontSize,
      ySpace: fontSize,
      size: fontSize
    };
  }
  dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
      type: mime
    });
  }
  updateImgurl() {
    this.log(this.state.text, 1);
    var url = document.getElementById("myCanvas").toDataURL("image/png");
    this.setState({
      imgUrl: url
    })
  }
  validateBeforeDraw(fromText) {

    //判断水印文字是否为空
    if (!this.state.text) {
      message.error('还是写点什么吧~');
      return false;
    }

    //判断是否传图
    if (this.state.imgUrl === DEFAULT_IMG_URL) {
      !fromText && message.error('请先选择证件图片哦~');
      return false;
    }

    //判断文字是否改变
    if(fromText && this.state.text === this.state.lastText){
      return false;
    }

    return true;
  }
  log(text, logMessageType){
    Jquery.ajax({
      url: "/api/log",
      data: {
        clientType: 1,
        logMessageType: logMessageType,
        logMessageContent: text
      }
    });
  }
}

module.exports = Container;