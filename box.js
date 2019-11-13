(function() {
  let template = document.createElement("template");
  template.innerHTML = `
		<style>
    @import url("https://fonts.googleapis.com/css?family=Lora:400,400i,700");

    body {
      display: flex;
      flex-direction: column;
      height: 100vh;
      justify-content: center;
      align-items: center;
      background-image: linear-gradient(
          rgba(16, 16, 16, 0.8),
          rgba(16, 16, 16, 0.8)
        ),
        url(https://i.loli.net/2019/11/03/RtVq2wxQYySDb8L.jpg);
      background-size: cover;
    }
    
    p {
      margin: 0em 5em 4em 5em;
    }
    
    .glowIn {
      text-align: left;
      line-height: 1.8;
      color: white;
      font-family: Lora, serif;
    
      span {
        animation: glowIn 0.8s ease both;
      }
    }
    
    @keyframes glowIn {
      from {
        opacity: 0;
      }
      65% {
        opacity: 1;
        text-shadow: 0 0 25px white;
      }
      75% {
        opacity: 1;
      }
      to {
        opacity: 0.7;
      }
    }
    
    </style> 
     
    <h1 class="glowIn">Hello World</h1>
<p class="glowIn">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis pellentesque id nibh tortor. Suspendisse ultrices gravida dictum fusce ut placerat orci nulla. A lacus vestibulum sed arcu.</p>

<script src="https://code.jquery.com/jquery-2.2.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/snap.svg/0.4.1/snap.svg-min.js"></script>
<script>
  
let glowInTexts = document.querySelectorAll(".glowIn");
glowInTexts.forEach(glowInText => {
  let letters = glowInText.textContent.split("");
  glowInText.textContent = "";
  letters.forEach((letter, i) => {
    let span = document.createElement("span");
    span.textContent = letter;
    span.style.animationDelay = '${i * 0.05}s';
    glowInText.append(span);
  });
});

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
