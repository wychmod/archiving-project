package com.wychmod.service.impl;

import com.wychmod.component.SmsComponent;
import com.wychmod.config.SmsConfig;
import com.wychmod.enums.SendCodeEnum;
import com.wychmod.service.NotifyService;
import com.wychmod.utils.CheckUtil;
import com.wychmod.utils.CommonUtil;
import com.wychmod.utils.JsonData;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @description: 验证码服务实现类
 * @author: wychmod
 * @date: 2025-07-20
 */
@Service
public class NotifyServiceImpl implements NotifyService {

    @Resource
    private SmsComponent smsComponent;

    @Resource
    private SmsConfig smsConfig;
    @Override
    public JsonData sendCode(SendCodeEnum sendCodeEnum, String to) {

        String code = "code:"+CommonUtil.getRandomCode(6);
        if(CheckUtil.isEmail(to)){
            //发送邮箱验证码  TODO

        }else if(CheckUtil.isPhone(to)){

            //发送手机验证码
            smsComponent.send(to,smsConfig.getTemplateId(),code);

        }

        return JsonData.buildSuccess();
    }
}
