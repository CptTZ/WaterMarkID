package cn.simpletool.watermarker.model;

import lombok.Data;

/**
 * 日志实体
 *
 * @author ZhanJingbo
 * @version 1.0.0
 * Created on 2017/10/31
 */
@Data
public class LogMessage {

    /**
     * 日志id
     */
    private int id;

    /**
     * 日志的类型 {@link cn.simpletool.watermarker.common.LogMessageType}
     */
    private int logMessageType;

    /**
     * 客户端ip
     */
    private String clientIp;

    /**
     * 客户端类别 {@link cn.simpletool.watermarker.common.LogClientTypeEnum}
     */
    private Integer clientType;
    /**
     * 日志的内容
     */
    private String logMessageContent;

    /**
     * 水印颜色
     */
    private String waterColor;

    /**
     * 创建时间
     */
    private long createTime;

}
