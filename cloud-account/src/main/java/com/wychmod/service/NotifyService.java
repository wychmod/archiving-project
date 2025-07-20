package com.wychmod.service;

import com.wychmod.enums.SendCodeEnum;
import com.wychmod.utils.JsonData;

/**
 * @description:
 * @author: wychmod
 * @date: 2025-07-20
 */
public interface NotifyService {

    JsonData sendCode(SendCodeEnum sendCodeEnum, String to);
}
