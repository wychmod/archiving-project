import React from 'react';
import {Button, Skeleton, Descriptions, Form} from "antd";
import {observer} from "mobx-react";
import "./GenePolymorphismStep.scss"
import GenePolymorphismStore from "../../store/GenePolymorphismStore";

/**
 * GenePolymorphism 步骤二组件
 */
@observer
class GPStepTwo extends React.Component {

    onFinish = (values) => {
        this.props.onNextStep();
    };

    ApoEConclusion = (text) => {
        if (text === "E2/E2" || text === "E2/E3")
            return "他汀类药物相关基因检测：提示他汀药物降脂疗效较好,请结合临床"
        if (text === "E3/E3" || text === "E2/E4")
            return "他汀类药物相关基因检测：提示他汀药物降脂疗效正常,请结合临床"
        if (text === "E3/E4" || text === "E4/E4")
            return "他汀类药物相关基因检测：提示他汀药物降脂疗效较差,请结合临床"
        return ""
    }

    SLCO1B1Conclusion = (text) => {
        if (text === "*1a/*1a" || text === "*1a/*1b" || text === "*1b/*1b")
            return "他汀类药物相关基因检测：提示肌病风险同一般人群，请结合临床"
        if (text === "*1a/*5" || text === "*1a/*15" || text === "*1b/*15")
            return "他汀类药物相关基因检测：提示中度肌病风险，请结合临床"
        if (text === "*5/*5" || text === "*5/*15" || text === "*15/*15")
            return "他汀类药物相关基因检测：提示高度肌病风险，请结合临床"
        return ""
    }

    CYP2C19Conclusion = (text) => {
        if (text === "*2/*2" || text === "*2/*3" || text === "*3/*3")
            return "氯吡格雷化学药物用药指导的基因检测：提示 CYP2C19酶活性显著降低，氯吡格雷严重抵抗，请结合临床"
        if (text === "*1/*2")
            return "氯吡格雷化学药物用药指导的基因检测：提示 CYP2C19酶活性偏低，氯吡格雷抵抗，请结合临床"
        if (text === "*1/*3")
            return "氯吡格雷化学药物用药指导的基因检测：提示 CYP2C20酶活性偏低，氯吡格雷抵抗，请结合临床"
        if (text === "*2/*17")
            return "氯吡格雷化学药物用药指导的基因检测：提示 CYP2C21酶活性偏低，氯吡格雷抵抗，请结合临床"
        if (text === "*3/*17")
            return "氯吡格雷化学药物用药指导的基因检测：提示 CYP2C22酶活性偏低，氯吡格雷抵抗，请结合临床"
        if (text === "*1/*1")
            return "氯吡格雷化学药物用药指导的基因检测：提示 CYP2C19酶活性正常，氯吡格雷有效，请结合临床"
        if (text === "*1/*17" || text === "*17/*17")
            return "氯吡格雷化学药物用药指导的基因检测：提示 CYP2C19酶活性增强，出血风险增加，请结合临床"
        return ""
    }

    render() {
        return (
            JSON.stringify(GenePolymorphismStore.GenePolymorphismContent) === '{}' ? <Skeleton className="gene-skeleton" /> :
            <div className="step-two">
                <Form
                    name="GP"
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
                            ApoE 基因型
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {JSON.stringify(GenePolymorphismStore.GenePolymorphismContent) !== '{}' ? GenePolymorphismStore.GenePolymorphismContent.ApoE : ""}
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {JSON.stringify(GenePolymorphismStore.GenePolymorphismContent) !== '{}' ? this.ApoEConclusion(GenePolymorphismStore.GenePolymorphismContent.ApoE) : ""}
                        </Descriptions.Item>

                        <Descriptions.Item>
                            ApoE2 526C
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {JSON.stringify(GenePolymorphismStore.GenePolymorphismContent) !== '{}' ? GenePolymorphismStore.GenePolymorphismContent.ApoE2_526C : ""}
                        </Descriptions.Item>
                        <Descriptions.Item>
                        </Descriptions.Item>

                        <Descriptions.Item>
                            ApoE2 526T
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {JSON.stringify(GenePolymorphismStore.GenePolymorphismContent) !== '{}' ? GenePolymorphismStore.GenePolymorphismContent.ApoE2_526T : ""}
                        </Descriptions.Item>
                        <Descriptions.Item>
                        </Descriptions.Item>

                        <Descriptions.Item>
                            ApoE4 388T
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {JSON.stringify(GenePolymorphismStore.GenePolymorphismContent) !== '{}' ? GenePolymorphismStore.GenePolymorphismContent.ApoE4_388T : ""}
                        </Descriptions.Item>
                        <Descriptions.Item>
                        </Descriptions.Item>

                        <Descriptions.Item>
                            ApoE4 388C
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {JSON.stringify(GenePolymorphismStore.GenePolymorphismContent) !== '{}' ? GenePolymorphismStore.GenePolymorphismContent.ApoE4_388C : ""}
                        </Descriptions.Item>
                        <Descriptions.Item>
                        </Descriptions.Item>

                        <Descriptions.Item>
                            SLCO1B1基因型
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {JSON.stringify(GenePolymorphismStore.GenePolymorphismContent) !== '{}' ? GenePolymorphismStore.GenePolymorphismContent.SLCO1B1 : ""}
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {JSON.stringify(GenePolymorphismStore.GenePolymorphismContent) !== '{}' ? this.SLCO1B1Conclusion(GenePolymorphismStore.GenePolymorphismContent.SLCO1B1) : ""}
                        </Descriptions.Item>

                        <Descriptions.Item>
                            SLCO1B1*1b 388A
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {JSON.stringify(GenePolymorphismStore.GenePolymorphismContent) !== '{}' ? GenePolymorphismStore.GenePolymorphismContent.SLCO1B1_1b_388A : ""}
                        </Descriptions.Item>
                        <Descriptions.Item>
                        </Descriptions.Item>

                        <Descriptions.Item>
                            SLCO1B1*1b 388G
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {JSON.stringify(GenePolymorphismStore.GenePolymorphismContent) !== '{}' ? GenePolymorphismStore.GenePolymorphismContent.SLCO1B1_1b_388G : ""}
                        </Descriptions.Item>
                        <Descriptions.Item>
                        </Descriptions.Item>

                        <Descriptions.Item>
                            SLCO1B1*5 521T
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {JSON.stringify(GenePolymorphismStore.GenePolymorphismContent) !== '{}' ? GenePolymorphismStore.GenePolymorphismContent.SLCO1B1_5_521T : ""}
                        </Descriptions.Item>
                        <Descriptions.Item>
                        </Descriptions.Item>

                        <Descriptions.Item>
                            SLCO1B1*5 521C
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {JSON.stringify(GenePolymorphismStore.GenePolymorphismContent) !== '{}' ? GenePolymorphismStore.GenePolymorphismContent.SLCO1B1_5_521C : ""}
                        </Descriptions.Item>
                        <Descriptions.Item>
                        </Descriptions.Item>

                        <Descriptions.Item>
                            CYP2C19基因分型
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {JSON.stringify(GenePolymorphismStore.GenePolymorphismContent) !== '{}' ? GenePolymorphismStore.GenePolymorphismContent.CYP2C19 : ""}
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {JSON.stringify(GenePolymorphismStore.GenePolymorphismContent) !== '{}' ? this.CYP2C19Conclusion(GenePolymorphismStore.GenePolymorphismContent.CYP2C19) : ""}
                        </Descriptions.Item>

                        <Descriptions.Item>
                            CYP2C19-681/*2G
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {JSON.stringify(GenePolymorphismStore.GenePolymorphismContent) !== '{}' ? GenePolymorphismStore.GenePolymorphismContent.CYP2C19_681_2G : ""}
                        </Descriptions.Item>
                        <Descriptions.Item>
                        </Descriptions.Item>

                        <Descriptions.Item>
                            CYP2C19-681/*2A
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {JSON.stringify(GenePolymorphismStore.GenePolymorphismContent) !== '{}' ? GenePolymorphismStore.GenePolymorphismContent.CYP2C19_681_2A : ""}
                        </Descriptions.Item>
                        <Descriptions.Item>
                        </Descriptions.Item>

                        <Descriptions.Item>
                            CYP2C19-636/*3G
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {JSON.stringify(GenePolymorphismStore.GenePolymorphismContent) !== '{}' ? GenePolymorphismStore.GenePolymorphismContent.CYP2C19_636_3G : ""}
                        </Descriptions.Item>
                        <Descriptions.Item>
                        </Descriptions.Item>

                        <Descriptions.Item>
                            CYP2C19-636/*3A
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {JSON.stringify(GenePolymorphismStore.GenePolymorphismContent) !== '{}' ? GenePolymorphismStore.GenePolymorphismContent.CYP2C19_636_3A : ""}
                        </Descriptions.Item>
                        <Descriptions.Item>
                        </Descriptions.Item>

                        <Descriptions.Item>
                            CYP2C19-806/*17C
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {JSON.stringify(GenePolymorphismStore.GenePolymorphismContent) !== '{}' ? GenePolymorphismStore.GenePolymorphismContent.CYP2C19_806_17C : ""}
                        </Descriptions.Item>
                        <Descriptions.Item>
                        </Descriptions.Item>

                        <Descriptions.Item>
                            CYP2C19-806/*17T
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {JSON.stringify(GenePolymorphismStore.GenePolymorphismContent) !== '{}' ? GenePolymorphismStore.GenePolymorphismContent.CYP2C19_806_17T : ""}
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
                            下一步
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default GPStepTwo;