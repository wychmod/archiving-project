package com.wychmod.manage.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.wychmod.manage.ShortLinkManager;
import com.wychmod.mapper.ShortLinkMapper;
import com.wychmod.model.ShortLinkDO;

import javax.annotation.Resource;

/**
 * @description:
 * @author: wychmod
 * @date: 2025-09-07
 */
public class ShortLinkManagerImpl implements ShortLinkManager {

    @Resource
    private ShortLinkMapper shortLinkMapper;

    @Override
    public int addShortLink(ShortLinkDO shortLinkDO) {
        return shortLinkMapper.insert(shortLinkDO);
    }

    @Override
    public ShortLinkDO findByShortLinCode(String shortLinkCode) {
        return shortLinkMapper.selectOne(
                new QueryWrapper<ShortLinkDO>().eq("code", shortLinkCode));
    }

    @Override
    public int del(String shortLinkCode, Long accountNo) {
        ShortLinkDO shortLinkDO = new ShortLinkDO();
        shortLinkDO.setDel(1);

        return shortLinkMapper.update(shortLinkDO,
                new QueryWrapper<ShortLinkDO>().eq("code", shortLinkCode).eq("account_no", accountNo));
    }
}
