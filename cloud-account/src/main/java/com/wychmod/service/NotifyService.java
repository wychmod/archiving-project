package com.wychmod.service;

import com.wychmod.enums.SendCodeEnum;
import com.wychmod.utils.JsonData;

/**
 * @description: 通知服务接口，提供验证码发送和校验功能
 * @author: wychmod
 * @date: 2025-07-20
 */
public interface NotifyService {

    /**
     * 发送验证码
     * @param sendCodeEnum 验证码类型枚举，标识验证码的用途（如注册、登录、找回密码等）
     * @param to 接收验证码的目标地址，可以是手机号或邮箱地址
     * @return JsonData 包含发送结果的JSON数据对象，包含成功状态和相关信息
     */
    JsonData sendCode(SendCodeEnum sendCodeEnum, String to);

    /**
     * 校验验证码
     * @param sendCodeEnum 验证码类型枚举，标识验证码的用途
     * @param to 接收验证码的目标地址，与发送时保持一致
     * @param code 用户输入的验证码
     * @return boolean 验证结果，true表示验证码正确，false表示验证码错误或已过期
     */
    boolean checkCode(SendCodeEnum sendCodeEnum, String to, String code);
}

