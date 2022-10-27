package com.wychmod.domain.strategy.repository.impl;

import com.wychmod.domain.strategy.model.aggregates.StrategyRich;
import com.wychmod.domain.strategy.repository.IStrategyRepository;
import com.wychmod.infrastructure.dao.IAwardDao;
import com.wychmod.infrastructure.dao.IStrategyDao;
import com.wychmod.infrastructure.dao.IStrategyDetailDao;
import com.wychmod.infrastructure.po.Award;
import com.wychmod.infrastructure.po.Strategy;
import com.wychmod.infrastructure.po.StrategyDetail;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

@Component
public class StrategyRepository implements IStrategyRepository {

    @Resource
    private IStrategyDao strategyDao;

    @Resource
    private IStrategyDetailDao strategyDetailDao;

    @Resource
    private IAwardDao awardDao;

    @Override
    public StrategyRich queryStrategyRich(Long strategyId) {
        Strategy strategy = strategyDao.queryStrategy(strategyId);
        List<StrategyDetail> strategyDetailList = strategyDetailDao.queryStrategyDetailList(strategyId);
        return new StrategyRich(strategyId, strategy, strategyDetailList);
    }

    @Override
    public Award queryAwardInfo(String awardId) {
        return awardDao.queryAwardInfo(awardId);
    }
}
