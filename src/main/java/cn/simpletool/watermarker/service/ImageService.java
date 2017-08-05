package cn.simpletool.watermarker.service;

import java.io.InputStream;
import java.io.OutputStream;

/**
 * 图片处理服务标准接口
 * @author ZhanJingbo
 * @version 1.0.0
 * Created on 2017/8/5
 */
public interface ImageService {
    boolean imageMarker(InputStream srcImage, String markText,OutputStream outputStream);
}
