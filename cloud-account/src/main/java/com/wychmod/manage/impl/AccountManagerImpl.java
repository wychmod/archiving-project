package com.wychmod.manage.impl;

import com.wychmod.manage.AccountManager;
import com.wychmod.mapper.AccountMapper;
import com.wychmod.model.AccountDO;
import com.wychmod.service.AccountService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * @description: 账户管理实现类
 * @author: wychmod
 * @date: 2025-06-28
 */
@Component
@Slf4j
public class AccountManagerImpl implements AccountManager {

    @Resource
    private AccountMapper accountMapper;

    /**
     * 插入账户信息
     * @param accountDO 账户数据对象
     * @return 插入记录数
     */
    @Override
    public int insert(AccountDO accountDO) {
        return accountMapper.insert(accountDO);
    }
}

