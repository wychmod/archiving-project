import React from 'react';
import {Typography, Descriptions, Col, Row} from 'antd';
import "./ReportContent.scss";

const {Title} = Typography;

/**
 * 报告主题内容
 */
class ReportContent extends React.Component {


    render() {
        function descriptionsMain(number, name, simpleName, result, unit, interval, method) {
            return (<>
                <Descriptions.Item span={1}>{number}</Descriptions.Item>
                <Descriptions.Item span={3}><div dangerouslySetInnerHTML={{ __html: name }} /></Descriptions.Item>
                <Descriptions.Item span={2}><div dangerouslySetInnerHTML={{ __html: simpleName }} /></Descriptions.Item>
                <Descriptions.Item span={1}>{result}</Descriptions.Item>
                <Descriptions.Item span={1}>{unit}</Descriptions.Item>
                <Descriptions.Item span={1}>{interval}</Descriptions.Item>
                <Descriptions.Item span={1}>{method}</Descriptions.Item>
            </>)
        }

        function descriptionsSimpleMain(number, name, simpleName, result) {
            return (<>
                <Descriptions.Item span={1}>{number}</Descriptions.Item>
                <Descriptions.Item span={3}>{name}</Descriptions.Item>
                <Descriptions.Item span={2}>{simpleName}</Descriptions.Item>
                <Descriptions.Item span={4}>{result}</Descriptions.Item>
            </>)
        }

        return (
            <Row className="report-content">
                <Col span={16} offset={4}>
                    <Title
                        className="report-content-title"
                        level={4}
                    >
                        动脉粥样硬化性心血管疾病（ASCVD）发病危险评估、血脂亚组分及基因多态性检测
                    </Title>
                    <Descriptions className="report-content-table" column={4}>
                        <Descriptions.Item label="姓名">xxxx</Descriptions.Item>
                        <Descriptions.Item label="患者编号">xxxx</Descriptions.Item>
                        <Descriptions.Item label="BMI">xxxx</Descriptions.Item>
                        <Descriptions.Item label="糖尿病史">xxxx</Descriptions.Item>
                        <Descriptions.Item label="性别">xxxx</Descriptions.Item>
                        <Descriptions.Item label="病区">xxxx</Descriptions.Item>
                        <Descriptions.Item label="血压">xxxx</Descriptions.Item>
                        <Descriptions.Item label="ASCVD病史">xxxx</Descriptions.Item>
                        <Descriptions.Item label="年龄">xxxx</Descriptions.Item>
                        <Descriptions.Item label="科室">xxxx</Descriptions.Item>
                        <Descriptions.Item label="吸烟史">xxxx</Descriptions.Item>
                        <Descriptions.Item label="高血压病史">xxxx</Descriptions.Item>
                        <Descriptions.Item label="采样者">xxxx</Descriptions.Item>
                        <Descriptions.Item label="送检医师" span={3}>xxxx</Descriptions.Item>
                        <Descriptions.Item label="临床诊断" span={4}>xxxx</Descriptions.Item>
                        <Descriptions.Item label="医嘱申请项目" span={4}>xxxx</Descriptions.Item>
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
                        <Descriptions.Item span={10}>血脂与脂蛋白检测（样本类型：xxxx 条码号：xxxx 样本号：xxxx 样本状态：xxxx)</Descriptions.Item>
                        {descriptionsMain(
                            '1', '甘油三酯', 'TG',
                            '36.5', 'XXXX', 'XXXX', 'XXXX'
                        )}
                        {descriptionsMain(
                            '2', '载脂蛋白A1', 'ApoA1',
                            'XXXX', 'XXXX', 'XXXX', 'XXXX'
                        )}
                        {descriptionsMain(
                            '3', '载脂蛋白B', 'ApoB',
                            'XXXX', 'XXXX', 'XXXX', 'XXXX'
                        )}
                        {descriptionsMain(
                            '4', '脂蛋白(a)', 'Lp(a)',
                            'XXXX', 'XXXX', 'XXXX', 'XXXX'
                        )}
                        <Descriptions.Item span={10}>血脂亚组分检测（样本类型：xxxx 条码号：xxxx 样本号：xxxx 样本状态：xxxx)</Descriptions.Item>
                        {descriptionsMain(
                            '1', '总胆固醇', 'TC',
                            'XXXX', 'XXXX', 'XXXX', 'XXXX'
                        )}
                        {descriptionsMain(
                            '2', '高密度脂蛋白胆固醇', 'HDL-C',
                            'XXXX', 'XXXX', 'XXXX', 'XXXX'
                        )}
                        {descriptionsMain(
                            '3', '低密度脂蛋白胆固醇', 'LDL-C',
                            'XXXX', 'XXXX', 'XXXX', 'XXXX'
                        )}
                        {descriptionsMain(
                            '4', '低密度脂蛋白亚型<sub>4+3+2+1</sub>胆固醇', 'LDL<sub>4+3+2+1</sub>',
                            'XXXX', 'XXXX', 'XXXX', 'XXXX'
                        )}
                        {descriptionsMain(
                            '5', '非高密度脂蛋白胆固醇', 'non-HDL',
                            'XXXX', 'XXXX', 'XXXX', 'XXXX'
                        )}
                        {descriptionsMain(
                            '6', '中间密度脂蛋白胆固醇', 'IDL',
                            'XXXX', 'XXXX', 'XXXX', 'XXXX'
                        )}
                        {descriptionsMain(
                            '7', '极低密度脂蛋白胆固醇', 'VLDL',
                            'XXXX', 'XXXX', 'XXXX', 'XXXX'
                        )}
                        {descriptionsMain(
                            '8', '高密度脂蛋白2', 'HDL2',
                            'XXXX', 'XXXX', 'XXXX', 'XXXX'
                        )}
                        {descriptionsMain(
                            '9', '高密度脂蛋白3', 'HDL3',
                            'XXXX', 'XXXX', 'XXXX', 'XXXX'
                        )}
                        {descriptionsMain(
                            '10', '残粒样脂蛋白胆固醇', 'RLP-C',
                            'XXXX', 'XXXX', 'XXXX', 'XXXX'
                        )}
                        {descriptionsMain(
                            '11', '极低密度脂蛋白3', 'VLDL3',
                            'XXXX', 'XXXX', 'XXXX', 'XXXX'
                        )}
                        {descriptionsMain(
                            '12', '小而密低密度脂蛋白胆固醇', 'sdLDL-C',
                            'XXXX', 'XXXX', 'XXXX', 'XXXX'
                        )}
                        {descriptionsMain(
                            '13', '低密度脂蛋白类型（定性检测，A型，B型，A\\B型）', 'LDL type',
                            'XXXX', 'XXXX', 'XXXX', 'XXXX'
                        )}
                        {descriptionsMain(
                            '14', '低密度脂蛋白颗粒', 'LDL-P',
                            'XXXX', 'XXXX', 'XXXX', 'XXXX'
                        )}
                        <Descriptions.Item span={10}>
                            他汀类化学药物用药指导的基因检测（样本类型：xxxx 条码号：xxxx 样本号：xxxx 样本状态：xxxx)
                        </Descriptions.Item>
                        {descriptionsSimpleMain(
                            '1', 'SLCO1B1基因型', 'SLCO1B1',
                            'XXXX',
                        )}
                        {descriptionsSimpleMain(
                            '2', 'ApoE基因型', 'ApoE',
                            'XXXX',
                        )}
                        {descriptionsSimpleMain(
                            '3', 'SLCOIB1*1b 388A', 'SLCOIBI*1b A',
                            'XXXX',
                        )}
                        {descriptionsSimpleMain(
                            '4', 'SLCOIB1*1b 388G', 'SLCOIBI*1b G',
                            'XXXX',
                        )}
                        {descriptionsSimpleMain(
                            '5', 'SLC01B1*5 521T', 'SLCOIBI*5 T',
                            'XXXX',
                        )}
                        {descriptionsSimpleMain(
                            '6', 'SLCO1B1*5 521C', 'SLCO1B1*5 C',
                            'XXXX',
                        )}
                        {descriptionsSimpleMain(
                            '7', 'ApoE2 526C', 'ApoE2 526C',
                            'XXXX',
                        )}
                        {descriptionsSimpleMain(
                            '8', 'ApoE2 526T', 'ApoE2 526T',
                            'XXXX',
                        )}
                        {descriptionsSimpleMain(
                            '9', 'ApoE4 388T', 'ApoE4 388T',
                            'XXXX',
                        )}
                        {descriptionsSimpleMain(
                            '10', 'ApoE4 388C', 'ApoE4 388C',
                            'XXXX',
                        )}
                        <Descriptions.Item span={10}>
                            氯毗格雷化学药物用药指导的基因检测（样本类型：xxxx 条码号：xxxx 样本号：xxxx 样本状态：xxxx)
                        </Descriptions.Item>
                        {descriptionsSimpleMain(
                            '1', 'CYP2C19 基因分型', 'CYP2C19',
                            'XXXX',
                        )}
                        {descriptionsSimpleMain(
                            '2', 'CYP2C19-681/*2G', 'CYP2C19*2G',
                            'XXXX',
                        )}
                        {descriptionsSimpleMain(
                            '3', 'CYP2C19-681/*2A', 'CYP2C19*2A',
                            'XXXX',
                        )}
                        {descriptionsSimpleMain(
                            '4', 'CYP2C19-636/*3G', 'CYP2C19*3G',
                            'XXXX',
                        )}
                        {descriptionsSimpleMain(
                            '5', 'CYP2C19-636/*3A', 'CYP2C19*3A',
                            'XXXX',
                        )}
                        {descriptionsSimpleMain(
                            '6', 'CYP2C19-806/*17C', 'CYP2C19*17C',
                            'XXXX',
                        )}
                        {descriptionsSimpleMain(
                            '7', 'CYP2C19*17T', 'CYP2C19*17T',
                            'XXXX',
                        )}
                    </Descriptions>
                    <Descriptions className="report-content-table-title" column={1}>
                        <Descriptions.Item>二、检验诊断/结论</Descriptions.Item>
                        <Descriptions.Item>xxxx</Descriptions.Item>
                    </Descriptions>
                    <Descriptions column={3}>
                        <Descriptions.Item label="样本采集时间">xxxx</Descriptions.Item>
                        <Descriptions.Item label="样本接收时间">xxxx</Descriptions.Item>
                        <Descriptions.Item label="报告时间">xxxx</Descriptions.Item>
                    </Descriptions>
                    <Descriptions column={4}>
                        <Descriptions.Item label="校验者">xxxx</Descriptions.Item>
                        <Descriptions.Item label="报告（审核）者">xxxx</Descriptions.Item>
                        <Descriptions.Item label="医院地址">xxxx</Descriptions.Item>
                        <Descriptions.Item label="联系电话">xxxx</Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
        )
    }
}

export default ReportContent;