package com.wychmod.test;

import com.google.common.hash.Hashing;
import com.wychmod.LinkApplication;
import com.wychmod.component.ShortLinkComponent;
import com.wychmod.manage.LinkGroupManager;
import com.wychmod.manage.ShortLinkManager;
import com.wychmod.model.LinkGroupDO;
import com.wychmod.model.ShortLinkDO;
import com.wychmod.utils.CommonUtil;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;
import java.util.Random;

/**
 * @description: 短链测试类
 * @author: wychmod
 * @date: 2025-08-10
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LinkApplication.class)
@Slf4j
public class ShortLinkTest {


    @Autowired
    private ShortLinkComponent shortLinkComponent;

    @Test
    public void testMurmurHash(){

        for(int i=0; i<5; i++){

            String originalUrl = "https://wychmod.com?id="+ CommonUtil.generateUUID()+"pwd="+CommonUtil.getStringNumRandom(7);

            long murmur3_32 = Hashing.murmur3_32().hashUnencodedChars(originalUrl).padToLong();
            log.info("murmur3_32={}",murmur3_32);

        }

    }
    @Test
    public void testCreateShortLink() {

        Random random = new Random();
        for (int i = 0; i < 10; i++) {
            int num1 = random.nextInt(10);
            int num2 = random.nextInt(10000000);
            int num3 = random.nextInt(10000000);
            String originalUrl = num1 + "wychmod" + num2 + ".com" + num3;
            String shortLinkCode = shortLinkComponent.createShortLinkCode(originalUrl);
            log.info("originalUrl:" + originalUrl + ", shortLinkCode=" + shortLinkCode);
        }
    }

    @Resource
    private ShortLinkManager shortLinkManager;

    @Test
    public void testAddShortLink() {
        Random random = new Random();
        for (int i = 0; i < 10; i++) {
            int num1 = random.nextInt(10);
            int num2 = random.nextInt(100000000);
            int num3 = random.nextInt(100000000);
            String originalUrl = num1 + "wychmod" + num2 + ".com" + num3;
            String shortLinkCode = shortLinkComponent.createShortLinkCode(originalUrl);

            ShortLinkDO shortLinkDO = new ShortLinkDO();
            shortLinkDO.setCode(shortLinkCode);
            shortLinkDO.setAccountNo((long) num3);
            shortLinkDO.setSign(CommonUtil.MD5(originalUrl));
            shortLinkDO.setDel(0);

            shortLinkManager.addShortLink(shortLinkDO);

        }

    }

    @Resource
    private LinkGroupManager linkGroupManager;

    @Test
    public void testSaveLinkGroup(){

        LinkGroupDO linkGroupDO = new LinkGroupDO();
        linkGroupDO.setTitle("测试分组");
        linkGroupDO.setAccountNo(11111L);
        int rows = linkGroupManager.add(linkGroupDO);

    }

    @Test
    public void testFind(){

        ShortLinkDO shortLinCode = shortLinkManager.findByShortLinCode("0Y1niFa");
        log.info(shortLinCode.toString());

    }
}
