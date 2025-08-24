package com.wychmod.controller;


import com.wychmod.controller.request.LinkGroupAddRequest;
import com.wychmod.controller.request.LinkGroupUpdateRequest;
import com.wychmod.enums.BizCodeEnum;
import com.wychmod.service.LinkGroupService;
import com.wychmod.utils.JsonData;
import com.wychmod.vo.LinkGroupVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

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


    /**
     * 获取链接分组详情
     * @param groupId 分组ID
     * @return 返回分组详情信息
     */
    @GetMapping("detail/{group_id}")
    public JsonData detail(@PathVariable("group_id") Long groupId){

        LinkGroupVO linkGroupVO = linkGroupService.detail(groupId);
        return JsonData.buildSuccess(linkGroupVO);

    }


    /**
     * 获取所有链接分组列表
     * @return 返回分组列表
     */
    @GetMapping("list")
    public JsonData list(){

        List<LinkGroupVO> list = linkGroupService.listAllGroup();

        return JsonData.buildSuccess(list);

    }


    /**
     * 更新链接分组信息
     * @param request 分组更新请求参数
     * @return 更新成功返回成功状态，更新失败返回业务异常码
     */
    @PutMapping("update")
    public JsonData update(@RequestBody LinkGroupUpdateRequest request){

        // 执行更新操作并获取影响行数
        int rows = linkGroupService.updateById(request);
        // 根据影响行数判断更新是否成功
        return rows == 1 ? JsonData.buildSuccess():JsonData.buildResult(BizCodeEnum.GROUP_OPER_FAIL);

    }



}

