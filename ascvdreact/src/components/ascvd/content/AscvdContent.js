import React from 'react';
import {Content} from "antd/es/layout/layout";
import {Col, Row, Steps} from 'antd';
import {observer} from "mobx-react";
import AscvdStepOne from "../steps/AscvdStepOne";
import AscvdStepTwo from "../steps/AscvdStepTwo";
import AscvdStore from "../../store/AscvdStore";
import InformationStore from "../../store/InformationStore";
import AscvdStepThree from "../steps/AscvdStepThree";
import './AscvdContent.scss';
const {Step} = Steps;

/**
 * Ascvd主要内容组件
 */
@observer
class AscvdContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            Step0: "process",
            Step1: "wait",
            Step2:"wait",
            patient: {},
            ac: {}
        }
    }

    /**
     * 传入步骤2的回调函数
     * @value 子函数返回的patient值
     */
    onStepOneNext = (data) => {
        data["patient"] = InformationStore.patientContent ? InformationStore.patientContent.id : null;
        const ac = data;
        this.setState({
            ac: ac,
        })
        this.onChangeSteps(1);
    }

    /**
     * 传入步骤3的回调函数
     * @value 子函数返回的图片和结论值
     */
    onStepTwoNext = (conclusion_img, conclusion) => {
        console.log(conclusion);
        let data = this.state.ac;
        data["conclusion_img"] = conclusion_img;
        data["conclusion"] = conclusion;
        AscvdStore.postAscvdTesting(data);
        this.onChangeSteps(2);
    }

    onStepThreeNext = (values) => {
        this.props.AscvdSubmit(values);
    }

    /**
     * 步骤条判断函数
     */
    onChangeSteps = (value) => {
        console.log('onChange:', value);
        if (value === 0) {
            this.setState({
                current: value,
                Step0: "process",
                Step1: "wait",
                Step2:"wait",
            });
        }
        if (value === 1) {
            this.setState({
                current: value,
                Step0: "finish",
                Step1: "process",
                Step2:"wait",
            });
        }
        if (value === 2) {
            this.setState({
                current: value,
                Step0: "finish",
                Step1: "finish",
                Step2:"process",
            });
        }
    };

    render() {

        return (
            <Content className="ascvd-content">
                <Row className="ascvd-content-row">
                    <Col span={20}>
                        <Steps
                            type="navigation"
                            current={this.state.current}
                            className="site-navigation-steps"
                        >
                            <Step status={this.state.Step0} title="检测信息"/>
                            <Step status={this.state.Step1} title="风险评估结果"/>
                            <Step status={this.state.Step2} title="检验诊断"/>
                        </Steps>
                        {this.state.current === 0 && <AscvdStepOne onStepTwoNext={this.onStepOneNext} onPreStep={this.props.onPreStep}/>}
                        {this.state.current === 1 && <AscvdStepTwo onStepTwoNext={ this.onStepTwoNext} ac={this.state.ac} onPreStep={() => this.onChangeSteps(0)}/>}
                        {this.state.current === 2 && <AscvdStepThree onStepTreeNext={this.onStepThreeNext} ac={this.state.ac} onPreStep={() => this.onChangeSteps(1)} />}
                    </Col>
                </Row>
            </Content>
        )
    }
}

export default AscvdContent;