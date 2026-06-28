import React from 'react';
import AscvdContent from "./content/AscvdContent";
import {observer} from "mobx-react";
import "./ascvd.scss";


/**
 * Ascvd主体组件
 */
@observer
class Ascvd extends React.Component {


    render() {


        return (
            <AscvdContent AscvdSubmit={this.props.AscvdSubmit} onPreStep={this.props.onPreStep}/>
        )
    }
}

export default Ascvd;
