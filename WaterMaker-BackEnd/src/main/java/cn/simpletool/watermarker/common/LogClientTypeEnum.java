package cn.simpletool.watermarker.common;

/**
 * @author ZhanJingbo
 * @version 1.0.0
 * Created on 2017/11/16
 */
public enum  LogClientTypeEnum {
    WECHAT_SMALL_PROGRAM(0,"微信小程序"),
    BROWERS_PROGRAM(1,"浏览器程序");

    int value;
    String typeDesc;

    LogClientTypeEnum(int value, String typeDesc) {
        this.value = value;
        this.typeDesc = typeDesc;
    }

    public int value() {
        return this.value;
    }

    public int desc() {
        return this.desc();
    }

    public LogClientTypeEnum getLogClientTypeWithInt(int logMessageType) {
        for (LogClientTypeEnum type : LogClientTypeEnum.values()) {
            if (type.value == logMessageType) {
                return type;
            }
        }
        return null;
    }
}
