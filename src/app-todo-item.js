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
        opacity: 0.6;
        color: rgb(0, 123, 255);
        transition: all 0.15s ease-in-out;
      }

      li.done label.text {
        text-decoration: line-through;
      }

      li {
        position: relative;
        display: flex;
        background-color: #fff;
        width: calc(100% - 24px - 5px);
        transition: all 0.15s ease-in-out;
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

      .material-icons {
        zoom: 0.8;
        margin-bottom: 3px;
      }

      .mt-favorite:hover {
        color: #ffc107;
      }

      .mt-close:hover {
        color: #dc3545;
      }

      .mt-more:hover {
        color: #17a2b8;
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
    if (this.isShowMenu) { // Nếu menu đang bật thì tắt nó đi
      this.isShowMenu = false;
    }
  }

  handleDelete() {
    this.dispatchEvent(new CustomEvent('onDelete', { detail: this.index }));
    if (this.isShowMenu) { // Nếu menu đang bật thì tắt nó đi
      this.isShowMenu = false;
    }
  }

  updated() {
    this.shadowRoot.querySelector('input[type="checkbox"]').checked = this.isDone;

    // Hiện menu nếu isShowMenu là true
    if (this.isShowMenu) {
      const menu = this.shadowRoot.querySelector('.context-menu');
      setMenuPosition(menu, this.data);
    }
  }

  handleTodoItemContextMenu(event) {
    event.preventDefault();
    this.isShowMenu = true;
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
        <button class="btn btn-no-bg btn-icon btn-icon-sm mt-close" @click=${this.handleDelete}>
          <i class="material-icons">
            close
          </i>
        </button>
        <button class="btn btn-no-bg btn-icon btn-icon-sm mt-favorite">
          <i class="material-icons">
            star_border
          </i>
        </button>
        <button class="btn btn-no-bg btn-icon btn-icon-sm mt-more">
          <i class="material-icons">
            fiber_manual_record
          </i>
        </button>
      </li>
      ${this.isShowMenu
        ? html`
          <div class="context-menu dropdown-menu">
            <button class="dropdown-item">
              <i class="material-icons">
                edit
              </i>
              Edit
            </button>
            <button class="dropdown-item" @click=${this.handleDelete}>
              <i class="material-icons">
                delete
              </i>
              Delete
            </button>
            <button class="dropdown-item" @click=${this.handleToggle}>
              ${this.isDone
                ? html`
                  <i class="material-icons">
                    check_box_outline_blank
                  </i>
                  Mark as undone
                `
                : html`
                  <i class="material-icons">
                    check_box
                  </i>
                  Mark as complete
                `}
            </button>
            ${!this.isDone
              ? html`
                <button class="dropdown-item">
                  <i class="material-icons">
                    close
                  </i>
                  Mark as drop
                </button>
              `
              : html``}
            <button class="dropdown-item">
              <i class="material-icons">
                keyboard_arrow_up
              </i>
              Move up
            </button>
            <button class="dropdown-item">
              <i class="material-icons">
                keyboard_arrow_down
              </i>
              Move down
            </button>
            <button class="dropdown-item">
              <i class="material-icons">
                more_horiz
              </i>
              More options
            </button>
          </div>
          <div class="overlay" @click=${() => this.isShowMenu = false}></div>
        `
        : html``}
    `;
  }
}

customElements.define('app-todo-item', AppTodoItem);