import React from 'react';
import {Col, Row, Steps} from "antd";
import ReportContentOne from "./content/ReportContentOne";
import ReportContentTwo from "./content/ReportContentTwo";
import {observer} from "mobx-react";

import "./MedicalReport.scss";

const {Step} = Steps;

/**
 * 医疗报告组件
 */
@observer
class MedicalReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Step0: "process",
            Step1: "wait",
            current: 0,
        }
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
                            <Step status={this.state.Step0} title="报告一"/>
                            <Step status={this.state.Step1} title="报告二"/>
                        </Steps>
                        {this.state.current === 0 &&
                            <ReportContentOne
                                onPreStep={this.props.onPreStep}
                                onNextStep={() => this.onChangeSteps(1)}
                            />}
                        {this.state.current === 1 &&
                            <ReportContentTwo
                                onPreStep={() => this.onChangeSteps(0)}
                                onNextStep={this.props.onNextStep}
                            />}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default MedicalReport;