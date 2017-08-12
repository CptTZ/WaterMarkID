package cn.simpletool.watermarker.controller;

import cn.simpletool.watermarker.config.FileUploadConfigurationProperties;
import cn.simpletool.watermarker.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

/**
 * @author ZhanJingbo
 * @version 1.0.0
 * Created on 2017/8/6
 */
@Controller
@RequestMapping("/api/image")
public class ImageController {

    @Resource
    private ImageService imageService;

    @Autowired
    private FileUploadConfigurationProperties fileUploadConfigurationProperties;

    @RequestMapping(value = "/watermark", method = RequestMethod.POST)
    public void imageWaterMarker(@RequestParam("srcImage") MultipartFile srcImage, String markText, HttpServletResponse response) {
        try {
            String srcImageName = srcImage.getOriginalFilename();
            String fileType = srcImageName.substring(srcImageName.lastIndexOf(".") + 1).toLowerCase() + "";
            if (!fileUploadConfigurationProperties.getAllowImageType().contains(fileType)) {
                response.sendError(500);
                throw new RuntimeException("格式错误");
            }
            response.setContentType("image/jpeg");
            String fileName = "SimpleTool" + System.currentTimeMillis() + ".jpg";
            response.setHeader("Content-Disposition", "attachment;fileName=" + fileName);
            imageService.imageMarker(srcImage.getInputStream(), markText, response.getOutputStream());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
