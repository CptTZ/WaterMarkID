package cn.simpletool.watermarker.utils;

import cn.simpletool.watermarker.config.ImageUtilConfigurationProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.imageio.IIOException;
import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;

/**
 * 图片处理工具类
 *
 * @author ZhanJingbo
 * @version 1.0.0
 * Created on 2017/8/5
 */
@Component
public class ImageUtils {

    @Autowired
    private ImageUtilConfigurationProperties imageUtilConfigurationProperties;

    private static final String OUTPUT_FORMAT = "JPG";

    public boolean waterMark(String markText, InputStream sourceImage, OutputStream targetImage) {
        return waterMark(markText, sourceImage, targetImage, imageUtilConfigurationProperties.getFontName(), imageUtilConfigurationProperties.getFontSize(), imageUtilConfigurationProperties.getAlpha());
    }

    public boolean waterMark(String markText, InputStream sourceImage, OutputStream targetImage, String fontName, int fontSize, float alpha) {
        BufferedImage bufferedImage = pressText(markText, sourceImage, fontName, fontSize, alpha);
        try {
            return ImageIO.write(bufferedImage, OUTPUT_FORMAT, targetImage);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return false;
    }

    private BufferedImage pressText(String pressText, InputStream src, String fontName, int fontSize, float alpha) {
        try {
            Image srcImage = ImageIO.read(src);
            BufferedImage targetImage = new BufferedImage(srcImage.getWidth(null), srcImage.getHeight(null), BufferedImage.TYPE_INT_RGB);
            int height = srcImage.getHeight(null);
            int width = srcImage.getWidth(null);
            // 2、得到画笔对象
            Graphics2D g = targetImage.createGraphics();
            // 3、设置对线段的锯齿状边缘处理
            g.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
            g.drawImage(srcImage.getScaledInstance(srcImage.getWidth(null), srcImage.getHeight(null), Image.SCALE_SMOOTH), 0, 0, null);

            g.rotate(Math.toRadians(45), (double) targetImage.getWidth() / 2, (double) targetImage.getHeight() / 2);
            // 5、设置水印文字颜色
            //g.setColor(fontColor);
            // 6、设置水印文字Font
            g.setFont(new Font(fontName, Font.PLAIN, fontSize));
            // 7、设置水印文字透明度
            g.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_ATOP, alpha));
            // 8、第一参数->设置的内容，后面两个参数->文字在图片上的坐标位置(x,y)
            int yStep = (int) (fontSize * 1.8);
            int xStep = fontSize * pressText.length() + 10;
            for (int x = -xStep; x < width * 2; x += xStep) {
                for (int y = -height; y < height * 2; y += yStep) {
                    g.drawString(pressText, x, y);
                }
            }
            // 9、释放资源
            g.dispose();
            return targetImage;
        } catch (IIOException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
