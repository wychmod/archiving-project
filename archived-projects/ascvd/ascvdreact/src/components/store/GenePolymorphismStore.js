import {observable, action, makeObservable, runInAction} from 'mobx';
import BaseProvider from "../../utils/Provider";
import {WEBURL} from "../../constants/constants";

/**
 * 基因多态性的数据仓库
 */
class GenePolymorphismStore {

    constructor() {
        makeObservable(this);
    }

    @observable loading = false;
    // 基因多态性主体内容
    @observable GenePolymorphismContent = {}

    /**
     * 创建GenePolymorphism
     */
    @action postGenePolymorphism = (data) => {
        if (this.loading) {
            return;
        }
        this.loading = true;
        BaseProvider.post(`${WEBURL}/GenePolymorphism/`, data).then((res) => {
            runInAction(()=>{
                this.GenePolymorphismContent = res.data;
            })
            console.log(res.data);
        }).catch((err) => {
            console.log("err"+err.data);
        }).finally(
            this.loading = false
        );
    };
}

export default new GenePolymorphismStore()