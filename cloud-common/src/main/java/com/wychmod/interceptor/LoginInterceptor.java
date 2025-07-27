package com.wychmod.interceptor;

import com.wychmod.enums.BizCodeEnum;
import com.wychmod.model.LoginUser;
import com.wychmod.utils.CommonUtil;
import com.wychmod.utils.JWTUtil;
import com.wychmod.utils.JsonData;
import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @description: 登录拦截器
 * @author: wychmod
 * @date: 2025-07-27
 */
@Slf4j
public class LoginInterceptor implements HandlerInterceptor {

    /**
     * 用于存储当前线程的登录用户信息
     */
    public static ThreadLocal<LoginUser> threadLocal = new ThreadLocal<>();

    /**
     * 在请求处理之前进行拦截处理
     * @param request 当前HTTP请求对象
     * @param response 当前HTTP响应对象
     * @param handler 被调用的处理器对象（Controller的方法）
     * @return boolean 返回true表示继续执行后续操作，返回false表示中断请求处理
     * @throws Exception 处理过程中可能抛出的异常
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 处理OPTIONS请求，直接返回204状态码
        if (HttpMethod.OPTIONS.toString().equalsIgnoreCase(request.getMethod())){
            response.setStatus(HttpStatus.NO_CONTENT.value());
            return true;
        }

        // 获取请求中的token，优先从header中获取，其次从参数中获取
        String token = request.getHeader("token");
        if (StringUtils.isBlank(token)){
            token = request.getParameter("token");
        }

        // 如果token存在，则进行JWT验证
        if (StringUtils.isNotBlank(token)){
            Claims claims = JWTUtil.checkJWT(token);
            // token无效或过期，返回未登录信息
            if (claims == null) {
                log.info("用户未登录");
                CommonUtil.sendJsonMessage(response, JsonData.buildResult(BizCodeEnum.ACCOUNT_UNLOGIN));
                return false;
            }

            // 解析token中的用户信息并构建LoginUser对象
            long accountNo = Long.parseLong(claims.get("account_no").toString());
            String username = claims.get("username").toString();
            String headImg = claims.get("head_img").toString();
            String mail = claims.get("mail").toString();
            String phone = claims.get("phone").toString();
            String auth = claims.get("auth").toString();
            LoginUser loginUser = LoginUser.builder()
                    .accountNo(accountNo)
                    .username(username)
                    .headImg(headImg)
                    .mail(mail)
                    .phone(phone)
                    .auth(auth)
                    .build();
            threadLocal.set(loginUser);
            return true;
        }

        return HandlerInterceptor.super.preHandle(request, response, handler);
    }

    /**
     * 请求处理之后，视图渲染之前执行（本实现为空）
     * @param request 当前HTTP请求对象
     * @param response 当前HTTP响应对象
     * @param handler 被调用的处理器对象
     * @param modelAndView Spring MVC的ModelAndView对象
     * @throws Exception 处理过程中可能抛出的异常
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    /**
     * 在整个请求处理完成之后执行，用于清理资源
     * @param request 当前HTTP请求对象
     * @param response 当前HTTP响应对象
     * @param handler 被调用的处理器对象
     * @param ex 处理过程中抛出的异常（如果没有则为null）
     * @throws Exception 处理过程中可能抛出的异常
     */
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        // 清理当前线程的用户信息，防止内存泄漏
        threadLocal.remove();
    }
}
