import { LitElement, html, css } from "../node_modules/lit-element/lit-element.js";
import { button, buttonGroup } from "./styles/app.style.js";
export const ALL = 'ALL';
export const FINISH = 'FINISH';
export const UNFINISH = 'UNFINISH';
export class AppFilter extends LitElement {
  static get properties() {
    return {
      group: {
        type: Object
      },
      selected: {
        type: String
      }
    };
  }

  static get styles() {
    return css`
      ${button}
      ${buttonGroup}
    `;
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
      <div class="btn-group btn-group-toggle" data-toggle="buttons">
        ${this.group.map(item => html`
          <label class="btn btn-secondary ${this.selected === item.name ? 'active' : ''}">
            <input
              type="radio"
              name="filter"
              .value=${item.name}
              id=${item.name}
              ?checked=${item.default}
              autocomplete="off"
              @input=${this.handleToggleFilter}
            >
            ${item.name}
          </label>
        `)}
      </div>
    `;
  }

}
customElements.define('app-filter', AppFilter);