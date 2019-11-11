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
