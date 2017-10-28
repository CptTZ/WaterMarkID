$(function () {
  var waterMark = new WaterMark();
  var file = null;

  window.isSupportDownload = 'download' in document.createElement('a');

  $('#doc-form-file').on('change', function (e) {
    file = e.target.files[0];
    var reader = new FileReader();
    if (file && file.type.match('image.*')) {
      reader.readAsDataURL(file);
    } else {
      return false;
    }
    reader.onload = function (e) {
      var data = e.target.result,
        image = new Image();

      image.src = data;
      image.onload = function () {
        var config = {
          text: $("#markText").val(),
          id: "myCanvas",
          color: '#f9f9f9',
          xStart: 0,
          yStart: -(image.width * 0.71),
          rotate: 45,
          opacity: 0.4,
          width: image.width,
          height: image.height,
          imgUrl: data
        };
        var height = Math.min(image.width, image.height);
        $.extend(config, getSomeConfig(height));

        waterMark.mark(config);
        sysImgSrc();
      };
    }
  });

  $("#markText").on("change", function (e) {
    if (isImgNotUpload()) return false;
    var text = e.target.value;
    waterMark.reRendering({
      text: text
    });
    sysImgSrc();
  });

  $('#download').on('click', function () {
    if (isImgNotUpload()) return false;
    downloadCanvas(this, 'myCanvas', 'SimpleTool.png');
  });

  function downloadCanvas(link, canvasId, filename) {
    var imgData = document.getElementById(canvasId).toDataURL({format: 'png',
      multiplier: 4});
    var strDataURI = imgData.substr(22, imgData.length);
    var blob = dataURLtoBlob(imgData);
    var objurl = URL.createObjectURL(blob);
    link.download = filename;
    link.href = objurl;
  }

  function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
      type: mime
    });
  }

  function sysImgSrc() {
    setTimeout(function () {
      $("#result").attr("src", document.getElementById("myCanvas").toDataURL("image/png"));
    }, 0);
  }

  function isImgNotUpload() {
    return !file;
  }

  function getSomeConfig(imgHeight) {
    var fontSize = Math.floor(0.05 * imgHeight);
    return {
      xSpace: 2.5 * fontSize,
      ySpace: fontSize,
      size: fontSize
    };
  }

});