import { LitElement, html } from 'lit-element';
import emojiRegex from 'emoji-regex';
import { setMenuPosition } from './utils/DropDownUtil';
import { style } from './styles/app-side.style';

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
    return style;
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
    this.dialog.close();
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

  firstUpdated() {
    this.dialog = this.shadowRoot.querySelector('.dialog-sample');
  }

  showSampleDialog() {
    this.isShowMenu = false;
    this.dialog.showModal();
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
              @click=${this.showSampleDialog}
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
        <dialog class="dialog dialog-sample zoom">
          <div class="document">
            <div class="header">
              <h6 class="title">Cảnh báo</h6>
            </div>
            <div class="content">Bạn có chắn chắn muốn xoá nội dung này không?</div>
            <div class="action">
              <button class="btn btn-secondary" @click=${() => this.dialog.close()}>Close</button>
              <button class="btn btn-danger" @click=${() => this.handleDeleteListItem(this.currentValueOnContextMenu)}>Delete</button>
            </div>
          </div>
        </dialog>
    `;
  }
}

customElements.define('app-side', AppSide);