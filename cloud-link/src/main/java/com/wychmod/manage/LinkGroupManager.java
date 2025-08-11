package com.wychmod.manage;

import com.wychmod.model.LinkGroupDO;

/**
 * @description: 短链分组管理
 * @author: wychmod
 * @date: 2025-08-11
 */
public interface LinkGroupManager {

    /**
     * 添加短链分组
     * @param linkGroupDO 短链分组数据对象
     * @return 添加成功的记录数
     */
    int add(LinkGroupDO linkGroupDO);

    /**
     * 删除短链分组
     * @param groupId 分组ID
     * @param accountNo 账户编号
     * @return 删除成功的记录数
     */
    int del(Long groupId, Long accountNo);
}
