package com.wychmod.test;

import com.wychmod.AccountApplication;
import com.wychmod.component.SmsComponent;
import com.wychmod.config.SmsConfig;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;

/**
 * @description: 测试发送短信
 * @author: wychmod
 * @date: 2025-07-04
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AccountApplication.class)
@Slf4j
public class SmsTest {

    @Resource
    private SmsComponent smsComponent;

    @Resource
    private SmsConfig smsConfig;


    @Test
    public void testSendSms() {
        smsComponent.send("17376512950", smsConfig.getTemplateId(), "code:123456");
        log.info("发送短信");
    }
}
