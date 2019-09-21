import { LitElement, html, css } from 'lit-element';
import { listGroup, overlay, button, badge, dropdownMenu, typography } from './styles/app.style';
import emojiRegex from 'emoji-regex';
import { setMenuPosition } from './utils/DropDownUtil';

export class AppSide extends LitElement {
  static get properties() {
    return {
      lists: { type: Array },
      selected: { type: Number },
      currentValue: { type: String },
      currentIcon: { type: String },
      error: { type: Object },
      isShowMenu: { type: Boolean },
      currentValueOnContextMenu: { type: Number },
      editingListItem: { type: Object },
      data: { type: Object }
    };
  }

  static get styles() {
    return css`
      ${typography}
      ${listGroup}
      ${overlay}
      ${button}
      ${badge}
      ${dropdownMenu}

      .outer-wrapper {
        width: 250px;
        height: calc(100vh - 3rem);
        display: flex;
        flex-direction: column;
      }

      .list-group-container {
        z-index: 5;
        flex-grow: 1;
        box-sizing: border-box;
      }

      .list-group-container-container {
        height: calc(100vh - 3rem);
        padding: 0.5rem;
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
        width: 40px;
        text-align: center;
      }

      .list-group-item-label {
        width: calc(240px - 30px);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .list-group-container .input-new-list {
        border-top: 1px solid rgba(0, 0, 0, 0.125);
        border-radius: 0;
        padding-top: 0.7rem;
        padding-bottom: 0.7rem;
      }

      .list-group-container .input-wrapper {
        z-index: 7;
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
        border-bottom-left-radius: 0.25rem;
        border-right: 0;
        text-align: center;
      }

      .input-icon:focus {
        z-index: 6;
      }

      .input-icon:focus::placeholder {
        opacity: 0.5;
      }

      .input-invalid, .input-invalid:focus {
        border: 1px solid #dc3545;
        box-shadow: 0 0 0 0.2rem rgba(220,53,69,.25);
        z-index: 6;
      }

      /* Context Menu */

      .overlay {
        z-index: 6;
      }

      /* End */

      .material-icons {
        zoom: 0.8;
        margin-bottom: 3px;
      }
    `;
  }

  constructor() {
    super();
    this.lists = [];
    this.selected = 0;
    this.currentValue = '';
    this.currentIcon = '';
    this.error = {};
    this.isShowMenu = false;
    this.editingListItem = {};
    this.data = {};
  }

  updated() {
    // Hiện menu nếu isShowMenu là true
    if (this.isShowMenu) {
      const menu = this.shadowRoot.querySelector('.context-menu');
      setMenuPosition(menu, this.data);
    }

    // Focus input nếu edit đang bật
    if (this.editingListItem.isEditing && this.data.count === 1) {
      this.shadowRoot.querySelector('.list-group-container .input-new-list.input-name').focus();
      this.data = {}; // Xoá trạng thái cũ
    }

    // Nếu vừa thêm
    if (this.data.event === 'justAdd') {
      const newListButton = this.shadowRoot.querySelector(`#list-${this.lists.length - 1}`);
      newListButton.scrollIntoView(); // Scroll đến nó
      newListButton.click(); // Click nó
      newListButton.focus(); // Focus nó cho đẹp
      this.data = {}; // Xoá trạng thái cũ
    }

    // Nếu vừa xoá
    if (this.data.event === 'justDelete' && this.data.isDeleteSelected) {
      const newListButton = this.shadowRoot.querySelector(`#list-${this.lists.length - 2}`);
      newListButton.scrollIntoView(); // Scroll đến nó
      newListButton.click(); // Click nó
      newListButton.focus(); // Focus nó cho đẹp
      this.data = {}; // Xoá trạng thái cũ
    }
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

  getEmojiFromInput(str) {
    let match;
    while (match = emojiRegex().exec(str)) {
      return match[0];
    }
  }

  handleAddListKeyUp(event) {
    if (this.currentValue.length > 0) {
      if (!(emojiRegex().test(this.currentIcon)) && this.currentIcon !== '') {
        this.error = { ...this.error, currentIcon: true };
        return;
      }
      if (event.key === 'Enter') {
        this.dispatchEvent(new CustomEvent('onAddList', {
          detail: {
            list: {
              icon: this.getEmojiFromInput(this.currentIcon) || '📝',
              name: this.currentValue,
              todos: []
            }
          }
        }));
        this.data = { event: 'justAdd' }
        this.currentValue = '';
        this.currentIcon = '';
        this.error = { ...this.error, currentIcon: false, currentValue: false };
      }
    }
  }

  handleListIconChange(event) {
    this.currentIcon = event.target.value;
  }

  handleButtonContextMenu(event, index) {
    event.preventDefault();
    if (!this.lists[index].default) {
      this.isShowMenu = true;
      this.currentValueOnContextMenu = index;
      this.data = {
        event: {
          x: event.pageX,
          y: event.pageY
        }
      };
    }
  }

  handleToggleEdit(index) {
    this.isShowMenu = false;
    this.editingListItem = {
      index: index,
      name: this.lists[index].name,
      icon: this.lists[index].icon,
      isEditing: true
    };
    this.data = { count: 1 }; // Chỉ focus lần đầu tiên
  }

  handleListIconChangeOnRename(event) {
    this.editingListItem = { ...this.editingListItem, icon: event.target.value };
  }

  handleRenameList(event) {
    this.editingListItem = { ...this.editingListItem, name: event.target.value };
  }

  handleRenameListKeyUp(event) {
    if (this.editingListItem.name.length > 0) {
      if (
        !(emojiRegex().test(this.editingListItem.icon)) &&
        this.editingListItem.icon !== ''
      ) {
        this.editingListItem = { ...this.editingListItem, errorIcon: true };
        return;
      }
      if (event.key === 'Enter') {
        this.dispatchEvent(new CustomEvent('onRenameList', {
          detail: {
            index: this.editingListItem.index,
            list: {
              icon: this.getEmojiFromInput(this.editingListItem.icon) || '📝',
              name: this.editingListItem.name
            }
          }
        }));
        this.editingListItem = {};
      }
    }
  }

  handleDeleteListItem(index) {
    this.isShowMenu = false;
    if (confirm('Bạn có chắc chắn muốn xoá không?')) {
      this.dispatchEvent(new CustomEvent('onDeleteList', {
        detail: {
          index: index
        }
      }))
      this.data = {
        event: 'justDelete',
        isDeleteSelected: this.selected === index
      };
    }
  }

  render() {
    return html`
      <div class="outer-wrapper">
        <div class="list-group-container-container">
          <div class="list-group list-group-container">
            ${this.lists.map((list, index) => html`
              ${this.editingListItem.isEditing && this.editingListItem.index === index
                ? html`
                  <div class="input-wrapper list-group-item show-input">
                    <!-- Loop focus -->
                    <div
                      tabindex="5"
                      @focus=${() => this.shadowRoot.querySelector('.rn-loop-focus-2').focus()}
                    ></div>
                    <input
                      class="
                        input-new-list 
                        input-icon 
                        ${this.editingListItem.errorIcon ? 'input-invalid' : ''} 
                        rn-loop-focus-1
                      "
                      tabindex="6"
                      .value=${this.editingListItem.icon || ''}
                      @input=${this.handleListIconChangeOnRename}
                      placeholder='📝'
                    >
                    <input
                      type="text"
                      class="input-new-list input-name rn-loop-focus-2"
                      placeholder="Enter to Add"
                      .value=${this.editingListItem.name}
                      @input=${this.handleRenameList}
                      @keyup=${this.handleRenameListKeyUp}
                      tabindex="7"
                    >
                  </div>
                  <div
                    tabindex="8"
                    @focus=${() => this.shadowRoot.querySelector('.rn-loop-focus-1').focus()}
                  ></div>
                  <!-- End loop focus -->
                  <div class="overlay" @click=${() => this.editingListItem = {}}></div>
                `
                : html`
                  <button
                    class="
                      list-group-item list-group-item-action 
                      ${this.selected === index ? 'active' : ''}
                    "
                    @click=${() => this.handleListChange(index)}
                    @contextmenu=${event => this.handleButtonContextMenu(event, index)}
                    id="list-${index}"
                    title=${list.name}
                  >
                    <span class="list-group-item-icon">${list.icon || '📝'}</span>
                    <span class="list-group-item-label">${list.name}</span>
                    <span class="badge ${this.selected === index ? 'badge-light' : 'badge-primary'}">
                      ${list.todoLength}
                    </span>
                  </button>
                `}
            `)}
          </div>
        </div>
        <div class="input-wrapper list-group-item show-input">
          <!-- Loop focus -->
          <div
            tabindex="1"
            @focus=${() => this.shadowRoot.querySelector('.loop-focus-2').focus()}
          ></div>
          <input
            class="input-new-list loop-focus-1 input-icon ${this.error.currentIcon ? 'input-invalid' : ''}"
            .value=${this.currentIcon}
            @input=${this.handleListIconChange}
            placeholder='📝'
            tabindex="2"
          >
          <input
            type="text"
            class="input-new-list loop-focus-2"
            placeholder="Enter to Add"
            .value=${this.currentValue}
            @input=${this.handleAddList}
            @keyup=${this.handleAddListKeyUp}
            tabindex="3"
          >
          <div
            tabindex="4"
            @focus=${() => this.shadowRoot.querySelector('.loop-focus-1').focus()}
          ></div>
          <!-- End loop focus -->
        </div>
      </div>
      ${this.isShowMenu
        ? html`
          <div class="context-menu dropdown-menu">
            <button
              class="dropdown-item"
              @click=${() => this.handleToggleEdit(this.currentValueOnContextMenu)}
            >
              <i class="material-icons">
                edit
              </i>
              Edit
            </button>
            <button
              class="dropdown-item"
              @click=${() => this.handleDeleteListItem(this.currentValueOnContextMenu)}
            >
              <i class="material-icons">
                delete
              </i>
              Delete
            </button>
          </div>
          <div class="overlay" @click=${() => this.isShowMenu = false}></div>
        `
        : html``}
    `;
  }
}

customElements.define('app-side', AppSide);