import { LitElement, html, css } from 'lit-element';
import { inputText, buttonGroup, button, typography } from './styles/app.style';

export class AppTodoSide extends LitElement {
  static get styles() {
    return css`
      ${typography}
      ${inputText}
      ${button}
      ${buttonGroup}

      .wrapper {
        border: 1px solid rgba(0, 0, 0, 0.125);
        border-radius: 0.25rem;
        height: calc(100vh - 3rem);
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        padding: 0.5rem;
        overflow-y: auto;
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
    `;
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="header">
          <div class="header-title">Fuck it I love you</div>
          <div class="header-date">${(new Date()).toLocaleDateString()}</div>
        </div>
        <div class="form-group">
          <label for="">Name</label>
          <input type="text" class="input-name" value="Fuck it I love you">
        </div>
        <div class="form-group">
          <label for="">Note</label>
          <textarea></textarea>
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
        <div class="form-group">
          <label for="">Action</label>
          <button class="btn btn-info">Move</button>
        </div>
        <div class="form-group">
          <button class="btn btn-info">Add to important</button>
        </div>
        <div class="form-group">
          <button class="btn btn-info">Export</button>
        </div>
        <div class="form-group">
          <button class="btn btn-danger">Delete</button>
        </div>
      </div>
    `;
  }
}

customElements.define('app-todo-side', AppTodoSide);