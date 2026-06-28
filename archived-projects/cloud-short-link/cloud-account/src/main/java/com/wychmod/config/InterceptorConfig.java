package com.wychmod.config;

import com.wychmod.interceptor.LoginInterceptor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @description: 拦截器配置类，用于配置登录拦截器的拦截路径和排除路径
 * @author: wychmod
 * @date: 2025-07-27
 */
@Configuration
@Slf4j
public class InterceptorConfig implements WebMvcConfigurer {

    /**
     * 添加拦截器配置
     * @param registry 拦截器注册器
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 配置登录拦截器，指定需要拦截和排除的路径
        registry.addInterceptor(new LoginInterceptor())
                //添加拦截的路径
                .addPathPatterns("/api/account/*/**", "/api/traffic/*/**")

                //排除不拦截
                .excludePathPatterns(
                        "/api/account/*/register","/api/account/*/upload","/api/account/*/login",
                        "/api/notify/v1/captcha","/api/notify/*/send_code");
    }
}
