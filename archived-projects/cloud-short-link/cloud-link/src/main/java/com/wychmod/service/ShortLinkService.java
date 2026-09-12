package com.wychmod.service;

import com.wychmod.vo.ShortLinkVO;

/**
 * @description: 短链接服务接口，提供短链接解析功能
 * @author: wychmod
 * @date: 2025-09-08
 */
public interface ShortLinkService {

    /**
     * 解析短链接码，获取对应的短链接信息
     *
     * @param shortLinkCode 短链接码字符串，用于标识唯一的短链接
     * @return ShortLinkVO 短链接对应的详细信息对象，包含原始链接等信息
     */
    ShortLinkVO parseShortLinkCode(String shortLinkCode);
}

