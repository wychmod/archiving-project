package com.wychmod.controller;


import com.wychmod.controller.request.LinkGroupAddRequest;
import com.wychmod.enums.BizCodeEnum;
import com.wychmod.service.LinkGroupService;
import com.wychmod.utils.JsonData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 *
 * @author wychmod
 * @since 2025-08-10
 */
@RestController
@RequestMapping("/api/group/v1")
public class LinkGroupController {

    @Resource
    private LinkGroupService linkGroupService;


    /**
     * 添加链接分组
     * @param addRequest 链接分组添加请求参数
     * @return 添加结果，成功返回成功状态，失败返回分组添加失败状态
     */
    @PostMapping("/add")
    public JsonData add(@RequestBody LinkGroupAddRequest addRequest){

        int rows = linkGroupService.add(addRequest);

        // 根据影响行数判断添加是否成功
        return rows == 1 ? JsonData.buildSuccess():JsonData.buildResult(BizCodeEnum.GROUP_ADD_FAIL);

    }


    /**
     * 删除链接分组
     * @param groupId 要删除的分组ID
     * @return 删除结果，成功返回成功状态，失败返回分组不存在状态
     */
    @DeleteMapping("/del/{group_id}")
    public JsonData del(@PathVariable("group_id") Long groupId){

        int rows = linkGroupService.del(groupId);
        // 根据影响行数判断删除是否成功
        return rows == 1 ? JsonData.buildSuccess():JsonData.buildResult(BizCodeEnum.GROUP_NOT_EXIST);

    }


}

