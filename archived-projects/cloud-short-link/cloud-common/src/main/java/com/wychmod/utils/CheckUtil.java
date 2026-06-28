package com.wychmod.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @description: 校验工具类，提供常见的格式校验方法，如邮箱、手机号等
 * @author: wychmod
 * @date: 2025-07-20
 */
public class CheckUtil {

    /**
     * 邮箱格式匹配正则表达式
     * 用于校验字符串是否符合标准邮箱格式，例如 user@example.com
     */
    private static final Pattern MAIL_PATTERN = Pattern.compile("^([a-z0-9A-Z]+[-|\\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-zA-Z]{2,}$");

    /**
     * 手机号格式匹配正则表达式（中国大陆）
     * 用于校验字符串是否符合中国大陆手机号格式，支持主要运营商号段
     */
    private static final Pattern PHONE_PATTERN = Pattern.compile("^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\\d{8}$");

    /**
     * 判断给定字符串是否为合法邮箱地址
     * @param email 待校验的邮箱字符串
     * @return boolean 如果字符串是合法邮箱地址则返回 true，否则返回 false
     */
    public static boolean isEmail(String email) {
        if (null == email || "".equals(email)) {
            return false;
        }
        Matcher m = MAIL_PATTERN.matcher(email);
        return m.matches();
    }

    /**
     * 判断给定字符串是否为合法中国大陆手机号
     * @param phone 待校验的手机号字符串
     * @return boolean 如果字符串是合法手机号则返回 true，否则返回 false
     */
    public static boolean isPhone(String phone) {
        if (null == phone || "".equals(phone)) {
            return false;
        }
        Matcher m = PHONE_PATTERN.matcher(phone);
        boolean result = m.matches();
        return result;
    }
}
