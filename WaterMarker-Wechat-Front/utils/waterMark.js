var Config = {
    text: "watermark",
    rotate: 15,
    xSpace: 20,
    ySpace: 20,
    size: 20,
    xStart: -50,
    yStart: 20,
    opacity: .2,
    color: "#000",
    width: 500,
    height: 500,
    imgUrl: "",
    id: "",
    parent: null
  },
  Parent = null,
  Context = null;

function mark(userConfig) {
  userConfig = userConfig || {};
  Config = extend(Config, userConfig);

  return (getCanvas(), drawImg());
}

function extend(origin, target) {
  for (var key in target) {
    target.hasOwnProperty(key) && (origin[key] = target[key]);
  }
  return origin;
}

function getCanvas() {
  Context = wx.createCanvasContext(Config.id);
}

function drawImg() {
  return new Promise(function (resolve, reject) {
    Context.setGlobalAlpha(1);
    Context.scale(1, 1);
    Context.drawImage(Config.imgUrl, 0, 0, Config.width, Config.height);
    Context.setFillStyle(Config.color);
    Context.setFontSize(Config.size);
    Context.rotate(Math.PI / 180 * Config.rotate);
    Context.setGlobalAlpha(Config.opacity);
    if(Config.scale < 1){
      Context.scale(Config.scale, Config.scale);
    }
    insertMarks();
    Context.draw();
    resolve();
  });
}

function insertMarks() {
  var xSpace = Config.xSpace,
    ySpace = Config.ySpace,
    len = Config.text.length,
    textHeight = Config.size + ySpace,
    textWidth = Config.size * len + xSpace,
    squareWidth = 0.72 * (Config.width + Config.height);
    if(Config.scale < 1){
      squareWidth /= Config.scale;
    }
  for (var y = Config.yStart; y < squareWidth + textHeight; y += textHeight) {
    for (var x = Config.xStart; x < squareWidth + textWidth; x += textWidth) {
      Context.fillText(Config.text, x, y);
    }
  }
}

function removeMarks() {
  Context.clearRect(0, 0, Config.width, Config.height);
}

function reRendering(userConfig) {
  removeMarks();
  userConfig = userConfig || {};
  Config = extend(Config, userConfig);
  return drawImg();
}


module.exports = function(){
  return {
    mark: mark,
    reRendering: reRendering
  };
}
  