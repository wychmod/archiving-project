package com.wychmod.domain.strategy.service.algorithm.impl;

import com.wychmod.domain.strategy.model.vo.AwardRateInfo;
import com.wychmod.domain.strategy.service.algorithm.BaseAlgorithm;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;

/**
 * @description: 必中奖策略抽奖，排掉已经中奖的概率，重新计算中奖范围
 * @author：wychmod
 */
@Component("entiretyRateRandomDrawAlgorithm")
public class EntiretyRateRandomDrawAlgorithm extends BaseAlgorithm {

    @Override
    public String randomDraw(Long strategyId, List<String> excludeAwardIds) {

        BigDecimal differenceDenominator = BigDecimal.ZERO;

        // 排除掉不在抽奖范围的奖品ID集合
        List<AwardRateInfo> differenceAwardRateInfoList = new ArrayList<>();
        List<AwardRateInfo> awardRateInfos = awardRateInfoMap.get(strategyId);
        for (AwardRateInfo awardRateInfo : awardRateInfos) {
            String awardId = awardRateInfo.getAwardId();
            if (excludeAwardIds.contains(awardId)) {
                continue;
            }
            differenceAwardRateInfoList.add(awardRateInfo);
            differenceDenominator = differenceDenominator.add(awardRateInfo.getAwardRate());
        }
        // 前置判断
        if (differenceAwardRateInfoList.size() == 0) {
            return "未中奖";
        }
        if (differenceAwardRateInfoList.size() == 1) {
            return differenceAwardRateInfoList.get(0).getAwardId();
        }
        // 获取随机概率值
        int randomVal = this.generateSecureRandomIntCode(100);

        // 循环获取奖品
        String awardId = "";
        int cursorVal = 0;
        for (AwardRateInfo awardRateInfo : differenceAwardRateInfoList) {
            int rateVal = awardRateInfo.getAwardRate().divide(differenceDenominator, 2, BigDecimal.ROUND_UP).multiply(new BigDecimal(100)).intValue();
            if (randomVal < cursorVal + rateVal) {
                awardId = awardRateInfo.getAwardId();
                break;
            }
            cursorVal += rateVal;
        }
        // 返回中奖结果
        return awardId;
    }
}
