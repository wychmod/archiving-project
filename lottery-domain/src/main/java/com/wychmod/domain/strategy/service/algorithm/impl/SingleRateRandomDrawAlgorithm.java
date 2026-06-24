package com.wychmod.domain.strategy.service.algorithm.impl;

import com.wychmod.domain.strategy.service.algorithm.BaseAlgorithm;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.util.List;


/**
 * @description: 单项随机概率抽奖，抽到一个已经排掉的奖品则未中奖
 * @author：wychmod
 */
@Component("singleRateRandomDrawAlgorithm")
public class SingleRateRandomDrawAlgorithm extends BaseAlgorithm {
    @Override
    public String randomDraw(Long strategyId, List<String> excludeAwardIds) {

        // 获得概率奖品的散列数组
        String[] rateTuple = super.rateTupleMap.get(strategyId);
        assert rateTuple != null;
        
        // 随机索引
        int randomVal = this.generateSecureRandomIntCode(100);
        int idx = super.hashIdx(randomVal);
        
        // 返回结果
        String awardId = rateTuple[idx];

        // 如果中奖ID命中排除奖品列表，则返回NULL
        if (excludeAwardIds.contains(awardId)){
            return null;
        }

        return awardId;
    }
}
