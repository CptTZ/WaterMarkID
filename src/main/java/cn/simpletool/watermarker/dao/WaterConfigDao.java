package cn.simpletool.watermarker.dao;

import cn.simpletool.watermarker.model.WaterConfig;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

/**
 * @author ZhanJingbo
 * @version 1.0.0
 * Created on 2017/12/17
 */
public interface WaterConfigDao {
    /**
     * 根据平台id，从数据库读取默认配置
     *
     * @param platformType 平台id
     * @return 默认配置
     */
    @Select("select * from water_config where platform_type = #{platformType}")
    @Results({
            @Result(column = "platform_type", property = "platformType"),
            @Result(column = "config_json_string", property = "configJsonString")
    })
    WaterConfig getWaterConfig(int platformType);
}
