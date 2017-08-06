package cn.simpletool.watermarker.service.impl;

import cn.simpletool.watermarker.service.ImageService;
import cn.simpletool.watermarker.utils.ImageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import javax.imageio.stream.ImageOutputStream;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

/**
 * Image服务类的实现
 *
 * @author ZhanJingbo
 * @version 1.0.0
 * Created on 2017/8/6
 */
@Service
public class ImageServiceImpl implements ImageService {

    @Autowired
    private ImageUtils imageUtils;

    @Override
    public boolean imageMarker(InputStream srcImage, String markText, OutputStream outputStream) {
        return imageUtils.waterMark(markText,srcImage,outputStream);
    }
}
