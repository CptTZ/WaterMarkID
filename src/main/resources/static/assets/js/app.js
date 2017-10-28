$(function () {
  var waterMark = new WaterMark();
  var file = null;

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
          xStart: -(image.height),
          yStart: -(image.width),
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
    if(isImgNotUpload())return false;
    var text = e.target.value;
    waterMark.reRendering({
      text: text
    });
    sysImgSrc();
  });

  $('#download').on('click', function () {
    if(isImgNotUpload())return false;    
    downloadCanvas(this, 'myCanvas', 'SimpleTool.png');
  });

  function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL('image/png');
    link.download = filename;
  }

  // function downloadCanvas(link, canvasId, filename){
  //   var data = document.getElementById(canvasId).toDataURL('image/png').replace("image/png", "image/octet-stream");
  //   link.href = data;
  // }

  function sysImgSrc() {
    setTimeout(function () {
      $("#result").attr("src", document.getElementById("myCanvas").toDataURL("image/png"));
    }, 0);
  }

  function isImgNotUpload(){
    return !file;
  }

  function getSomeConfig(imgHeight){
    var fontSize = Math.floor(0.05 * imgHeight);
    return {
      xSpace: 2.5 * fontSize,
      ySpace: fontSize,
      size: fontSize
    };
  }

});