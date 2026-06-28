import {observer} from "mobx-react";
import React from "react";
import AscvdFlow from "../../ascvd/flow/AscvdFlow";
import {Button, Descriptions, Form} from "antd";

import "./BloodFatStep.scss"

/**
 * BloodFat 步骤三组件
 */
@observer
class BloodFatStepThree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            conclusion_img: "",
            conclusion: "",
        }
    }

    // 将bloodFlow组件中的数据提取出来
    initImg = (conclusion_img, conclusion) => {
        console.log(conclusion_img)
        this.setState({
            conclusion_img: conclusion_img,
            conclusion: conclusion,
        })
    }

    // 进行上一步操作
    onPreStep = () => {
        this.props.onPreStep();
    }

    // 提交
    onFinish = (values) => {
        this.props.onNextStep(this.state.conclusion_img, this.state.conclusion);
    };

    // 表单提交失败时的操作
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

     render() {
         return (
            <div className="step-three">
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
                    {this.props.ac&&<AscvdFlow ascvdContent={this.props.ac} initImg={this.initImg}/>}

                    <Descriptions title="流程图说明：" bordered column={1} className="step-three-Description">
                        <Descriptions.Item label="Ascvd病史包括：">
                            急性冠状动脉综合症、稳定性冠心病、血运重建术后、缺血性心肌病、缺血性卒中、短暂性脑缺血发作、外周动脉粥样硬化病
                        </Descriptions.Item>
                        <Descriptions.Item label="危险因素包括：">
                            (1) 吸烟
                            <br/>
                            (2) 男性HDL-C &lt; 1.04 mmol/L 或女性HDL-C &lt; 1.1 mmol/L
                            <br/>
                            (3) 男性 &gt; = 45岁或女性 &gt; = 55岁
                            <br />
                        </Descriptions.Item>
                    </Descriptions>

                    <Form.Item
                        wrapperCol={{
                            offset: 10,
                            span: 8,
                        }}
                    >
                        <Button type="primary" onClick={this.onPreStep} className="step-three-button">
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

export default BloodFatStepThree;