package cn.simpletool.watermarker.model;

import lombok.Data;

/**
 * 水印默认配置
 *
 * @author ZhanJingbo
 * @version 1.0.0
 * Created on 2017/12/17
 */
@Data
public class WaterConfig {
    /**
     * 配置的适用平台 1：web，2：微信小程序
     */
    private int platformType;

    /**
     * 配置的Json字符串
     */
    private String configJsonString;

}
