package com.wychmod.utils;

import org.apache.shardingsphere.core.strategy.keygen.SnowflakeShardingKeyGenerator;

/**
 * @description: ID生成工具类，提供基于雪花算法的ID生成方法
 * @author: wychmod
 * @date: 2025-08-04
 */
public class IDUtil {

    /**
     * 雪花算法ID生成器实例，用于生成全局唯一的ID
     */
    private static SnowflakeShardingKeyGenerator snowflakeShardingKeyGenerator = new SnowflakeShardingKeyGenerator();

    /**
     * 生成雪花算法ID
     *
     * @return 生成的雪花算法ID，类型为Comparable<?>
     */
    public static Comparable<?> geneSnowFlakeID(){
        return snowflakeShardingKeyGenerator.generateKey();
    }
}
