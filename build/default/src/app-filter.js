import { LitElement, html } from "../node_modules/lit-element/lit-element.js";
export const ALL = 'ALL';
export const FINISH = 'FINISH';
export const UNFINISH = 'UNFINISH';
export class AppFilter extends LitElement {
  static get properties() {
    return {
      group: {
        type: Object
      }
    };
  }

  constructor() {
    super();
    this.group = [{
      name: ALL,
      default: true
    }, {
      name: FINISH,
      default: false
    }, {
      name: UNFINISH,
      default: false
    }];
    this.selected = ALL;
  }

  firstUpdated(changedProperties) {
    this.radioButtonNodes = this.shadowRoot.querySelectorAll('input[name="filter"]');
  }

  handleToggleFilter() {
    this.radioButtonNodes.forEach(node => {
      if (node.checked) {
        this.dispatchEvent(new CustomEvent('onToggleFilter', {
          detail: node.value
        }));
      }
    });
  }

  render() {
    return html`
      ${this.group.map(item => html`
        <input
          type="radio"
          name="filter"
          .value=${item.name}
          id=${item.name}
          ?checked=${item.default}
          @input=${this.handleToggleFilter}
        >
        <label for=${item.name}>${item.name}</label>
      `)}
    `;
  }

}
customElements.define('app-filter', AppFilter);