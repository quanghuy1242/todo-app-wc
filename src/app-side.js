import { LitElement, html, css } from 'lit-element';
import { listGroup, overlay, button } from './styles/app.style';

export class AppSide extends LitElement {
  static get properties() {
    return {
      lists: { type: Array },
      selected: { type: Number },
      isShowInput: { type: Boolean }
    };
  }

  static get styles() {
    return css`
      ${listGroup}
      ${overlay}
      ${button}

      .list-group-container {
        width: 230px;
        z-index: 5;
      }

      .show-input {
        padding: 0;
        z-index: 5;
      }

      .input-new-list {
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        padding: 0.75rem 1rem;
        outline: 0;
        border: none;
        z-index: 5;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
      }

      .input-new-list:focus {
        color: #495057;
        background-color: #fff;
        border-color: #80bdff;
        outline: 0;
      }

      .input-new-list::placeholder {
        color: #6c757d;
        opacity: 1;
      }

      .input-wrapper {
        position: relative;
      }

      .close {
        position: absolute;
        right: 0.5rem;
        top: 0;
        bottom: 0;
        background-color: transparent;
      }

      .btn-add {
        color: #fff;
        background-color: #17a2b8;
        border-color: #17a2b8;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      }

      .btn-add:hover {
        color: #fff;
        background-color: #138496;
        border-color: #117a8b;
      }
    `;
  }

  constructor() {
    super();
    this.lists = [
      { name: 'General' },
      { name: 'Âm nhạc' },
      { name: 'Thường ngày' },
      { name: 'Ngày chủ nhật bận rộn' }
    ];
    this.selected = 0;
    this.isShowInput = false;
  }

  handleListChange(index) {
    this.dispatchEvent(new CustomEvent('onSelectList', { detail: { index: index } }))
  }

  handleShowInput() {
    this.isShowInput = true;
  }

  handleCloseInput() {
    this.isShowInput = false;
  }

  render() {
    return html`
      <div class="list-group list-group-container">
        ${this.lists.map((list, index) => html`
          <button
            class="list-group-item list-group-item-action ${this.selected === index ? 'active' : ''}"
            @click=${() => this.handleListChange(index)}
          >
            ${list.name}
          </button>
        `)}
        ${this.isShowInput
          ? html`
            <div class="input-wrapper list-group-item show-input">
              <input type="text" class="input-new-list" placeholder="Enter to Add" maxlength="20">
              <button type="button" class="close" @click=${this.handleCloseInput}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          `
          : html`
          <button
            class="list-group-item list-group-item-action btn-add"
            @click=${this.handleShowInput}
          >
            Add new todo list
          </button>
          `}
      </div>
    `;
  }
}

customElements.define('app-side', AppSide);