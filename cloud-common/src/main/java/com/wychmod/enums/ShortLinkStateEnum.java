package com.wychmod.enums;

/**
 * @description: 短链接状态枚举类，用于定义短链接的可用状态
 * @author: wychmod
 * @date: 2025-09-09
 */
public enum ShortLinkStateEnum {

    /**
     * 锁定状态 - 短链接被锁定，不可访问
     */
    LOCK,

    /**
     * 激活状态 - 短链接可用，可正常访问
     */
    ACTIVE;
}

