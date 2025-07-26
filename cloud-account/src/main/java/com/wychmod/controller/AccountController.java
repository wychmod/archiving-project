package com.wychmod.controller;

import com.wychmod.enums.BizCodeEnum;
import com.wychmod.service.FileService;
import com.wychmod.utils.JsonData;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
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

    @RequestMapping("/upload")
    public JsonData uploadUserImg(@RequestPart("file") MultipartFile file) {

        String result = fileService.uploadUserImg(file);

        return result != null ? JsonData.buildSuccess(result) : JsonData.buildResult(BizCodeEnum.FILE_UPLOAD_USER_IMG_FAIL);
    }
}
