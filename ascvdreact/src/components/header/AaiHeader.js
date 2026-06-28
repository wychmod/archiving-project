import React from 'react';
import {Header} from "antd/es/layout/layout";
import './AaiHeader.scss';
/**
 * ascvd 页头组件
 */
class AaiHeader extends React.Component {

    render() {
        return (
            <Header className="ascvd-header">
                <div className="ascvd-overlay" />
                <div className="ascvd-title">
                    <h1 className="ascvd-title-h1" >
                        {this.props.title}
                    </h1>
                    <p className="ascvd-title-p">{this.props.enTitle}</p>
                </div>
            </Header>
        )
    }
}

export default AaiHeader;