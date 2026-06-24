package com.wychmod.domain.strategy.service.draw;

import com.wychmod.domain.strategy.model.req.DrawReq;
import com.wychmod.domain.strategy.model.res.DrawResult;

/**
 * @description: 抽奖执行接口
 * @author：wychmod
 */
public interface IDrawExec {
    /**
     * 抽奖方法
     * @param req 抽奖参数；用户ID、策略ID
     * @return    中奖结果
     */
    DrawResult doDrawExec(DrawReq req);
}
