package com.wychmod.service.impl;

import com.wychmod.manage.ShortLinkManager;
import com.wychmod.model.ShortLinkDO;
import com.wychmod.service.ShortLinkService;
import com.wychmod.vo.ShortLinkVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @description: 短链接服务实现类，提供短链接解析功能
 * @author: wychmod
 * @date: 2025-09-08
 */
@Service
@Slf4j
public class ShortLinkServiceImpl implements ShortLinkService {

    @Resource
    private ShortLinkManager shortLinkManager;

    /**
     * 根据短链接码解析获取短链接信息
     * @param shortLinkCode 短链接码
     * @return 短链接VO对象，如果未找到对应的短链接则返回null
     */
    @Override
    public ShortLinkVO parseShortLinkCode(String shortLinkCode) {
        // 根据短链接码查询短链接信息
        ShortLinkDO shortLinkDO = shortLinkManager.findByShortLinCode(shortLinkCode);
        if (shortLinkDO == null) {
            return null;
        }
        // 将DO对象转换为VO对象
        ShortLinkVO shortLinkVO = new ShortLinkVO();
        BeanUtils.copyProperties(shortLinkDO,shortLinkVO);
        return shortLinkVO;
    }
}
