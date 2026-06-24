package com.wychmod;

import com.wychmod.req.ActivityReq;
import com.wychmod.res.ActivityRes;

/**
 * by wychmod
 *
 * 活动展台
 * 1. 创建活动
 * 2. 更新活动
 * 3. 查询活动
 */
public interface IActivityBooth {

    ActivityRes queryActivityById(ActivityReq req);
}
