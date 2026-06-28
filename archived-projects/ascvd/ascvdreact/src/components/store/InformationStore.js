import {observable, action, makeObservable, runInAction} from 'mobx';
import BaseProvider from "../../utils/Provider";
import {WEBURL} from "../../constants/constants";

/**
 * 基本信息的数据仓库
 */
class InformationStore {

    constructor() {
        makeObservable(this);
    }

    @observable loading = false;
    // ascvd历史疾病
    @observable HistoryDD = [];
    // 慢性疾病
    @observable ChronicDD = [];
    // 个人信息主体内容
    @observable patientContent = {}

    /**
     * 创建Patient
     */
    @action postPatient = (data) => {
        if (this.loading) {
            return;
        }
        this.loading = true;
        BaseProvider.post(`${WEBURL}/Patient/`, data).then((res) => {
            runInAction(()=>{
                this.patientContent = res.data;
            })
            console.log(res.data);
        }).catch((err) => {
            console.log("err"+err.data);
        }).finally(
            this.loading = false
        );
    };

    /**
     * 获取疾病字典(DiseaseDict)中的慢性疾病
     */
    @action fetchChronicDD = () => {
        if (this.loading) {
            return;
        }
        this.loading = true;
        BaseProvider.get(`${WEBURL}/DiseaseDict/?type=ascvd_chronic`).then((res) => {
            runInAction(()=>{
                this.ChronicDD = res.data;
            })
        }).catch((err) => {
                console.log(err.data);
            }
        ).finally(
            this.loading = false
        );
    };
    /**
     * 获取疾病字典(DiseaseDict)中的ascvd历史疾病
     */
    @action fetchHistoryDD = () => {
        if (this.loading) {
            return;
        }
        this.loading = true;
        BaseProvider.get(`${WEBURL}/DiseaseDict/?type=ascvd_history`).then((res) => {
            runInAction(()=>{
                this.HistoryDD = res.data;
            })
        }).catch((err) => {
                console.log(err.data);
            }
        ).finally(
            this.loading = false
        );
    };
}

export default new InformationStore()