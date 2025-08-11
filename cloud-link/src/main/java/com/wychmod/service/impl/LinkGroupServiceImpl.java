package com.wychmod.service.impl;

import com.wychmod.controller.request.LinkGroupAddRequest;
import com.wychmod.interceptor.LoginInterceptor;
import com.wychmod.manage.LinkGroupManager;
import com.wychmod.model.LinkGroupDO;
import com.wychmod.service.LinkGroupService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @description: 链接分组服务实现类
 * @author: wychmod
 * @date: 2025-08-11
 */
@Service
@Slf4j
public class LinkGroupServiceImpl implements LinkGroupService {

    @Resource
    private LinkGroupManager linkGroupManager;

    /**
     * 添加链接分组
     * @param addRequest 链接分组添加请求对象，包含分组标题等信息
     * @return 添加成功返回1，失败返回0
     */
    @Override
    public int add(LinkGroupAddRequest addRequest) {

        // 获取当前登录用户账号
        Long accountNo = LoginInterceptor.threadLocal.get().getAccountNo();
        LinkGroupDO linkGroupDO = new LinkGroupDO();
        linkGroupDO.setTitle(addRequest.getTitle());
        linkGroupDO.setAccountNo(accountNo);

        return linkGroupManager.add(linkGroupDO);
    }

    /**
     * 删除链接分组
     * @param groupId 分组ID
     * @return 删除成功返回1，失败返回0
     */
    @Override
    public int del(Long groupId) {

        // 获取当前登录用户账号
        Long accountNo = LoginInterceptor.threadLocal.get().getAccountNo();
        return linkGroupManager.del(groupId, accountNo);
    }
}
