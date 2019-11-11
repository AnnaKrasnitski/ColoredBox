(function() {
  let template = document.createElement("template");
  template.innerHTML = `
		<style>
    .large-header {
      position: relative;
      width: 100%;
      background: #111;
      overflow: hidden;
      background-size: cover;
      background-position: center center;
      z-index: 1;
   }
   
   .demo .large-header {
      background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/demo-bg.jpg");
   }
   
   .main-title {
      position: absolute;
      margin: 0;
      padding: 0;
      color: #F9F1E9;
      text-align: center;
      top: 50%;
      left: 50%;
      -webkit-transform: translate3d(-50%, -50%, 0);
      transform: translate3d(-50%, -50%, 0);
   }
   
   .demo .main-title {
      text-transform: uppercase;
      font-size: 4.2em;
      letter-spacing: 0.1em;
   }
   
   .main-title .thin {
      font-weight: 200;
   }
   
   @media only screen and (max-width: 768px) {
      .demo .main-title {
         font-size: 3em;
      }
   }
    </style> 
     
    <div class="container demo">
   <div class="content">
      <div id="large-header" class="large-header">
         <canvas id="demo-canvas"></canvas>
         <h1 class="main-title"><span class="thin">Explore</span> Space</h1>
      </div>
   </div>
</div>
	`;

  var w = window.innerWidth,
    h = window.innerHeight,
    canvas = document.getElementById("test"),
    ctx = canvas.getContext("2d"),
    rate = 60,
    arc = 100,
    time,
    count,
    size = 7,
    speed = 20,
    parts = new Array(),
    colors = ["red", "#f57900", "yellow", "#ce5c00", "#5c3566"];
  var mouse = { x: 0, y: 0 };

  canvas.setAttribute("width", w);
  canvas.setAttribute("height", h);

  function create() {
    time = 0;
    count = 0;

    for (var i = 0; i < arc; i++) {
      parts[i] = {
        x: Math.ceil(Math.random() * w),
        y: Math.ceil(Math.random() * h),
        toX: Math.random() * 5 - 1,
        toY: Math.random() * 2 - 1,
        c: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * size
      };
    }
  }

  function particles() {
    ctx.clearRect(0, 0, w, h);
    canvas.addEventListener("mousemove", MouseMove, false);
    for (var i = 0; i < arc; i++) {
      var li = parts[i];
      var distanceFactor = DistanceBetween(mouse, parts[i]);
      var distanceFactor = Math.max(Math.min(15 - distanceFactor / 10, 10), 1);
      ctx.beginPath();
      ctx.arc(li.x, li.y, li.size * distanceFactor, 0, Math.PI * 2, false);
      ctx.fillStyle = li.c;
      ctx.strokeStyle = li.c;
      if (i % 2 == 0) ctx.stroke();
      else ctx.fill();

      li.x = li.x + li.toX * (time * 0.05);
      li.y = li.y + li.toY * (time * 0.05);

      if (li.x > w) {
        li.x = 0;
      }
      if (li.y > h) {
        li.y = 0;
      }
      if (li.x < 0) {
        li.x = w;
      }
      if (li.y < 0) {
        li.y = h;
      }
    }
    if (time < speed) {
      time++;
    }
    setTimeout(particles, 1000 / rate);
  }
  function MouseMove(e) {
    mouse.x = e.layerX;
    mouse.y = e.layerY;

    //context.fillRect(e.layerX, e.layerY, 5, 5);
    //Draw( e.layerX, e.layerY );
  }
  function DistanceBetween(p1, p2) {
    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
  create();
  particles();

  class Box extends HTMLElement {
    constructor() {
      super();
      let shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(template.content.cloneNode(true));
      this.addEventListener("click", event => {
        var event = new Event("onClick");
        this.dispatchEvent(event);
      });
      this._props = {};
    }

    onCustomWidgetBeforeUpdate(changedProperties) {
      this._props = { ...this._props, ...changedProperties };
    }

    onCustomWidgetAfterUpdate(changedProperties) {
      if ("color" in changedProperties) {
        this.style["background-color"] = changedProperties["color"];
      }

      if ("opacity" in changedProperties) {
        this.style["opacity"] = changedProperties["opacity"];
      }
    }
  }

  customElements.define("com-sample-box", Box);
})();
