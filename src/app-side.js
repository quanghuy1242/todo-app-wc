import { LitElement, html, css } from 'lit-element';
import { listGroup, overlay, button } from './styles/app.style';

export class AppSide extends LitElement {
  static get properties() {
    return {
      lists: { type: Array },
      selected: { type: Number },
      currentValue: { type: String }
    };
  }

  static get styles() {
    return css`
      ${listGroup}
      ${overlay}
      ${button}

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
        width: 4px;
        height: 4px;
      }

      .list-group-container-container::-webkit-scrollbar-thumb {
        background-color: rgba(108, 117, 125, 0.5);
      }
      
      .list-group-item:last-child {
        margin-bottom: 0;
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
        border-bottom-left-radius: 0.25rem;
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

      .spacer {
        flex-grow: 1;
      }
    `;
  }

  constructor() {
    super();
    this.lists = [];
    this.selected = 0;
    this.currentValue = '';
  }

  handleListChange(index) {
    this.dispatchEvent(
      new CustomEvent('onSelectList', {
        detail: {
          index: index,
          todos: this.lists[index].todos
        } 
      })
    );
  }

  handleAddList(event) {
    this.currentValue = event.target.value;
  }

  handleAddListKeyUp(event) {
    if (event.key === 'Enter') {
      this.dispatchEvent(new CustomEvent('onAddList', {
        detail: {
          list: { name: this.currentValue, todos: [] }
        }
      }));
      this.currentValue = '';
    }
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
              >
                ${list.name}
              </button>
            `)}
          </div>
        </div>
        <div class="input-wrapper list-group-item show-input">
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