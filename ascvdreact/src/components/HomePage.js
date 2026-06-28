import React from 'react';
import AaiHeader from "./header/AaiHeader";
import {Menu, Col, Row} from 'antd';
import AaiFooter from "./footer/AaiFooter";
import Ascvd from "./ascvd/ascvd";
import BasicInformation from "./information/BasicInformation";
import { PieChartOutlined, LaptopOutlined, UserOutlined, ProfileOutlined} from '@ant-design/icons';
import InformationStore from "./store/InformationStore";
import GenePolymorphism from "./genePolymorphism/GenePolymorphism";
import ReportContentAscvd from "./report/ReportContentAscvd";

import './HomePage.scss';
/**
 * 首页组件
 */
class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            basicInformation: {},
            ascvdContent: {},
            genePolymorphismContent: {},
        }
    }

    // 基本信息下一步方法
    onInformationNext = (data) => {
        this.setState({
            basicInformation: data,
            index: 1
        })
        InformationStore.postPatient(data);
    }

    // ascvd提交下一步方法
    AscvdSubmit = (data) => {
        this.setState({
            ascvdContent: data,
            index: 2
        })
    }

    // GenePolymorphism下一步方法
    onGPNext = (data) => {
        this.setState({
            genePolymorphismContent: data,
            index: 3
        })
    }

    // 报告下一步
    onReportNext = () => {
        this.setState({
            basicInformation: {},
            ascvdContent: {},
            genePolymorphismContent: {},
            index: 0
        })
    }

    // 通用上一步的方法
    onPreStep = (index) => {
        this.setState({
            index: index - 1
        })
    }

    render() {
        const siderArrays = ['基本信息', 'ASCVD发病危险评估','基因多态性', '综合检验诊断报告']
        const siderArraysEn = ['BASIC INFORMATION', 'ASCVD RISK ASSESSMENT',
            'GENE POLYMORPHISM', 'COMPREHENSIVE REPORT']
        const siderItems = [UserOutlined,  PieChartOutlined, LaptopOutlined, ProfileOutlined].map((icon, index) => {
            const key = String(index);
            return {
                key: `${key}`,
                icon: React.createElement(icon),
                label: siderArrays[key],
            }
        });

        // const onClick = (e) => {
        //     this.setState({
        //         index: Number(e.key),
        //     })
        // };


        return (
            <div className="layout">
                <AaiHeader title={siderArrays[this.state.index]} enTitle={siderArraysEn[this.state.index]}/>
                <Row className="home-page-row">
                    <Col span={5}>
                        <Menu
                            // onClick={onClick}
                            className="home-page-menu"
                            mode="vertical"
                            selectedKeys={[`${this.state.index}`]}
                            selectable={false}
                            style={{
                                height: '100%',
                            }}
                            items={siderItems}
                        />
                    </Col>
                    <Col span={18}>
                        {this.state.index === 0 && <BasicInformation onInformationNext={this.onInformationNext} />}
                        {this.state.index === 1 && <Ascvd AscvdSubmit={this.AscvdSubmit} onPreStep={() => this.onPreStep(1)} />}
                        {this.state.index === 2 && <GenePolymorphism onPreStep={() => this.onPreStep(2)} onNextStep={this.onGPNext} />}
                        {this.state.index === 3 && <ReportContentAscvd onPreStep={() => this.onPreStep(3)} onNextStep={this.onReportNext} />}
                    </Col>
                </Row>
                <AaiFooter/>
            </div>
        )
    }
}

export default HomePage;
