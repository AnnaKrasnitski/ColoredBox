(function() {
  let template = document.createElement("template");
  template.innerHTML = `
		<style>
    html,body {
      height:100%;
      min-height:100%;
    }
    
    body {
      background-image:linear-gradient(transparent,transparent 350px,rgba(white,.9) 350px,rgba(black,.8)), url(https://res.cloudinary.com/inventorylab/image/upload/v1571081885/stars_dzyjfk.jpg);
      background-position:0 0;
      background-size:2000px auto;
      animation:backgroundCrawl 50s linear infinite;
    }
    
    .earth {
      width:125px;
      height:125px;
      margin:250px auto 0 auto;
      border-radius:100%;
      background: url(https://lh5.googleusercontent.com/-kkxEx-SkRaY/VBLF4BV2lZI/AAAAAAAAKao/FnKsv7402_c/s0/earthmap.jpg) 0 0 repeat;
      background-size:cover;
      position:relative;
      animation:earthBounce .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) alternate infinite, slowSpin 6s linear infinite, earthRotate 12s linear infinite;
      z-index:1;
    }
    
    .earth-shadow {
      width:125px;
      height:125px;
      margin:250px auto 0 auto;
      border-radius:100%;
      box-shadow:0 0 60px 0 rgba(#0085ff,.6);
      background-image:linear-gradient( transparent,rgba(black,.9)), radial-gradient(circle at top, transparent 0, rgba(white,.09) 90px, transparent 90px, transparent);
      position:absolute;
      animation:earthBounce .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) alternate infinite;
      left:50%;
      margin-left:-62.5px;
      z-index:1;
    }
    
    .ground-shadow {
      margin:-10px auto 0;
      width:100px;
      height:20px;
      background:rgba(0,0,0,.1);
      border-radius:100%;
      animation: shadow .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) infinite alternate;
      position:relative;
      z-index:0;
    }
    
    @keyframes earthBounce {
      0% {
        top:0;
      }
      100% {
        top:-200px;
      }
    }
    
    @keyframes shadow {
    0% {
      transform: scale(.5);
      background-color:rgba(0,0,0,.2);
      }
    100% {
      transform: scale(1.1);
      background-color:rgba(0,0,0,.05);
      }
    }
    
    @keyframes slowSpin {
      0% {
        transform:rotate(0);
      }
      100% {
        transform:rotate(360deg);
      }
    }
    
    @keyframes backgroundCrawl {
      0% {
        background-position:0 0;
      }
      100%{
        background-position:-2000px 0;
      }
    }
    
    @keyframes earthRotate {
      0% {
        background-position:0 0;
      }
      100%{
        background-position:-500px 0;
      }
    }
    </style> 
    <div class="earth"></div>
    <div class="earth-shadow"></div>
    <div class="ground-shadow"></div>
   
  
<script>
</script>

 

  
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
