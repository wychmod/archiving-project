package com.wychmod.manage;

import com.wychmod.model.ShortLinkDO;

/**
 * @description: 短链接管理接口，提供短链接的增删查功能
 * @author: wychmod
 * @date: 2025-09-07
 */
public interface ShortLinkManager {

    /**
     * 添加短链接
     * @param shortLinkDO 短链接数据对象，包含短链接的相关信息
     * @return 添加结果，1表示添加成功，0表示添加失败
     */
    int addShortLink(ShortLinkDO shortLinkDO);


    /**
     * 根据短链接码查找短链接信息
     * @param shortLinkCode 短链接码，用于唯一标识一个短链接
     * @return 短链接数据对象，包含该短链接的详细信息
     */
    ShortLinkDO findByShortLinCode(String shortLinkCode);


    /**
     * 删除指定的短链接
     * @param shortLinkCode 短链接码，用于标识要删除的短链接
     * @param accountNo 账户编号，用于权限验证
     * @return 删除结果，1表示删除成功，0表示删除失败
     */
    int del(String shortLinkCode,Long accountNo);
}

