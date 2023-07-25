package com.wychmod.domain.activity.service.partake;

import com.wychmod.domain.activity.model.req.PartakeReq;
import com.wychmod.domain.activity.res.PartakeResult;

/**
 * @description: 抽奖活动参与接口
 * @author：wychmod
 * @date: 2022/10/31
 */
public interface IActivityPartake {

    /**
     * 参与活动
     * @param req 入参
     * @return    领取结果
     */
    PartakeResult doPartake(PartakeReq req);
}
