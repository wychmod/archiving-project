package com.wychmod.service.impl;

import com.wychmod.controller.request.LinkGroupAddRequest;
import com.wychmod.controller.request.LinkGroupUpdateRequest;
import com.wychmod.interceptor.LoginInterceptor;
import com.wychmod.manage.LinkGroupManager;
import com.wychmod.model.LinkGroupDO;
import com.wychmod.service.LinkGroupService;
import com.wychmod.vo.LinkGroupVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.stream.Collectors;

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

    /**
     * 根据分组ID获取链接分组详情
     * @param groupId 分组ID
     * @return LinkGroupVO 链接分组视图对象
     */
    @Override
    public LinkGroupVO detail(Long groupId) {

        Long accountNo = LoginInterceptor.threadLocal.get().getAccountNo();
        LinkGroupDO linkGroupDO = linkGroupManager.detail(groupId, accountNo);
        LinkGroupVO linkGroupVO = new LinkGroupVO();
        BeanUtils.copyProperties(linkGroupDO, linkGroupVO);
        return linkGroupVO;
    }

    /**
     * 获取当前用户的所有链接分组列表
     * @return List<LinkGroupVO> 链接分组视图对象列表
     */
    @Override
    public List<LinkGroupVO> listAllGroup() {
        Long accountNo = LoginInterceptor.threadLocal.get().getAccountNo();
        List<LinkGroupDO> linkGroupDOList = linkGroupManager.listAllGroup(accountNo);
        // 将DO对象列表转换为VO对象列表
        List<LinkGroupVO> groupVOS = linkGroupDOList.stream().map(obj -> {
            LinkGroupVO linkGroupVO = new LinkGroupVO();
            BeanUtils.copyProperties(obj, linkGroupVO);
            return linkGroupVO;
        }).collect(Collectors.toList());
        return groupVOS;
    }

    /**
     * 根据ID更新链接分组信息
     * @param request 链接分组更新请求对象
     * @return int 更新影响的记录数
     */
    @Override
    public int updateById(LinkGroupUpdateRequest request) {

        Long accountNo = LoginInterceptor.threadLocal.get().getAccountNo();
        LinkGroupDO linkGroupDO = new LinkGroupDO();
        linkGroupDO.setId(request.getId());
        linkGroupDO.setTitle(request.getTitle());
        linkGroupDO.setAccountNo(accountNo);

        return linkGroupManager.updateById(linkGroupDO);
    }

}
