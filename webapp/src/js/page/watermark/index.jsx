import React from 'react';
import styles from './index.less';
import DEFAULT_IMG_URL from '../../../images/example.jpg';
import { Layout, Form, Input, Button, Row, Col, Menu, Upload, message } from 'antd';
import WaterMark from './watermark';
const { Header, Content, Footer } = Layout;
const FormItem = Form.Item;

const waterMark = new WaterMark();

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '此证件进攻办理XX业务使用，他用无效',
      imgUrl: DEFAULT_IMG_URL
    };
    this.beforeUpload = this.beforeUpload.bind(this);
    this.getSomeConfig = this.getSomeConfig.bind(this);
    this.handleSaveImg = this.handleSaveImg.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTextBlur = this.handleTextBlur.bind(this);
    this.dataURLtoBlob = this.dataURLtoBlob.bind(this);
    this.validateBeforeDraw = this.validateBeforeDraw.bind(this);
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
                  <h1>水水的证件</h1>
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
                        onBlur={this.handleTextBlur}
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
          浙ICP备17043803号 © 2017 Simple Tool.
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
  handleTextBlur(e) {
    if (!this.validateBeforeDraw()) return;

    var that = this;
    waterMark.reRendering({
      text: this.state.text
    }).then(function () {
      that.updateImgurl();
      message.success('水印文字已更新~');
    });
  }
  handleSaveImg(e) {
    if (!this.validateBeforeDraw()) return;

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
    var url = document.getElementById("myCanvas").toDataURL("image/png");
    this.setState({
      imgUrl: url
    })
  }
  validateBeforeDraw() {

    //判断水印文字是否为空
    if (!this.state.text) {
      message.error('水印文字不可为空哦~');
      return false;
    }

    //判断是否传图
    if (this.state.imgUrl === DEFAULT_IMG_URL) {
      message.error('请先选择证件图片哦~');
      return false;
    }

    return true;
  }
}

module.exports = Container;