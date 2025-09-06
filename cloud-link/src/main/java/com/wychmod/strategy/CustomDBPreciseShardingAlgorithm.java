package com.wychmod.strategy;

import com.wychmod.enums.BizCodeEnum;
import com.wychmod.exception.BizException;
import org.apache.shardingsphere.api.sharding.ShardingValue;
import org.apache.shardingsphere.api.sharding.standard.PreciseShardingAlgorithm;
import org.apache.shardingsphere.api.sharding.standard.PreciseShardingValue;

import java.util.Collection;

/**
 * @description: 自定义数据库分片算法
 * @author: wychmod
 * @date: 2025-09-06
 */
public class CustomDBPreciseShardingAlgorithm implements PreciseShardingAlgorithm<String> {
    /**
     * 根据分片键值精确分片，选择对应的数据源
     *
     * @param availableTargetNames 可用的数据源名称集合
     * @param preciseShardingValue 精确分片键值信息
     * @return 返回匹配的数据源名称
     */
    @Override
    public String doSharding(Collection<String> availableTargetNames, PreciseShardingValue<String> preciseShardingValue) {
        // 获取分片键值的首字符作为匹配前缀
        String codePrefix = preciseShardingValue.getValue().substring(0, 1);

        // 遍历可用数据源，查找匹配项
        for (String name : availableTargetNames) {
            //获取库名的最后一位，真实配置的ds
            String targetNameSuffix = name.substring(name.length() - 1);

            //如果一致则返回
            if (codePrefix.equals(targetNameSuffix)) {
                return name;
            }
        }

        //抛异常
        throw new BizException(BizCodeEnum.DATABASE_NOT_FOUND);
    }
}
