package cn.simpletool.watermarker.common;

import lombok.Data;

/**
 * 日志Vo
 *
 * @author ZhanJingbo
 * @version 1.0.0
 * Created on 2017/10/31
 */
@Data
public class LogMessageVo {
    /**
     * 日志的类型 {@link cn.simpletool.watermarker.common.LogMessageType}
     */
    private int logMessageType;
    /**
     * 日志的内容
     */
    private String logMessageContent;


}
