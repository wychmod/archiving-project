import {observable, action, makeObservable, runInAction} from 'mobx';
import BaseProvider from "../../utils/Provider";
import {WEBURL} from "../../constants/constants";

class AscvdStore {

    constructor() {
        makeObservable(this);
    }

    @observable loading = false;
    // ascvd主体内容
    @observable ascvdContent = {}

    /**
     * 创建ascvdTesting
     */
    @action postAscvdTesting = (data) => {
        if (this.loading) {
            return;
        }
        this.loading = true;
        BaseProvider.post(`${WEBURL}/AscvdTesting/`, data).then((res) => {
            runInAction(()=>{
                this.ascvdContent = res.data;
            })
            console.log(res.data);
        }).catch((err) => {
            console.log("err"+err.data);
        }).finally(
            this.loading = false
        );
    };
}

export default new AscvdStore()

