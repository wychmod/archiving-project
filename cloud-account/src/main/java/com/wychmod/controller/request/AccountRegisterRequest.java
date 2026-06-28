package com.wychmod.controller.request;

import lombok.Data;

/**
 * @description: 账户注册请求参数类，用于封装用户注册时提交的各类信息
 * @author: wychmod
 * @date: 2025-07-27
 */
@Data
public class AccountRegisterRequest {

    /**
     * 头像
     */
    private String headImg;

    /**
     * 手机号
     */
    private String phone;

    /**
     * 密码
     */
    private String pwd;



    /**
     * 邮箱
     */
    private String mail;

    /**
     * 用户名
     */
    private String username;


    /**
     * 短信验证码
     */
    private String code;

}
