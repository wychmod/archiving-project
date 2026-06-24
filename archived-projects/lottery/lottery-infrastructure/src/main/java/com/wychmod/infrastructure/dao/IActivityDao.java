package com.wychmod.infrastructure.dao;

import com.wychmod.domain.activity.model.vo.AlterStateVO;
import com.wychmod.infrastructure.po.Activity;
import org.apache.ibatis.annotations.Mapper;

/**
 * @description: 活动基础信息表DAO
 * @author: wychmod
 */
@Mapper
public interface IActivityDao {

    /**
     * 插入数据
     *
     * @param req 入参
     */
    void insert(Activity req);

    /**
     * 根据活动号查询活动信息
     *
     * @param activityId 活动号
     * @return 活动信息
     */
    Activity queryActivityById(Long activityId);

    /**
     * 变更活动状态
     *
     * @param alterStateVO  [activityId、beforeState、afterState]
     * @return 更新数量
     */
    int alterState(AlterStateVO alterStateVO);
}
