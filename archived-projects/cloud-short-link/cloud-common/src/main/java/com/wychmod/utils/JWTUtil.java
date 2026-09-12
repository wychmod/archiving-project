package com.wychmod.utils;

import com.wychmod.model.LoginUser;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;

import java.util.Date;

/**
 * @description: JWT工具类
 * @author: wychmod
 * @date: 2025-07-27
 */
@Slf4j
public class JWTUtil {

    /**
     * 主题
     */
    private static final String SUBJECT = "wychmod";

    /**
     * 加密密钥
     */
    private static final String SECRET = "wychmod";

    /**
     * 令牌前缀
     */
    private static final String TOKNE_PREFIX = "cloud-link";


    /**
     * token过期时间，7天
     */
    private static final long EXPIRED = 1000 * 60 * 60 * 24 * 7;


    /**
     * 生成JWT令牌
     * @param loginUser 登录用户对象，包含用户信息
     * @return 生成的JWT令牌字符串，包含用户信息和签名
     * @throws NullPointerException 当loginUser为空时抛出异常
     */
    public static String geneJsonWebToken(LoginUser loginUser) {

        if (loginUser == null) {
            throw new NullPointerException("对象为空");
        }

        // 构建JWT令牌，包含用户信息、签发时间和过期时间
        String token = Jwts.builder()
                .setSubject(SUBJECT)
                .claim("account_no", loginUser.getAccountNo())
                .claim("username", loginUser.getUsername())
                .claim("headImg", loginUser.getHeadImg())
                .claim("mail", loginUser.getMail())
                .claim("phone", loginUser.getPhone())
                .claim("auth", loginUser.getAuth())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRED))
                .signWith(io.jsonwebtoken.SignatureAlgorithm.HS256, SECRET).compact();

        token = TOKNE_PREFIX + token;

        return token;
    }

    /**
     * 验证并解析JWT令牌
     * @param token 待验证的JWT令牌字符串
     * @return 解析后的Claims对象，包含令牌中的用户信息；解析失败时返回null
     */
    public static Claims checkJWT(String token) {
        try {
            // 移除令牌前缀后进行解析和验证
            return Jwts.parser()
                    .setSigningKey(SECRET).parseClaimsJws(token.replace(TOKNE_PREFIX, "")).getBody();
        } catch (Exception e) {
            log.error("jwt 解密失败");
            return null;
        }
    }


}
