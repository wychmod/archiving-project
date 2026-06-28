package com.wychmod.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;

import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * @description: SnowFlake雪花算法工作节点ID配置类，用于生成分布式唯一ID的工作节点标识
 * @author: wychmod
 * @date: 2025-08-03
 */
@Configuration
@Slf4j
public class SnowFlakeWordIdConfig {

    /*
      静态代码块，用于在类加载时自动获取本机IP地址并生成对应的工作节点ID
      工作节点ID基于本机IP地址的哈希值计算得出，确保在分布式环境中每个节点具有唯一标识
     */
    static {

        try {
            // 获取本机InetAddress对象
            InetAddress inetAddress = Inet4Address.getLocalHost();

            // 获取本机IP地址字符串
            String hostAddressIp = inetAddress.getHostAddress();

            // 基于IP地址哈希值计算工作节点ID，确保ID在0-1023范围内
            String workId = Math.abs(hostAddressIp.hashCode()) % 1024+"";

            // 将工作节点ID设置为系统属性，供SnowFlake算法使用
            System.setProperty("workerId",workId);

            log.info("workId:{}",workId);

        } catch (UnknownHostException e) {
            e.printStackTrace();
        }


    }
}

