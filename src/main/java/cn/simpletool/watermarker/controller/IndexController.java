package cn.simpletool.watermarker.controller;

import cn.simpletool.watermarker.utils.ImageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author ZhanJingbo
 * @version 1.0.0
 * Created on 2017/8/5
 */
@Controller
public class IndexController {

    @Autowired
    private ImageUtils imageUtils;

    @RequestMapping("/")
    public String index(){
        return "index";
    }
}
