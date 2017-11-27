package cn.simpletool.watermarker.service.impl;

import cn.simpletool.watermarker.dao.LogMessageDao;
import cn.simpletool.watermarker.model.LogMessage;
import cn.simpletool.watermarker.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * LogService的实现类
 * @author ZhanJingbo
 * @version 1.0.0
 * Created on 2017/11/22
 */
@Service
public class LogServiceImpl implements LogService {

    @Autowired
    private LogMessageDao logMessageDao;

    @Override
    public void addLog(LogMessage logMessage) {
        logMessageDao.addLog(logMessage);
    }
}
