package cn.simpletool.watermarker.common;

/**
 * 日志类型枚举
 *
 * @author ZhanJingbo
 * @version 1.0.0
 * Created on 2017/11/15
 */
public enum LogMessageType {
    WATER_MARKER_TEXT(1, "水印文字"),
    FEED_BACK(2, "意见反馈");

    int value;
    String typeDesc;

    LogMessageType(int value, String typeDesc) {
        this.value = value;
        this.typeDesc = typeDesc;
    }

    public int value() {
        return this.value;
    }

    public int desc() {
        return this.desc();
    }

    public LogMessageType getLogMessageTypeWithInt(int logMessageType) {
        for (LogMessageType type : LogMessageType.values()) {
            if (type.value == logMessageType) {
                return type;
            }
        }
        return null;
    }
}
