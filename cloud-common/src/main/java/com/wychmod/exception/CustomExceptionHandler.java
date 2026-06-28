package com.wychmod.exception;

import com.wychmod.utils.JsonData;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * @description: 自定义异常处理类，用于全局捕获和处理异常
 * @author: wychmod
 * @date: 2025-06-25
 */
@Slf4j
@RestControllerAdvice
public class CustomExceptionHandler {

    /**
     * 全局异常处理方法
     * @param e 异常对象
     * @return 返回封装的JsonData对象
     */
    @ExceptionHandler(value = Exception.class)
    public JsonData handleException(Exception e) {
        if (e instanceof BizException) {
            BizException bizException = (BizException) e;
            log.error("【业务异常】{}", e);
            return JsonData.buildCodeAndMsg(bizException.getCode(), bizException.getMsg());
        } else {
            log.error("【系统异常】{}", e);
            return JsonData.buildError("系统异常");
        }
    }

}
