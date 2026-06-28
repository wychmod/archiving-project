import React from 'react';
import ReactFlow, {MarkerType, Background} from 'reactflow';
import html2canvas from "html2canvas";
import Viewer from 'react-viewer';
import {transform} from "../../../utils/ImgTransform";
import './AscvdFlow.scss';
import 'reactflow/dist/style.css';
import InformationStore from "../../store/InformationStore";

/**
 * ascvd流程图组件
 * 整体的逻辑是，先根据传进来的数据形成flow流程图的图片，然后根据html2canvas将流程图转化为图片，
 * 然后进行图片的渲染 ，react-view可是使图片放大和渲染
 */
class AscvdFlow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataURL: "",
            display: true,
            viewerVisible: false,
            ascvdContent: {
                "patient": {
                    "name": InformationStore.patientContent ? InformationStore.patientContent.name : "",
                    "age": InformationStore.patientContent ? Number(InformationStore.patientContent.age) : 0,
                    "gender": InformationStore.patientContent ? InformationStore.patientContent.gender : "",
                    "smoked": InformationStore.patientContent ? InformationStore.patientContent.smoked : "",
                    "chronic_illness": InformationStore.patientContent ? InformationStore.patientContent.chronic_illness:"",
                    "ascvd_history": InformationStore.patientContent ? InformationStore.patientContent.ascvd_history:"",
                },
                "tc": Number(this.props.ascvdContent.tc),
                "tg": Number(this.props.ascvdContent.tg),
                "HDL_C": Number(this.props.ascvdContent.HDL_C),
                "LDL_C": Number(this.props.ascvdContent.LDL_C),
                "non_HDL": Number(this.props.ascvdContent.non_HDL),
                "Apo_A1": Number(this.props.ascvdContent.Apo_A1),
                "Apo_B": Number(this.props.ascvdContent.Apo_B),
                "LP_a": Number(this.props.ascvdContent.LP_a),
                "conclusion": this.props.ascvdContent.conclusion,
                "conclusion_img": this.props.ascvdContent.conclusion_img
            },
            conclusion: "",
            // 是否有ascvd病史
            isAscvdHistory: false,
            // LDL>=4.9或TC>=7.2
            isLDLAndTCTooHigh: false,
            // ldl-c<1.8且tc<3.1
            isLDLAndTCTooLow: false,
            // ldl-c且tc符合要求
            isLDLAndTCAppropriate: false,
            // 糖尿病且年龄>=40岁
            isDiabetesAndHighAge: false,
            // 糖尿病且年龄<40岁
            isDiabetesAndLowAge: false,
            // 无糖尿病
            isNotDiabetes: false,
            // 无糖尿病有高血压
            isNotDiabetesHaveHypertension: false,
            // 无糖尿病无高血压
            isNotDiabetesHypertension: false,
            // 有糖尿病无高血压
            isDiabetesNotHypertension: false,
            // 有糖尿病有高血压
            isDiabetesHypertension: false,
            // 无血压无风险
            isNotHypertensionAndRisk: false,
            // 无血压一个风险
            isNotHypertensionOneRisk: false,
            // 无血压两个风险
            isNotHypertensionTwoRisk: false,
            // 无血压三个风险
            isNotHypertensionThreeRisk: false,
            // 无血压两个风险judge0
            isNotHypertensionTwoZero: false,
            // 无血压两个风险judge1
            isNotHypertensionTwoOne: false,
            // 无血压两个风险judge2
            isNotHypertensionTwoTwo: false,
            // 无血压三个风险judge0
            isNotHypertensionThreeZero: false,
            // 无血压三个风险judge1
            isNotHypertensionThreeOne: false,
            // 无血压三个风险judge2
            isNotHypertensionThreeTwo: false,
            // 有血压零风险
            isHypertensionAndRisk: false,
            // 有血压一个风险
            isHypertensionOneRisk: false,
            // 有血压两个风险
            isHypertensionTwoRisk: false,
            // 有血压三个风险
            isHypertensionThreeRisk: false,
            // 有血压一个风险judge0
            isHypertensionOneZero: false,
            // 有血压一个风险judge1
            isHypertensionOneOne: false,
            // 有血压一个风险judge2
            isHypertensionOneTwo: false,
            // 有血压两个风险judge0
            isHypertensionTwoZero: false,
            // 有血压两个风险judge1
            isHypertensionTwoOne: false,
            // 有血压两个风险judge2
            isHypertensionTwoTwo: false,
        }
    }

    componentDidMount() {
        this.ascvdDataProcessing(this.state.ascvdContent);
        setTimeout(() => {
            this.toImage();
        }, 20);
    }

    // 对流程图的逻辑进行判断，结合ascvd-img.jpg一起看更好理解。
    ascvdDataProcessing = (ascvdContent) => {

        // 判断是否有ascvd病史 1-2 2-4
        if (ascvdContent.patient.ascvd_history) {
            this.setState({
                isAscvdHistory: true,
                conclusion: "极高危"
            })
            return;
        }

        // 判断 3-5 5-8
        if (ascvdContent.tc >= 7.2 || ascvdContent.LDL_C >= 4.9) {
            this.setState({
                isLDLAndTCTooHigh: true,
                conclusion: "高危"
            })
            return;
        }

        // 判断 3-7 7-9
        if (ascvdContent.tc < 3.1 && ascvdContent.LDL_C < 1.8) {
            this.setState({
                isLDLAndTCTooLow: true,
                conclusion: "依据指南不进行危险评估"
            })
            return;
        }

        // 判断 3-6 isLDLAndTCAppropriate
        if (!this.state.isAscvdHistory && !this.state.isLDLAndTCTooHigh && !this.state.isLDLAndTCTooLow) {
            // 判断6-10 10-13
            const diabetes = ascvdContent.patient.chronic_illness ? ascvdContent.patient.chronic_illness.split(',').filter(ill => ill === "糖尿病"):""
            if (diabetes.length > 0 && ascvdContent.patient.age >= 40) {
                this.setState({
                    // 3-6
                    isLDLAndTCAppropriate: true,
                    // 6-10 10-13
                    isDiabetesAndHighAge: true,
                    conclusion: "高危"
                })
                return;
            }
            let isDiabetes = false
            // 判断6-11 6-12 isDiabetesAndLowAge isNotDiabetes
            if (diabetes.length > 0 && ascvdContent.patient.age < 40) {
                isDiabetes = true
            }
            const hypertension = ascvdContent.patient.chronic_illness ? ascvdContent.patient.chronic_illness.split(',').filter(ill => ill === "高血压"):""
            // 判断11-16 isDiabetesHypertension 12-16 isNotDiabetesHaveHypertension
            if (hypertension.length > 0) {
                // 判断16-17 17-24 isHypertensionAndRisk
                if (this.riskFactors(ascvdContent) === 0) {
                    this.setState({
                        isLDLAndTCAppropriate: true,
                        isNotDiabetes: !isDiabetes,
                        isDiabetesAndLowAge: isDiabetes,
                        isDiabetesHypertension: isDiabetes,
                        isNotDiabetesHaveHypertension: !isDiabetes,
                        isHypertensionAndRisk: true,
                        conclusion: "低危",
                    })
                    return;
                }
                // 判断16-27 27-32 isHypertensionThreeRisk
                if (this.riskFactors(ascvdContent) === 3) {
                    this.setState({
                        isLDLAndTCAppropriate: true,
                        isNotDiabetes: !isDiabetes,
                        isDiabetesAndLowAge: isDiabetes,
                        isDiabetesHypertension: isDiabetes,
                        isNotDiabetesHaveHypertension: !isDiabetes,
                        isHypertensionThreeRisk: true,
                        conclusion: "高危",
                    })
                    return;
                }
                // 判断16-23 isHypertensionOneRisk
                if (this.riskFactors(ascvdContent) === 1) {
                    // 23-26 26-33 isHypertensionOneZero
                    if (this.riskFactorsJudge(ascvdContent) === 0) {
                        this.setState({
                            isLDLAndTCAppropriate: true,
                            isNotDiabetes: !isDiabetes,
                            isDiabetesAndLowAge: isDiabetes,
                            isDiabetesHypertension: isDiabetes,
                            isNotDiabetesHaveHypertension: !isDiabetes,
                            isHypertensionOneRisk: true,
                            isHypertensionOneZero: true,
                            conclusion: "低危",
                        })
                        return;
                    }
                    // 23-38 38-37 isHypertensionOneOne
                    if (this.riskFactorsJudge(ascvdContent) === 1) {
                        this.setState({
                            isLDLAndTCAppropriate: true,
                            isNotDiabetes: !isDiabetes,
                            isDiabetesAndLowAge: isDiabetes,
                            isDiabetesHypertension: isDiabetes,
                            isNotDiabetesHaveHypertension: !isDiabetes,
                            isHypertensionOneRisk: true,
                            isHypertensionOneOne: true,
                            conclusion: "中危"
                        })
                        return;
                    }
                    // 23-44 44-37 isHypertensionOneTwo 37-42
                    if (this.riskFactorsJudge(ascvdContent) === 2) {
                        this.setState({
                            isLDLAndTCAppropriate: true,
                            isNotDiabetes: !isDiabetes,
                            isDiabetesAndLowAge: isDiabetes,
                            isDiabetesHypertension: isDiabetes,
                            isNotDiabetesHaveHypertension: !isDiabetes,
                            isHypertensionOneRisk: true,
                            isHypertensionOneTwo: true,
                            conclusion: "中危"
                        })
                        return;
                    }
                }
                // 判断16-45 isHypertensionTwoRisk
                if (this.riskFactors(ascvdContent) === 2) {
                    // 45-46 46-49 isHypertensionTwoZero 49-42
                    if (this.riskFactorsJudge(ascvdContent) === 0) {
                        this.setState({
                            isLDLAndTCAppropriate: true,
                            isNotDiabetes: !isDiabetes,
                            isDiabetesAndLowAge: isDiabetes,
                            isDiabetesHypertension: isDiabetes,
                            isNotDiabetesHaveHypertension: !isDiabetes,
                            isHypertensionTwoRisk: true,
                            isHypertensionTwoZero: true,
                            conclusion: "中危"
                        })
                        return;
                    }
                    // 45-47 47-50 isHypertensionTwoOne
                    if (this.riskFactorsJudge(ascvdContent) === 1) {
                        this.setState({
                            isLDLAndTCAppropriate: true,
                            isNotDiabetes: !isDiabetes,
                            isDiabetesAndLowAge: isDiabetes,
                            isDiabetesHypertension: isDiabetes,
                            isNotDiabetesHaveHypertension: !isDiabetes,
                            isHypertensionTwoRisk: true,
                            isHypertensionTwoOne: true,
                            conclusion: "高危"
                        })
                        return;
                    }
                    // 45-48 48-51 isHypertensionTwoTwo
                    if (this.riskFactorsJudge(ascvdContent) === 2) {
                        this.setState({
                            isLDLAndTCAppropriate: true,
                            isNotDiabetes: !isDiabetes,
                            isDiabetesAndLowAge: isDiabetes,
                            isDiabetesHypertension: isDiabetes,
                            isNotDiabetesHaveHypertension: !isDiabetes,
                            isHypertensionTwoRisk: true,
                            isHypertensionTwoTwo: true,
                            conclusion: "高危"
                        })
                    }
                }
            } else {
                // 判断11-14 isDiabetesNotHypertension 12-14 isNotDiabetesHypertension
                // 14-18 18-25 isNotHypertensionAndRisk
                if (this.riskFactors(ascvdContent) === 0) {
                    this.setState({
                        isLDLAndTCAppropriate: true,
                        isNotDiabetes: !isDiabetes,
                        isDiabetesAndLowAge: isDiabetes,
                        isDiabetesNotHypertension: isDiabetes,
                        isNotDiabetesHypertension: !isDiabetes,
                        isNotHypertensionAndRisk: true,
                        conclusion: "低危"
                    })
                    return;
                }
                // 14-19 19-25 isNotHypertensionOneRisk
                if (this.riskFactors(ascvdContent) === 1) {
                    this.setState({
                        isLDLAndTCAppropriate: true,
                        isNotDiabetes: !isDiabetes,
                        isDiabetesAndLowAge: isDiabetes,
                        isDiabetesNotHypertension: isDiabetes,
                        isNotDiabetesHypertension: !isDiabetes,
                        isNotHypertensionOneRisk: true,
                        conclusion: "低危"
                    })
                    return;
                }
                // 14-28 isNotHypertensionTwoRisk
                if (this.riskFactors(ascvdContent) === 2) {
                    // 28-34 34-39 isNotHypertensionTwoZero
                    if (this.riskFactorsJudge(ascvdContent) === 0) {
                        this.setState({
                            isLDLAndTCAppropriate: true,
                            isNotDiabetes: !isDiabetes,
                            isDiabetesAndLowAge: isDiabetes,
                            isDiabetesNotHypertension: isDiabetes,
                            isNotDiabetesHypertension: !isDiabetes,
                            isNotHypertensionTwoRisk: true,
                            isNotHypertensionTwoZero: true,
                            conclusion: "低危"
                        })
                        return;
                    }
                    // 28-35 35-40 isNotHypertensionTwoOne
                    if (this.riskFactorsJudge(ascvdContent) === 1) {
                        this.setState({
                            isLDLAndTCAppropriate: true,
                            isNotDiabetes: !isDiabetes,
                            isDiabetesAndLowAge: isDiabetes,
                            isDiabetesNotHypertension: isDiabetes,
                            isNotDiabetesHypertension: !isDiabetes,
                            isNotHypertensionTwoRisk: true,
                            isNotHypertensionTwoOne: true,
                            conclusion: "低危"
                        })
                        return;
                    }
                    // 28-36 36-41 isNotHypertensionTwoTwo 41-42
                    if (this.riskFactorsJudge(ascvdContent) === 2) {
                        this.setState({
                            isLDLAndTCAppropriate: true,
                            isNotDiabetes: !isDiabetes,
                            isDiabetesAndLowAge: isDiabetes,
                            isDiabetesNotHypertension: isDiabetes,
                            isNotDiabetesHypertension: !isDiabetes,
                            isNotHypertensionTwoRisk: true,
                            isNotHypertensionTwoTwo: true,
                            conclusion: "中危"
                        })
                        return;
                    }
                }

                // 14-15 isNotHypertensionThreeRisk
                if (this.riskFactors(ascvdContent) === 3) {
                    // 15-20 20-29 isNotHypertensionThreeZero
                    if (this.riskFactorsJudge(ascvdContent) === 0) {
                        this.setState({
                            isLDLAndTCAppropriate: true,
                            isNotDiabetes: !isDiabetes,
                            isDiabetesAndLowAge: isDiabetes,
                            isDiabetesNotHypertension: isDiabetes,
                            isNotDiabetesHypertension: !isDiabetes,
                            isNotHypertensionThreeRisk: true,
                            isNotHypertensionThreeZero: true,
                            conclusion: "低危"
                        })
                        return;
                    }
                    // 15-21 21-30 isNotHypertensionThreeOne
                    if (this.riskFactorsJudge(ascvdContent) === 1) {
                        this.setState({
                            isLDLAndTCAppropriate: true,
                            isNotDiabetes: !isDiabetes,
                            isDiabetesAndLowAge: isDiabetes,
                            isDiabetesNotHypertension: isDiabetes,
                            isNotDiabetesHypertension: !isDiabetes,
                            isNotHypertensionThreeRisk: true,
                            isNotHypertensionThreeOne: true,
                            conclusion: "中危"
                        })
                        return;
                    }
                    // 15-22 22-30 isNotHypertensionThreeTwo 30-42
                    if (this.riskFactorsJudge(ascvdContent) === 2) {
                        this.setState({
                            isLDLAndTCAppropriate: true,
                            isNotDiabetes: !isDiabetes,
                            isDiabetesAndLowAge: isDiabetes,
                            isDiabetesNotHypertension: isDiabetes,
                            isNotDiabetesHypertension: !isDiabetes,
                            isNotHypertensionThreeRisk: true,
                            isNotHypertensionThreeTwo: true,
                            conclusion: "中危"
                        })
                        return;
                    }
                }
            }
        }

    }

    // 判断有几个危险因素
    riskFactors = (ascvdContent) => {
        let num = 0;
        if (ascvdContent.patient.age >= 45 && ascvdContent.patient.gender === "male") {
            num++;
        }
        if (ascvdContent.patient.age >= 55 && ascvdContent.patient.gender === "female") {
            num++;
        }
        if (ascvdContent.patient.smoked === "Y") {
            num++;
        }
        if (ascvdContent.HDL_C < 1.04 && ascvdContent.patient.gender === "male") {
            num++;
        }
        if (ascvdContent.HDL_C < 1.1 && ascvdContent.patient.gender === "female") {
            num++;
        }
        return num;
    }

    // 危险因素的后续判断主要判断tc和ldl
    riskFactorsJudge = (ascvdContent) => {
        const tc = ascvdContent.tc;
        const ldl = ascvdContent.LDL_C;
        // 危险性更高的放在前面判断
        if ((tc < 7.2 && tc >= 5.2) || (ldl >= 3.4 && ldl < 4.9)) {
            return 2;
        }
        if ((tc >= 4.1 && tc < 5.2) || (ldl >= 2.6 && ldl < 3.4)) {
            return 1;
        }
        if ((tc < 4.1 && tc >= 3.1) || (ldl >= 1.8 && ldl < 2.6)) {
            return 0;
        }
    }

    // html转图片的功能
    toImage = () => {
        window.pageYoffset = 0;
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        // 先获取你要转换为img的dom节点
        console.log("runing-11");
        let node = document.getElementById("myCanvas"); //传入的id名称
        console.log("runing-1");
        // var width = node.offsetWidth; //dom宽
        // var height = node.offsetHeight; //dom高
        const width = 1195; //dom宽
        const height = 1150; //dom高
        //创建一个新的canvas
        let canvas2 = document.createElement("canvas");
        // // 将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
        canvas2.width = width * 2;
        canvas2.height = height * 2;
        canvas2.style.width = width + "px";
        canvas2.style.height = height + "px";
        // //可以按照自己的需求，对context的参数修改,translate指的是偏移量
        let context = canvas2.getContext("2d");
        context.scale(2, 2);
        console.log("runing0");
        html2canvas(node, {
            width: width,
            heigth: height,
            backgroundColor: "#ffffff", //背景颜色 为null是透明
            dpi: 600/*window.devicePixelRatio * 2*/, //按屏幕像素比增加像素
            scale: 1,
            canvas: canvas2,
            X: 0,
            Y: 0,
            useCORS: true, //是否使用CORS从服务器加载图像 !!!
            allowTaint: true, //是否允许跨域图像污染画布  !!!
        }).then((canvas) => {
            console.log("runing1");
            const url = canvas.toDataURL('image/jpeg'); //这里上面不设值cors会报错
            console.log("runing2");
            // const a = document.createElement("a"); //创建一个a标签 用来下载
            // a.download = "名"; //设置下载的图片名称
            // const event = new MouseEvent("click"); //增加一个点击事件
            // 图片流转换成可以给后端上传的图片
            const u8Image = transform(url);
            const blob = new Blob([u8Image], {type: "image/jpg"});
            const conclusion_img = new File([blob], new Date() + '.jpg')
            this.props.initImg(conclusion_img, this.state.conclusion);

            this.setState({
                dataURL: url,
                display: false,
            })
            // this.$viewer.show()
            //如果需要下载的话就加上这两句
            // a.href = url;//此处的url为base64格式的图片资源
            //
            // a.dispatchEvent(event); //触发a的单击事件 即可完成下载
        });
    }

    render() {
        // 基准宽度
        const width = 1195;
        // 宽度偏移值
        const widthOffset = 100;
        // 基准高度
        const height = 50;
        // 高度偏移值
        const heightOffset = 50;

        // 定义节点 对于每个节点可以和图片一起看
        const nodes = [
            {
                id: '1',
                position: {x: width / 2, y: height - heightOffset},
                data: {label: "姓名： " + this.state.ascvdContent.patient.name},
                className: "ascvd-flow-base ascvd-flow-name",
            },
            {
                id: '2',
                position: {x: width / 2 - 5 * widthOffset, y: height + heightOffset},
                data: {label: '有ASCVD病史'},
                className: this.state.isAscvdHistory ? "ascvd-flow-base ascvd-flow-selected" : "ascvd-flow-base ascvd-flow-no-selected"
            },
            {
                id: '3',
                position: {x: width / 2 + widthOffset, y: height + heightOffset},
                data: {label: '无ASCVD病史'},
                className: !this.state.isAscvdHistory ? "ascvd-flow-base ascvd-flow-selected" : "ascvd-flow-base ascvd-flow-no-selected"
            },
            {
                id: '4',
                position: {x: width / 2 - 5 * widthOffset + 25, y: height + 2 * heightOffset + 10},
                data: {label: '极高危'},
                className: this.state.isAscvdHistory ? "ascvd-flow-base ascvd-flow-selected" : "ascvd-flow-base ascvd-flow-no-selected"
            },
            {
                id: '5',
                position: {x: width / 2 - 2 * widthOffset, y: height + 3 * heightOffset},
                data: {label: 'LDL-C >= 4.9 (或) TC >= 7.2'},
                className: this.state.isLDLAndTCTooHigh ? "ascvd-flow-base ascvd-flow-selected" : "ascvd-flow-base ascvd-flow-no-selected"
            },
            {
                id: '6',
                position: {x: width / 2 + widthOffset - 50, y: height + 3 * heightOffset},
                data: {label: '1.8 <= LDL-C < 4.9 (或) 3.1 <= TC < 7.2'},
                className: this.state.isLDLAndTCAppropriate ? "ascvd-flow-base ascvd-flow-selected" : "ascvd-flow-base ascvd-flow-no-selected"
            },
            {
                id: '7',
                position: {x: width / 2 + 4 * widthOffset - 30, y: height + 3 * heightOffset},
                data: {label: 'LDL-C < 1.8 且 TC < 3.1'},
                className: this.state.isLDLAndTCTooLow ? "ascvd-flow-base ascvd-flow-selected" : "ascvd-flow-base ascvd-flow-no-selected"
            },
            {
                id: '8',
                position: {x: width / 2 - widthOffset - 18, y: height + 4 * heightOffset + 10},
                data: {label: '高危'},
                className: this.state.isLDLAndTCTooHigh ? "ascvd-flow-base ascvd-flow-selected" : "ascvd-flow-base ascvd-flow-no-selected"
            },
            {
                id: '9',
                position: {x: width / 2 + 4 * widthOffset - 26, y: height + 4 * heightOffset + 10},
                data: {label: '依据指南不进行危险评估'},
                className: this.state.isLDLAndTCTooLow ? "ascvd-flow-base ascvd-flow-selected" : "ascvd-flow-base ascvd-flow-no-selected"
            },
            {
                id: '10',
                position: {x: width / 2 - widthOffset, y: height + 6 * heightOffset - 30},
                data: {label: '糖尿病史且年龄>=40岁'},
                className: this.state.isDiabetesAndHighAge ? "ascvd-flow-base ascvd-flow-selected" : "ascvd-flow-base ascvd-flow-no-selected",
                sourcePosition: "left"
            },
            {
                id: '11',
                position: {x: width / 2 + widthOffset, y: height + 6 * heightOffset - 30},
                data: {label: '糖尿病史且年龄<40岁'},
                className: this.state.isDiabetesAndLowAge ? "ascvd-flow-base ascvd-flow-selected" : "ascvd-flow-base ascvd-flow-no-selected"
            },
            {
                id: '12',
                position: {x: width / 2 + 3 * widthOffset - 10, y: height + 6 * heightOffset - 30},
                data: {label: '非糖尿病患者'},
                className: this.state.isNotDiabetes ? "ascvd-flow-base ascvd-flow-selected" : "ascvd-flow-base ascvd-flow-no-selected"
            },
            {
                id: '13',
                position: {x: width / 2 - 2 * widthOffset, y: height + 6 * heightOffset - 30},
                data: {label: '高危'},
                className: this.state.isDiabetesAndHighAge ? "ascvd-flow-base ascvd-flow-selected" : "ascvd-flow-base ascvd-flow-no-selected",
                targetPosition: "right"
            },
            {
                id: '14',
                position: {x: width / 2 - 3 * widthOffset, y: height + 8 * heightOffset - 40},
                data: {label: '无高血压病史'},
                className: (this.state.isDiabetesNotHypertension || this.state.isNotDiabetesHypertension) ? "ascvd-flow-base ascvd-flow-selected" : "ascvd-flow-base ascvd-flow-no-selected"
            },
            {
                id: '15',
                position: {x: width / 2 - widthOffset, y: height + 9 * heightOffset - 40},
                data: {label: '具有3个危险因素'},
                className: this.state.isNotHypertensionThreeRisk ? "ascvd-flow-base ascvd-flow-selected" : "ascvd-flow-base ascvd-flow-no-selected",
                targetPosition: "left"
            },
            {
                id: '16',
                position: {x: width / 2 + 3 * widthOffset - 14, y: height + 8 * heightOffset - 40},
                data: {label: '有高血压病史'},
                className: (this.state.isNotDiabetesHaveHypertension || this.state.isDiabetesHypertension) ? "ascvd-flow-base ascvd-flow-selected" : "ascvd-flow-base ascvd-flow-no-selected",
                sourcePosition: "right"
            },
            {
                id: '17',
                position: {x: width / 2 + 4 * widthOffset + 67, y: height + 9 * heightOffset - 40},
                data: {label: '不具有危险因素'},
                className: this.state.isHypertensionAndRisk ? "ascvd-flow-base ascvd-flow-selected" : "ascvd-flow-base ascvd-flow-no-selected",
                targetPosition: "left"
            },
            {
                id: '18',
                position: {x: width / 2 - 5 * widthOffset - 50, y: height + 10 * heightOffset - 20},
                data: {label: '不具有危险因素'},
                className: this.state.isNotHypertensionAndRisk ? "ascvd-flow-base ascvd-flow-selected" : "ascvd-flow-base ascvd-flow-no-selected"
            },
            {
                id: '19',
                position: {x: width / 2 - 4 * widthOffset, y: height + 10 * heightOffset - 20},
                data: {label: '具有1个危险因素'},
                className: this.state.isNotHypertensionOneRisk ? "ascvd-flow-base ascvd-flow-selected" : "ascvd-flow-base ascvd-flow-no-selected"
            },
            {
                id: '20',
                position: {x: width / 2 - 2 * widthOffset - 20, y: height + 10 * heightOffset},
                data: {label: '3.1 <= TC < 4.1 ~~~~(或)~~~~ 1.8<=LDL-C<2.6'},
                className: this.state.isNotHypertensionThreeZero ? "ascvd-flow-reduce ascvd-flow-selected" : "ascvd-flow-reduce ascvd-flow-no-selected"
            },
            {
                id: '21',
                position: {x: width / 2 - 60, y: height + 10 * heightOffset},
                data: {label: '4.1 <= TC < 5.2 ~~~~(或)~~~~ 2.6<=LDL-C<3.4'},
                className: this.state.isNotHypertensionThreeOne ? "ascvd-flow-reduce ascvd-flow-selected" : "ascvd-flow-reduce ascvd-flow-no-selected"
            },
            {
                id: '22',
                position: {x: width / 2 + widthOffset, y: height + 10 * heightOffset},
                data: {label: '5.2 <= TC < 7.2 ~~~~(或)~~~~ 3.4<=LDL-C<4.9'},
                className: this.state.isNotHypertensionThreeTwo ? "ascvd-flow-reduce ascvd-flow-selected" : "ascvd-flow-reduce ascvd-flow-no-selected"
            },
            {
                id: '23',
                position: {x: width / 2 + 3 * widthOffset - 50, y: height + 10 * heightOffset - 20},
                data: {label: '具有1个危险因素'},
                className: this.state.isHypertensionOneRisk ? "ascvd-flow-base ascvd-flow-selected" : "ascvd-flow-base ascvd-flow-no-selected",
                sourcePosition: "right"
            },
            {
                id: '24',
                position: {x: width / 2 + 5 * widthOffset + 2, y: height + 10 * heightOffset - 20},
                data: {label: '低危'},
                className: this.state.isHypertensionAndRisk ? "ascvd-flow-base ascvd-flow-selected" : "ascvd-flow-base ascvd-flow-no-selected",
            },
            {
                id: '25',
                position: {x: width / 2 - 5 * widthOffset + 60, y: height + 11 * heightOffset + 20},
                data: {label: '低危'},
                className: (this.state.isNotHypertensionAndRisk || this.state.isNotHypertensionOneRisk) ? "ascvd-flow-base ascvd-flow-selected" : "ascvd-flow-base ascvd-flow-no-selected",
            },
            {
                id: '26',
                position: {x: width / 2 + 2 * widthOffset + 46, y: height + 11 * heightOffset},
                data: {label: '3.1 <= TC < 4.1 ~~~~(或)~~~~ 1.8<=LDL-C<2.6'},
                className: this.state.isHypertensionOneZero ? "ascvd-flow-reduce ascvd-flow-selected" : "ascvd-flow-reduce ascvd-flow-no-selected",
                targetPosition: "right"
            },
            {
                id: '27',
                position: {x: width / 2 + 4 * widthOffset + 66, y: height + 11 * heightOffset},
                data: {label: '具有3个危险因素'},
                className: this.state.isHypertensionThreeRisk ? "ascvd-flow-base ascvd-flow-selected" : "ascvd-flow-base ascvd-flow-no-selected",
                targetPosition: "left"
            },
            {
                id: '28',
                position: {x: width / 2 - 5 * widthOffset + 16, y: height + 13 * heightOffset - 20},
                data: {label: '具有2个危险因素'},
                className: this.state.isNotHypertensionTwoRisk ? "ascvd-flow-base ascvd-flow-selected" : "ascvd-flow-base ascvd-flow-no-selected",
                targetPosition: "right"
            },
            {
                id: '29',
                position: {x: width / 2 - 2 * widthOffset + 24, y: height + 13 * heightOffset - 40},
                data: {label: '低危'},
                className: this.state.isNotHypertensionThreeZero ? "ascvd-flow-base ascvd-flow-selected" : "ascvd-flow-base ascvd-flow-no-selected",
            },
            {
                id: '30',
                position: {x: width / 2 - 15, y: height + 13 * heightOffset - 10},
                data: {label: '中危'},
                className: this.state.isNotHypertensionThreeOne ? "ascvd-flow-base ascvd-flow-selected" : "ascvd-flow-base ascvd-flow-no-selected",
            },
            {
                id: '32',
                position: {x: width / 2 + 5 * widthOffset + 6, y: height + 13 * heightOffset - 40},
                data: {label: '高危'},
                className: this.state.isHypertensionThreeRisk ? "ascvd-flow-base ascvd-flow-selected" : "ascvd-flow-base ascvd-flow-no-selected",
            },
            {
                id: '33',
                position: {x: width / 2 + 3 * widthOffset - 10, y: height + 14 * heightOffset - 40},
                data: {label: '低危'},
                className: this.state.isHypertensionOneZero ? "ascvd-flow-base ascvd-flow-selected" : "ascvd-flow-base ascvd-flow-no-selected",
            },
            {
                id: '34',
                position: {x: width / 2 - 6 * widthOffset + 20, y: height + 15 * heightOffset - 20},
                data: {label: '3.1 <= TC < 4.1 ~~~~(或)~~~~ 1.8<=LDL-C<2.6'},
                className: this.state.isNotHypertensionTwoZero ? "ascvd-flow-reduce ascvd-flow-selected" : "ascvd-flow-reduce ascvd-flow-no-selected",
            },
            {
                id: '35',
                position: {x: width / 2 - 4 * widthOffset, y: height + 15 * heightOffset - 20},
                data: {label: '4.1 <= TC < 5.2 ~~~~(或)~~~~ 2.6<=LDL-C<3.4'},
                className: this.state.isNotHypertensionTwoOne ? "ascvd-flow-reduce ascvd-flow-selected" : "ascvd-flow-reduce ascvd-flow-no-selected",
            },
            {
                id: '36',
                position: {x: width / 2 - 2 * widthOffset - 20, y: height + 15 * heightOffset - 20},
                data: {label: '5.2 <= TC < 7.2 ~~~~(或)~~~~ 3.4<=LDL-C<4.9'},
                className: this.state.isNotHypertensionTwoTwo ? "ascvd-flow-reduce ascvd-flow-selected" : "ascvd-flow-reduce ascvd-flow-no-selected",
            },
            {
                id: '37',
                position: {x: width / 2 + 2 * widthOffset - 50, y: height + 16 * heightOffset},
                data: {label: '中危'},
                className: (this.state.isHypertensionOneTwo || this.state.isHypertensionOneOne) ? "ascvd-flow-base ascvd-flow-selected" : "ascvd-flow-base ascvd-flow-no-selected",
                sourcePosition: "left",
                targetPosition: "right"
            },
            {
                id: '38',
                position: {x: width / 2 + 3 * widthOffset - 54, y: height + 14 * heightOffset + 10},
                data: {label: '4.1 <= TC < 5.2 ~~~~(或)~~~~ 2.6<=LDL-C<3.4'},
                className: this.state.isHypertensionOneOne ? "ascvd-flow-reduce ascvd-flow-selected" : "ascvd-flow-reduce ascvd-flow-no-selected",
                targetPosition: "right",
                sourcePosition: "left"
            },
            {
                id: '39',
                position: {x: width / 2 - 5 * widthOffset - 35, y: height + 18 * heightOffset - 40},
                data: {label: '低危'},
                className: this.state.isNotHypertensionTwoZero ? "ascvd-flow-base ascvd-flow-selected" : "ascvd-flow-base ascvd-flow-no-selected",
            },
            {
                id: '40',
                position: {x: width / 2 - 3 * widthOffset - 55, y: height + 18 * heightOffset - 40},
                data: {label: '低危'},
                className: this.state.isNotHypertensionTwoOne ? "ascvd-flow-base ascvd-flow-selected" : "ascvd-flow-base ascvd-flow-no-selected",
            },
            {
                id: '41',
                position: {x: width / 2 - 2 * widthOffset + 25, y: height + 18 * heightOffset - 40},
                data: {label: '中危'},
                className: this.state.isNotHypertensionTwoTwo ? "ascvd-flow-base ascvd-flow-selected" : "ascvd-flow-base ascvd-flow-no-selected",
                sourcePosition: "right"
            },
            {
                id: '42',
                position: {x: width / 2 - 3 * widthOffset + 27, y: height + 19 * heightOffset},
                data: {label: '若患者年龄<55岁则继续进入余生风险评估程序'},
                className: ((this.state.isNotHypertensionThreeTwo || this.state.isNotHypertensionThreeOne)
                || (this.state.isHypertensionOneTwo || this.state.isHypertensionOneOne) || this.state.isHypertensionTwoZero
                || this.state.isNotHypertensionTwoTwo) && this.state.ascvdContent.patient.age < 55 ?
                    "ascvd-flow-reduce ascvd-flow-selected" : "ascvd-flow-reduce ascvd-flow-no-selected",
                targetPosition: "right"
            },
            {
                id: '44',
                position: {x: width / 2 + 3 * widthOffset - 54, y: height + 16 * heightOffset + 10},
                data: {label: '5.2 <= TC < 7.2 ~~~~(或)~~~~ 3.4<=LDL-C<4.9'},
                className: this.state.isHypertensionOneTwo ? "ascvd-flow-reduce ascvd-flow-selected" : "ascvd-flow-reduce ascvd-flow-no-selected",
                targetPosition: "right",
                sourcePosition: "left"
            },
            {
                id: '45',
                position: {x: width / 2 + 4 * widthOffset + 64, y: height + 17 * heightOffset},
                data: {label: '具有2个危险因素'},
                className: this.state.isHypertensionTwoRisk ? "ascvd-flow-base ascvd-flow-selected" : "ascvd-flow-base ascvd-flow-no-selected",
                targetPosition: "left"
            },
            {
                id: '46',
                position: {x: width / 2 + widthOffset, y: height + 19 * heightOffset - 10},
                data: {label: '3.1 <= TC < 4.1 ~~~~(或)~~~~ 1.8<=LDL-C<2.6'},
                className: this.state.isHypertensionTwoZero ? "ascvd-flow-reduce ascvd-flow-selected" : "ascvd-flow-reduce ascvd-flow-no-selected",
            },
            {
                id: '47',
                position: {x: width / 2 + 3 * widthOffset - 30, y: height + 19 * heightOffset - 10},
                data: {label: '4.1 <= TC < 5.2 ~~~~(或)~~~~ 2.6<=LDL-C<3.4'},
                className: this.state.isHypertensionTwoOne ? "ascvd-flow-reduce ascvd-flow-selected" : "ascvd-flow-reduce ascvd-flow-no-selected",
            },
            {
                id: '48',
                position: {x: width / 2 + 4 * widthOffset + 40, y: height + 19 * heightOffset - 10},
                data: {label: '5.2 <= TC < 7.2 ~~~~(或)~~~~ 3.4<=LDL-C<4.9'},
                className: this.state.isHypertensionTwoTwo ? "ascvd-flow-reduce ascvd-flow-selected" : "ascvd-flow-reduce ascvd-flow-no-selected",
            },
            {
                id: '49',
                position: {x: width / 2 + widthOffset + 46, y: height + 21 * heightOffset},
                data: {label: '中危'},
                className: this.state.isHypertensionTwoZero ? "ascvd-flow-base ascvd-flow-selected" : "ascvd-flow-base ascvd-flow-no-selected",
                sourcePosition: "left"
            },
            {
                id: '50',
                position: {x: width / 2 + 3 * widthOffset + 14, y: height + 21 * heightOffset},
                data: {label: '高危'},
                className: this.state.isHypertensionTwoOne ? "ascvd-flow-base ascvd-flow-selected" : "ascvd-flow-base ascvd-flow-no-selected",
            },
            {
                id: '51',
                position: {x: width / 2 + 5 * widthOffset - 16, y: height + 21 * heightOffset},
                data: {label: '高危'},
                className: this.state.isHypertensionTwoTwo ? "ascvd-flow-base ascvd-flow-selected" : "ascvd-flow-base ascvd-flow-no-selected",
            },
        ];
        // 去掉水印
        const proOptions = {hideAttribution: true};
        // 定义边
        const edges = [
            {
                id: '1-2',
                source: '1',
                target: '2',
                type: 'step',
                zIndex: this.state.isAscvdHistory ? 1 : 0,
                style: {stroke: this.state.isAscvdHistory ? 'red' : 'black', strokeWidth: 3},
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isAscvdHistory ? 'red' : 'black'
                },
            },
            {
                id: '1-3',
                source: '1',
                target: '3',
                type: 'step',
                style: {stroke: !this.state.isAscvdHistory ? 'red' : 'black', strokeWidth: 3},
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: !this.state.isAscvdHistory ? 'red' : 'black'
                },
            },
            {
                id: '2-4',
                source: '2',
                target: '4',
                type: 'step',
                // 逻辑等同于1-2
                style: {stroke: this.state.isAscvdHistory ? 'red' : 'black', strokeWidth: 3},
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isAscvdHistory ? 'red' : 'black'
                },
            },
            {
                id: '3-5',
                source: '3',
                target: '5',
                type: 'step',
                zIndex: this.state.isLDLAndTCTooHigh ? 1 : 0,
                style: {stroke: this.state.isLDLAndTCTooHigh ? 'red' : 'black', strokeWidth: 3},
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isLDLAndTCTooHigh ? 'red' : 'black'
                },
            },
            {
                id: '3-6',
                source: '3',
                target: '6',
                type: 'step',
                zIndex: this.state.isLDLAndTCAppropriate ? 1 : 0,
                style: {stroke: this.state.isLDLAndTCAppropriate ? 'red' : 'black', strokeWidth: 3},
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isLDLAndTCAppropriate ? 'red' : 'black'
                },
            },
            {
                id: '3-7',
                source: '3',
                target: '7',
                type: 'step',
                zIndex: this.state.isLDLAndTCTooLow ? 1 : 0,
                style: {stroke: this.state.isLDLAndTCTooLow ? 'red' : 'black', strokeWidth: 3},
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isLDLAndTCTooLow ? 'red' : 'black'
                },
            },
            {
                id: '5-8',
                source: '5',
                target: '8',
                type: 'step',
                style: {stroke: this.state.isLDLAndTCTooHigh ? 'red' : 'black', strokeWidth: 3},
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isLDLAndTCTooHigh ? 'red' : 'black'
                },
            },
            {
                id: '7-9',
                source: '7',
                target: '9',
                type: 'step',
                style: {stroke: this.state.isLDLAndTCTooLow ? 'red' : 'black', strokeWidth: 3},
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isLDLAndTCTooLow ? 'red' : 'black'
                },
            },
            {
                id: '6-10',
                source: '6',
                target: '10',
                type: 'step',
                // 满足（糖尿病高龄）和（无ascvd病史数据适中）
                zIndex: this.state.isDiabetesAndHighAge ? 1 : 0,
                style: {stroke: this.state.isDiabetesAndHighAge ? 'red' : 'black', strokeWidth: 3},
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isDiabetesAndHighAge ? 'red' : 'black'
                },
            },
            {
                id: '6-11',
                source: '6',
                target: '11',
                type: 'step',
                // 满足（糖尿病无高龄）和（无ascvd病史数据适中）
                zIndex: this.state.isDiabetesAndLowAge ? 1 : 0,
                style: {stroke: this.state.isDiabetesAndLowAge ? 'red' : 'black', strokeWidth: 3},
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isDiabetesAndLowAge ? 'red' : 'black'
                },
            },
            {
                id: '6-12',
                source: '6',
                target: '12',
                type: 'step',
                // 满足（无糖尿病）和（无ascvd病史数据适中）
                zIndex: this.state.isNotDiabetes ? 1 : 0,
                style: {stroke: this.state.isNotDiabetes ? 'red' : 'black', strokeWidth: 3},
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isNotDiabetes ? 'red' : 'black'
                },
            },
            {
                id: '10-13',
                source: '10',
                target: '13',
                type: 'step',
                // 满足（糖尿病高龄）和（无ascvd病史数据适中）
                zIndex: this.state.isDiabetesAndHighAge ? 1 : 0,
                style: {stroke: this.state.isDiabetesAndHighAge ? 'red' : 'black', strokeWidth: 3},
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isDiabetesAndHighAge ? 'red' : 'black'
                },
            },
            {
                id: '11-14',
                source: '11',
                target: '14',
                type: 'step',
                zIndex: this.state.isDiabetesNotHypertension ? 1 : 0,
                style: {stroke: this.state.isDiabetesNotHypertension ? 'red' : 'black', strokeWidth: 3},
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isDiabetesNotHypertension ? 'red' : 'black'
                },
            },
            {
                id: '11-16',
                source: '11',
                target: '16',
                type: 'step',
                style: {stroke: this.state.isDiabetesHypertension ? 'red' : 'black', strokeWidth: 3},
                zIndex: this.state.isDiabetesHypertension ? 1 : 0,
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isDiabetesHypertension ? 'red' : 'black'
                },
            },
            {
                id: '12-14',
                source: '12',
                target: '14',
                type: 'step',
                zIndex: this.state.isNotDiabetesHypertension ? 1 : 0,
                style: {stroke: this.state.isNotDiabetesHypertension ? 'red' : 'black', strokeWidth: 3},
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isNotDiabetesHypertension ? 'red' : 'black'

                },
            },
            {
                id: '12-16',
                source: '12',
                target: '16',
                type: 'step',
                zIndex: this.state.isNotDiabetesHaveHypertension ? 1 : 0,
                style: {stroke: this.state.isNotDiabetesHaveHypertension ? 'red' : 'black', strokeWidth: 3},
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isNotDiabetesHaveHypertension ? 'red' : 'black',
                },
            },
            {
                id: '14-15',
                source: '14',
                target: '15',
                type: 'step',
                zIndex: this.state.isNotHypertensionThreeRisk ? 1 : 0,
                style: {stroke: this.state.isNotHypertensionThreeRisk ? 'red' : 'black', strokeWidth: 3},
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isNotHypertensionThreeRisk ? 'red' : 'black',
                },
            },
            {
                id: '14-18',
                source: '14',
                target: '18',
                type: 'step',
                zIndex: this.state.isNotHypertensionAndRisk ? 1 : 0,
                style: {stroke: this.state.isNotHypertensionAndRisk ? 'red' : 'black', strokeWidth: 3},
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isNotHypertensionAndRisk ? 'red' : 'black',
                },
            },
            {
                id: '14-19',
                source: '14',
                target: '19',
                type: 'step',
                // 没有高血压且有一个风险
                zIndex: this.state.isNotHypertensionOneRisk ? 1 : 0,
                style: {stroke: this.state.isNotHypertensionOneRisk ? 'red' : 'black', strokeWidth: 3},
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isNotHypertensionOneRisk ? 'red' : 'black',

                },
            },
            {
                id: '14-28',
                source: '14',
                target: '28',
                type: 'step',
                zIndex: this.state.isNotHypertensionTwoRisk ? 1 : 0,
                style: {stroke: this.state.isNotHypertensionTwoRisk ? 'red' : 'black', strokeWidth: 3},
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isNotHypertensionTwoRisk ? 'red' : 'black',

                },
            },
            {
                id: '15-20',
                source: '15',
                target: '20',
                type: 'step',
                zIndex: this.state.isNotHypertensionThreeZero ? 1 : 0,
                style: {
                    stroke: this.state.isNotHypertensionThreeZero ? 'red' : 'black', strokeWidth: 3
                },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isNotHypertensionThreeZero ? 'red' : 'black',
                },
            },
            {
                id: '15-21',
                source: '15',
                target: '21',
                type: 'step',
                zIndex: this.state.isNotHypertensionThreeOne ? 1 : 0,
                style: {
                    stroke: this.state.isNotHypertensionThreeOne ? 'red' : 'black', strokeWidth: 3
                },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isNotHypertensionThreeOne ? 'red' : 'black',
                },
            },
            {
                id: '15-22',
                source: '15',
                target: '22',
                type: 'step',
                zIndex: this.state.isNotHypertensionThreeTwo ? 1 : 0,
                style: {
                    stroke: this.state.isNotHypertensionThreeTwo ? 'red' : 'black', strokeWidth: 3
                },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isNotHypertensionThreeTwo ? 'red' : 'black',
                },
            },
            {
                id: '16-17',
                source: '16',
                target: '17',
                type: 'step',
                zIndex: this.state.isHypertensionAndRisk ? 1 : 0,
                style: {stroke: this.state.isHypertensionAndRisk ? 'red' : 'black', strokeWidth: 3},
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isHypertensionAndRisk ? 'red' : 'black',
                },
            },
            {
                id: '16-23',
                source: '16',
                target: '23',
                type: 'step',
                zIndex: this.state.isHypertensionOneRisk ? 1 : 0,
                style: {stroke: this.state.isHypertensionOneRisk ? 'red' : 'black', strokeWidth: 3},
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isHypertensionOneRisk ? 'red' : 'black',
                },
            },
            {
                id: '16-27',
                source: '16',
                target: '27',
                type: 'step',
                zIndex: this.state.isHypertensionThreeRisk ? 1 : 0,
                style: {stroke: this.state.isHypertensionThreeRisk ? 'red' : 'black', strokeWidth: 3},
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isHypertensionThreeRisk ? 'red' : 'black',
                },
            },
            {
                id: '16-45',
                source: '16',
                target: '45',
                type: 'step',
                zIndex: this.state.isHypertensionTwoRisk ? 1 : 0,
                style: {stroke: this.state.isHypertensionTwoRisk ? 'red' : 'black', strokeWidth: 3},
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isHypertensionTwoRisk ? 'red' : 'black',
                },
            },
            {
                id: '17-24',
                source: '17',
                target: '24',
                type: 'step',
                zIndex: this.state.isHypertensionAndRisk ? 1 : 0,
                style: {stroke: this.state.isHypertensionAndRisk ? 'red' : 'black', strokeWidth: 3},
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isHypertensionAndRisk ? 'red' : 'black',
                },
            },
            {
                id: '18-25',
                source: '18',
                target: '25',
                type: 'step',
                zIndex: this.state.isNotHypertensionAndRisk ? 1 : 0,
                style: {stroke: this.state.isNotHypertensionAndRisk ? 'red' : 'black', strokeWidth: 3},
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isNotHypertensionAndRisk ? 'red' : 'black',

                },
            },
            {
                id: '19-25',
                source: '19',
                target: '25',
                type: 'step',
                // 没有高血压且有一个风险
                zIndex: this.state.isNotHypertensionOneRisk ? 1 : 0,
                style: {stroke: this.state.isNotHypertensionOneRisk ? 'red' : 'black', strokeWidth: 3},
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isNotHypertensionOneRisk ? 'red' : 'black',

                },
            },
            {
                id: '20-29',
                source: '20',
                target: '29',
                type: 'step',
                zIndex: this.state.isNotHypertensionThreeZero ? 1 : 0,
                style: {
                    stroke: this.state.isNotHypertensionThreeZero ? 'red' : 'black', strokeWidth: 3
                },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isNotHypertensionThreeZero ? 'red' : 'black',
                },
            },
            {
                id: '21-30',
                source: '21',
                target: '30',
                type: 'step',
                zIndex: this.state.isNotHypertensionThreeOne ? 1 : 0,
                style: {
                    stroke: this.state.isNotHypertensionThreeOne ? 'red' : 'black', strokeWidth: 3
                },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isNotHypertensionThreeOne ? 'red' : 'black',
                },
            },
            {
                id: '22-30',
                source: '22',
                target: '30',
                type: 'step',
                zIndex: this.state.isNotHypertensionThreeTwo ? 1 : 0,
                style: {
                    stroke: this.state.isNotHypertensionThreeTwo ? 'red' : 'black', strokeWidth: 3
                },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isNotHypertensionThreeTwo ? 'red' : 'black',
                },
            },
            {
                id: '23-26',
                source: '23',
                target: '26',
                type: 'step',
                zIndex: this.state.isHypertensionOneZero ? 1 : 0,
                style: {
                    stroke: this.state.isHypertensionOneZero ? 'red' : 'black', strokeWidth: 3
                },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isHypertensionOneZero ? 'red' : 'black',
                },
            },
            {
                id: '23-38',
                source: '23',
                target: '38',
                type: 'step',
                zIndex: this.state.isHypertensionOneOne ? 1 : 0,
                style: {
                    stroke: this.state.isHypertensionOneOne ? 'red' : 'black', strokeWidth: 3
                },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isHypertensionOneOne ? 'red' : 'black',
                },
            },
            {
                id: '23-44',
                source: '23',
                target: '44',
                type: 'step',
                zIndex: this.state.isHypertensionOneTwo ? 1 : 0,
                style: {
                    stroke: this.state.isHypertensionOneTwo ? 'red' : 'black', strokeWidth: 3
                },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isHypertensionOneTwo ? 'red' : 'black',
                },
            },
            {
                id: '26-33',
                source: '26',
                target: '33',
                type: 'step',
                style: {
                    stroke: this.state.isHypertensionOneZero ? 'red' : 'black', strokeWidth: 3
                },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isHypertensionOneZero ? 'red' : 'black',
                },
            },
            {
                id: '27-32',
                source: '27',
                target: '32',
                type: 'step',
                style: {stroke: this.state.isHypertensionThreeRisk ? 'red' : 'black', strokeWidth: 3},
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isHypertensionThreeRisk ? 'red' : 'black',
                },
            },
            {
                id: '28-34',
                source: '28',
                target: '34',
                type: 'step',
                zIndex: this.state.isNotHypertensionTwoZero ? 1 : 0,
                style: {
                    stroke: this.state.isNotHypertensionTwoZero ? 'red' : 'black', strokeWidth: 3
                },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isNotHypertensionTwoZero ? 'red' : 'black',
                },
            },
            {
                id: '28-35',
                source: '28',
                target: '35',
                type: 'step',
                zIndex: this.state.isNotHypertensionTwoOne ? 1 : 0,
                style: {
                    stroke: this.state.isNotHypertensionTwoOne ? 'red' : 'black', strokeWidth: 3
                },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isNotHypertensionTwoOne ? 'red' : 'black',
                },
            },
            {
                id: '28-36',
                source: '28',
                target: '36',
                type: 'step',
                zIndex: this.state.isNotHypertensionTwoTwo ? 1 : 0,
                style: {
                    stroke: this.state.isNotHypertensionTwoTwo ? 'red' : 'black', strokeWidth: 3
                },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isNotHypertensionTwoTwo ? 'red' : 'black',
                },
            },
            {
                id: '30-42',
                source: '30',
                target: '42',
                type: 'step',
                zIndex: (this.state.isNotHypertensionThreeTwo || this.state.isNotHypertensionThreeOne) &&
                this.state.ascvdContent.patient.age < 50 ? 1 : 0,
                style: {
                    stroke: (this.state.isNotHypertensionThreeTwo || this.state.isNotHypertensionThreeOne) &&
                    this.state.ascvdContent.patient.age < 50 ? 'red' : 'black', strokeWidth: 3
                },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: (this.state.isNotHypertensionThreeTwo || this.state.isNotHypertensionThreeOne) &&
                    this.state.ascvdContent.patient.age < 50 ? 'red' : 'black',
                },
            },
            {
                id: '34-39',
                source: '34',
                target: '39',
                type: 'step',
                zIndex: this.state.isNotHypertensionTwoZero ? 1 : 0,
                style: {
                    stroke: this.state.isNotHypertensionTwoZero ? 'red' : 'black', strokeWidth: 3
                },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isNotHypertensionTwoZero ? 'red' : 'black',
                },
            },
            {
                id: '35-40',
                source: '35',
                target: '40',
                type: 'step',
                zIndex: this.state.isNotHypertensionTwoOne ? 1 : 0,
                style: {
                    stroke: this.state.isNotHypertensionTwoOne ? 'red' : 'black', strokeWidth: 3
                },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isNotHypertensionTwoOne ? 'red' : 'black',
                },
            },
            {
                id: '36-41',
                source: '36',
                target: '41',
                type: 'step',
                zIndex: this.state.isNotHypertensionTwoTwo ? 1 : 0,
                style: {
                    stroke: this.state.isNotHypertensionTwoTwo ? 'red' : 'black', strokeWidth: 3
                },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isNotHypertensionTwoTwo ? 'red' : 'black',
                },
            },
            {
                id: '37-42',
                source: '37',
                target: '42',
                type: 'step',
                zIndex: (this.state.isHypertensionOneTwo || this.state.isHypertensionOneOne) && this.state.ascvdContent.patient.age < 55 ? 1 : 0,
                style: {
                    stroke: (this.state.isHypertensionOneTwo || this.state.isHypertensionOneOne) && this.state.ascvdContent.patient.age < 55 ? 'red' : 'black',
                    strokeWidth: 3
                },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: (this.state.isHypertensionOneTwo || this.state.isHypertensionOneOne) && this.state.ascvdContent.patient.age < 55 ? 'red' : 'black',
                },
            },
            {
                id: '38-37',
                source: '38',
                target: '37',
                type: 'step',
                zIndex: this.state.isHypertensionOneOne ? 1 : 0,
                style: {
                    stroke: this.state.isHypertensionOneOne ? 'red' : 'black', strokeWidth: 3
                },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isHypertensionOneOne ? 'red' : 'black',
                },
            },
            {
                id: '41-42',
                source: '41',
                target: '42',
                type: 'step',
                zIndex: this.state.isNotHypertensionTwoTwo && this.state.ascvdContent.patient.age < 55 ? 1 : 0,
                style: {
                    stroke: this.state.isNotHypertensionTwoTwo && this.state.ascvdContent.patient.age < 55 ? 'red' : 'black',
                    strokeWidth: 3
                },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isNotHypertensionTwoTwo && this.state.ascvdContent.patient.age < 55 ? 'red' : 'black',
                },
            },
            {
                id: '44-37',
                source: '44',
                target: '37',
                type: 'step',
                zIndex: this.state.isHypertensionOneTwo ? 1 : 0,
                style: {
                    stroke: this.state.isHypertensionOneTwo ? 'red' : 'black', strokeWidth: 3
                },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isHypertensionOneTwo ? 'red' : 'black',
                },
            },
            {
                id: '45-46',
                source: '45',
                target: '46',
                type: 'step',
                zIndex: this.state.isHypertensionTwoZero ? 1 : 0,
                style: {
                    stroke: this.state.isHypertensionTwoZero ? 'red' : 'black', strokeWidth: 3
                },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isHypertensionTwoZero ? 'red' : 'black',
                },
            },
            {
                id: '45-47',
                source: '45',
                target: '47',
                type: 'step',
                zIndex: this.state.isHypertensionTwoOne ? 1 : 0,
                style: {
                    stroke: this.state.isHypertensionTwoOne ? 'red' : 'black', strokeWidth: 3
                },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isHypertensionTwoOne ? 'red' : 'black',
                },
            },
            {
                id: '45-48',
                source: '45',
                target: '48',
                type: 'step',
                zIndex: this.state.isHypertensionTwoTwo ? 1 : 0,
                style: {
                    stroke: this.state.isHypertensionTwoTwo ? 'red' : 'black', strokeWidth: 3
                },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isHypertensionTwoTwo ? 'red' : 'black',
                },
            },
            {
                id: '46-49',
                source: '46',
                target: '49',
                type: 'step',
                style: {
                    stroke: this.state.isHypertensionTwoZero ? 'red' : 'black', strokeWidth: 3
                },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isHypertensionTwoZero ? 'red' : 'black',
                },
            },
            {
                id: '47-50',
                source: '47',
                target: '50',
                type: 'step',
                style: {
                    stroke: this.state.isHypertensionTwoOne ? 'red' : 'black', strokeWidth: 3
                },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isHypertensionTwoOne ? 'red' : 'black',
                },
            },
            {
                id: '48-51',
                source: '48',
                target: '51',
                type: 'step',
                style: {
                    stroke: this.state.isHypertensionTwoTwo ? 'red' : 'black', strokeWidth: 3
                },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isHypertensionTwoTwo ? 'red' : 'black',
                },
            },
            {
                id: '49-42',
                source: '49',
                target: '42',
                type: 'step',
                zIndex: this.state.isHypertensionTwoZero && this.state.ascvdContent.patient.age < 50 ? 1 : 0,
                style: {
                    stroke: this.state.isHypertensionTwoZero && this.state.ascvdContent.patient.age < 50 ? 'red' : 'black',
                    strokeWidth: 3
                },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: this.state.isHypertensionTwoZero && this.state.ascvdContent.patient.age < 50 ? 'red' : 'black',
                },
            },

        ];


        return (
            <div>
                <div className="ascvd-main">
                    <img
                        src={this.state.dataURL}
                        onClick={() => {
                            this.setState({
                                viewerVisible: true
                            })
                        }}
                        alt="ascvd流程图"
                        className="ascvd-main-img"
                    />
                    {this.state.viewerVisible &&
                        <Viewer
                            visible={true}
                            onClose={() => {
                                this.setState({
                                    viewerVisible: false
                                })
                            }}
                            images={[{src: this.state.dataURL, alt: 'ascvd流程图'}]}
                        />}
                    {this.state.display &&
                        <div className="ascvd-flow" id="myCanvas">
                            <ReactFlow
                                nodes={nodes}
                                edges={edges}
                                proOptions={proOptions}
                            >
                                <Background/>
                            </ReactFlow>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default AscvdFlow;