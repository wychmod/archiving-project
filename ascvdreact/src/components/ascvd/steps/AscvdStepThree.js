import React from 'react';
import {Button, Descriptions, Form} from "antd";
import {observer} from "mobx-react";
import "./Step.scss"

/**
 *综合报告组件
 */
@observer
class AscvdStepThree extends React.Component {

    onFinish = (values) => {
        this.props.onStepTreeNext(values);
    };

    render() {
        const ascvdContent = this.props.ac
        return (
            <div className="step-four">
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
                    {ascvdContent &&
                        <Descriptions title="诊断报告：" bordered column={5} className="step-three-Description">
                            <Descriptions.Item className="step-four-item">
                                项目
                            </Descriptions.Item>
                            <Descriptions.Item className="step-four-item">
                                值
                            </Descriptions.Item>
                            <Descriptions.Item className="step-four-item">
                                诊断结论
                            </Descriptions.Item>
                            <Descriptions.Item className="step-four-item">
                                数值范围
                            </Descriptions.Item>
                            <Descriptions.Item className="step-four-item">
                                单位
                            </Descriptions.Item>

                            <Descriptions.Item>
                                胆固醇(TC)
                            </Descriptions.Item>
                            <Descriptions.Item>
                                {ascvdContent.tc}
                            </Descriptions.Item>
                            <Descriptions.Item>
                                {ascvdContent.tc>5.72&&ascvdContent.tg<1.7 ? "高胆固醇血症":"正常"}
                            </Descriptions.Item>
                            <Descriptions.Item>
                                3.10-5.72
                            </Descriptions.Item>
                            <Descriptions.Item>
                                mmol/L
                            </Descriptions.Item>

                            <Descriptions.Item>
                                甘油三酯(TG)
                            </Descriptions.Item>
                            <Descriptions.Item>
                                {ascvdContent.tg}
                            </Descriptions.Item>
                            <Descriptions.Item>
                                {ascvdContent.tg>1.7 ? ascvdContent.tc<5.72 ? "高甘油三酯血":"混合型高脂血症":"正常"}
                            </Descriptions.Item>
                            <Descriptions.Item>
                                0.40-1.70
                            </Descriptions.Item>
                            <Descriptions.Item>
                                mmol/L
                            </Descriptions.Item>

                            <Descriptions.Item>
                                高密度脂蛋白胆固醇(HDL-C)
                            </Descriptions.Item>
                            <Descriptions.Item>
                                {ascvdContent.HDL_C}
                            </Descriptions.Item>
                            <Descriptions.Item>
                                {ascvdContent.HDL_C<0.9 ? "低高密度脂蛋白胆固醇血症":"正常"}
                            </Descriptions.Item>
                            <Descriptions.Item>
                                1.0-2.1
                            </Descriptions.Item>
                            <Descriptions.Item>
                                mmol/L
                            </Descriptions.Item>

                            <Descriptions.Item>
                                低密度脂蛋白胆固醇(LDL-C)
                            </Descriptions.Item>
                            <Descriptions.Item>
                                {ascvdContent.LDL_C}
                            </Descriptions.Item>
                            <Descriptions.Item>
                            </Descriptions.Item>
                            <Descriptions.Item>
                                0-3.37
                            </Descriptions.Item>
                            <Descriptions.Item>
                                mmol/L
                            </Descriptions.Item>

                            <Descriptions.Item>
                                非高密度脂蛋白胆固醇(non-HDL)
                            </Descriptions.Item>
                            <Descriptions.Item>
                                {ascvdContent.non_HDL}
                            </Descriptions.Item>
                            <Descriptions.Item>
                            </Descriptions.Item>
                            <Descriptions.Item>
                            </Descriptions.Item>
                            <Descriptions.Item>
                            </Descriptions.Item>

                            <Descriptions.Item>
                                载脂蛋白 A1(Apo A1)
                            </Descriptions.Item>
                            <Descriptions.Item>
                                {ascvdContent.Apo_A1}
                            </Descriptions.Item>
                            <Descriptions.Item>
                            </Descriptions.Item>
                            <Descriptions.Item>
                            </Descriptions.Item>
                            <Descriptions.Item>
                            </Descriptions.Item>

                            <Descriptions.Item>
                                载脂蛋白 B(Apo B)
                            </Descriptions.Item>
                            <Descriptions.Item>
                                {ascvdContent.Apo_B}
                            </Descriptions.Item>
                            <Descriptions.Item>
                            </Descriptions.Item>
                            <Descriptions.Item>
                            </Descriptions.Item>
                            <Descriptions.Item>
                            </Descriptions.Item>

                            <Descriptions.Item>
                                脂蛋白（a）(LP(a）)
                            </Descriptions.Item>
                            <Descriptions.Item>
                                {ascvdContent.LP_a}
                            </Descriptions.Item>
                            <Descriptions.Item>
                            </Descriptions.Item>
                            <Descriptions.Item>
                            </Descriptions.Item>
                            <Descriptions.Item>
                            </Descriptions.Item>

                            <Descriptions.Item>
                                ASCVD危险评估结论：
                            </Descriptions.Item>
                            <Descriptions.Item className="step-four-item-center">
                                {ascvdContent.conclusion}
                            </Descriptions.Item>

                        </Descriptions>}

                    <Descriptions title="数值参考范围：" column={1} className="step-four-Description">
                        <Descriptions.Item label="TC>5.72mmol/L且TG<1.70mmol/L">
                            高胆固醇血症
                        </Descriptions.Item>
                        <Descriptions.Item label="TC<5.72mmol/L且TG>1.70mmol/L">
                            高甘油三酯血症
                        </Descriptions.Item>
                        <Descriptions.Item label="TC＞5.72mmol/L且TG＞1.70mmol/L">
                            混合型高脂血症
                        </Descriptions.Item>
                        <Descriptions.Item label="HDL-C＜0.90 mmol/L">
                            低高密度脂蛋白胆固醇血症
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

export default AscvdStepThree;