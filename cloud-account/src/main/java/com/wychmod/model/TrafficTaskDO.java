package com.wychmod.model;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * 
 * </p>
 *
 * @author 二当家小D
 * @since 2025-06-28
 */
@Data
@EqualsAndHashCode(callSuper = false)
@TableName("traffic_task")
public class TrafficTaskDO implements Serializable {

    private static final long serialVersionUID = 1L;

      @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private Long accountNo;

    private Long trafficId;

    private Integer useTimes;

    /**
     * 锁定状态锁定 LOCK 完成FINISH-取消CANCEL
     */
    private String lockState;

    /**
     * 唯一标识
     */
    private String messageId;

    private Date gmtCreate;

    private Date gmtModified;


}
