import { LitElement, html, css } from 'lit-element';
import { button, buttonGroup, typography } from './styles/app.style';

export const ALL = 'All';
export const FINISH = 'Finished';
export const UNFINISH = 'Unfinished';

export class AppFilter extends LitElement {
  static get properties() {
    return {
      group: { type: Object },
      selected: { type: String }
    };
  }

  static get styles() {
    return css`
      ${button}
      ${buttonGroup}
      ${typography}

      .material-icons {
        margin-top: 0.3rem;
      }
    `;
  }

  constructor() {
    super();
    this.group = [
      { name: ALL, icon: 'format_list_bulleted', default: true },
      { name: FINISH, icon: 'check_box', default: false },
      { name: UNFINISH, icon: 'check_box_outline_blank', default: false },
    ];
    this.selected = ALL;
  }

  handleToggleFilter(name) {
    this.dispatchEvent(new CustomEvent('onToggleFilter', { detail: name }));
  }

  render() {
    return html`
      <div class="btn-group">
        ${this.group.map(item => html`
          <button
            class="btn btn-secondary ${this.selected === item.name ? 'active' : ''}"
            @click=${() => this.handleToggleFilter(item.name)}
            title=${item.name}
          >
            <i class="material-icons">
              ${item.icon}
            </i>
          </button>
        `)}
      </div>
    `;
  }
}

customElements.define('app-filter', AppFilter);