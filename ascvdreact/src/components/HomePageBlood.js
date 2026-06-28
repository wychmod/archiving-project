import React from 'react';
import AaiHeader from "./header/AaiHeader";
import {Menu, Col, Row} from 'antd';
import AaiFooter from "./footer/AaiFooter";
import BasicInformation from "./information/BasicInformation";
import {ApartmentOutlined, LaptopOutlined, UserOutlined, ProfileOutlined} from '@ant-design/icons';
import InformationStore from "./store/InformationStore";
import BloodFat from "./bloodFat/BloodFat";
import GenePolymorphism from "./genePolymorphism/GenePolymorphism";
import ReportContentBlood from "./report/ReportContentBlood";

import './HomePage.scss';
/**
 * 首页组件
 */
class HomePageBlood extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            basicInformation: {},
            bloodFatContent: {},
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

    // bloodFat下一步方法
    onBloodFatNext = (data) => {
        this.setState({
            bloodFatContent: data,
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
            bloodFatContent: {},
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
        const siderArrays = ['基本信息',  '血脂亚组分', '基因多态性', '综合检验诊断报告']
        const siderArraysEn = ['BASIC INFORMATION',  'BLOOD LIPID SUBFRACTION',
            'GENE POLYMORPHISM', 'COMPREHENSIVE REPORT']
        const siderItems = [UserOutlined, ApartmentOutlined, LaptopOutlined, ProfileOutlined].map((icon, index) => {
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
                        {this.state.index === 1 && <BloodFat onPreStep={() => this.onPreStep(1)} onNextStep={this.onBloodFatNext} />}
                        {this.state.index === 2 && <GenePolymorphism onPreStep={() => this.onPreStep(2)} onNextStep={this.onGPNext} />}
                        {this.state.index === 3 && <ReportContentBlood onPreStep={() => this.onPreStep(3)} onNextStep={this.onReportNext} />}
                    </Col>
                </Row>
                <AaiFooter/>
            </div>
        )
    }
}

export default HomePageBlood;