import moment from "moment";
// 对表单中形成的数组数据进行处理，将数组转成字符串。
export function arrFormat(values) {
    if (values instanceof Array) {
        if (values.length > 1) {
            return values.join(',');
        }
        if (values.length === 1) {
            return values[0];
        }
        if (values.length === 0) {
            return "";
        }
    } else {
        return "";
    }
}

export function formatDate (time) {
    // time 为后端返回的格林威治时间
    return moment.utc(time).local().format('YYYY-MM-DD HH:mm:ss')
}