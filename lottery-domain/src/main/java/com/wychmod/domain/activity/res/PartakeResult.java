package com.wychmod.domain.activity.res;

import com.wychmod.Result;

/**
 * @description: 活动参与结果
 * @author: wychmod
 * @date: 2022/11/3
 */
public class PartakeResult extends Result {

    /**
     * 策略ID
     */
    private Long strategyId;

    public PartakeResult(String code, String info) {
        super(code, info);
    }

    public Long getStrategyId() {
        return strategyId;
    }

    public void setStrategyId(Long strategyId) {
        this.strategyId = strategyId;
    }
}
