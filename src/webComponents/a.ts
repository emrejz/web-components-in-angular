import { convertAttr, isStyleAttr } from 'src/utils/wcUtils';
import { ExtendedWC } from 'src/utils/extendendWC';

const classNames = {
  aEl: 'aEl',
};

class CustomA extends ExtendedWC {
  static get observedAttributes() {
    return ['s-font-size'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        .${classNames.aEl} {
          display: block;
          color: #ebebeb;
          font-family: inherit;
          font-size: 1.1rem;
          text-shadow: 1px 1px 0 #2f3339;
          text-align: right;
          cursor: pointer;
          text-decoration: none;
        }
        .${classNames.aEl}:hover {
          text-decoration: underline;
        }
      </style>
      <a class=${classNames.aEl}><slot></a>`;
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
  }

  setStyle(attr) {
    if (isStyleAttr(attr) && this.getAttribute(attr)) {
      this.getEl(classNames.aEl).style[convertAttr(attr)] =
        this.getAttribute(attr);
    }
  }

  render() {
    CustomA.observedAttributes.forEach((attr) => {
      this.setStyle(attr);
    });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    if (this.getAttribute(name) === newValue) return;
    if (isStyleAttr(name)) {
      this.getEl(classNames.aEl).style[convertAttr(name)] = newValue;
    }
  }
}

customElements.define('wc-a', CustomA);
