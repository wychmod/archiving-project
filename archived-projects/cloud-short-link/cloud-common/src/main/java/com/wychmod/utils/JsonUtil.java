package com.wychmod.utils;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import lombok.extern.slf4j.Slf4j;

import java.text.SimpleDateFormat;
import java.util.List;

/**
 * JsonUtil类提供了JSON与Java对象之间的相互转换功能。
 * 它使用了Jackson库来处理JSON数据，并通过静态初始化块配置了ObjectMapper实例，
 * 以满足特定的序列化和反序列化需求。
 */
@Slf4j
public class JsonUtil {

    // 创建并配置一个全局的ObjectMapper实例
    private static final ObjectMapper mapper = new ObjectMapper();

    static {
        // 允许使用单引号来包围JSON中的属性名称
        mapper.configure(JsonParser.Feature.ALLOW_SINGLE_QUOTES, true);

        // 在序列化时包含所有属性，即使它们的值为null
        mapper.setSerializationInclusion(JsonInclude.Include.ALWAYS);

        // 在反序列化时忽略未知属性，避免抛出异常
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        // 在序列化空对象时，不抛出异常
        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);

        // 不将日期作为时间戳来序列化，而是使用指定的日期格式
        mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        mapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
    }

    /**
     * 将Java对象转换为JSON字符串。
     *
     * @param obj 要转换的Java对象
     * @return 转换后的JSON字符串，如果转换失败则返回null
     */
    public static String obj2Json(Object obj) {
        String jsonStr = null;
        try {
            jsonStr = mapper.writeValueAsString(obj);
        } catch (JsonProcessingException e) {
            log.error("json格式化异常:{}", e);
        }
        return jsonStr;
    }

    /**
     * 将JSON字符串转换为Java对象。
     *
     * @param jsonStr 要转换的JSON字符串
     * @param beanType 目标Java对象的Class类型
     * @return 转换后的Java对象，如果转换失败则返回null
     */
    public static <T> T json2Obj(String jsonStr, Class<T> beanType) {
        T obj = null;
        try {
            obj = mapper.readValue(jsonStr, beanType);
        } catch (Exception e) {
            log.error("json格式化异常:{}", e);
        }
        return obj;
    }

    /**
     * 将JSON字符串转换为指定类型的List对象。
     *
     * @param jsonData 要转换的JSON字符串
     * @param beanType List中元素的Java类型
     * @return 转换后的List对象，如果转换失败则返回null
     */
    public static <T> List<T> json2List(String jsonData, Class<T> beanType) {
        JavaType javaType = mapper.getTypeFactory().constructParametricType(List.class, beanType);
        try {
            List<T> list = mapper.readValue(jsonData, javaType);
            return list;
        } catch (Exception e) {
            log.error("json格式化异常:{}", e);
        }
        return null;
    }

    /**
     * 将Java对象转换为byte数组。
     *
     * @param obj 要转换的Java对象
     * @return 转换后的byte数组，如果转换失败则返回null
     */
    public static byte[] obj2Bytes(Object obj) {
        byte[] byteArr = null;
        try {
            byteArr = mapper.writeValueAsBytes(obj);
        } catch (JsonProcessingException e) {
            log.error("json格式化异常:{}", e);
        }
        return byteArr;
    }

    /**
     * 将byte数组转换为Java对象。
     *
     * @param byteArr 要转换的byte数组
     * @param beanType 目标Java对象的Class类型
     * @return 转换后的Java对象，如果转换失败则返回null
     */
    public static <T> T bytes2Obj(byte[] byteArr, Class<T> beanType) {
        T obj = null;
        try {
            obj = mapper.readValue(byteArr, beanType);
        } catch (Exception e) {
            log.error("json格式化异常:{}", e);
        }
        return obj;
    }
}
