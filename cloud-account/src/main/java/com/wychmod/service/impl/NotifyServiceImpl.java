package com.wychmod.service.impl;

import com.wychmod.component.SmsComponent;
import com.wychmod.config.SmsConfig;
import com.wychmod.constant.RedisKey;
import com.wychmod.enums.BizCodeEnum;
import com.wychmod.enums.SendCodeEnum;
import com.wychmod.service.NotifyService;
import com.wychmod.utils.CheckUtil;
import com.wychmod.utils.CommonUtil;
import com.wychmod.utils.JsonData;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.concurrent.TimeUnit;

/**
 * @description: 验证码服务实现类
 * @author: wychmod
 * @date: 2025-07-20
 */
@Service
@Slf4j
public class NotifyServiceImpl implements NotifyService {

    /**
     * 验证码过期时间 10分钟
     */
    private static final int CODE_EXPIRED = 60*1000*10;

    @Resource
    private SmsComponent smsComponent;

    @Resource
    private SmsConfig smsConfig;

    @Autowired
    private StringRedisTemplate redisTemplate;
    @Override
    public JsonData sendCode(SendCodeEnum sendCodeEnum, String to) {

        // 前置判断是否过了60s
        String cacheKey = String.format(RedisKey.CHECK_CODE_KEY,sendCodeEnum.name(),to);

        String cacheValue = redisTemplate.opsForValue().get(cacheKey);
        if (StringUtils.isNotBlank(cacheValue)) {
            long time = Long.parseLong(StringUtils.split(cacheValue,"_")[1]);

            long leftTime = CommonUtil.getCurrentTimestamp() - time;

            if( leftTime < (1000*60)){
                log.info("重复发送短信验证码，时间间隔:{}秒",leftTime/1000);
                return JsonData.buildResult(BizCodeEnum.CODE_LIMITED);
            }
        }

        // 后置发送验证码
        String verCode = CommonUtil.getRandomCode(6);

        String value = verCode+"_"+CommonUtil.getCurrentTimestamp();

        // 缓存验证码避免重复发送
        redisTemplate.opsForValue().set(cacheKey,value,CODE_EXPIRED, TimeUnit.MILLISECONDS);

        if(CheckUtil.isEmail(to)){
            //发送邮箱验证码  TODO

        }else if(CheckUtil.isPhone(to)){

            //发送手机验证码
            smsComponent.send(to,smsConfig.getTemplateId(),"code:"+verCode);

        }

        return JsonData.buildSuccess();
    }
}
