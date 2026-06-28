package com.wychmod.controller;

import com.wychmod.enums.ShortLinkStateEnum;
import com.wychmod.service.ShortLinkService;
import com.wychmod.utils.CommonUtil;
import com.wychmod.vo.ShortLinkVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @description: 短链跳转控制器，用于处理短链访问请求并重定向到原始链接
 * @author: wychmod
 * @date: 2025-09-08
 */
@Controller
@Slf4j
public class LinkApiController {

    @Resource
    private ShortLinkService shortLinkService;


    /**
     * 根据短链码进行跳转
     * @param shortLinkCode 短链码
     * @param request HTTP请求对象
     * @param response HTTP响应对象
     */
    @GetMapping(path = "/{shortLinkCode}")
    public void redirect(@PathVariable String shortLinkCode, HttpServletRequest request, HttpServletResponse response) {
       try {
           log.info("短链码:{}", shortLinkCode);
           //判断短链码是否合规
           if (isLetterDigit(shortLinkCode)){
                ShortLinkVO shortLinkVO = shortLinkService.parseShortLinkCode(shortLinkCode);
               //判断是否过期和可用
               if (isVisitable(shortLinkVO)) {
                   response.setHeader("Location", shortLinkVO.getOriginalUrl());

                   //302跳转
                   response.setStatus(HttpStatus.FOUND.value());


               } else {

                   response.setStatus(HttpStatus.NOT_FOUND.value());
                   return;
               }
           }


       } catch (Exception e) {
           log.error("短链码解析异常:{}", shortLinkCode);
           response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
       }

    }

    /**
     * 判断短链接是否可访问（未过期且状态为激活）
     * @param shortLinkVO 短链接信息对象
     * @return 如果可访问返回true，否则返回false
     */
    private boolean isVisitable(ShortLinkVO shortLinkVO) {

        if (shortLinkVO != null && shortLinkVO.getExpired() != null && shortLinkVO.getExpired().getTime() > CommonUtil.getCurrentTimestamp()){
            if (ShortLinkStateEnum.ACTIVE.name().equalsIgnoreCase(shortLinkVO.getState())){
                return true;
            }
        } else if ((shortLinkVO != null && shortLinkVO.getExpired().getTime() == -1)) {
            if (ShortLinkStateEnum.ACTIVE.name().equalsIgnoreCase(shortLinkVO.getState())) {
                return true;
            }
        }
        return false;
    }

    /**
     * 判断字符串是否只包含字母和数字
     * @param shortLinkCode 待校验的字符串
     * @return 如果只包含字母和数字返回true，否则返回false
     */
    private boolean isLetterDigit(String shortLinkCode) {
        String regex = "^[a-z0-9A-Z]+$";
        return shortLinkCode.matches(regex);
    }
}
