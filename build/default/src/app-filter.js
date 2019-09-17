import { LitElement, html, css } from "../node_modules/lit-element/lit-element.js";
import { button, buttonGroup } from "./styles/app.style.js";
export const ALL = 'All';
export const FINISH = 'Finished';
export const UNFINISH = 'Unfinished';
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

      button {
        min-width: 100px;
      }
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

  handleToggleFilter(name) {
    this.dispatchEvent(new CustomEvent('onToggleFilter', {
      detail: name
    }));
  }

  render() {
    return html`
      <div class="btn-group">
        ${this.group.map(item => html`
          <button
            class="btn btn-secondary ${this.selected === item.name ? 'active' : ''}"
            @click=${() => this.handleToggleFilter(item.name)}
          >
            ${item.name}
          </button>
        `)}
      </div>
    `;
  }

}
customElements.define('app-filter', AppFilter);