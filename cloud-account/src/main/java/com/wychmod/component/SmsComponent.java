package com.wychmod.component;

import com.wychmod.config.SmsConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

/**
 * @description: 短信发送组件
 * @author: wychmod
 * @date: 2025-07-04
 */
@Component
@Slf4j
public class SmsComponent {

    private static final String BASE_URL = "https://dfsns.market.alicloudapi.com/data/send_sms";

    @Resource
    private SmsConfig smsConfig;

    @Resource
    private RestTemplate restTemplate;

    /**
     * 发送短信验证码
     * @param to 接收手机号
     * @param templateId 短信模板ID
     * @param content 短信内容
     */
    @Async("threadPoolTaskExecutor")
    public void send(String to, String templateId, String content) {
        try {
            HttpEntity<String> entity = getStringHttpEntity(to, templateId, content);
            ResponseEntity<String> response = restTemplate.postForEntity(BASE_URL, entity, String.class);
            log.info("url={},body={}", BASE_URL, response.getBody());
            if (response.getStatusCode().is2xxSuccessful()) {
                log.info("发送短信验证码成功");
            } else {
                log.error("发送短信验证码失败:{}", response.getBody());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private HttpEntity<String> getStringHttpEntity(String to, String templateId, String content) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "APPCODE " + smsConfig.getAppCode());
        headers.set("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        String body = "content=" + content + "&template_id=" + templateId + "&phone_number=" + to;
        HttpEntity<String> entity = new HttpEntity<>(body, headers);
        return entity;
    }
}
