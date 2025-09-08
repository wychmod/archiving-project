package com.wychmod.manage.impl;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.wychmod.manage.ShortLinkManager;
import com.wychmod.mapper.ShortLinkMapper;
import com.wychmod.model.ShortLinkDO;
import com.wychmod.utils.IDUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * @description: 短链接管理实现类
 * @author: wychmod
 * @date: 2025-09-07
 */
@Component
@Slf4j
public class ShortLinkManagerImpl implements ShortLinkManager {

    @Resource
    private ShortLinkMapper shortLinkMapper;

    /**
     * 添加短链接记录
     * @param shortLinkDO 短链接数据对象
     * @return 插入记录数
     */
    @Override
    public int addShortLink(ShortLinkDO shortLinkDO) {
        return shortLinkMapper.insert(shortLinkDO);
    }

    /**
     * 根据短链接码查找短链接信息
     * @param shortLinkCode 短链接码
     * @return 短链接数据对象
     */
    @Override
    public ShortLinkDO findByShortLinCode(String shortLinkCode) {
        return shortLinkMapper.selectOne(
                new QueryWrapper<ShortLinkDO>().eq("code", shortLinkCode));
    }

    /**
     * 删除短链接（逻辑删除）
     * @param shortLinkCode 短链接码
     * @param accountNo 账户编号
     * @return 更新记录数
     */
    @Override
    public int del(String shortLinkCode, Long accountNo) {
        // 设置删除标识为1，表示已删除
        ShortLinkDO shortLinkDO = new ShortLinkDO();
        shortLinkDO.setDel(1);

        return shortLinkMapper.update(shortLinkDO,
                new QueryWrapper<ShortLinkDO>().eq("code", shortLinkCode).eq("account_no", accountNo));
    }
}

