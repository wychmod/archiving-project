package com.wychmod.domain.activity.model.vo;

import java.math.BigDecimal;

/**
 * @description: 策略详情配置
 * @author：wychmod
 * @date: 2022/10/30
 */
public class StrategyDetailVO {
    /**
     * 策略ID
     */
    private Long strategyId;

    /**
     * 奖品ID
     */
    private String awardId;

    /**
     * 奖品名称
     */
    private String awardName;

    /**
     * 奖品库存
     */
    private Integer awardCount;

    /**
     * 奖品剩余库存
     */
    private Integer awardSurplusCount;

    /**
     * 中奖概率
     */
    private BigDecimal awardRate;

    public Long getStrategyId() {
        return strategyId;
    }

    public void setStrategyId(Long strategyId) {
        this.strategyId = strategyId;
    }

    public String getAwardId() {
        return awardId;
    }

    public void setAwardId(String awardId) {
        this.awardId = awardId;
    }

    public String getAwardName() {
        return awardName;
    }

    public void setAwardName(String awardName) {
        this.awardName = awardName;
    }

    public Integer getAwardCount() {
        return awardCount;
    }

    public void setAwardCount(Integer awardCount) {
        this.awardCount = awardCount;
    }

    public Integer getAwardSurplusCount() {
        return awardSurplusCount;
    }

    public void setAwardSurplusCount(Integer awardSurplusCount) {
        this.awardSurplusCount = awardSurplusCount;
    }

    public BigDecimal getAwardRate() {
        return awardRate;
    }

    public void setAwardRate(BigDecimal awardRate) {
        this.awardRate = awardRate;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("StrategyDetailVO{");
        sb.append("strategyId=").append(strategyId);
        sb.append(", awardId='").append(awardId).append('\'');
        sb.append(", awardName='").append(awardName).append('\'');
        sb.append(", awardCount=").append(awardCount);
        sb.append(", awardSurplusCount=").append(awardSurplusCount);
        sb.append(", awardRate=").append(awardRate);
        sb.append('}');
        return sb.toString();
    }
}
