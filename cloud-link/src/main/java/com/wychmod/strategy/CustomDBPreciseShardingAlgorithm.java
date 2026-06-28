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
     * @param shardingValue 精确分片键值信息
     * @return 返回匹配的数据源名称
     */
    @Override
    public String doSharding(Collection<String> availableTargetNames, PreciseShardingValue<String> shardingValue) {

        //获取短链码第一位，即库位
        String codePrefix = shardingValue.getValue().substring(0, 1);

        for (String targetName : availableTargetNames) {
            //获取库名的最后一位，真实配置的ds
            String targetNameSuffix = targetName.substring(targetName.length() - 1);

            //如果一致则返回
            if (codePrefix.equals(targetNameSuffix)) {
                return targetName;
            }
        }

        //抛异常
        throw new BizException(BizCodeEnum.DATABASE_NOT_FOUND);

    }
}
