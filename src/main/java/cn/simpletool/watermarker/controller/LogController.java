package cn.simpletool.watermarker.controller;

import cn.simpletool.watermarker.common.LogMessageVo;
import cn.simpletool.watermarker.common.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 用于前端页面加水印的访问统计，便于我们统计工具使用情况
 *
 * @author ZhanJingbo
 * @version 1.0.0
 * Created on 2017/10/26
 */
@RestController
@Slf4j
@RequestMapping("/api/log/")
public class LogController {

    @RequestMapping("/")
    public Response<Boolean> log(LogMessageVo logMessage) {
        log.info(logMessage.toString());
        return Response.result(Boolean.TRUE);
    }
}
