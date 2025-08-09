package com.wychmod.component;

import com.wychmod.utils.CommonUtil;

/**
 * @description: 短链接生成组件类，用于将输入参数转换为短链接码
 * @author: wychmod
 * @date: 2025-08-10
 */
public class ShortLinkComponent {

    private static final String CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";


    /**
     * 根据输入参数生成短链接码
     * @param param 输入参数，用于生成短链接的原始字符串
     * @return 生成的短链接码
     */
    public String createShortLinkCode(String param){

        long murmurhash = CommonUtil.murmurHash32(param);
        //进制转换

        return encodeToBase62(murmurhash);
    }

    /**
     * 将数字编码为Base62字符串
     * @param num 需要编码的数字
     * @return Base62编码后的字符串
     */
    private String encodeToBase62(long num){

        // StringBuffer线程安全，StringBuilder线程不安全
        StringBuffer sb = new StringBuffer();
        do{
            int i = (int )(num%62);
            sb.append(CHARS.charAt(i));
            num = num/62;
        }while (num>0);

        // 反转字符串得到最终的Base62编码结果
        String value = sb.reverse().toString();
        return value;

    }
}

