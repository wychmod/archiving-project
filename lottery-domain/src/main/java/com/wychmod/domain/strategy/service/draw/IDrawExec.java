package com.wychmod.domain.strategy.service.draw;

import com.wychmod.domain.strategy.model.req.DrawReq;
import com.wychmod.domain.strategy.model.res.DrawResult;

public interface IDrawExec {
    DrawResult doDrawExec(DrawReq req);
}
