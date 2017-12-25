package cn.simpletool.watermarker.service;

import cn.simpletool.watermarker.model.WaterConfig;

/**
 * 配置服务
 *
 * @author ZhanJingbo
 * @version 1.0.0
 * Created on 2017/12/17
 */
public interface WaterConfigService {

    /**
     * 根据平台类型 获取默认配置信息
     * @param platformType 平台类型
     * @return 默认配置信息
     */
    WaterConfig getWaterConfig(int platformType);
}
