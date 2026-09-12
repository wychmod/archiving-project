package com.wychmod.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @description: 登录用户信息实体类，用于封装用户登录后的基本信息
 * @author: wychmod
 * @date: 2025-07-27
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginUser {

    /**
     * 账号
     */
    private long accountNo;

    /**
     * 用户名
     */
    private String username;

    /**
     * 头像
     */
    private String headImg;

    /**
     * 邮箱
     */
    private String mail;

    /**
     * 手机号
     */
    private String phone;

    /**
     * 认证级别
     */
    private String auth;
}
