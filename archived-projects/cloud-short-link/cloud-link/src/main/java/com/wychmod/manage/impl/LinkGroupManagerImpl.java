package com.wychmod.manage.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.wychmod.manage.LinkGroupManager;
import com.wychmod.mapper.LinkGroupMapper;
import com.wychmod.model.LinkGroupDO;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

/**
 * @description: 短链分组管理实现类
 * @author: wychmod
 * @date: 2025-08-11
 */
@Component
public class LinkGroupManagerImpl implements LinkGroupManager {

    @Resource
    private LinkGroupMapper linkGroupMapper;

    /**
     * 添加链接分组
     * @param linkGroupDO 链接分组数据对象
     * @return 插入记录数
     */
    @Override
    public int add(LinkGroupDO linkGroupDO) {
        return linkGroupMapper.insert(linkGroupDO);
    }

    /**
     * 删除链接分组
     * @param groupId 分组ID
     * @param accountNo 账户编号
     * @return 删除记录数
     */
    @Override
    public int del(Long groupId, Long accountNo) {
        return linkGroupMapper.delete(new QueryWrapper<LinkGroupDO>().eq("id",groupId).eq("account_no",accountNo));
    }

    /**
     * 根据分组ID和账户编号查询分组详情
     * @param groupId 分组ID
     * @param accountNo 账户编号
     * @return 分组详情对象
     */
    @Override
    public LinkGroupDO detail(Long groupId, Long accountNo) {
        return linkGroupMapper.selectOne(new QueryWrapper<LinkGroupDO>().eq("id",groupId).eq("account_no",accountNo));
    }

    /**
     * 根据账户编号查询所有分组列表
     * @param accountNo 账户编号
     * @return 分组列表
     */
    @Override
    public List<LinkGroupDO> listAllGroup(Long accountNo) {
        return linkGroupMapper.selectList(new QueryWrapper<LinkGroupDO>().eq("account_no",accountNo));
    }

    /**
     * 根据分组ID和账户编号更新分组信息
     * @param linkGroupDO 分组对象，包含要更新的信息
     * @return 更新影响的行数
     */
    @Override
    public int updateById(LinkGroupDO linkGroupDO) {
        return linkGroupMapper.update(linkGroupDO,new QueryWrapper<LinkGroupDO>().eq("id",linkGroupDO.getId()).eq("account_no",linkGroupDO.getAccountNo()));
    }


}
