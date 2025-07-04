package com.wychmod.component;

import com.wychmod.config.SmsConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;

/**
 * @description: 短信发送组件
 * @author: wychmod
 * @date: 2025-07-04
 */
@Component
@Slf4j
public class SmsComponent {

    private static final String BASE_URL = "https://jmsms.market.alicloudapi.com";
    private static final String SMS_API_PATH = "/sms/send";
    private static final String URL_TEMPLATE = BASE_URL + SMS_API_PATH + "?mobile=%s&templateId=%s&value=%s";

    @Resource
    private SmsConfig smsConfig;

    @Resource
    private RestTemplate restTemplate;

    /**
     * 发送短信验证码
     * @param to 接收手机号
     * @param templateId 短信模板ID
     * @param value 替换值
     */
    public void send(String to, String templateId, String value) {
        String url = String.format(URL_TEMPLATE, to, templateId, value);
        HttpHeaders headers = new HttpHeaders();
        // 最后在header中的格式(中间是英文空格)为Authorization:APPCODE 83359fd73fe94948385f570e3c139105
        headers.set("Authorization", "APPCODE " + smsConfig.getAppCode());
        HttpEntity<Object> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
        log.info("url={},body={}", url, response.getBody());
        if (response.getStatusCode().is2xxSuccessful()) {
            log.info("发送短信验证码成功");
        } else {
            log.error("发送短信验证码失败:{}", response.getBody());
        }
    }
}
