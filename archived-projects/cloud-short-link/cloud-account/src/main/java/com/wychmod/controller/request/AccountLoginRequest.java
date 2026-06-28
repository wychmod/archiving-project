package com.wychmod.controller.request;

import lombok.Data;

/**
 * @description: 登录请求参数
 * @author: wychmod
 * @date: 2025-07-27
 */
@Data
public class AccountLoginRequest {

    private String phone;

    private String pwd;
}
