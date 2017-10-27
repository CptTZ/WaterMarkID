$(function () {
    $('#doc-form-file').on('change', function (e) {
        var file = e.target.files[0];
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

                WaterMark.mark({
                    text: $("#markText").val(),
                    id: "myCanvas",
                    color: '#fff',
                    xStart: -(image.height),
                    yStart: -(image.width),
                    xSpace: 20,
                    ySpace: 30,
                    size: 18,
                    rotate: 45,
                    opacity: 0.6,
                    width: image.width,
                    height: image.height,
                    imgUrl: data
                });
                sysImgSrc();
            };
        }
    });

    $("#markText").on("change", function (e) {
        var text = e.target.value;
        WaterMark.mark({
            text: text
        });
        sysImgSrc();
    });

    $('#download').on('click', function () {
        downloadCanvas(this, 'myCanvas', 'SimpleTool.png');
    });

    function downloadCanvas(link, canvasId, filename) {
        link.href = document.getElementById(canvasId).toDataURL();
        link.download = filename;
    }

    function sysImgSrc(){
        setTimeout(function () {
            $("#result").attr("src", document.getElementById("myCanvas").toDataURL("image/png"));
        }, 0);
    }

});