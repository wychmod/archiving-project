import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Ascvd from "./components/ascvd/ascvd";
import MedicalReport from "./components/report/MedicalReport";
import HomePage from "./components/HomePage";
import './App.css';
import HomePageBlood from "./components/HomePageBlood"

// route进行路由配置
function App() {
    return (
        <div className="App">
            <Routes>
                {/*ascvd发病危险评估页面*/}
                <Route path="/" exact={false} element={<HomePage />}/>
                {/*血脂亚组分页面*/}
                <Route path="/blood" exact={false} element={<HomePageBlood />}/>
                <Route path="/ascvd" exact={false} element={<Ascvd />}/>
                <Route path="/report" exact={false} element={<MedicalReport />}/>
            </Routes>
        </div>
    );
}

export default App;
