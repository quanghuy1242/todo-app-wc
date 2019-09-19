import { LitElement, html, css } from 'lit-element';
import { listGroup, overlay, button, badge } from './styles/app.style';

export class AppSide extends LitElement {
  static get properties() {
    return {
      lists: { type: Array },
      selected: { type: Number },
      currentValue: { type: String },
      currentIcon: { type: String }
    };
  }

  static get styles() {
    return css`
      ${listGroup}
      ${overlay}
      ${button}
      ${badge}

      .outer-wrapper {
        width: 250px;
        height: calc(100vh - 4rem);
        display: flex;
        flex-direction: column;
      }

      .list-group-container {
        z-index: 5;
        flex-grow: 1;
        box-sizing: border-box;
      }

      .list-group-container-container {
        height: calc(100vh - 4rem);
        padding: 4px;
        border: 1px solid rgba(0, 0, 0, 0.125);
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
        overflow: auto;
      }

      .list-group-container-container::-webkit-scrollbar {
        width: 5px;
        height: 5px;
      }

      .list-group-container-container::-webkit-scrollbar-thumb {
        background-color: rgba(108, 117, 125, 0.5);
      }
      
      .list-group-item:last-child {
        margin-bottom: 0;
      }

      button.list-group-item {
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        display: flex;
      }

      .list-group-item-icon {
        margin-right: 0.5rem;
      }

      .list-group-item-label {
        width: calc(240px - 30px);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .show-input {
        padding: 0;
        z-index: 5;
      }

      .input-new-list {
        width: 100%;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        padding: 0.75rem 1rem;
        outline: 0;
        border: none;
        z-index: 5;
        border: 1px solid rgba(0, 0, 0, 0.125);
        border-top: 0;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        border-bottom-right-radius: 0.25rem;
        border-bottom-left-radius: 0;
      }

      .input-new-list:focus {
        color: #495057;
        background-color: #fff;
        border-color: #80bdff;
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
      }

      .input-new-list::placeholder {
        color: #6c757d;
        opacity: 1;
      }

      .input-wrapper {
        width: 100%;
        border-bottom-right-radius: 0.25rem;
        border-bottom-left-radius: 0.25rem;
        display: flex;
      }

      .input-icon {
        width: 35px;
        padding: 0.25rem;
        border-bottom-right-radius: 0;
        border-right: 0;
        text-align: center;
      }

      .input-icon:focus {
        z-index: 6;
      }
    `;
  }

  constructor() {
    super();
    this.lists = [];
    this.selected = 0;
    this.currentValue = '';
    this.currentIcon = '';
  }

  handleListChange(index) {
    this.dispatchEvent(
      new CustomEvent('onSelectList', {
        detail: {
          index: index
        } 
      })
    );
  }

  handleAddList(event) {
    this.currentValue = event.target.value;
  }

  handleAddListKeyUp(event) {
    if (this.currentValue.length > 0) {
      if (event.key === 'Enter') {
        this.dispatchEvent(new CustomEvent('onAddList', {
          detail: {
            list: {
              icon: this.currentIcon || '📝',
              name: this.currentValue,
              todos: []
            }
          }
        }));
        this.currentValue = '';
        this.currentIcon = '';
      }
    }
  }

  handleListIconChange(event) {
    this.currentIcon = event.target.value;
  }

  render() {
    return html`
      <div class="outer-wrapper">
        <div class="list-group-container-container">
          <div class="list-group list-group-container">
            ${this.lists.map((list, index) => html`
              <button
                class="list-group-item list-group-item-action ${this.selected === index ? 'active' : ''}"
                @click=${() => this.handleListChange(index)}
                id="list-${index}"
                title=${list.name}
              >
                <span class="list-group-item-icon">${list.icon || '📝'}</span>
                <span class="list-group-item-label">${list.name}</span>
                <span class="badge ${this.selected === index ? 'badge-light' : 'badge-primary'}">
                  ${list.todoLength}
                </span>
              </button>
            `)}
            <div id="scroll-to-me"></div>
          </div>
        </div>
        <div class="input-wrapper list-group-item show-input">
          <input
            class="input-new-list input-icon"
            .value=${this.currentIcon}
            @input=${this.handleListIconChange}
            maxlength="2"
            placeholder='📝'
          >
          <input
            type="text"
            class="input-new-list"
            placeholder="Enter to Add"
            .value=${this.currentValue}
            @input=${this.handleAddList}
            @keyup=${this.handleAddListKeyUp}
          >
        </div>
      </div>
    `;
  }
}

customElements.define('app-side', AppSide);