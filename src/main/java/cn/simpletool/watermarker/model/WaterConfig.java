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
     * 默认水印文字
     */
    private String waterMarkerText;
    /**
     * 默认的透明度
     */
    private double opacity;

    /**
     * 默认的水印颜色
     */
    private String waterMarkerColor;

    /**
     * 支持的水印颜色
     */
    private String[] colors;

    /**
     * 配置的适用平台 1：web，2：微信小程序
     */
    private int configType;

}
