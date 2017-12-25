package cn.simpletool.watermarker.common;

import eu.bitwalker.useragentutils.Browser;
import eu.bitwalker.useragentutils.UserAgent;

/**
 *
 * 通过User-Agent信息来判断浏览器类型的工具类
 * @author ZhanJingbo
 * @version 1.0.0
 * Created on 2017/10/26
 */
public class BrowserUtils {

    /**
     * 获取浏览器类型
     * @param userAgent User-Agent类型
     * @return 浏览器枚举
     */
    public static Browser getBrowser(String userAgent){
        return UserAgent.parseUserAgentString(userAgent).getBrowser();
    }

    /**
     * 是否是IE浏览器
     * @param userAgent User-Agent信息
     * @return 是否是IE浏览器
     */
    public static boolean isIe(String userAgent){
        Browser browser = getBrowser(userAgent);
        if(browser.getGroup().equals(Browser.IE)){
            return true;
        }
        return false;
    }
}
