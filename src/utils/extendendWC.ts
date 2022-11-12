export class ExtendedWC extends HTMLElement {
  constructor() {
    super();
  }

  getEl(name: string) {
    return this.shadowRoot!.querySelector(`.${name}`) as HTMLElement;
  }
}
