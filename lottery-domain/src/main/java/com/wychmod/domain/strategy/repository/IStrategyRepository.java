package com.wychmod.domain.strategy.repository;

import com.wychmod.domain.strategy.model.aggregates.StrategyRich;
import com.wychmod.infrastructure.po.Award;

import java.util.List;

/**
 * @description: 策略表仓储服务
 * @author：wychmod
 */
public interface IStrategyRepository {

    StrategyRich queryStrategyRich(Long strategyId);

    Award queryAwardInfo(String awardId);

    List<String> queryNoStockStrategyAwardList(Long strategyId);

    /**
     * 扣减库存
     * @param strategyId 策略ID
     * @param awardId    奖品ID
     * @return           扣减结果
     */
    boolean deductStock(Long strategyId, String awardId);
}
