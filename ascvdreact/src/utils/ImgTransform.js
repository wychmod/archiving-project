// 对html2canvas生成的图片流数据进行转码
export function transform(b64Image) {
    const img = atob(b64Image.split(',')[1]);
    const image = [];
    let i = 0;
    while (i < img.length) {
        image.push(img.charCodeAt(i));
        i++;
    }
    return new Uint8Array(image);
}

