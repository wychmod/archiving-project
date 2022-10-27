package com.wychmod.domain.strategy.repository;

import com.wychmod.domain.strategy.model.aggregates.StrategyRich;
import com.wychmod.infrastructure.po.Award;

public interface IStrategyRepository {

    StrategyRich queryStrategyRich(Long strategyId);

    Award queryAwardInfo(String awardId);
}
