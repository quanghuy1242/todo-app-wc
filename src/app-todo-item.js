import { LitElement, html, css } from 'lit-element';
import { button, customCheckbox, dropdownMenu, overlay, typography } from './styles/app.style';
import { setMenuPosition } from './utils/DropDownUtil';

export class AppTodoItem extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      isDone: { type: Boolean },
      index: { type: Number },
      isShowMenu: { type: Boolean },
      currentValueOnContextMenu: { type: Number },
      data: { type: Object }
    }
  }

  static get styles() {
    return css`
      ${button}
      ${customCheckbox}
      ${dropdownMenu}
      ${overlay}
      ${typography}

      .text {
        user-select: none;
      }

      .button {
        text-decoration: none !important;
        margin-left: 0.25rem;
      }
      
      li.done {
        opacity: 0.7;
      }

      li.done label.text {
        text-decoration: line-through;
      }

      li {
        position: relative;
        display: flex;
        background-color: #fff;
        width: calc(100% - 24px - 5px);
      }

      li + li {
        border-top-width: 0;
      }

      .btn-done {
        margin-right: 0.5rem;
        width: 82px !important;
      }

      .custom-control-label {
        margin-left: 0.2rem;
        flex-grow: 1;
        line-height: 1.5;
        min-height: 38px;
        display: flex;
        align-items: center;
      }
    `;
  }
  
  constructor() {
    super();
    this.name = '';
    this.isDone = false;
    this.index = 0;
    this.isShowMenu = false;
    this.data = {};
  }

  handleToggle() {
    this.dispatchEvent(new CustomEvent('onToggle', { detail: this.index }));
  }

  handleDelete() {
    this.dispatchEvent(new CustomEvent('onDelete', { detail: this.index }));
  }

  updated() {
    this.shadowRoot.querySelector('input[type="checkbox"]').checked = this.isDone;

    // Hiện menu nếu isShowMenu là true
    if (this.isShowMenu) {
      const menu = this.shadowRoot.querySelector('.context-menu');
      setMenuPosition(menu, this.data);
    }
  }

  handleTodoItemContextMenu(event, index) {
    event.preventDefault();
    this.isShowMenu = true;
    this.currentValueOnContextMenu = index;
    this.data = {
      event: {
        x: event.pageX,
        y: event.pageY,
      }
    };
  }

  render() {
    return html`
      <li class="${this.isDone ? 'done' : ''} custom-control custom-checkbox">
        <input
          type="checkbox"
          class="custom-control-input"
          id=${this.index}
          ?checked=${false}
          @input=${this.handleToggle}
        >
        <label
          class="custom-control-label text"
          for=${this.index}
          @contextmenu=${(event) => this.handleTodoItemContextMenu(event)}
        >
        ${this.name}
        </label>
        <button type="button" class="close" aria-label="Close" @click=${this.handleDelete}>
          <span aria-hidden="true">&times;</span>
        </button>
      </li>
      ${this.isShowMenu
        ? html`
          <div class="context-menu dropdown-menu">
            <button class="dropdown-item">Edit</button>
            <button class="dropdown-item">Delete</button>
            <button class="dropdown-item">Mark as complete</button>
            <button class="dropdown-item">Mark as drop</button>
            <button class="dropdown-item">More options</button>
          </div>
          <div class="overlay" @click=${() => this.isShowMenu = false}></div>
        `
        : html``}
    `;
  }
}

customElements.define('app-todo-item', AppTodoItem);