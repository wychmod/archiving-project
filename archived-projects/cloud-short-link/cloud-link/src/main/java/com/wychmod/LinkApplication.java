package com.wychmod;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * @description: 链接服务启动类，用于启动Spring Boot应用程序并配置相关组件扫描
 * @author: wychmod
 * @date: 2025-08-10
 */
@MapperScan("com.wychmod.mapper")
@EnableTransactionManagement
@EnableFeignClients
@EnableDiscoveryClient
@SpringBootApplication
public class LinkApplication {

    public static void main(String[] args) {
        SpringApplication.run(LinkApplication.class, args);
    }
}

