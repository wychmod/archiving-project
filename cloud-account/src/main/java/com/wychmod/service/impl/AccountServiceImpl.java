package com.wychmod.service.impl;

import com.wychmod.controller.request.AccountRegisterRequest;
import com.wychmod.enums.AuthTypeEnum;
import com.wychmod.enums.BizCodeEnum;
import com.wychmod.enums.SendCodeEnum;
import com.wychmod.manage.AccountManager;
import com.wychmod.model.AccountDO;
import com.wychmod.service.AccountService;
import com.wychmod.service.NotifyService;
import com.wychmod.utils.CommonUtil;
import com.wychmod.utils.JsonData;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.digest.Md5Crypt;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @description:
 * @author: wychmod
 * @date: 2025-06-28
 */
@Service
@Slf4j
public class AccountServiceImpl implements AccountService {

    @Resource
    private NotifyService notifyService;

    @Resource
    private AccountManager accountManager;

    @Override
    public JsonData register(AccountRegisterRequest registerRequest) {
        boolean checkCode = false;
        if (StringUtils.isNotBlank(registerRequest.getPhone())) {
            // 校验验证码
            checkCode = notifyService.checkCode(SendCodeEnum.USER_REGISTER, registerRequest.getPhone(), registerRequest.getCode());
        }

        if (!checkCode) {
            // 验证码错误
            return JsonData.buildResult(BizCodeEnum.CODE_ERROR);
        }

        AccountDO accountDO = new AccountDO();

        BeanUtils.copyProperties(registerRequest,accountDO);
        // 认证级别
        accountDO.setAuth(AuthTypeEnum.DEFAULT.name());

        // 生成唯一账号
        accountDO.setAccountNo(CommonUtil.getCurrentTimestamp());

        // 设置密码 秘钥 盐
        accountDO.setSecret("$1$"+CommonUtil.getStringNumRandom(8));

        String md5Crypt = Md5Crypt.md5Crypt(registerRequest.getPwd().getBytes(), accountDO.getSecret());

        accountDO.setPwd(md5Crypt);

        int inserted = accountManager.insert(accountDO);
        log.info("插入数据,注册成功：{}",inserted);

        // 注册成功发放福利

        return JsonData.buildSuccess();


    }
}
