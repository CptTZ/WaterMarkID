package cn.simpletool.watermarker.service;

/**
 * 日志统计，主要统计使用情况，意见反馈等信息
 * @author ZhanJingbo
 * @version 1.0.0
 * Created on 2017/11/15
 */
public interface LogService {

    void addLog(int type,String logMessage);
}
