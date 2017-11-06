import React from 'react';
import styles from './index.less';
import imgUrl from '../../../images/example.jpg';
import { Layout, Form, Input, Button, Row, Col, Menu, Affix } from 'antd';
const { Header, Content, Footer } = Layout;
const FormItem = Form.Item;

class Container extends React.Component {
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
    return (
      <Layout className="p-waterMark" >
        <Affix>
          <Header className="header">
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">水水的证件</Menu.Item>
            </Menu>
          </Header>
        </Affix>
        <Content className="container">
          <Row>
            <Col span={22} offset={1}>
              <div className="content">
                <h1 className="title">水水的证件</h1>
                <p className="desc">加水印操作在本地完成，任何证件信息不会上传到网站，请放心使用</p>

                <Row className="formWrap">
                  <Col sm={{ span: 16, offset: 1 }} xs={{ span: 22, offset: 1 }}>
                    <FormItem
                      label="水印文字"
                      colon={true}
                      {...formItemLayout}>
                      <Input placeholder="此证件进攻办理XX业务使用，他用无效" className="input-word" />
                    </FormItem>
                  </Col>
                  <Col sm={{ span: 2, offset: 1 }} xs={{ span: 22, offset: 1 }} >
                    <FormItem style={{ textAlign: 'right' }}>
                      <Button type="default" className="btn">选择图片</Button>
                    </FormItem>
                  </Col>
                  <Col sm={{ span: 2, offset: 1 }} xs={{ span: 22, offset: 1 }}>
                    <FormItem style={{ textAlign: 'right' }}>
                      <Button type="primary" className="btn">保存水印</Button>
                    </FormItem>
                  </Col>
                </Row>

                <img src={imgUrl} alt="" className="img" />
                <p className="desc">水印效果实时预览</p>
              </div>
            </Col>
          </Row>
        </Content>
        <Footer className="footer">
          浙ICP备17043803号 © 2017 Simple Tool. 联系我们:simpletool@126.com
        </Footer>
      </Layout>
    );
  }
}

module.exports = Container;