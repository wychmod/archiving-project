import React from 'react';
import {Col, Row, Steps} from 'antd';
import {observer} from "mobx-react";
import GenePolymorphismStore from "../store/GenePolymorphismStore";
import GPStepOne from "./steps/GPStepOne";
import InformationStore from "../store/InformationStore";
import "./GenePolymorphism.scss";
import GPStepTwo from "./steps/GPStepTwo";


const {Step} = Steps;

/**
 * 基因多态性分开发组件
 */
@observer
class GenePolymorphism extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Step0: "process",
            Step1: "wait",
            genePolymorphismContent: {},
            current: 0,
        }
    }

    /**
     * 传入步骤2的回调函数
     * @value 子函数返回的patient值
     */
    onStepOneNext = (data) => {
        data["patient"] = InformationStore.patientContent ? InformationStore.patientContent.id : null;
        const genePolymorphismContent = data;
        this.setState({
            genePolymorphismContent: genePolymorphismContent,
        })
        GenePolymorphismStore.postGenePolymorphism(data);
        this.onChangeSteps(1);
    }

    /**
     * 步骤条判断函数
     */
    onChangeSteps = (value) => {
        if (value === 0) {
            this.setState({
                current: value,
                Step0: "process",
                Step1: "wait",
            });
        }
        if (value === 1) {
            this.setState({
                current: value,
                Step0: "finish",
                Step1: "process",
            });
        }
    };

    render() {
        return (
            <div className="gene-polymorphism">
                <Row>
                    <Col span={20}>
                        <Steps
                            type="navigation"
                            current={this.state.current}
                            className="site-navigation-steps"
                        >
                            <Step status={this.state.Step0} title="检测信息"/>
                            <Step status={this.state.Step1} title="检验诊断"/>
                        </Steps>
                        {this.state.current === 0 && <GPStepOne onPreStep={this.props.onPreStep} onNextStep={this.onStepOneNext}/>}
                        {this.state.current === 1 && <GPStepTwo onPreStep={() => this.onChangeSteps(0)} onNextStep={this.props.onNextStep}/>}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default GenePolymorphism;