import React from 'react';
import {Button, Form, Input, Select} from "antd";
import {observer} from "mobx-react";
import './GenePolymorphismStep.scss'


/**
 * GenePolymorphism步骤一组件
 */
@observer
class GPStepOne extends React.Component {

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


    render() {
        const apoeType = ["E2/E2", "E2/E3", "E3/E3", "E2/E4", "E3/E4", "E4/E4"]
        const SLCO1B1Type = ["*1a/*1a", "*1a/*1b", "*1b/*1b", "*1a/*5", "*1a/*15", "*1b/*15", "*5/*5", "*5/*15", "*15/*15"]
        const CYP2C19Type = ["*2/*2", "*2/*3", "*3/*3", "*1/*2", "*1/*3", "*2/*17", "*3/*17", "*1/*1", "*1/*17", "*17/*17"]

        return (
            // JSON.stringify(AscvdStore.ascvdContent) === '{}' ? <Skeleton className="blood-fat-skeleton" /> :
            <div className='step-one'>
                <Form
                    name="GenePolymorphism"
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
                        label="他汀类化学药物检测样本类型"
                        name="statin_type"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="他汀类化学药物检测条码号"
                        name="statin_barcode"
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="他汀类化学药物检测样本号"
                        name="statin_number"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="他汀类化学药物检测样本状态"
                        name="statin_status"
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="ApoE 基因型"
                        name="ApoE"
                    >
                        <Select placeholder="请选择患者的ApoE基因型">
                            {apoeType.map((item, i) => {
                                return (
                                    <Select.Option key={i} value={item}>{item}</Select.Option>
                                );
                            })}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="ApoE2 526C"
                        name="ApoE2_526C"
                    >
                        <Select placeholder="请选择患者的ApoE2 526C">
                            <Select.Option value="阳性(+)">阳性(+)</Select.Option>
                            <Select.Option value="阴性">阴性</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="ApoE2 526T"
                        name="ApoE2_526T"
                    >
                        <Select placeholder="请选择患者的ApoE2 526T">
                            <Select.Option value="阳性(+)">阳性(+)</Select.Option>
                            <Select.Option value="阴性">阴性</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="ApoE4 388T"
                        name="ApoE4_388T"
                    >
                        <Select placeholder="请选择患者的ApoE4 388T">
                            <Select.Option value="阳性(+)">阳性(+)</Select.Option>
                            <Select.Option value="阴性">阴性</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="ApoE4 388C"
                        name="ApoE4_388C"
                    >
                        <Select placeholder="请选择患者的ApoE4 388C">
                            <Select.Option value="阳性(+)">阳性(+)</Select.Option>
                            <Select.Option value="阴性">阴性</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="SLCO1B1基因型"
                        name="SLCO1B1"
                    >
                        <Select placeholder="请选择患者的SLCO1B1基因型">
                            {SLCO1B1Type.map((item, i) => {
                                return (
                                    <Select.Option key={i} value={item}>{item}</Select.Option>
                                );
                            })}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="SLCO1B1*1b 388A"
                        name="SLCO1B1_1b_388A"
                    >
                        <Select placeholder="请选择患者的SLCO1B1*1b 388A">
                            <Select.Option value="阳性(+)">阳性(+)</Select.Option>
                            <Select.Option value="阴性">阴性</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="SLCO1B1*1b 388G"
                        name="SLCO1B1_1b_388G"
                    >
                        <Select placeholder="请选择患者的SLCO1B1*1b 388G">
                            <Select.Option value="阳性(+)">阳性(+)</Select.Option>
                            <Select.Option value="阴性">阴性</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="SLCO1B1*5 521T"
                        name="SLCO1B1_5_521T"
                    >
                        <Select placeholder="请选择患者的SLCO1B1*5 521T">
                            <Select.Option value="阳性(+)">阳性(+)</Select.Option>
                            <Select.Option value="阴性">阴性</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="SLCO1B1*5 521C"
                        name="SLCO1B1_5_521C"
                    >
                        <Select placeholder="请选择患者的SLCO1B1*5 521C">
                            <Select.Option value="阳性(+)">阳性(+)</Select.Option>
                            <Select.Option value="阴性">阴性</Select.Option>
                        </Select>
                    </Form.Item>


                    <Form.Item
                        label="氯吡格雷化学药物检测样本类型"
                        name="clopidogrel_type"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="氯吡格雷化学药物检测条码号"
                        name="clopidogrel_barcode"
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="氯吡格雷化学药物检测样本号"
                        name="clopidogrel_number"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="氯吡格雷化学药物检测样本状态"
                        name="clopidogrel_status"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="CYP2C19基因分型"
                        name="CYP2C19"
                    >
                        <Select placeholder="请选择患者的CYP2C19基因分型">
                            {CYP2C19Type.map((item, i) => {
                                return (
                                    <Select.Option key={i} value={item}>{item}</Select.Option>
                                );
                            })}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="CYP2C19-681/*2G"
                        name="CYP2C19_681_2G"
                    >
                        <Select placeholder="请选择患者的CYP2C19-681/*2G">
                            <Select.Option value="阳性(+)">阳性(+)</Select.Option>
                            <Select.Option value="阴性">阴性</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="CYP2C19-681/*2A"
                        name="CYP2C19_681_2A"
                    >
                        <Select placeholder="请选择患者的CYP2C19-681/*2A">
                            <Select.Option value="阳性(+)">阳性(+)</Select.Option>
                            <Select.Option value="阴性">阴性</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="CYP2C19-636/*3G"
                        name="CYP2C19_636_3G"
                    >
                        <Select placeholder="请选择患者的CYP2C19-636/*3G">
                            <Select.Option value="阳性(+)">阳性(+)</Select.Option>
                            <Select.Option value="阴性">阴性</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="CYP2C19-636/*3A"
                        name="CYP2C19_636_3A"
                    >
                        <Select placeholder="请选择患者的CYP2C19-636/*3A">
                            <Select.Option value="阳性(+)">阳性(+)</Select.Option>
                            <Select.Option value="阴性">阴性</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="CYP2C19-806/*17C"
                        name="CYP2C19_806_17C"
                    >
                        <Select placeholder="请选择患者的CYP2C19-806/*17C">
                            <Select.Option value="阳性(+)">阳性(+)</Select.Option>
                            <Select.Option value="阴性">阴性</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="CYP2C19-806/*17T"
                        name="CYP2C19_806_17T"
                    >
                        <Select placeholder="请选择患者的CYP2C19-806/*17T">
                            <Select.Option value="阳性(+)">阳性(+)</Select.Option>
                            <Select.Option value="阴性">阴性</Select.Option>
                        </Select>
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

export default GPStepOne;