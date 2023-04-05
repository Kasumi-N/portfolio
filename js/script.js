particlesJS("particles-js02", {
	"particles":{
		"number":{
			"value":346,//この数値を変更すると星の数が増減できる
			"density":{
				"enable":true,
				"value_area":800
			}
		},
		"color":{
			"value":"#ffffff"
		},
		"shape":{
			"type":"circle",//形状はcircleを指定
			"stroke":{
				"width":0
			},
			},
		"opacity":{
			"value":1,//シェイプの透明度
			"random":true,//シェイプの透明度をランダムにする
			"anim":{
				"enable":true,//シェイプの透明度をアニメーションさせる
				"speed":3,//シェイプの透明度をアニメーションさせる
				"opacity_min":0,//透明度の最小値０
				"sync":false//全てを同時にアニメーションさせない
			}
		},
		"size":{
			"value":2,
			"random":true,
			"anim":{
				"enable":false,
				"speed":4,
				"size_min":0.3,
				"sync":false
			}
		},
		"line_linked":{
			"enable":false,
		},
		"move":{
			"enable":true,
			"speed":120,//この数値を小さくするとゆっくりな動きになる
		"direction":"none",//方向指定なし
		"random":true,//動きはランダムに
		"straight":true,//動きをとどめる
			"out_mode":"out",
			"bounce":false,
			"attract":{
				"enable":false,
				"rotateX":600,
				"rotateY":600
			}
		}
	},
	"interactivity":{
		"detect_on":"canvas",
		"events":{
			"onhover":{
				"enable":false,
			},
			"onclick":{
				"enable":false,
			},
			"resize":true
		}
	},
	"retina_detect":true
});

if($("#particles-js01").length > 0) {
	particlesJS("particles-js01", {
		"particles":{
			"number":{
				"value":346,//この数値を変更すると星の数が増減できる
				"density":{
					"enable":true,
					"value_area":800
				}
			},
			"color":{
				"value":"#ffffff"
			},
			"shape":{
				"type":"circle",//形状はcircleを指定
				"stroke":{
					"width":0
				},
				},
			"opacity":{
				"value":1,//シェイプの透明度
				"random":true,//シェイプの透明度をランダムにする
				"anim":{
					"enable":true,//シェイプの透明度をアニメーションさせる
					"speed":3,//シェイプの透明度をアニメーションさせる
					"opacity_min":0,//透明度の最小値０
					"sync":false//全てを同時にアニメーションさせない
				}
			},
			"size":{
				"value":2,
				"random":true,
				"anim":{
					"enable":false,
					"speed":4,
					"size_min":0.3,
					"sync":false
				}
			},
			"line_linked":{
				"enable":false,
			},
			"move":{
				"enable":true,
				"speed":120,//この数値を小さくするとゆっくりな動きになる
			"direction":"none",//方向指定なし
			"random":true,//動きはランダムに
			"straight":true,//動きをとどめる
				"out_mode":"out",
				"bounce":false,
				"attract":{
					"enable":false,
					"rotateX":600,
					"rotateY":600
				}
			}
		},
		"interactivity":{
			"detect_on":"canvas",
			"events":{
				"onhover":{
					"enable":false,
				},
				"onclick":{
					"enable":false,
				},
				"resize":true
			}
		},
		"retina_detect":true
	});

}

ShootingStar = function(id) {
    this.n = 0;
    this.m = 0;
    this.defaultOptions = {
      velocity: 8,
      starSize: 10,
      life: 300,
      beamSize: 400,
      dir: -1
    };
    this.options = {};
    id = (typeof id != "undefined") ? id : "";
    this.capa = ($(id).lenght > 0) ? "body" : id;
    this.wW = $(this.capa).innerWidth();
    this.hW = $(this.capa).innerHeight();
  };

  ShootingStar.prototype.addBeamPart = function(x, y) {
    this.n++;
    var name = this.getRandom(100, 1);
    $("#star" + name).remove();
    $(this.capa).append("<div id='star" + name + "'></div>");
    $("#star" + name).append("<div id='haz" + this.n + "' class='haz' style='position:absolute; color:#FF0; width:10px; height:10px; font-weight:bold; font-size:" + this.options.starSize + "px'>·</div>");
    if (this.n > 1) $("#haz" + (this.n - 1)).css({
      color: "rgba(255,255,255,0.5)"
    });
    $("#haz" + this.n).css({
      top: y + this.n,
      left: x + (this.n * this.options.dir)
    });
  }

  ShootingStar.prototype.delTrozoHaz = function() {
    this.m++;
    $("#haz" + this.m).animate({
      opacity: 0
    }, 75);
    if (this.m >= this.options.beamSize) {
      $("#ShootingStarParams").fadeOut("slow");
    }
  }

  ShootingStar.prototype.getRandom = function(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  ShootingStar.prototype.toType = function(obj) {
    if (typeof obj === "undefined") {
      return "undefined"; /* consider: typeof null === object */
    }
    if (obj === null) {
      return "null";
    }
    var type = Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/)[1] || '';
    switch (type) {
      case 'Number':
        if (isNaN(obj)) {
          return "nan";
        } else {
          return "number";
        }
      case 'String':
      case 'Boolean':
      case 'Array':
      case 'Date':
      case 'RegExp':
      case 'Function':
        return type.toLowerCase();
    }
    if (typeof obj === "object") {
      return "object";
    }
    return undefined;
  }

  ShootingStar.prototype.launchStar = function(options) {
    if (this.toType(options) != "object") {
      options = {};
    }
    this.options = $.extend({}, this.defaultOptions, options);
    this.n = 0;
    this.m = 0;
    var i = 0,
      l = this.options.beamSize,
      x = this.getRandom(this.wW - this.options.beamSize - 100, 100),
      y = this.getRandom(this.hW - this.options.beamSize - 100, 100),
      self = this;
    for (; i < l; i++) {
      setTimeout(function() {
        self.addBeamPart(x, y);
      }, self.options.life + (i * self.options.velocity));
    }
    for (i = 0; i < l; i++) {
      setTimeout(function() {
        self.delTrozoHaz()
      }, self.options.beamSize + (i * self.options.velocity));
    }
    $("#ShootingStarParams").html("Launching shooting star. PARAMS: wW: " + this.wW + " - hW: " + this.hW + " - life: " + this.options.life + " - beamSize: " + this.options.beamSize + " - velocity: " + this.options.velocity);
    $("#ShootingStarParams").fadeIn("slow");
  }

  ShootingStar.prototype.launch = function(everyTime) {
    if (this.toType(everyTime) != "number") {
      everyTime = 10;
    }
    everyTime = everyTime * 1000;
    this.launchStar();
    var self = this;
    setInterval(function() {
      var options = {
        dir: (self.getRandom(1, 0)) ? 1 : -1,
        life: self.getRandom(400, 100),
        beamSize: self.getRandom(700, 400),
        velocity: self.getRandom(10, 4)
      }
      self.launchStar(options);
    }, everyTime);
  }



  