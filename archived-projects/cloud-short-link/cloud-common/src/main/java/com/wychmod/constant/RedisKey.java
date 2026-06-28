package com.wychmod.constant;

/**
 * @description: redis key常量
 * @author: wychmod
 * @date: 2025-07-21
 */
public class RedisKey {

    /**
     * 验证码缓存key，第一个是类型,第二个是唯一标识比如手机号或者邮箱
     */
    public static final String CHECK_CODE_KEY = "code:%s:%s";
}
