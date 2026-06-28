package com.wychmod.strategy;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * @description: 分表配置类，用于管理分表策略和表后缀配置
 * @author: wychmod
 * @date: 2025-09-06
 */
public class ShardingTableConfig {

    /**
     * 存储数据表位置编号
     */
    private static final List<String> tableSuffixList = new ArrayList<>();

    private static Random random = new Random();

    //配置启用那些表的后缀
    static {
        tableSuffixList.add("0");
        tableSuffixList.add("a");
    }

    /**
     * 随机获取一个表后缀
     * @return String 表后缀字符串，用于构建完整的表名
     */
    public static String getRandomTableSuffix(){
        int index = random.nextInt(tableSuffixList.size());
        return tableSuffixList.get(index);
    }
}
