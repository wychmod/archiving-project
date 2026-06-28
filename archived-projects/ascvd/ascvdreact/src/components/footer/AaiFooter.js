import React from 'react';
import {Footer} from "antd/es/layout/layout";
import './AaiFooter.scss';


/**
 * 页脚组件
 */
class AaiFooter extends React.Component {
    render() {
        return (
            <Footer className="aai-footer">Copyright © 2021 ASCVD. All right reserved.</Footer>
        )
    }
}

export default AaiFooter;