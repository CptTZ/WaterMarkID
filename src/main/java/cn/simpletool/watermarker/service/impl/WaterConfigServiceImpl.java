package cn.simpletool.watermarker.service.impl;

import cn.simpletool.watermarker.dao.WaterConfigDao;
import cn.simpletool.watermarker.model.WaterConfig;
import cn.simpletool.watermarker.service.WaterConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author ZhanJingbo
 * @version 1.0.0
 * Created on 2017/12/17
 */
@Service
public class WaterConfigServiceImpl implements WaterConfigService {

    @Autowired
    private WaterConfigDao waterConfigDao;

    /**
     * 根据平台类型 获取默认配置信息
     *
     * @param platformType 平台类型
     * @return 默认配置信息
     */
    @Override
    public WaterConfig getWaterConfig(int platformType) {
        return waterConfigDao.getWaterConfig(platformType);
    }
}
