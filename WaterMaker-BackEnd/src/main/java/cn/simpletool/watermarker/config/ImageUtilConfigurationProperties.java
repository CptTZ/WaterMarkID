package cn.simpletool.watermarker.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * 水印工具类参数配置
 * @author ZhanJingbo
 * @version 1.0.0
 * Created on 2017/8/8
 */
@Component
@Data
@ConfigurationProperties(prefix = "watermark.imageUtil")
public class ImageUtilConfigurationProperties {
    private String fontName;
    private int fontSize;
    private float alpha;
    private boolean carelessness;
}
