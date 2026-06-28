package com.wychmod.controller.request;

import lombok.Data;

/**
 * @description: 发送验证码请求参数
 * @author: wychmod
 * @date: 2025-07-20
 */
@Data
public class SendCodeRequest {

    private String captcha;

    private String to;
}
