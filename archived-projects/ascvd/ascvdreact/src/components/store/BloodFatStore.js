import {observable, action, makeObservable, runInAction} from 'mobx';
import BaseProvider from "../../utils/Provider";
import {WEBURL} from "../../constants/constants";

/**
 * 血脂亚组分的数据仓库
 */
class BloodFatStore {

    constructor() {
        makeObservable(this);
    }

    @observable loading = false;
    // 血脂亚组分主体内容
    @observable BloodLipidContent = {}

    /**
     * 创建BloodLipid
     */
    @action postBloodLipid = (data) => {
        if (this.loading) {
            return;
        }
        this.loading = true;
        BaseProvider.post(`${WEBURL}/BloodLipid/`, data).then((res) => {
            runInAction(()=>{
                this.BloodLipidContent = res.data;
            })
            console.log(res.data);
        }).catch((err) => {
            console.log("err"+err.data);
        }).finally(
            this.loading = false
        );
    };
}

export default new BloodFatStore()