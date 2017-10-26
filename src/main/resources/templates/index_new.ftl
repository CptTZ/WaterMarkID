<#include "common/head.ftl"/>
<body>
<div class="header am-container">
    <div class="am-g">
        <h1>水水的证件</h1>
        <p>本网站不会对用户身份证照片进行存储，请放心使用</p>
    </div>
</div>
<div class="am-container">
    <div class="am-u-lg-12 am-u-md-8 am-u-sm-centered">
        <form class="am-form am-form-horizontal">
            <fieldset>
                <div class="am-form-group">
                    <label for="markText" class="am-u-lg-2 am-u-sm-3 am-form-label">水印文字:</label>
                    <div class="am-u-lg-10 am-u-sm-9">
                        <input name="markText" class="am-form-field am-radius" id="markText"
                               value="此证件仅供办理xx业务使用，他用无效"/>
                    </div>
                </div>
                <div class="am-form-group am-form-file am-u-sm-12">
                    <button type="button" class="am-btn am-btn-default am-btn-block am-round">
                        <i class="am-icon-cloud-upload"></i> 上传证件图片
                    </button>
                    <input id="doc-form-file" type="file" name="srcImage" multiple="multiple"
                           accept="image/png,image/jpg,image/jpeg,image/bmp"/>
                </div>
                <div class="am-form-group am-form-file am-u-sm-12">
                    <a type="button" id="download" class="am-btn am-btn-primary am-round am-btn-block"><i class="am-icon-save"></i>  保存图片</a>
                </div>
            </fieldset>
        </form>
    </div>
    <div class="am-u-lg-12 am-u-md-8 am-u-sm-centered example">
        <img id="result" src="/assets/image/example.jpg"/>
        <div class="text">水印效果实时预览</div>
    </div>
</div>
<div class="am-container">
    <p class="footer">浙ICP备17043803号 © 2017 Simple Tool. 联系我们:<a href="mailto:simpletool@126.com">simpletool@126.com</a></p>
</div>
<!--[if lt IE 9]>
<script src="http://libs.baidu.com/jquery/1.11.1/jquery.min.js"></script>
<script src="http://cdn.staticfile.org/modernizr/2.8.3/modernizr.js"></script>
<script src="assets/js/amazeui.ie8polyfill.min.js"></script>
<![endif]-->

<!--[if (gte IE 9)|!(IE)]><!-->
<script src="assets/js/jquery.js"></script>
<!--<![endif]-->
<script src="assets/js/amazeui.min.js"></script>
<script src="assets/js/waterMark.js"></script>
<script src="assets/js/app.js"></script>
<canvas id="myCanvas"></canvas>
</body>
<#include "common/footer.ftl"/>