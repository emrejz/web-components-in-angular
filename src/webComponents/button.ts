import { isStyleAttr, convertAttr } from 'src/utils/wcUtils';
import { ExtendedWC } from 'src/utils/extendendWC';

const classNames = {
  buttonEl: 'buttonEl',
};
export class WCButton extends ExtendedWC {
  static get observedAttributes() {
    return ['s-background-color', 's-padding'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const template = document.createElement('template');
    template.innerHTML = `
      <style> 
        .${classNames.buttonEl} {
          background-color: inherit;
          padding: 10px 19px;
          font-size: 1.2rem;
          height: 35px;
          border: 0;
          color: white;
          cursor: pointer;
          font-weight: bold;
          border-radius: 2px;
          text-shadow: 1px 1px 0 #29619b;
          line-height: 1.4em;
        }
      </style>
      <button class=${classNames.buttonEl}>
        <slot></slot>
      </button>
    `;
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
  }

  setStyleAttr(attr) {
    if (isStyleAttr(attr) && this.getAttribute(attr)) {
      this.getEl(classNames.buttonEl).style[convertAttr(attr)] =
        this.getAttribute(attr);
    }
  }

  render() {
    WCButton.observedAttributes.forEach((attr) => {
      this.setStyleAttr(attr);
    });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    if (this.getAttribute(name) === newValue) return;
    if (isStyleAttr(name)) {
      this.getEl(classNames.buttonEl).style[convertAttr(name)] = newValue;
    }
  }
}

customElements.define('wc-button', WCButton);
