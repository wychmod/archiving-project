import React, { Component } from 'react'
import {Form, Input, DatePicker, Button} from "antd";
import {observer} from "mobx-react";
import {formatDate} from "../../../utils/DataFormat";
import "./ReportContent.scss";

/**
 * 报告信息组件
 */
@observer
export default class ReportContentPre extends Component {
        // 进行上一步操作
        onPreStep = () => {
            this.props.onPreStep();
        }

        // 进行表单提交的操作
        onFinish = (values) => {
            values.Acq_time = formatDate(values.Acq_time)
            values.Rec_time = formatDate(values.Rec_time)
            values.Rep_time = formatDate(values.Rep_time)
            console.log(values)
            this.props.onNextStep(values);
        };

        // 表单提交失败时的操作
        onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };

    render() {
        return (
          <div className="reportcontent-pre">
            <Form
                name="report-pre"
                labelCol={{
                  span: 10,
                }}
                wrapperCol={{
                  span: 7,
                }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
                autoComplete="off"
            >

                <Form.Item
                    label="采集时间"
                    name="Acq_time"
                    rules={[
                        {
                            required: true,
                            message: '请输入样本采集时间',
                        },
                    ]}
                >
                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                </Form.Item>
                <Form.Item
                    label="接收时间"
                    name="Rec_time"
                    rules={[
                        {
                            required: true,
                            message: '请输入样本接收时间',
                        },
                    ]}
                >
                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                </Form.Item>
                <Form.Item
                    label="报告时间"
                    name="Rep_time"
                    rules={[
                        {
                            required: true,
                            message: '请输入报告时间',
                        },
                    ]}
                >
                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                </Form.Item>
                <Form.Item
                    label="检验者"
                    name="doctor_test"
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="报告(审核)者"
                    name="doctor_exam"
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="医院地址"
                    name="address"
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="联系电话"
                    name="mobile"
                    rules={[
                        {
                            pattern: /^1[3-9][0-9]{9}$/,
                            message: '请输入正确格式联系电话',
                        },
                    ]}

                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 10,
                        span: 8,
                    }}
                >
                    <Button type="primary" onClick={() => this.props.onPreStep()} className="step-two-button">
                        上一步
                    </Button>
                    <Button type="primary" htmlType="submit">
                            保存
                    </Button>
                </Form.Item>

            </Form>

          </div>
        )
  }
}