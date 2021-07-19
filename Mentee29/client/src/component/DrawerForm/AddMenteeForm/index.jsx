import {Component} from 'react';
import 'antd/dist/antd.css';
import { Form, Typography, Col, Row, Input, Select, DatePicker} from 'antd'

const { Option } = Select;
const { Title } = Typography;
export default class AddMenteeForm extends Component {
    // componentDidMount() {
    //   this.props.triggerRef(this)
    // }
    render() {
      return (
        <Form layout="vertical" hideRequiredMark>
                <Form.Item>
                <Title level={3}>Mentee Form</Title>
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
                  name="desiredSkills"
                  label="Desired Skills"
                  rules={[
                    {
                      required: true,
                      message: 'please enter your desired skills',
                    },
                  ]}
                >
                  <Input.TextArea rows={4} placeholder="please enter desired skills" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
      );
  }
}
