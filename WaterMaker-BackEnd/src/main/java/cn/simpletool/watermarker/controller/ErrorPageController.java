package cn.simpletool.watermarker.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author ZhanJingbo
 * @version 1.0.0
 * Created on 2017/11/7
 */
@RequestMapping("/error")
@Controller
public class ErrorPageController {

    @RequestMapping("/404")
    public String pageNotFound() {
        return "404";
    }
}
