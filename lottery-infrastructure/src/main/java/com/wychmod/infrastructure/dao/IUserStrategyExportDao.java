package com.wychmod.infrastructure.dao;

import com.wychmod.infrastructure.po.UserStrategyExport;
import com.wychmod.middleware.db.router.annotation.DBRouter;
import com.wychmod.middleware.db.router.annotation.DBRouterStrategy;
import org.apache.ibatis.annotations.Mapper;

/**
 * @description: 用户策略计算结果表DAO
 * @author: wychmod
 * @date: 2022/11/3
 */
@Mapper
@DBRouterStrategy(splitTable = true)
public interface IUserStrategyExportDao {

    /**
     * 新增数据
     * @param userStrategyExport 用户策略
     */
    @DBRouter(key = "uId")
    void insert(UserStrategyExport userStrategyExport);

    /**
     * 查询数据
     * @param uId 用户ID
     * @return 用户策略
     */
    @DBRouter
    UserStrategyExport queryUserStrategyExportByUId(String uId);
}
