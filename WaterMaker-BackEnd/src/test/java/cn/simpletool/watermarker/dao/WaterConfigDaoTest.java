package cn.simpletool.watermarker.dao;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * @author ZhanJingbo
 * @version 1.0.0
 * Created on 2017/12/17
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class WaterConfigDaoTest {
    @Autowired
    private WaterConfigDao waterConfigDao;

    @Test
    public void getWaterConfigTest() {
        System.out.println(waterConfigDao.getWaterConfig(1));
    }

}
