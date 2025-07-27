package com.wychmod.manage;

import com.wychmod.model.AccountDO;

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
}
