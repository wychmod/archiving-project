package com.wychmod.domain.award.service.factory;

import com.wychmod.domain.award.service.goods.IDistributionGoods;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

/**
 * @description: 配送商品简单工厂，提供获取配送服务
 * @author：wychmod
 * @date: 2022/10/29
 */
@Service
public class DistributionGoodsFactory extends GoodsConfig{

    public IDistributionGoods getDistributionGoodsService(Integer awardType){
        return goodsMap.get(awardType);
    }
}
