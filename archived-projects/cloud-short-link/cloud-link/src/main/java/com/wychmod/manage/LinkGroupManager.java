package com.wychmod.manage;

import com.wychmod.model.LinkGroupDO;

import java.util.List;

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

    /**
     * 根据分组ID和账户编号获取链接分组详情
     * @param groupId 分组ID
     * @param accountNo 账户编号
     * @return 链接分组信息对象
     */
    LinkGroupDO detail(Long groupId, Long accountNo);

    /**
     * 根据账户编号获取所有链接分组列表
     * @param accountNo 账户编号
     * @return 链接分组列表
     */
    List<LinkGroupDO> listAllGroup(Long accountNo);

    /**
     * 根据ID更新链接分组信息
     * @param linkGroupDO 链接分组信息对象
     * @return 更新记录数
     */
    int updateById(LinkGroupDO linkGroupDO);

}
