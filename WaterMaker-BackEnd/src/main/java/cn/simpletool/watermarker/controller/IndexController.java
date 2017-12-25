package cn.simpletool.watermarker.controller;

import cn.simpletool.watermarker.common.BrowserUtils;
import cn.simpletool.watermarker.utils.ImageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * @author ZhanJingbo
 * @version 1.0.0
 * Created on 2017/8/5
 */
@Controller
public class IndexController {

    /**
     * 后端处理的Index View名
     */
    private static final String BACK_INDEX_PAGE = "index";

    /**
     * 前端处理的Index View名
     */
    private static final String FRONT_INDEX_PAGE = "index_new";

    @RequestMapping("/")
    public String index(HttpServletRequest request) {
        String userAgent = request.getHeader("User-Agent");
        String indexViewName = FRONT_INDEX_PAGE;
        if (BrowserUtils.isIe(userAgent)) {
            indexViewName = BACK_INDEX_PAGE;
        }
        return indexViewName;
    }

    @RequestMapping("/index.html")
    public String indexUseHtml5() {
        return "index_new";
    }
}
