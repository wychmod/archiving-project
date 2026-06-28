package com.wychmod.service;

import org.springframework.web.multipart.MultipartFile;

/**
 * @description: 文件服务接口
 * @author: wychmod
 * @date: 2025-07-26
 */
public interface FileService {

    /**
     * 上传用户头像图片
     * @param file 用户上传的图片文件
     * @return 上传成功后文件的访问URL地址
     */
    String uploadUserImg(MultipartFile file);
}
