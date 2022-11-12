import { ExtendedWC } from 'src/utils/extendendWC';

const classNames = {
  parent: 'parent',
  searchInput: 'searchInput',
  searchButton: 'searchButton',
  searchList: 'searchList',
  searchIcon: 'searchIcon',
  clearButton: 'clearButton',
  detailButton: 'detailButton',
  focus: 'focus',
  hasVal: 'hasValue',
  searchItem: 'searchItem',
};
const delegationEvents = ['click', 'focusin', 'focusout', 'input', 'mousedown'];

class WCSearchInput extends ExtendedWC {
  state: {
    focus: boolean;
    value: string;
    options: Array<string>;
  };

  static get observedAttributes() {
    return ['options'];
  }

  constructor() {
    super();

    this.state = {
      focus: false,
      value: '',
      options: [],
    };

    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        .${classNames.parent} {
          width: 430px;
        }
        .${classNames.parent} .${classNames.searchInput} {
          width: 243px;
          height: 34px;
          padding-left: 7px;
          background: var(--black-dark);
          font-size: 1.1rem;
          border: 0;
          border-radius: 3px;
          outline: 0;
          box-sizing: content-box;
        }
        .${classNames.parent} .${classNames.searchInput}::placeholder {
          font-weight: normal;
          color: var(--gray);
        }
        .${classNames.parent} .${classNames.searchInput}:focus::placeholder {
          font-weight: normal;
          color: var(--dark);
        }
        .${classNames.hasVal} .${classNames.searchInput},
        .${classNames.parent} .${classNames.searchInput}:focus {
          background-color: white;
          color: #333;
          font-weight: 700;
        }
        .${classNames.searchButton} {
          border: none;
          color: white;
          width: 38px;
          height: 36px;
          cursor: pointer;
          text-align: center;
          border-radius: 3px;
          background-color: var(--black-dark);
          margin-left: -1px;
        }
        .${classNames.hasVal} .${classNames.searchButton},
        .${classNames.focus} .${classNames.searchButton} {
          background-color: var(--blue);
          color: white;
        }
        .${classNames.focus} .${classNames.searchList} {
          display: block;
        }
        .${classNames.focus} .${classNames.searchInput} {
          background-color: white;
          color: #333;
          font-weight: 700;
        }
        .${classNames.searchList} {
          position: absolute;
          background-color: white;
          z-index: 99999;
          top: 37px;
          width: 384px;
          border: 0;
          background-color: white;
          border-radius: 2px;
          padding: 0;
          list-style: none;
          display: none;
        }
        .${classNames.focus} + .${classNames.searchList} {
          display: block;
        }
        .${classNames.hasVal} + .${classNames.searchList} {
          box-shadow: 1px 1px 4px 1px #666;
        }
        .${classNames.searchList} a {
          font-size: 1.1rem;
          border: 0;
          font-weight: 700;
          float: none;
          display: block;
          color: #999;
          text-shadow: none;
          line-height: 16px;
          padding: 6px 24px 6px 20px;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          cursor: pointer;
        }
        .${classNames.searchIcon} {
          background-color: var(--gray);
          -webkit-mask: url("../../assets//svg/searchIcon.svg") no-repeat center;
          mask: url("../../assets//svg/searchIcon.svg") no-repeat center;
          width: 38px;
          height: 100%;
        }
        .${classNames.hasVal} .${classNames.searchIcon},
        .${classNames.focus} .${classNames.searchIcon} {
          background-color: white;
        }
        a span {
          color: var(--blue-dark);
        }
        .${classNames.clearButton} {
          color: var(--blue);
          cursor: pointer;
          display: none;
          margin-left: 20px;
          font-size: 2rem;
        }
        .${classNames.detailButton} {
          margin-left: 20px;
        }
      </style>
      <wc-block
        class="${classNames.parent}"
        s-width="431px"
        s-justify-content="flex-start"
      >
        <wc-block>
          <input
            class="${classNames.searchInput}"
            placeholder="Kelime, ilan no veya mağaza adı ile ara"
            type="text"
          />
          <wc-button s-padding="0" class="${classNames.searchButton}">
            <div class="${classNames.searchIcon}"></div>
          </wc-button>
        </wc-block>
        <div class="${classNames.clearButton}">X</div>
        <wc-a class="${classNames.detailButton}" s-font-size="1.2rem">Detaylı Arama</wc-a>
        <ul class="${classNames.searchList}"></ul>
      </wc-block>
    `;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot?.appendChild(template.content.cloneNode(true));

    delegationEvents.forEach((event) =>
      this.getEl(classNames.parent).addEventListener(event, this.handleEvents)
    );
  }
  handleEvents = (e: any) => {
    const { type, target } = e;
    switch (type) {
      case 'mousedown':
        if (target.className === classNames.searchItem) {
          this.handleSearchItemClick(target.dataset.val);
        }
        break;
      case 'click':
        if (target.className === classNames.clearButton) {
          this.handleClearClick();
        }
        break;
      case 'focusin':
        if (target.className === classNames.searchInput) {
          this.setState({ focus: true });
        }
        break;
      case 'focusout':
        if (target.className === classNames.searchInput) {
          this.setState({ focus: false });
        }
        break;
      case 'input':
        if (target.className === classNames.searchInput) {
          this.inputChange(e);
        }
        break;
    }
  };

  handleSearchItemClick = (value) => {
    this.setState({ value });
    (<HTMLInputElement>this.getEl(classNames.searchInput)).value = value;
  };

  handleInputBlurAndFocus = () => {
    const { value, focus } = this.state;
    this.getEl(classNames.parent).classList.toggle('focus', focus);
    this.getEl(classNames.parent).classList.toggle('hasValue', !!value?.length);
  };

  handleClearClick = () => {
    this.setState({ value: '' });
    this.getEl(classNames.clearButton).style.display = 'none';
    this.getEl(classNames.detailButton).style.display = 'block';
    (<HTMLInputElement>this.getEl(classNames.searchInput)).value = '';
    this.getEl(classNames.searchList)!.innerHTML = '';
  };

  inputChange(e: any) {
    this.setState({ value: e.target.value });
    this.dispatchEvent(
      new CustomEvent('search-input', {
        detail: {
          value: e.target.value,
        },
        composed: true,
        bubbles: true,
      })
    );
  }

  setState(values) {
    this.state = { ...this.state, ...values };
    this.handleInputBlurAndFocus();
    this.displayDetailAndClearButtons();
    this.updateList();
  }

  displayDetailAndClearButtons = () => {
    const { value } = this.state;
    this.getEl(classNames.clearButton).style.display = value ? 'block' : 'none';
    this.getEl(classNames.detailButton).style.display = value
      ? 'none'
      : 'block';
  };

  updateList() {
    let list = '';
    const { options, value } = this.state;

    options.forEach((option) => {
      let text = '';
      const splitedOption = option.split(value);
      if (splitedOption.length > 1 && value.length > 1) {
        splitedOption
          .filter((item) => item)
          .forEach((chars) => {
            text += `<span>${value}</span>${chars}`;
          });
        list += `<li val="${option}"><a class=${classNames.searchItem} data-val="${option}">${text}</a></li>`;
        text = '';
      }
    });
    this.getEl(classNames.searchList).innerHTML = list;
  }

  disconnectedCallback() {
    delegationEvents.forEach((event) =>
      this.getEl(classNames.parent).removeEventListener(
        event,
        this.handleEvents
      )
    );
  }

  attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    try {
      if (name === 'options') {
        this.setState({ options: JSON.parse(newValue) });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

customElements.define('wc-search-input', WCSearchInput);
