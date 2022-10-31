package com.wychmod.infrastructure.repository;

import com.wychmod.Constants;
import com.wychmod.domain.activity.model.vo.*;
import com.wychmod.domain.activity.repository.IActivityRepository;
import com.wychmod.domain.activity.service.stateflow.impl.StateHandlerImpl;
import com.wychmod.infrastructure.dao.IActivityDao;
import com.wychmod.infrastructure.dao.IAwardDao;
import com.wychmod.infrastructure.dao.IStrategyDao;
import com.wychmod.infrastructure.dao.IStrategyDetailDao;
import com.wychmod.infrastructure.po.Activity;
import com.wychmod.infrastructure.po.Award;
import com.wychmod.infrastructure.po.Strategy;
import com.wychmod.infrastructure.po.StrategyDetail;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * @description: 活动仓库服务(活动表、奖品表、策略表、策略明细表)
 * @author：wychmod
 * @date: 2022/10/30
 */
@Component
public class ActivityRepository implements IActivityRepository {
    private Logger logger = LoggerFactory.getLogger(StateHandlerImpl.class);


    @Resource
    private IActivityDao activityDao;
    @Resource
    private IAwardDao awardDao;
    @Resource
    private IStrategyDao strategyDao;
    @Resource
    private IStrategyDetailDao strategyDetailDao;


    @Override
    public void addActivity(ActivityVO activity) {
        Activity req = new Activity();
        BeanUtils.copyProperties(activity, req);
        activityDao.insert(req);
    }

    @Override
    public void addAward(List<AwardVO> awardList) {
        List<Award> req = new ArrayList<>();
        for (AwardVO awardVO : awardList) {
            Award award = new Award();
            BeanUtils.copyProperties(awardVO, award);
            req.add(award);
        }
        awardDao.insertList(req);

    }

    @Override
    public void addStrategy(StrategyVO strategy) {
        Strategy req = new Strategy();
        BeanUtils.copyProperties(strategy, req);
        strategyDao.insert(req);
    }

    @Override
    public void addStrategyDetailList(List<StrategyDetailVO> strategyDetailList) {
        List<StrategyDetail> req = new ArrayList<>();
        for (StrategyDetailVO strategyDetailVO : strategyDetailList) {
            StrategyDetail strategyDetail = new StrategyDetail();
            BeanUtils.copyProperties(strategyDetailVO, strategyDetail);
            req.add(strategyDetail);
        }
        strategyDetailDao.insertList(req);
    }

    @Override
    public boolean alterStatus(Long activityId, Enum<Constants.ActivityState> beforeState, Enum<Constants.ActivityState> afterState) {
        AlterStateVO alterStateVO = new AlterStateVO(activityId,((Constants.ActivityState) beforeState).getCode(),((Constants.ActivityState) afterState).getCode());
        int count = activityDao.alterState(alterStateVO);
        logger.info("执行完成条数{}", count);
        return 1 == count;
    }
}
