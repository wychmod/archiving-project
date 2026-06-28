import React from 'react';
import {Typography, Descriptions, Col, Row, Button} from 'antd';
import InformationStore from "../../store/InformationStore";
import AscvdStore from "../../store/AscvdStore";
import GenePolymorphismStore from "../../store/GenePolymorphismStore";
import {observer} from "mobx-react";
import ReportStore from "../../store/ReportStore";
import "./ReportContent.scss";

const {Title} = Typography;

/**
 * 报告一组件
 */
@observer
class ReportContentOne extends React.Component {
    render() {
        // 复用组件
        function descriptionsMain(number, name, simpleName, result, unit, interval, method) {
            return (<>
                <Descriptions.Item span={1}>{number}</Descriptions.Item>
                <Descriptions.Item span={3}>
                    <div dangerouslySetInnerHTML={{__html: name}}/>
                </Descriptions.Item>
                <Descriptions.Item span={2}>
                    <div dangerouslySetInnerHTML={{__html: simpleName}}/>
                </Descriptions.Item>
                <Descriptions.Item span={1}>{result}</Descriptions.Item>
                <Descriptions.Item span={1}>{unit}</Descriptions.Item>
                <Descriptions.Item span={1}>{interval}</Descriptions.Item>
                <Descriptions.Item span={1}>{method}</Descriptions.Item>
            </>)
        }

        // 复用组件
        function descriptionsSimpleMain(number, name, simpleName, result) {
            return (<>
                <Descriptions.Item span={1}>{number}</Descriptions.Item>
                <Descriptions.Item span={3}>{name}</Descriptions.Item>
                <Descriptions.Item span={2}>{simpleName}</Descriptions.Item>
                <Descriptions.Item span={4}>{result}</Descriptions.Item>
            </>)
        }

        // 判断数据是否加载了
        // function onShowSkeleton() {
        //     if (JSON.stringify(InformationStore.patientContent) === '{}' ||
        //         JSON.stringify(AscvdStore.ascvdContent) === '{}' ||
        //         JSON.stringify(GenePolymorphismStore.GenePolymorphismContent) === '{}'
        //     )
        //         return true
        //     return false
        // }

        const information = InformationStore.patientContent;
        const ascvd = AscvdStore.ascvdContent;
        const gene = GenePolymorphismStore.GenePolymorphismContent;
        const report = ReportStore.ReportContent;
        let hypertension = information.chronic_illness || [];
        if(hypertension){
            hypertension = hypertension.toString().split(',').filter(ill => ill === "高血压")
            // console.log(hypertension)
        }
        let diabetes =information.chronic_illness || [];
        if(diabetes){
            diabetes = diabetes.toString().split(',').filter(ill => ill === "糖尿病")
            // console.log(diabetes)
        }

        return (
            // onShowSkeleton() ? <Skeleton className="report-content-skeleton"/> :
                <div>
                    <Row className="report-content">
                        <Col offset={11}>
                            <span className="report-content-titles" >
                                诊断报告
                            </span>
                        </Col>
                        <Col span={16} offset={4}>
                            <Title
                                className="report-content-title"
                                level={4}
                            >
                                动脉粥样硬化性心血管疾病（ASCVD）发病危险评估、血脂亚组分及基因多态性检测
                            </Title>
                            <Descriptions className="report-content-table" column={4}>
                                <Descriptions.Item
                                    label="姓名">{information.name ? information.name : ""}</Descriptions.Item>
                                <Descriptions.Item
                                    label="患者编号">{information.id ? information.id : ""}</Descriptions.Item>
                                <Descriptions.Item
                                    label="BMI">{information.BMI ? information.BMI : ""}</Descriptions.Item>
                                <Descriptions.Item label="糖尿病史">{diabetes.length > 0 ? "是" : "否"}</Descriptions.Item>
                                <Descriptions.Item
                                    label="性别">{information.gender ? information.gender : ""}</Descriptions.Item>
                                <Descriptions.Item
                                    label="病区">{information.inpatient_area ? information.inpatient_area : ""}</Descriptions.Item>
                                <Descriptions.Item
                                    label="血压">{information.blood_pressure ? information.blood_pressure : ""}</Descriptions.Item>
                                <Descriptions.Item
                                    label="ASCVD病史">{ascvd.ascvd_history ? "是" : ""}</Descriptions.Item>
                                <Descriptions.Item
                                    label="年龄">{information.age ? information.age : ""}</Descriptions.Item>
                                <Descriptions.Item
                                    label="科室">{information.department ? information.department : ""}</Descriptions.Item>
                                <Descriptions.Item
                                    label="吸烟史">{information.smoked === "Y" ? "是" : "否"}</Descriptions.Item>
                                <Descriptions.Item
                                    label="高血压病史">{hypertension.length > 0 ? "是" : "否"}</Descriptions.Item>
                                <Descriptions.Item
                                    label="采样者">{information.sampler ? information.sampler : ""}</Descriptions.Item>
                                <Descriptions.Item label="送检医师"
                                                   span={3}>{information.submitting_doctor ? information.submitting_doctor : ""}</Descriptions.Item>
                                <Descriptions.Item label="临床诊断"
                                                   span={4}>{information.clinical_diagnosis ? information.clinical_diagnosis : ""}</Descriptions.Item>
                                <Descriptions.Item label="医嘱申请项目"
                                                   span={4}>{information.application_items ? information.application_items : ""}</Descriptions.Item>
                            </Descriptions>
                            <Descriptions className="report-content-table-title">
                                <Descriptions.Item>一、检测结果</Descriptions.Item>
                            </Descriptions>
                            <Descriptions className="report-content-table-title" column={10}>
                                {descriptionsMain(
                                    '序号', '中文名称', '项目简称',
                                    '结果', '单位', '参考区间', '检测方法'
                                )}
                            </Descriptions>
                            <Descriptions className="report-content-table-main" column={10}>
                                <Descriptions.Item span={10}>血脂检测（样本类型:{ascvd.lipids_type}{'\u00A0\u00A0\u00A0'}
                                    条码号:{ascvd.lipids_barcode}{'\u00A0\u00A0\u00A0'}样本号：{ascvd.lipids_number}{'\u00A0\u00A0\u00A0'}
                                    样本状态：{ascvd.lipids_status}）</Descriptions.Item>
                                {descriptionsMain(
                                    '1', '总胆固醇', 'TC',
                                    ascvd.tc, 'mmol/L', '3.10-5.72', ''
                                )}
                                {descriptionsMain(
                                    '2', '甘油三酯', 'TG',
                                    ascvd.tg, 'mmol/L', '0.40-1.70', ''
                                )}
                                <Descriptions.Item span={10}>脂蛋白检测（样本类型:{ascvd.Lp_type}{'\u00A0\u00A0\u00A0'}
                                    条码号:{ascvd.Lp_barcode}{'\u00A0\u00A0\u00A0'}样本号：{ascvd.Lp_number}{'\u00A0\u00A0\u00A0'}
                                    样本状态：{ascvd.Lp_status}）</Descriptions.Item>
                                {descriptionsMain(
                                    '1', '高密度脂蛋白胆固醇', 'HDL-C',
                                    ascvd.HDL_C, 'mmol/L', '1.0-2.1', ''
                                )}
                                {descriptionsMain(
                                    '2', '低密度脂蛋白胆固醇', 'LDL-C',
                                    ascvd.LDL_C, 'mmol/L', '0-3.37', ''
                                )}
                                {descriptionsMain(
                                    '3', '非高密度脂蛋白胆固醇', 'non-HDL',
                                    ascvd.non_HDL, 'mmol/L', '', ''
                                )}
                                {descriptionsMain(
                                    '4', '载脂蛋白A1', 'ApoA1',
                                    ascvd.Apo_A1, 'mmol/L', '', ''
                                )}
                                {descriptionsMain(
                                    '5', '载脂蛋白B', 'ApoB',
                                    ascvd.Apo_B, 'mmol/L', '', ''
                                )}
                                {descriptionsMain(
                                    '6', '脂蛋白(a)', 'Lp(a)',
                                    ascvd.LP_a, 'mmol/L', '', ''
                                )}
                                <Descriptions.Item span={10}>
                                    他汀类化学药物用药指导的基因检测（样本类型:{gene.statin_type}{'\u00A0\u00A0\u00A0'}
                                    条码号:{gene.statin_barcode}{'\u00A0\u00A0\u00A0'}样本号：{gene.statin_number}{'\u00A0\u00A0\u00A0'}
                                    样本状态：{gene.statin_status}）
                                </Descriptions.Item>
                                {descriptionsSimpleMain(
                                    '1', 'SLCO1B1基因型', 'SLCO1B1',
                                    gene.SLCO1B1,
                                )}
                                {descriptionsSimpleMain(
                                    '2', 'ApoE基因型', 'ApoE',
                                    gene.ApoE,
                                )}
                                {descriptionsSimpleMain(
                                    '3', 'SLCOIB1*1b 388A', 'SLCOIBI*1b A',
                                    gene.SLCO1B1_1b_388A,
                                )}
                                {descriptionsSimpleMain(
                                    '4', 'SLCOIB1*1b 388G', 'SLCOIBI*1b G',
                                    gene.SLCO1B1_1b_388G,
                                )}
                                {descriptionsSimpleMain(
                                    '5', 'SLC01B1*5 521T', 'SLCOIBI*5 T',
                                    gene.SLCO1B1_5_521T,
                                )}
                                {descriptionsSimpleMain(
                                    '6', 'SLCO1B1*5 521C', 'SLCO1B1*5 C',
                                    gene.SLCO1B1_5_521C,
                                )}
                                {descriptionsSimpleMain(
                                    '7', 'ApoE2 526C', 'ApoE2 526C',
                                    gene.ApoE2_526C,
                                )}
                                {descriptionsSimpleMain(
                                    '8', 'ApoE2 526T', 'ApoE2 526T',
                                    gene.ApoE2_526T,
                                )}
                                {descriptionsSimpleMain(
                                    '9', 'ApoE4 388T', 'ApoE4 388T',
                                    gene.ApoE4_388T,
                                )}
                                {descriptionsSimpleMain(
                                    '10', 'ApoE4 388C', 'ApoE4 388C',
                                    gene.ApoE4_388C,
                                )}
                                <Descriptions.Item span={10}>
                                    氯毗格雷化学药物用药指导的基因检测（样本类型:{gene.clopidogrel_type}{'\u00A0\u00A0\u00A0'}
                                    条码号:{gene.clopidogrel_barcode}{'\u00A0\u00A0\u00A0'}样本号：{gene.clopidogrel_number}{'\u00A0\u00A0\u00A0'}
                                    样本状态：{gene.clopidogrel_status}）
                                </Descriptions.Item>
                                {descriptionsSimpleMain(
                                    '1', 'CYP2C19 基因分型', 'CYP2C19',
                                    gene.CYP2C19,
                                )}
                                {descriptionsSimpleMain(
                                    '2', 'CYP2C19-681/*2G', 'CYP2C19*2G',
                                    gene.CYP2C19_681_2G,
                                )}
                                {descriptionsSimpleMain(
                                    '3', 'CYP2C19-681/*2A', 'CYP2C19*2A',
                                    gene.CYP2C19_681_2A,
                                )}
                                {descriptionsSimpleMain(
                                    '4', 'CYP2C19-636/*3G', 'CYP2C19*3G',
                                    gene.CYP2C19_636_3G,
                                )}
                                {descriptionsSimpleMain(
                                    '5', 'CYP2C19-636/*3A', 'CYP2C19*3A',
                                    gene.CYP2C19_636_3A,
                                )}
                                {descriptionsSimpleMain(
                                    '6', 'CYP2C19-806/*17C', 'CYP2C19*17C',
                                    gene.CYP2C19_806_17C,
                                )}
                                {descriptionsSimpleMain(
                                    '7', 'CYP2C19*17T', 'CYP2C19*17T',
                                    gene.CYP2C19_806_17T,
                                )}
                            </Descriptions>
                            <Descriptions className="report-content-table-title" column={1}>
                                <Descriptions.Item>二、检验诊断/结论</Descriptions.Item>
                                <Descriptions.Item>{ascvd.conclusion}</Descriptions.Item>
                            </Descriptions>
                            <Descriptions column={3}>
                                <Descriptions.Item label="样本采集时间">{report.Acq_time}</Descriptions.Item>
                                <Descriptions.Item label="样本接收时间">{report.Rec_time}</Descriptions.Item>
                                <Descriptions.Item label="报告时间">{report.Rep_time}</Descriptions.Item>
                            </Descriptions>
                            <Descriptions column={4}>
                                <Descriptions.Item label="检验者">{report.doctor_test}</Descriptions.Item>
                                <Descriptions.Item label="报告（审核）者">{report.doctor_exam}</Descriptions.Item>
                                <Descriptions.Item label="医院地址">{report.address}</Descriptions.Item>
                                <Descriptions.Item label="联系电话">{report.mobile}</Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8} offset={10}>
                            <Button type="primary" onClick={() => this.props.onPreStep()} className="step-two-button">
                                上一步
                            </Button>
                            <Button type="primary" onClick={() => this.props.onNextStep()} >
                                重新开始
                            </Button>
                        </Col>
                    </Row>
                </div>
        )
    }
}

export default ReportContentOne;