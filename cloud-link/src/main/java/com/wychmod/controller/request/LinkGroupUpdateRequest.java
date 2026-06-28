package com.wychmod.controller.request;

import lombok.Data;

/**
 * @description: 链接分组更新请求参数
 * @author: wychmod
 * @date: 2025-08-24
 */
@Data
public class LinkGroupUpdateRequest {

    /**
     * 组id
     */
    private Long id;
    /**
     * 组名
     */
    private String title;
}
