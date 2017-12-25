package cn.simpletool.watermarker.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * 文件上传相关配置
 * @author ZhanJingbo
 * @version 1.0.0
 * Created on 2017/8/8
 */
@ConfigurationProperties(prefix = "watermark.upload")
@Component
@Data
public class FileUploadConfigurationProperties {
    private List<String> allowImageType = new ArrayList<>();
}
