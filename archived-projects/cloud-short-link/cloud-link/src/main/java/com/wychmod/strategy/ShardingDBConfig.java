package com.wychmod.strategy;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * @description: 分库配置类，用于管理数据库分片配置信息
 * @author: wychmod
 * @date: 2025-09-06
 */
public class ShardingDBConfig {

    /**
     * 存储数据库位置编号
     */
    private static final List<String> dbPrefixList = new ArrayList<>();

    private static Random random = new Random();

    // 初始化数据库前缀列表，添加默认的分库标识
    static {
        dbPrefixList.add("0");
        dbPrefixList.add("1");
        dbPrefixList.add("a");
    }

    /**
     * 随机获取一个数据库前缀
     * @return String 数据库前缀标识符，用于确定数据存储的数据库实例
     */
    public static String getDBPrefix() {
        return dbPrefixList.get(random.nextInt(dbPrefixList.size()));
    }

}
