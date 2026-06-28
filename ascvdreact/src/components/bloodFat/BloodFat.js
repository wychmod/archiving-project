import React from 'react';
import {Col, Row, Steps} from 'antd';
import {observer} from "mobx-react";
import './BloodFat.scss';
import InformationStore from "../store/InformationStore";
import BloodFatStepOne from "./steps/BloodFatStepOne";
import BloodFatStore from "../store/BloodFatStore";
import BloodFatStepTwo from "./steps/BloodFatStepTwo";
import BloodFatStepThree from "./steps/BloodFatStepThree"


const {Step} = Steps;

/**
 * 血脂亚组分开发组件
 */
@observer
class BloodFat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Step0: "process",
            Step1: "wait",
            Step2: "wait",
            bloodFatContent: {},
            current: 0,
            ac: {}
        }
    }

    /**
     * 传入步骤2的回调函数
     * @value 子函数返回的patient值
     */
    onStepOneNext = (data) => {
        console.log(data)
        data["patient"] = InformationStore.patientContent ? InformationStore.patientContent.id : null;
        const ac = data;
        this.setState({
            ac: ac,
        })
        // BloodFatStore.postBloodLipid(data);
        this.onChangeSteps(1);
    }

    //返回结论值
    onStepThreeNext = (conclusion_img, conclusion) => {
        console.log(conclusion);
        let data = this.state.ac;
        data["conclusion_img"] = conclusion_img;
        data["conclusion"] = conclusion;
        BloodFatStore.postBloodLipid(data);
        this.props.onNextStep(data);
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
                Step2: "wait",
            });
        }
        if (value === 1) {
            this.setState({
                current: value,
                Step0: "finish",
                Step1: "process",
                Step2: "wait",
            });
        }
        if (value === 2) {
            this.setState({
                current: value,
                Step0: "finish",
                Step1: "finish",
                Step2: "process",
            });
        }
    };

    render() {
        return (
            <div className="blood-fat">
                <Row>
                    <Col span={20}>
                        <Steps
                            type="navigation"
                            current={this.state.current}
                            className="site-navigation-steps"
                        >
                            <Step status={this.state.Step0} title="检测信息"/>
                            <Step status={this.state.Step1} title="检验诊断"/>
                            <Step status={this.state.Step2} title="风险评估报告"/>
                        </Steps>
                        {this.state.current === 0 && <BloodFatStepOne onPreStep={this.props.onPreStep} onNextStep={this.onStepOneNext}/>}
                        {this.state.current === 1 && <BloodFatStepTwo onPreStep={() => this.onChangeSteps(0)}  ac={this.state.ac}  onNextStep={() => this.onChangeSteps(2)}/>}
                        {this.state.current === 2 && <BloodFatStepThree onPreStep={() => this.onChangeSteps(1)}  ac={this.state.ac} onNextStep={this.onStepThreeNext}/>}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default BloodFat;