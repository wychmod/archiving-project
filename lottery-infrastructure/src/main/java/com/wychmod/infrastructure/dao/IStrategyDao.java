package com.wychmod.infrastructure.dao;

import com.wychmod.infrastructure.po.Strategy;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface IStrategyDao {

    Strategy queryStrategy(Long strategyId);

}
