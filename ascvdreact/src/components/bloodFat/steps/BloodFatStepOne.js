import React from 'react';
import {Alert, Button, Col, Form, Input, Row, Select} from "antd";
import {observer} from "mobx-react";
import './BloodFatStep.scss'


/**
 * bloodFat步骤一组件
 */
@observer
class BloodFatStepOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tcAlter: false,
            tgAlter: false,
            hdlAlter: false,
        }

    }
    // 进行上一步操作
    onPreStep = () => {
        this.props.onPreStep();
    }

    // 进行表单提交的操作
    onFinish = (values) => {
        this.props.onNextStep(values);
    };

    // 表单提交失败时的操作
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // 逻辑弹窗
    onTcChange = (_, value, callback) => {
        value = Number(value)
        if (value > 5.72) {
            this.setState({
                tcAlter: true
            })
            return Promise.resolve()
        }
        // 当值正常时取消弹窗
        if (value <= 5.72 && this.state.tcAlter) {
            this.setState({
                tcAlter: false
            })
            return Promise.resolve()
        }
        return Promise.resolve()
    }

    onTCClose = () => {
        this.setState({
            tcAlter: false
        })
    }

    onTgChange = (_, value) => {
        value = Number(value)
        if (value > 1.7) {
            this.setState({
                tgAlter: true
            })
            return Promise.resolve()
        }
        // 当值正常时取消弹窗
        if (value <= 1.7 && this.state.tgAlter) {
            this.setState({
                tgAlter: false
            })
            return Promise.resolve()
        }
        return Promise.resolve()
    }

    onTgClose = () => {
        this.setState({
            tgAlter: false
        })
    }

    onHdlChange = (_, value) => {
        value = Number(value)
        if (value < 0.9) {
            this.setState({
                hdlAlter: true
            })
            return Promise.resolve()
        }
        // 当值正常时取消弹窗
        if (value >= 0.9 && this.state.hdlAlter) {
            this.setState({
                hdlAlter: false
            })
            return Promise.resolve()
        }
        return Promise.resolve()
    }

    onHdlClose = () => {
        this.setState({
            hdlAlter: false
        })
    }

    render() {
        return (

            <div className='step-one'>
                <Form
                    name="bloodFat"
                    labelCol={{
                        span: 12,
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
                        label="血脂与脂蛋白检测样本类型"
                        name="Lipid_lipoprotein_type"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="血脂与脂蛋白检测样条码号"
                        name="Lipid_lipoprotein_barcode"
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="血脂与脂蛋白检测样本号"
                        name="Lipid_lipoprotein_number"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="血脂与脂蛋白检测样本状态"
                        name="Lipid_lipoprotein_status"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="甘油三酯(TG)"
                        name="tg"
                        tooltip="甘油三酯:儿童<1.13mmoL/L 成人0.56 ~ 1.70mmol/L"
                        initialValue="1.7"
                        rules={[
                            {
                                required: true,
                                message: '请输入甘油三酯(TG)',
                            },
                            {
                                pattern: new RegExp(/^(([^0][0-9]+|0)\.([0-9]{1,2})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,2})$)|^(([1-9]+)$)/, 'g'),
                                message: '格式错误，请输入正常数字（可以包含两位小数）',
                            },
                            {
                                validator: this.onTgChange
                            }
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    {this.state.tgAlter &&
                        <Row>
                            <Col span={8} offset={12}>
                                <Alert message="甘油三酯（TG）偏高" type="warning" closable
                                       onClose={this.onTgClose} className='step-two-alert'/>
                            </Col>
                        </Row>}

                    <Form.Item
                        label="载脂蛋白 A1"
                        name="Apo_A1"
                        rules={[
                            {
                                pattern: new RegExp(/^(([^0][0-9]+|0)\.([0-9]{1,2})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,2})$)|^(([1-9]+)$)/, 'g'),
                                message: '格式错误，请输入正常数字（可以包含两位小数）',
                            }
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="载脂蛋白 B"
                        name="Apo_B"
                        rules={[
                            {
                                pattern: new RegExp(/^(([^0][0-9]+|0)\.([0-9]{1,2})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,2})$)|^(([1-9]+)$)/, 'g'),
                                message: '格式错误，请输入正常数字（可以包含两位小数）',
                            }
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="脂蛋白（a）"
                        name="LP_a"
                        rules={[
                            {
                                pattern: new RegExp(/^(([^0][0-9]+|0)\.([0-9]{1,2})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,2})$)|^(([1-9]+)$)/, 'g'),
                                message: '格式错误，请输入正常数字（可以包含两位小数）',
                            }
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="血脂亚组分检测样本类型"
                        name="blood_type"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="血脂亚组分检测样条码号"
                        name="blood_barcode"
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="血脂亚组分检测样本号"
                        name="blood_number"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="血脂亚组分检测样本状态"
                        name="blood_status"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="总胆固醇(TC)"
                        name="tc"
                        tooltip="正常血脂:总胆固醇:2.8 ~ 6.5mmol / L"
                        initialValue="5.2"
                        rules={[
                            {
                                required: true,
                                message: '请输入总胆固醇(TC)',
                            },
                            {
                                pattern: new RegExp(/^(([^0][0-9]+|0)\.([0-9]{1,2})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,2})$)|^(([1-9]+)$)/, 'g'),
                                message: '格式错误，请输入正常数字（可以包含两位小数）',
                            },
                            {
                                validator: this.onTcChange
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    {this.state.tcAlter &&
                        <Row>
                            <Col span={8} offset={12}>
                                <Alert message="胆固醇（TC）偏高" type="warning" closable
                                       onClose={this.onTCClose} className='step-two-alert'/>
                            </Col>
                        </Row>}

                    <Form.Item
                        label="高密度脂蛋白胆固醇(HDL-C)"
                        name="HDL_C"
                        tooltip="高密度脂蛋白胆固醇:男性:0.96 ~ 1.15mmol/L 女:0.90 ~ 1.55mmol/L"
                        initialValue="1.15"
                        rules={[
                            {
                                required: true,
                                message: '请输入高密度脂蛋白胆固醇(HDL-C)',
                            },
                            {
                                pattern: new RegExp(/^(([^0][0-9]+|0)\.([0-9]{1,2})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,2})$)|^(([1-9]+)$)/, 'g'),
                                message: '格式错误，请输入正常数字（可以包含两位小数）',
                            },
                            {
                                validator: this.onHdlChange
                            }
                        ]}
                    >
                        <Input/>

                    </Form.Item>

                    {this.state.hdlAlter &&
                        <Row>
                            <Col span={8} offset={12}>
                                <Alert message="高密度脂蛋白胆固醇（HDL-C）偏低" type="warning" closable
                                       onClose={this.onHdlClose} className='step-two-alert'/>
                            </Col>
                        </Row>}


                    <Form.Item
                        label="低密度脂蛋白胆固醇(LDL-C)"
                        name="LDL_C"
                        tooltip="低密度脂蛋白胆固醇(LDL-C):0 ~ 3.1 mmol/L"
                        initialValue={""}
                        rules={[
                            {
                                pattern: new RegExp(/^(([^0][0-9]+|0)\.([0-9]{1,2})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,2})$)|^(([1-9]+)$)/, 'g'),
                                message: '格式错误，请输入正常数字（可以包含两位小数）',
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="非高密度脂蛋白胆固醇(non-HDL)"
                        name="non_HDL"
                        initialValue={""}
                        rules={[
                            {
                                pattern: new RegExp(/^(([^0][0-9]+|0)\.([0-9]{1,2})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,2})$)|^(([1-9]+)$)/, 'g'),
                                message: '格式错误，请输入正常数字（可以包含两位小数）',
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={<span>低密度脂蛋白亚型<sub>4+3+2+1</sub>胆固醇</span>}
                        name="LDL_4321"
                        initialValue=""
                        rules={[
                            {
                                pattern: new RegExp(/^(([^0][0-9]+|0)\.([0-9]{1,2})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,2})$)|^(([1-9]+)$)/, 'g'),
                                message: '格式错误，请输入正常数字（可以包含两位小数）',
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        label="中间密度脂蛋白胆固醇(IDL)"
                        name="IDL"
                        initialValue=""
                        rules={[
                            {
                                pattern: new RegExp(/^(([^0][0-9]+|0)\.([0-9]{1,2})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,2})$)|^(([1-9]+)$)/, 'g'),
                                message: '格式错误，请输入正常数字（可以包含两位小数）',
                            }
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="极低密度脂蛋白胆固醇(VLDL)"
                        name="VLDL"
                        initialValue=""
                        rules={[
                            {
                                pattern: new RegExp(/^(([^0][0-9]+|0)\.([0-9]{1,2})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,2})$)|^(([1-9]+)$)/, 'g'),
                                message: '格式错误，请输入正常数字（可以包含两位小数）',
                            }
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="高密度脂蛋白2(HDL2)"
                        name="HDL2"
                        initialValue=""
                        rules={[
                            {
                                pattern: new RegExp(/^(([^0][0-9]+|0)\.([0-9]{1,2})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,2})$)|^(([1-9]+)$)/, 'g'),
                                message: '格式错误，请输入正常数字（可以包含两位小数）',
                            }
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="高密度脂蛋白3(HDL3)"
                        name="HDL3"
                        initialValue=""
                        rules={[
                            {
                                pattern: new RegExp(/^(([^0][0-9]+|0)\.([0-9]{1,2})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,2})$)|^(([1-9]+)$)/, 'g'),
                                message: '格式错误，请输入正常数字（可以包含两位小数）',
                            }
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="残粒样脂蛋白胆固醇(RLP-C)"
                        name="RLP_C"
                        initialValue=""
                        rules={[
                            {
                                pattern: new RegExp(/^(([^0][0-9]+|0)\.([0-9]{1,2})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,2})$)|^(([1-9]+)$)/, 'g'),
                                message: '格式错误，请输入正常数字（可以包含两位小数）',
                            }
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label={<span>极低密度脂蛋白<sub>3</sub>(VLDL<sub>3</sub>)</span>}
                        name="VLDL3"
                        initialValue=""
                        rules={[
                            {
                                pattern: new RegExp(/^(([^0][0-9]+|0)\.([0-9]{1,2})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,2})$)|^(([1-9]+)$)/, 'g'),
                                message: '格式错误，请输入正常数字（可以包含两位小数）',
                            }
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="小而密低密度脂蛋白胆固醇(sdLDL-C)"
                        name="sdLDL_C"
                        initialValue=""
                        rules={[
                            {
                                pattern: new RegExp(/^(([^0][0-9]+|0)\.([0-9]{1,3})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,3})$)|^(([1-9]+)$)/, 'g'),
                                message: '格式错误，请输入正常数字（可以包含三位小数）',
                            }
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="低密度脂蛋白类型(LDL type)"
                        name="LDL_type"
                    >
                        <Select placeholder="请选择患者的低密度脂蛋白类型">
                            <Select.Option value="A">A型</Select.Option>
                            <Select.Option value="B">B型</Select.Option>
                            <Select.Option value="A\B">A\B型</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="低密度脂蛋白颗粒(LDL_P)"
                        name="LDL_P"
                        initialValue=""
                        rules={[
                            {
                                pattern: new RegExp(/^(([^0][0-9]+|0)\.([0-9]{1,2})$)|^(([^0][0-9]+|0)$)|^(([1-9]+)\.([0-9]{1,2})$)|^(([1-9]+)$)/, 'g'),
                                message: '格式错误，请输入正常数字（可以包含两位小数）',
                            }
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 12,
                            span: 8,
                        }}
                    >
                        <Button type="primary" onClick={this.onPreStep} className="step-one-button">
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

export default BloodFatStepOne;