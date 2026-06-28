package com.wychmod.controller.request;

import lombok.Data;

/**
 * @description: 添加分组请求参数
 * @author: wychmod
 * @date: 2025-08-11
 */
@Data
public class LinkGroupAddRequest {

    /**
     * 组名
     */
    private String title;
}
