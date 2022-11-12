import { convertAttr, isStyleAttr } from 'src/utils/wcUtils';
import { ExtendedWC } from 'src/utils/extendendWC';

const classNames = {
  block: 'block',
};

class WCBlock extends ExtendedWC {
  static get observedAttributes() {
    return [
      's-align-items',
      's-justify-content',
      's-flex-wrap',
      's-flex-direction',
      's-background-color',
      's-width',
      's-height',
      's-border-radius',
      's-font-size',
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const template = document.createElement('template');
    template.innerHTML = `
      <style> 
        .${classNames.block} {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      </style>
      <div class="${classNames.block}">
        <slot />
      </div>`;
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
  }

  setStyle(attr) {
    if (isStyleAttr(attr) && this.getAttribute(attr)) {
      this.getEl(classNames.block).style[convertAttr(attr)] =
        this.getAttribute(attr);
    }
  }

  render() {
    WCBlock.observedAttributes.forEach((attr) => {
      this.setStyle(attr);
    });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    if (this.getAttribute(name) === newValue) return;
    if (isStyleAttr(name)) {
      this.getEl(classNames.block).style[convertAttr(name)] = newValue;
    }
  }
}

customElements.define('wc-block', WCBlock);
