package com.wychmod.manage;

import com.wychmod.model.AccountDO;

import java.util.List;

/**
 * @description: 账户管理接口，提供账户相关的业务操作接口
 * @author: wychmod
 * @date: 2025-06-28
 */
public interface AccountManager {

    /**
     * 插入账户信息
     * @param accountDO 账户数据对象，包含账户的基本信息
     * @return 返回插入操作影响的行数，1表示插入成功，0表示插入失败
     */
    int insert(AccountDO accountDO);


    /**
     * 根据手机号码查询账户信息
     *
     * @param phone 手机号码，用于精确匹配账户信息
     * @return 返回匹配该手机号码的账户信息列表，如果未找到则返回空列表
     */
    List<AccountDO> findByPhone(String phone);

}
