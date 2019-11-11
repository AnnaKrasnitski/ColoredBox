(function() {
  let template = document.createElement("template");
  template.innerHTML = `
		<style>
	
    @import url("https://fonts.googleapis.com/css?family=Josefin+Sans:100,400");
$background-color: #0f2027;
$accent-color: #b3ffab;
.gauge {
	&-chart {
		width: 20rem;
	}
	&-text {
		text-anchor: middle;
		fill: $accent-color;
		font-weight: 400;
		font-size: 75%;
	}
}

html {
	font-size: 1.5rem;
}
body {
	background: $background-color;
	color: $accent-color;
	font-family: "Josefin Sans", sans-serif;
	font-weight: 100;
	display: flex;
	align-items: center;
}
p {
	text-align: center;
}

    </style> 
     
    <div class="gauge-chart">
    <svg viewBox="0 0 80 40" class="gauge">
      <circle class="donut-ring" cx="40" cy="40" r="31.8309886184" fill="transparent" stroke="#d2d3d4" stroke-width="15"></circle>
      <circle class="donut-segment" cx="40" cy="40" r="31.8309886184" fill="transparent" stroke="#b3ffab" stroke-width="15" stroke-dasharray="65 135" stroke-dashoffset="-100">
        <animate attributeType='XML' attributeName='stroke-dasharray' values='0 200; 20 180 ; 50 150; 65 135; 65 135;' keyTimes='0; 0.4; 0.6; 0.7; 1' dur='2.5s' repeatCount='1'>
      </circle>
      <text x="40" y="39.5" class="gauge-text">65%</text>
    </svg>
    <p>super gauge chart 2</p>
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
        this.style["background-color"] = changedProperties["value"];
      }

      if ("opacity" in changedProperties) {
        this.style["opacity"] = changedProperties["opacity"];
      }
    }
  }

  customElements.define("com-sample-box", Box);
})();
