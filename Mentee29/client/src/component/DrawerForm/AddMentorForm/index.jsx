import {Component} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Typography, Col, Row, Input, Select, DatePicker} from 'antd'

const { Option } = Select;
const { Title } = Typography;

export default class AddMentorForm extends Component {
    // componentDidMount() {
    //   this.props.triggerRef(this)
    // }
    render() {
      return (
        <Form layout="vertical" hideRequiredMark>
                <Form.Item>
                  <Title level={3}>Mentor Form</Title>
                </Form.Item>
            <Row gutter={16}>
            <Col span={12}>
                <Form.Item
                  name="gender"
                  label="Gender"
                  rules={[{ required: true, message: 'Please select your gender' }]}
                >
                  <Select placeholder="Please select your gender">
                    <Option value="male">Male</Option>
                    <Option value="Female">Female</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="birthday"
                  label="Birthday"
                  rules={[{ required: true, message: 'Please choose your birthday' }]}
                >
                  <DatePicker
                    style={{ width: '100%' }}
                    getPopupContainer={trigger => trigger.parentElement}
                  />
                </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="primarySkills"
                  label="Primary Skills"
                  rules={[
                    {
                      required: true,
                      message: 'please enter your primary skills',
                    },
                  ]}
                >
                  <Input.TextArea rows={4} placeholder="please enter primary skills" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
      );
  }
}
