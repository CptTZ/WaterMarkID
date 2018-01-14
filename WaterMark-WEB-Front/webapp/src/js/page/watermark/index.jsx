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
});


var Config = {
  colorMap: [
    ['0', '#ffffff'],
    ['1', '#979797'],
    ['2', '#000000']
  ],
  waterMarkConfig: {
    color: '#ffffff',
    opacity: 0.5
  },
  text: '此证件仅供办理XX业务使用，他用无效',
  debounceDelay: 200
};

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '此证件仅供办理XX业务使用，他用无效',
      lastText: '此证件仅供办理XX业务使用，他用无效', //作对比，以免反复画图
      ColorMap: [],
      currentColorIndex: -1,
      imgUrl: DEFAULT_IMG_URL
    };
    this.beforeUpload = this.beforeUpload.bind(this);
    this.getSomeConfig = this.getSomeConfig.bind(this);
    this.handleSaveImg = this.handleSaveImg.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTextPressEnter = this.handleTextPressEnter.bind(this);
    this.handleTextOnBlur = this.handleTextOnBlur.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
    this.dataURLtoBlob = this.dataURLtoBlob.bind(this);
    this.validateBeforeDraw = this.validateBeforeDraw.bind(this);
    this.log = this.log.bind(this);
  }
  componentDidMount(){
    var that = this;
    Jquery.ajax({
      url: '/api/waterConfig/1',
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      success: function(data){
        Config = Object.assign(Config, data);
      },
      complete: function(){
        var colorMap = Config.colorMap,
          waterMarkConfig = Config.waterMarkConfig,
          defaultColor = colorMap.filter(function (color) {
            return color[1] == waterMarkConfig.color;
          });
        that.setState({
          ColorMap: colorMap,
          defaultColorIndex: defaultColor.length ? defaultColor[0][0] : -1,
          defaultText: Config.text,
          text: Config.text,
          lastText: Config.text
        });
      }
    });
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
    var that = this;
    const isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
    return (
      <Layout className="p-waterMark" >
        <Header className="header">
          <div className="logo" />
          {
            !isMobile &&
            <Menu
              mode="horizontal"
              selectedKeys={['1']}
              style={{ lineHeight: '62px', display: 'inline-block' }}
            >
              <Menu.Item key="1">水水的证件</Menu.Item>
            </Menu>
          }
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
                <Row className="formWrap">
                  <Col sm={{ span: 16, offset: 1 }} xs={{ span: 22, offset: 1 }}>
                    <FormItem
                      label="水印颜色"
                      colon={true}
                      {...formItemLayout}>
                      <div className="circleWrap">
                        {
                          state.ColorMap.map(function(color, index){
                            return <span className={state.currentColorIndex == color[0] ? 'circle active': 'circle'} style={{background:color[1]}} id={color[0]} key={index}
                            onClick={that.handleChangeColor}></span>
                          })
                        }
                      </div>
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
          {
            !isMobile &&
            <div className="iconWrap">
              <a href="//shang.qq.com/wpa/qunwpa?idkey=52b2576d199ecc5702dd11ac7c42f1a0ec6356659015175ab635e3b21ae4f03c" target="_blank"><i className="icon qq"></i></a>
              <a href="mailto:simpletool@126.com"><i className="icon email"></i></a>
            </div>
          }
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
        Object.assign(config, that.getSomeConfig(height), Config.waterMarkConfig);
        waterMark.mark(config).then(function () {
          that.updateImgurl();
          that.setState({
            lastText: that.state.text
          });
          if (that.state.currentColorIndex === -1 && that.state.defaultColorIndex !== -1){
            that.setState({
              currentColorIndex: that.state.defaultColorIndex
            })
          }
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
    if (!this.validateBeforeDraw(0)) return;

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
    if (!this.validateBeforeDraw(2)) return;
    this.log(this.state.text, 3);

    window.isSupportDownload = 'download' in document.createElement('a');
    if (!window.isSupportDownload) {
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
  handleChangeColor(e){
    var id = e.target.id;
    var that = this;

    this.setState({
      currentColorIndex: id
    }, function(){
      Config.waterMarkConfig.color = that.state.ColorMap[that.state.currentColorIndex][1];
      this.validateBeforeDraw(1) && waterMark.reRendering({
        color: Config.waterMarkConfig.color
      }).then(function () {
        that.updateImgurl();
      });
    })
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
  /**
   * 
   * @param {number} type  0-文字失焦 1-选择颜色 2-保存
   */
  validateBeforeDraw(type) {

    //判断水印文字是否为空
    if (type !== 1 && !this.state.text) {
      message.error('还是写点什么吧~');
      return false;
    }

    //判断是否传图
    if (this.state.imgUrl === DEFAULT_IMG_URL) {
      type === 2 && message.error('请先选择证件图片哦~');
      return false;
    }

    //判断文字是否改变
    if (type === 0 && this.state.text === this.state.lastText) {
      return false;
    }

    return true;
  }
  log(text, logMessageType) {
    Jquery.ajax({
      url: '/api/log',
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        clientType: 1,
        logMessageType: logMessageType,
        logMessageContent: text
      })
    });
  }
}

module.exports = Container;