package cn.simpletool.watermarker.controller;

import cn.simpletool.watermarker.common.Response;
import cn.simpletool.watermarker.model.LogMessage;
import cn.simpletool.watermarker.service.LogService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * 用于前端页面加水印的访问统计，便于我们统计工具使用情况
 *
 * @author ZhanJingbo
 * @version 1.0.0
 * Created on 2017/10/26
 */
@RestController
@Slf4j
@RequestMapping("/api/")
public class LogController {

    @Autowired
    private LogService logService;

    @RequestMapping("/log")
    public Response<Boolean> log(@RequestBody LogMessage logMessage, HttpServletRequest request) {
        logMessage.setClientIp(request.getRemoteAddr());
        log.info(logMessage.toString());
        logService.addLog(logMessage);
        return Response.result(logMessage);
    }
}
