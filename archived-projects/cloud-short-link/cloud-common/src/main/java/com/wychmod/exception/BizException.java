package com.wychmod.exception;

import com.wychmod.enums.BizCodeEnum;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @description: 自定义业务异常
 * @author: wychmod
 * @date: 2025-06-25
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class BizException extends RuntimeException{

    private int code;

    private String msg;

    public BizException(Integer code, String message) {
        super(message);
        this.code = code;
        this.msg = message;
    }



    public BizException(BizCodeEnum bizCodeEnum){
        super(bizCodeEnum.getMessage());
        this.code = bizCodeEnum.getCode();
        this.msg = bizCodeEnum.getMessage();
    }

}
