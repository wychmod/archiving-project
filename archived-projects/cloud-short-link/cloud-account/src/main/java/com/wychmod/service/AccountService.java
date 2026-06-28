package com.wychmod.service;

import com.wychmod.controller.request.AccountLoginRequest;
import com.wychmod.controller.request.AccountRegisterRequest;
import com.wychmod.utils.JsonData;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * @description: 账户服务接口，提供账户相关业务操作
 * @author: wychmod
 * @date: 2025-06-28
 */
public interface AccountService {

    /**
     * 用户注册功能
     * @param registerRequest 注册请求参数对象，包含用户注册所需的信息
     * @return JsonData 返回注册结果，包含注册成功或失败的状态信息
     */
    JsonData register(AccountRegisterRequest registerRequest);

    /**
     * 用户登录功能
     *
     * @param loginRequest 包含用户登录信息的请求对象，包含用户名和密码等信息
     * @return 返回登录结果的JsonData对象，包含登录成功或失败的状态信息
     */
    JsonData login(AccountLoginRequest loginRequest);

}
