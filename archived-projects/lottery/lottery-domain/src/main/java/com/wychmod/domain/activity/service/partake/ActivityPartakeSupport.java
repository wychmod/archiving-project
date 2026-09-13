package com.wychmod.domain.activity.service.partake;

import com.wychmod.domain.activity.model.req.PartakeReq;
import com.wychmod.domain.activity.model.vo.ActivityBillVO;
import com.wychmod.domain.activity.repository.IActivityRepository;

import javax.annotation.Resource;

/**
 * @description: 活动领取模操作，一些通用的数据服务
 * @author: wychmod
 * @date: 2022/11/3
 */
public class ActivityPartakeSupport {

    @Resource
    protected IActivityRepository activityRepository;

    protected ActivityBillVO queryActivityBill(PartakeReq req){
        return activityRepository.queryActivityBill(req);
    }

}
