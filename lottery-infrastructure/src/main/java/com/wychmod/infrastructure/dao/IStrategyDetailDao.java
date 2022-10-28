package com.wychmod.infrastructure.dao;

import com.wychmod.infrastructure.po.StrategyDetail;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface IStrategyDetailDao {

    List<StrategyDetail> queryStrategyDetailList(Long strategyId);

    List<String> queryNoStockStrategyAwardList(Long strategyId);

    int deductStock(StrategyDetail req);
}
