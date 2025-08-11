package com.wychmod.service;

import com.wychmod.controller.request.LinkGroupAddRequest;

/**
 * @description:
 * @author: wychmod
 * @date: 2025-08-11
 */
public interface LinkGroupService {

    int add(LinkGroupAddRequest addRequest);

    int del(Long groupId);
}
