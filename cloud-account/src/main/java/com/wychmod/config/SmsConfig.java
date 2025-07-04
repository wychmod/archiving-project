package com.wychmod.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * @description: 短信配置类
 * @author: wychmod
 * @date: 2025-07-04
 */
@ConfigurationProperties(prefix = "sms")
@Configuration
@Data
public class SmsConfig {

    private String appCode;

    private String templateId;
}
