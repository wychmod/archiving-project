import React from 'react';
import {Button, Radio, Checkbox, Form, Input} from 'antd';
import {arrFormat} from "../../../utils/DataFormat";
import './Step.scss';

/**
 * 废弃组件：原本为基本信息组件
 */
class StepOne extends React.Component {

    onFinish = (values) => {
        console.log('Success:', values);
        values.hobby = arrFormat(values.hobby);
        this.props.onStepOneNext(values);
    };
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    onAgeChange = (_, value) => {
        value = Number(value)
        if (value > 130 || value < 0) {
            return Promise.reject("请输入正常范围的年龄")
        }
        return Promise.resolve()
    }

    render() {
        return (
            <div className="step-one">
                <Form
                    name="ascvd"
                    labelCol={{
                        span: 10,
                    }}
                    wrapperCol={{
                        span: 8,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="姓名"
                        name="name"
                        initialValue="未知"
                        rules={[
                            {
                                required: true,
                                message: '请输入患者姓名',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="年龄"
                        name="age"
                        initialValue="18"
                        rules={[
                            {
                                required: true,
                                message: '请输入你的年龄',
                            },
                            {
                                pattern: /^[1-9]\d*$/,
                                message: '格式错误，请输入正整数',
                            },
                            {
                                validator: this.onAgeChange
                            }
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="性别"
                        name="gender"
                        rules={[
                            {
                                required: true,
                            }
                        ]}
                        initialValue="male"
                        wrapperCol={{
                            span: 3,
                        }}
                    >
                        <Radio.Group>
                            <Radio value="male"> 男 </Radio>
                            <Radio value="female"> 女 </Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        name="hobby"
                        label="嗜好"
                        wrapperCol={{
                            span: 2,
                        }}
                    >
                        <Checkbox.Group>
                            <Checkbox value="吸烟" style={{lineHeight: '32px'}}>
                                吸烟
                            </Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 10,
                            span: 8,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            下一步
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default StepOne;