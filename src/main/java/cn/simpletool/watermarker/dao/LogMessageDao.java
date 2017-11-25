package cn.simpletool.watermarker.dao;

import cn.simpletool.watermarker.model.LogMessage;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

/**
 * LogMessage的数据库操作
 *
 * @author ZhanJingbo
 * @version 1.0.0
 * Created on 2017/11/22
 */
@Mapper
public interface LogMessageDao {

    @Insert("INSERT INTO log_message(log_message_type,client_ip,client_type,log_message_content,create_time) VALUES(#{logMessageType},#{clientIp},#{clientType},#{logMessageContent},now())")
    int addLog(LogMessage logMessage);
}
