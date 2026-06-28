package com.wychmod.service;

import com.wychmod.controller.request.LinkGroupAddRequest;
import com.wychmod.controller.request.LinkGroupUpdateRequest;
import com.wychmod.vo.LinkGroupVO;

import java.util.List;

/**
 * @description: 链接分组服务接口
 * @author: wychmod
 * @date: 2025-08-11
 */
public interface LinkGroupService {

    int add(LinkGroupAddRequest addRequest);

    int del(Long groupId);

    LinkGroupVO detail(Long groupId);

    List<LinkGroupVO> listAllGroup();

    int updateById(LinkGroupUpdateRequest request);
}
