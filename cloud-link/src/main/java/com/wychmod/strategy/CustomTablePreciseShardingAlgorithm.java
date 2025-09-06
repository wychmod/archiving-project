package com.wychmod.strategy;

import org.apache.shardingsphere.api.sharding.standard.PreciseShardingAlgorithm;
import org.apache.shardingsphere.api.sharding.standard.PreciseShardingValue;

import java.util.Collection;

/**
 * @description: 自定义分片算法
 * @author: wychmod
 * @date: 2025-09-06
 */
public class CustomTablePreciseShardingAlgorithm implements PreciseShardingAlgorithm<String> {

    /**
     * 根据分片键值进行精确分片计算，返回对应的目标表名
     *
     * @param availableTargetNames 可用的目标表名集合
     * @param preciseShardingValue 精确分片键值对象，包含分片列名和分片值
     * @return 计算后的目标表名，格式为"基础表名_分片值最后一位字符"
     */
    @Override
    public String doSharding(Collection<String> availableTargetNames, PreciseShardingValue<String> preciseShardingValue) {

        // 获取可用目标表名中的第一个作为基础表名
        String targetName = availableTargetNames.iterator().next();

        // 获取分片键值
        String value = preciseShardingValue.getValue();

        // 提取分片值的最后一位字符作为后缀
        String codeSuffix = value.substring(value.length() - 1);


        return targetName+"_"+codeSuffix;
    }
}

