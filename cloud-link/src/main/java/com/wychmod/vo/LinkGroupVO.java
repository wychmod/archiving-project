package com.wychmod.vo;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.Date;

/**
 * @description: 短链分组视图对象
 * @author: wychmod
 * @date: 2025-08-24
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class LinkGroupVO implements Serializable {


    private Long id;

    /**
     * 组名
     */
    private String title;

    /**
     * 账号唯一编号
     */
    private Long accountNo;

    private Date gmtCreate;

    private Date gmtModified;


}
