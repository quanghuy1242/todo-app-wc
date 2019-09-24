import { LitElement, html, css } from 'lit-element';
import { inputText, buttonGroup, button, typography } from './styles/app.style';

export class AppTodoSide extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      date: { type: Object },
      note: { type: String },
      index: { type: Number }
    };
  }

  static get styles() {
    return css`
      ${typography}
      ${inputText}
      ${button}
      ${buttonGroup}

      .wrapper {
        border-left: 1px solid rgba(0, 0, 0, 0.125);
        /* border-radius: 0.25rem; */
        height: 100vh;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        padding: 0.5rem;
        overflow-y: auto;
        background-color: #fff;
      }

      .wrapper::-webkit-scrollbar {
        width: 5px;
        height: 5px;
      }

      .wrapper::-webkit-scrollbar-thumb {
        background-color: rgba(108, 117, 125, 0.5);
      }

      .wrapper > *:not(:last-child) {
        margin-bottom: 0.5rem;
      }

      .input-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      textarea {
        height: 150px;
      }

      .wrapper label {
        font-size: 0.875rem;
        color: #6c757d;
        font-weight: 500;
      }

      .form-group {
        display: flex;
        flex-direction: column
      }

      .btn-group-icon button {
        padding: 0.4rem;
        line-height: 0;
      }

      .header .header-title {
        font-size: 1.5rem;
        font-weight: 300;
        line-height: 1.2;
      }

      .header .header-date {
        font-size: 0.875rem;
        color: #6c757d;
      }

      .form-group-icon .btn {
        display: flex;
      }

      .form-group-icon .material-icons {
        margin-right: 1rem;
      }
    `;
  }

  constructor() {
    super();

    this.name = '';
    this.date = null;
    this.note = '';
    this.index = 0;
  }

  handleNameChange(event) {
    this.dispatchEvent(new CustomEvent('onDataChanged', {
      detail: {
        index: this.index,
        name: event.target.value
      }
    }));
  }

  handleNoteChange(event) {
    this.dispatchEvent(new CustomEvent('onDataChanged', {
      detail: {
        index: this.index,
        note: event.target.value
      }
    }));
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="header">
          <div class="header-title">${this.name}</div>
          ${this.date
          	? html`
							<div class="header-date">${this.date.toLocaleDateString()}</div>
          	`
          	: html``}
        </div>
        <div class="form-group">
          <label for="">Name</label>
          <input type="text" class="input-name" value=${this.name} @input=${this.handleNameChange}>
        </div>
        <div class="form-group">
          <label for="">Note</label>
          <textarea @input=${this.handleNoteChange}>${this.note}</textarea>
        </div>
        <div class="form-group">
          <label for="">Toggle</label>
          <div class="btn-group btn-group-icon">
            <button class="btn btn-secondary active">
              <i class="material-icons">check_box</i>
            </button>
            <button class="btn btn-secondary">
              <i class="material-icons">check_box_outline_blank</i>
            </button>
            <button class="btn btn-secondary">
              <i class="material-icons">close</i>
            </button>
          </div>
        </div>
        <div class="form-group form-group-icon">
          <label for="">Action</label>
          <button class="btn btn-info">
            <i class="material-icons">
              reply
            </i>
            Move
          </button>
        </div>
        <div class="form-group form-group-icon">
          <button class="btn btn-info">
            <i class="material-icons">
              star_border
            </i>
            Add to important
          </button>
        </div>
        <div class="form-group form-group-icon">
          <button class="btn btn-info">
            <i class="material-icons">
              save_alt
            </i>
            Export
          </button>
        </div>
        <div class="form-group form-group-icon">
          <button class="btn btn-danger">
            <i class="material-icons">
              delete
            </i>
            Delete
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('app-todo-side', AppTodoSide);