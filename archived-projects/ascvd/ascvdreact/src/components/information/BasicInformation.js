import React from 'react';
import {Button, Radio, Form, Input, Row, Col, Select} from 'antd';
import {PageHeader} from 'antd';
import {v4 as uuidv4} from 'uuid';
import InformationStore from "../store/InformationStore";
import {arrFormat} from "../../utils/DataFormat";
import './BasicInformation.scss';

const {Option} = Select;
/**
 * 基本信息的组件
 */
class BasicInformation extends React.Component {
    constructor(props) {
        super(props);
        InformationStore.fetchChronicDD();
        InformationStore.fetchHistoryDD();
    }

    onFinish = (values) => {
        values.chronic_illness = arrFormat(values.chronic_illness);
        values.ascvd_history = arrFormat(values.ascvd_history);
        this.props.onInformationNext(values);
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
            <div className="basic-information">
                <Row>
                    <Col offset={7}>
                        <PageHeader
                            title="基本信息"
                            subTitle="请按要求填入患者信息。"
                        />
                    </Col>
                </Row>
                <Form
                    name="ascvd"
                    labelCol={{
                        span: 7,
                    }}
                    wrapperCol={{
                        span: 6,
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
                            span: 4,
                        }}
                    >
                        <Radio.Group>
                            <Radio value="male"> 男 </Radio>
                            <Radio value="female"> 女 </Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        name="BMI"
                        label="BMI"
                        rules={[
                            {
                                pattern: new RegExp(/^(([^0][0-9]+|0)\.([0-9]{1,2})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,2})$)|^(([1-9]+)$)/, 'g'),
                                message: '格式错误，请输入正常数字（可以包含两位小数）',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="blood_pressure"
                        label="血压"
                        rules={[
                            {
                                pattern: new RegExp(/^(([^0][0-9]+|0)\.([0-9]{1,2})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,2})$)|^(([1-9]+)$)/, 'g'),
                                message: '格式错误，请输入正常数字（可以包含两位小数）',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="吸烟史"
                        name="smoked"
                        rules={[
                            {
                                required: true,
                            }
                        ]}
                        initialValue="N"
                        wrapperCol={{
                            span: 4,
                        }}
                    >
                        <Radio.Group>
                            <Radio value="N"> 否 </Radio>
                            <Radio value="Y"> 是 </Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="患者编号"
                        name="uid"
                        initialValue={uuidv4().replaceAll('-', '')}
                    >
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item
                        label="病区"
                        name="inpatient_area"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="科室"
                        name="department"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="采样者"
                        name="sampler"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="送检医生"
                        name="submitting_doctor"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="临床诊断"
                        name="clinical_diagnosis"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="医嘱申请项目"
                        name="application_items"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="chronic_illness"
                        label="慢性病史"
                    >
                        <Select mode="multiple" placeholder="请选择患者的慢性病史">
                            {InformationStore.ChronicDD.map((item, i) => {
                                return (
                                    <Option key={i} value={item.disease}>{item.disease}</Option>
                                );
                            })}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="ascvd_history"
                        label="ASCVD病史"
                    >
                        <Select mode="multiple" placeholder="请选择患者的ASCVD病史">
                            {InformationStore.HistoryDD.map((item, i) => {
                                return (
                                    <Option key={i} value={item.disease}>{item.disease}</Option>
                                );
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 8,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            保存
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default BasicInformation;