package com.wychmod.enums;

/**
 * @description: 认证类型枚举类，定义了系统支持的用户认证级别
 * @author: wychmod
 * @date: 2025-07-27
 */
public enum AuthTypeEnum {

    /**
     * 默认级别 - 最基础的认证级别，通常只需手机号或邮箱验证
     */
    DEFAULT,

    /**
     * 实名制 - 需要用户提供真实身份信息进行认证
     */
    REALNAME,

    /**
     * 企业 - 企业级认证，需要提供企业相关资质证明
     */
    ENTERPRISE;
}
