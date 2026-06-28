import React from 'react';
import {Button, Descriptions, Form} from "antd";
import {observer} from "mobx-react";
import InformationStore from "../../store/InformationStore";

import "./BloodFatStep.scss"
/**
 * BloodFat 步骤二组件
 */
@observer
class BloodFatStepTwo extends React.Component {
    // 进行上一步操作
    onPreStep = () => {
        this.props.onPreStep();
    }

    //进行表单提交的操作
    onFinish = (values) => {
        this.props.onNextStep(values);
    };

    // 表单提交失败时的操作
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render() {
        const BloodLipidContent = this.props.ac
        return (
            <div className="step-two">
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
                    <Descriptions title="检验诊断：" bordered column={3} className="step-two-Description">
                        <Descriptions.Item className="step-two-item">
                            项目
                        </Descriptions.Item>
                        <Descriptions.Item className="step-two-item">
                            值
                        </Descriptions.Item>
                        <Descriptions.Item className="step-two-item">
                            诊断结论
                        </Descriptions.Item>

                        <Descriptions.Item>
                            胆固醇(TC)
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {JSON.stringify(BloodLipidContent) !== '{}' && BloodLipidContent.tc ? BloodLipidContent.tc +"mmol/L": ""}
                        </Descriptions.Item>
                        <Descriptions.Item>
                        </Descriptions.Item>

                        <Descriptions.Item>
                            高密度脂蛋白胆固醇(HDL-C)
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {JSON.stringify(BloodLipidContent) !== '{}' && BloodLipidContent.HDL_C ? BloodLipidContent.HDL_C +"mmol/L": ""}
                        </Descriptions.Item>
                        <Descriptions.Item>
                        </Descriptions.Item>

                        <Descriptions.Item>
                            低密度脂蛋白胆固醇(LDL-C)
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {JSON.stringify(BloodLipidContent) !== '{}' && BloodLipidContent.LDL_C ? BloodLipidContent.LDL_C +"mmol/L": ""}
                        </Descriptions.Item>
                        <Descriptions.Item>
                        </Descriptions.Item>

                        <Descriptions.Item>
                            非高密度脂蛋白胆固醇(non-HDL)
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {JSON.stringify(BloodLipidContent) !== '{}' && BloodLipidContent.non_HDL ? BloodLipidContent.non_HDL +"mmol/L": ""}
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {JSON.stringify(BloodLipidContent) !== '{}' && BloodLipidContent.non_HDL>=4.14 ?
                            "致动脉粥样硬化性脂蛋白胆固醇增加，请结合临床" : ""}
                        </Descriptions.Item>

                        <Descriptions.Item>
                            <span>低密度脂蛋白亚型<sub>4+3+2+1</sub>胆固醇</span>
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {JSON.stringify(BloodLipidContent) !== '{}' && BloodLipidContent.LDL_4321 ? BloodLipidContent.LDL_4321 +"mmol/L": ""}
                        </Descriptions.Item>
                        <Descriptions.Item>
                        </Descriptions.Item>

                        <Descriptions.Item>
                            中间密度脂蛋白胆固醇(IDL)
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {JSON.stringify(BloodLipidContent) !== '{}' && BloodLipidContent.IDL ? BloodLipidContent.IDL +"mmol/L": ""}
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {JSON.stringify(BloodLipidContent) !== '{}' && BloodLipidContent.IDL && BloodLipidContent.IDL>=0.52 ?
                            "周围动脉粥样硬化可能性增加，请结合临床" : ""}
                        </Descriptions.Item>

                        <Descriptions.Item>
                            极低密度脂蛋白胆固醇(VLDL)
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {JSON.stringify(BloodLipidContent) !== '{}' && BloodLipidContent.VLDL ? BloodLipidContent.VLDL +"mmol/L" : ""}
                        </Descriptions.Item>
                        <Descriptions.Item>
                        </Descriptions.Item>

                        <Descriptions.Item>
                            高密度脂蛋白2(HDL2)
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {JSON.stringify(BloodLipidContent) !== '{}' && BloodLipidContent.HDL2 ? BloodLipidContent.HDL2 +"mmol/L" : ""}
                        </Descriptions.Item>
                        <Descriptions.Item>
                        </Descriptions.Item>

                        <Descriptions.Item>
                            高密度脂蛋白3(HDL3)
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {JSON.stringify(BloodLipidContent) !== '{}' && BloodLipidContent.HDL3 ? BloodLipidContent.HDL3 +"mmol/L" : ""}
                        </Descriptions.Item>
                        <Descriptions.Item>
                        </Descriptions.Item>

                        <Descriptions.Item>
                            残粒样脂蛋白胆固醇(RLP-C)
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {JSON.stringify(BloodLipidContent) !== '{}' && BloodLipidContent.RLP_C ? BloodLipidContent.RLP_C +"mmol/L": ""}
                        </Descriptions.Item>
                        <Descriptions.Item>
                        </Descriptions.Item>

                        <Descriptions.Item>
                            <span>极低密度脂蛋白<sub>3</sub>(VLDL<sub>3</sub>)</span>
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {JSON.stringify(BloodLipidContent) !== '{}' && BloodLipidContent.VLDL3 ? BloodLipidContent.VLDL3 +"mmol/L": ""}
                        </Descriptions.Item>
                        <Descriptions.Item>
                        </Descriptions.Item>

                        <Descriptions.Item>
                            小而密低密度脂蛋白胆固醇(sdLDL-C)
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {JSON.stringify(BloodLipidContent) !== '{}' && BloodLipidContent.sdLDL_C ? BloodLipidContent.sdLDL_C +"mmol/L": ""}
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {
                                ((JSON.stringify(InformationStore.patientContent) !== '{}' && InformationStore.patientContent.gender === "male"
                                && JSON.stringify(BloodLipidContent) !== '{}' && BloodLipidContent.sdLDL_C > 1.393)
                                ||
                                (JSON.stringify(InformationStore.patientContent) !== '{}' && InformationStore.patientContent.gender === "female"
                                && JSON.stringify(BloodLipidContent) !== '{}' && BloodLipidContent.sdLDL_C > 1.109))
                                ? "动脉粥样硬化性心血管疾病风险可能增加，请结合临床" : ""
                            }
                        </Descriptions.Item>

                        <Descriptions.Item>
                            低密度脂蛋白类型(LDL type)
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {JSON.stringify(BloodLipidContent) !== '{}' ? BloodLipidContent.LDL_type ? BloodLipidContent.LDL_type+ "型" : "" : ""}
                        </Descriptions.Item>
                        <Descriptions.Item>
                        </Descriptions.Item>

                        <Descriptions.Item>
                            低密度脂蛋白颗粒(LDL_P)
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {JSON.stringify(BloodLipidContent) !== '{}' && BloodLipidContent.LDL_P ? BloodLipidContent.LDL_P  +"mmol/L": ""}
                        </Descriptions.Item>
                        <Descriptions.Item>
                        </Descriptions.Item>

                    </Descriptions>

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

export default BloodFatStepTwo;