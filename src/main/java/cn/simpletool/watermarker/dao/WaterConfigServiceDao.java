package cn.simpletool.watermarker.dao;

import cn.simpletool.watermarker.model.WaterConfig;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

/**
 * @author ZhanJingbo
 * @version 1.0.0
 * Created on 2017/12/17
 */
@Mapper
public interface WaterConfigServiceDao {
    /**
     * 根据平台id，从数据库读取默认配置
     *
     * @param platformType 平台id
     * @return 默认配置
     */
    @Select("")
    WaterConfig getWaterConfig(int platformType);
}
