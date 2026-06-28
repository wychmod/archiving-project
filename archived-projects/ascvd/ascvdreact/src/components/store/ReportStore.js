import {observable, action, makeObservable, runInAction} from 'mobx';
import BaseProvider from "../../utils/Provider";
import {WEBURL} from "../../constants/constants";
import {formatDate} from "../../utils/DataFormat";

/**
 * 报告信息数据仓库
 */

class ReportStore {

    constructor() {
        makeObservable(this);
    }

    @observable loading = false;
    // 报告信息主体内容
    @observable ReportContent = {}
    /**
     * 创建Report
     */
    @action postReport= (data) => {
        if (this.loading) {
            return;
        }
        this.loading = true;
        BaseProvider.post(`${WEBURL}/ReportInformation/`, data).then((res) => {
            runInAction(()=>{
                res.data.Acq_time = formatDate(res.data.Acq_time)
                res.data.Rec_time = formatDate(res.data.Rec_time)
                res.data.Rep_time = formatDate(res.data.Rep_time)
                this.ReportContent = res.data;

            })
        }).catch((err) => {
            console.log("err"+err.data);
        }).finally(
            this.loading = false
        );
    };
}

export default new ReportStore()