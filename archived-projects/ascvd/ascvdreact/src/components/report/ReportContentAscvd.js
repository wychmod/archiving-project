import React, { Component } from 'react'
import {Col, Row, Steps} from "antd";
import ReportContentOne from "./content/ReportContentOne";
import ReportContentPre from "./content/ReportContentPre";
import {observer} from "mobx-react";
import ReportStore from "../store/ReportStore";
import InformationStore from "../store/InformationStore";
import "./MedicalReport.scss";

const {Step} = Steps;

/**
 * 医疗报告组件
 */
@observer
export default class ReportContentAscvd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Step0: "process",
            Step1: "wait",
            ReportContent:{},
            current: 0,
        }
    }

    /**
     * 传入步骤2的回调函数
     * @value 子函数返回的patient值
     */
    onStepOneNext = (data) => {
        data["patient"] = InformationStore.patientContent ? InformationStore.patientContent.id : null;
        const ReportContents = data;
        this.setState({
            ReportContent: ReportContents,
        })
        ReportStore.postReport(data);
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
            <div className="medical-report">
                <Row>
                    <Col span={20}>
                        <Steps
                            type="navigation"
                            current={this.state.current}
                            className="site-navigation-steps"
                        >
                            <Step status={this.state.Step0} title="报告信息"/>
                            <Step status={this.state.Step1} title="报告内容"/>
                        </Steps>
                        {this.state.current === 0 && <ReportContentPre onPreStep={this.props.onPreStep} onNextStep={this.onStepOneNext}/>}
                        {this.state.current === 1 && <ReportContentOne onPreStep={() => this.onChangeSteps(0)} onNextStep={this.props.onNextStep}/>}
                    </Col>
                </Row>
            </div>
        )
    }
}
