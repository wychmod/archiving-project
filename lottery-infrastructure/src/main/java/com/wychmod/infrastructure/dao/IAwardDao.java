package com.wychmod.infrastructure.dao;

import com.wychmod.infrastructure.po.Award;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface IAwardDao {

    Award queryAwardInfo(String awardId);

}
