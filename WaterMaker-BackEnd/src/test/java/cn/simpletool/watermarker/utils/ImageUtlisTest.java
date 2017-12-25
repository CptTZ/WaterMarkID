package cn.simpletool.watermarker.utils;


import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

/**
 * @author ZhanJingbo
 * @version 1.0.0
 * Created on 2017/8/5
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class ImageUtlisTest {

    @Test
    public void testMarkImageByText() throws IOException {
    }

    @Test
    public void test() {
        //获取系统中可用的字体的名字
        GraphicsEnvironment e = GraphicsEnvironment.getLocalGraphicsEnvironment();
        String[] fontName = e.getAvailableFontFamilyNames();
        for (int i = 0; i < fontName.length; i++) {
            System.out.println(fontName[i]);
        }
    }
}
