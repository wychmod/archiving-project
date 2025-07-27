package com.wychmod.controller;

import com.wychmod.controller.request.AccountRegisterRequest;
import com.wychmod.enums.BizCodeEnum;
import com.wychmod.service.AccountService;
import com.wychmod.service.FileService;
import com.wychmod.utils.JsonData;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;

/**
 * @description:
 * @author: wychmod
 * @date: 2025-06-28
 */
@RestController
@RequestMapping("/api/v1/account")
public class AccountController {

    @Resource
    private FileService fileService;

    @Resource
    private AccountService accountService;

    /**
     * 用户头像文件上传接口，最大支持1M大小的文件上传
     *
     * @param file 用户上传的文件对象，通过表单中的"file"字段传递
     * @return JsonData 响应结果，包含上传成功后的文件访问URL或失败状态码
     */
    @PostMapping("/upload")
    public JsonData uploadUserImg(@RequestPart("file") MultipartFile file) {

        String result = fileService.uploadUserImg(file);

        return result != null ? JsonData.buildSuccess(result) : JsonData.buildResult(BizCodeEnum.FILE_UPLOAD_USER_IMG_FAIL);
    }

    @PostMapping("/register")
    public JsonData register(@RequestBody AccountRegisterRequest registerRequest) {

        JsonData jsonData = accountService.register(registerRequest);

        return jsonData;
    }

}
