package cn.simpletool.watermarker.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.imageio.IIOException;
import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.font.GlyphVector;
import java.awt.geom.AffineTransform;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

/**
 * 图片处理工具类
 *
 * @author ZhanJingbo
 * @version 1.0.0
 * Created on 2017/8/5
 */
@Component
public class ImageUtils {

    @Value("${imageUtil.fontName}")
    private  String fontName;
    @Value("${imageUtil.fontSize}")
    private  int fontSize;
    @Value("${imageUtil.alpha}")
    private  float alpha;
    @Value("${imageUtil.carelessness}")
    private boolean carelessness;
    public  BufferedImage pressText(String pressText, InputStream srcImg) {
        try {
            Image src = ImageIO.read(srcImg);
            //图片宽度
            int width = src.getWidth(null);
            //图片高度
            int height = src.getHeight(null);

            BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);

            Graphics2D g2d = image.createGraphics();
            //绘原图
            g2d.drawImage(src, 0, 0, width, height, null);
            //比例
            g2d.scale(1, 1);

            g2d.addRenderingHints(new RenderingHints(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON));
            g2d.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_ON);

            //颜色
            Color color = Color.white;
            //字体
            Font font = new Font(fontName, Font.PLAIN, fontSize);

            GlyphVector fontGV = font.createGlyphVector(g2d.getFontRenderContext(), pressText);
            Rectangle size = fontGV.getPixelBounds(g2d.getFontRenderContext(), 0, 0);
            Shape textShape = fontGV.getOutline();
            double textWidth = size.getWidth();
            double textHeight = size.getHeight();
            AffineTransform rotate45 = AffineTransform.getRotateInstance(Math.PI / 4d);
            Shape rotatedText = rotate45.createTransformedShape(textShape);
            // use a gradient that repeats 4 times
            g2d.setPaint(new GradientPaint(0, 0, color,
                    image.getWidth() / 2, image.getHeight() / 2, color));

            //透明度
            g2d.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_ATOP,
                    alpha));

            // step in y direction is calc'ed using pythagoras + 5 pixel padding
            double yStep = Math.sqrt(textWidth * textWidth / 2) + 5;
            // step over image rendering watermark text
            for (double x = -textHeight * 3; x < image.getWidth(); x += (textHeight * 3)) {
                double y = -yStep;
                for (; y < image.getHeight(); y += yStep) {
                    g2d.draw(rotatedText);
                    if (carelessness)//字体实心
                    {
                        g2d.fill(rotatedText);
                    }
                    g2d.translate(0, yStep);
                }
                g2d.translate(textHeight * 3, -(y + yStep));
            }

            g2d.dispose();
            return image;
        } catch (IIOException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
