import { LitElement, html } from 'lit-element';
import './app-todo-item';
import './app-filter';
import './app-side';
import './app-todo-side';
import { ALL, FINISH, UNFINISH } from './app-filter';
import { setMenuPosition } from './utils/DropDownUtil';
import { IOUtils } from './utils/IOUtil';
import { style } from './styles/app-main.style';

export class AppMain extends LitElement {
  static get properties() {
    return {
      lists: { type: Array },
      currentValue: { type: String },
      selectedFilter: { type: String },
      selectedList: { type: Number },
      data: { type: Object },
      isShowMenu: { type: Boolean },
      isShowNotePanel: { type: Boolean },
      notePanelData: { type: Object }
    };
  }

  static get styles() {
    return style;
  }

  constructor() {
    super();
    this.lists = [
      {
        icon: '📝',
        name: 'General',
        todos: [],
        default: true
      }
    ];
    this.currentValue = '';
    this.selectedFilter = ALL;
    this.selectedList = 0;
    this.data = {};
    this.isShowMenu = false;
    this.isShowNotePanel = false;
    this.notePanelData = {};
  }

  connectedCallback() {
    super.connectedCallback();
    this.lists = IOUtils.getData();
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName === 'lists') {
        IOUtils.saveData(this.lists);
      }
    });

    if (this.data.event === 'justAdd') {
      setTimeout(() => {
        const todoItem = 
          this.shadowRoot.querySelector(`#todo-item-${this.lists[this.selectedList].todos.length - 1}`);
        todoItem.scrollIntoView(); // Scroll đến nó
        this.data = {}; // Xoá trạng thái cũ
      }, 0);
    }

    // Hiện menu nếu isShowMenu là true
    if (this.isShowMenu) {
      const menu = this.shadowRoot.querySelector('.context-menu');
      setMenuPosition(menu, this.data);
    }
  }

  firstUpdated() {
    this.dialog = this.shadowRoot.querySelector('.dialog-sample');
  }

  handleTodoItemChange(event) {
    this.currentValue = event.target.value;
  }

  handleTodoEnter(event) {
    if (event.key === 'Enter') {
      this.handleAddNewTodoItemClick();
    }
  }

  handleAddNewTodoItemClick() {
    if (this.currentValue.length > 0) {
      this.lists[this.selectedList].todos.push({
        name: this.currentValue,
        isDone: false,
        visible: this.selectedFilter !== FINISH,
        date: new Date()
      });
      this.data = { event: 'justAdd' };
      this.lists = [...this.lists];
      this.currentValue = '';
    }
  }

  handleToggleTodoItem(event) {
    this.lists[this.selectedList].todos[event.detail].isDone = 
      !this.lists[this.selectedList].todos[event.detail].isDone;
    if (this.selectedFilter === ALL) {
      this.lists[this.selectedList].todos[event.detail].visible = true;
    }
    if (this.selectedFilter === FINISH) {
      this.lists[this.selectedList].todos[event.detail].visible = 
        this.lists[this.selectedList].todos[event.detail].isDone;
    }
    if (this.selectedFilter === UNFINISH) {
      this.lists[this.selectedList].todos[event.detail].visible = 
        !this.lists[this.selectedList].todos[event.detail].isDone;
    }
    this.lists = [...this.lists];
  }

  handleDeleteTodoItem(event) {
    this.lists[this.selectedList].todos = 
      this.lists[this.selectedList].todos.filter((item, index) => index !== event.detail);
    this.lists = [...this.lists];
  }

  handleOpenSideNote(event) {
    this.notePanelData = {};
    this.notePanelData = {
      index: event.detail,
      ...this.lists[this.selectedList].todos[event.detail]
    };
    this.isShowNotePanel = true;
  }

  handleFilter(event) {
    this.selectedFilter = event.detail;
    switch (this.selectedFilter) {
      case ALL:
        this.lists[this.selectedList].todos = 
          this.lists[this.selectedList].todos.map(todo => ({ ...todo, visible: true }));
        break;
      case FINISH:
        this.lists[this.selectedList].todos = 
          this.lists[this.selectedList].todos.map(todo => ({ ...todo, visible: todo.isDone }));
        break;
      case UNFINISH:
        this.lists[this.selectedList].todos = 
          this.lists[this.selectedList].todos.map(todo => ({ ...todo, visible: !todo.isDone }));
        break;
    }
    this.lists = [...this.lists];
  }

  getMessage() {
    if (!this.lists[this.selectedList].todos.length) {
      return html`<div class="message">Chưa có item nào, hãy thêm vào một item</div>`;
    }
    else if (this.selectedFilter === FINISH && !this.lists[this.selectedList].todos.filter(item => item.isDone).length) {
      return html`<div class="message">Bạn không có công việc nào đã hoàn thành</div>`;
    }
    else if (this.selectedFilter === UNFINISH && !this.lists[this.selectedList].todos.filter(item => !item.isDone).length) {
      return html`<div class="message">Bạn đã hoàn thành tất cả các mục tiêu, hãy tận hưởng một ngày vui vẻ</div>`;
    }
  }

  handleSelectList(event) {
    if (event.detail.index !== this.selectedList) {
      this.selectedList = event.detail.index;
      this.selectedFilter = ALL;
      this.lists.forEach(list => {
        list.todos = list.todos.map(todo => ({ ...todo, visible: true }));
        return list;
      });
      this.lists = [...this.lists];
    }
  }

  handleAddList(event) {
    this.lists = [...this.lists, event.detail.list];
  }

  handleRenameList(event) {
    this.lists = this.lists.map((list, index) => {
      if (index === event.detail.index) {
        return { ...list, ...event.detail.list };
      } else {
        return list;
      }
    });
  }

  handleDeleteList(event) {
    this.lists = this.lists.filter((list, index) => index !== event.detail.index);
  }

  handleMoreClick(event) {
    event.preventDefault();
    this.isShowMenu = true;
    this.data = {
      event: {
        x: event.pageX,
        y: event.pageY,
      }
    };
  }

  handleTodoItemFromSideNoteChange(event) {
    this.lists[this.selectedList].todos[event.detail.index] = {
      ...this.lists[this.selectedList].todos[event.detail.index],
      ...!event.detail.name || { name: event.detail.name },
      ...(event.detail.note === '' || event.detail.note) && { note: event.detail.note },
    }
    this.lists = [...this.lists];
    this.notePanelData = {
      index: event.detail.index,
      ...this.lists[this.selectedList].todos[event.detail.index]
    }
  }

  handleCloseSideNote() {
    this.isShowNotePanel = false;
    this.notePanelData = {};
    this.shadowRoot.querySelector('app-todo-side').isShowEditorNote = false;
  }

  handleMoveUp(event) {
    [
      this.lists[this.selectedList].todos[event.detail],
      this.lists[this.selectedList].todos[event.detail - 1]
    ] = [
      this.lists[this.selectedList].todos[event.detail - 1],
      this.lists[this.selectedList].todos[event.detail]
    ];
    this.lists = [...this.lists];
  }

  handleMoveDown(event) {
    [
      this.lists[this.selectedList].todos[event.detail],
      this.lists[this.selectedList].todos[event.detail + 1]
    ] = [
      this.lists[this.selectedList].todos[event.detail + 1],
      this.lists[this.selectedList].todos[event.detail]
    ];
    this.lists = [...this.lists];
  }

  handleResetCurrentList() {
    this.lists[this.selectedList].todos = [];
    this.lists = [...this.lists];
    this.dialog.close();
  }

  render() {
    return html`
      <div class="container">
        <div class="main-container">
          <div class="left-panel">
            <app-side
              selected=${this.selectedList}
              @onSelectList=${this.handleSelectList}
              @onAddList=${this.handleAddList}
              @onRenameList=${this.handleRenameList}
              @onDeleteList=${this.handleDeleteList}
              .lists=${this.lists.map(list => ({
                icon: list.icon,
                name: list.name,
                todoLength: list.todos.length,
                default: list.default
              }))}
            ></app-side>
          </div>
          <div class="right-panel">
            <h1 class="display-4 header">
              <span class="icon-header">${this.lists[this.selectedList].icon}</span>
              ${this.lists[this.selectedList].name}
              <div class="spacer"></div>
              <button class="btn btn-icon btn-icon-sm btn-more" @click=${this.handleMoreClick}>
                <i class="material-icons">
                  more_horiz
                </i>
              </button>
              <button
                class="btn btn-secondary btn-icon btn-icon-sm"
                @click=${() => this.dialog.showModal()}
              >
                <i class="material-icons">
                  refresh
                </i>
              </button>
              <dialog class="dialog dialog-sample">
                <div class="document">
                  <div class="header">
                    <h6 class="title">Cảnh báo</h6>
                  </div>
                  <div class="content">Bạn có chắn chắn muốn reset danh mục này không?</div>
                  <div class="action">
                    <button class="btn btn-secondary" @click=${() => this.dialog.close()}>Close</button>
                    <button class="btn btn-danger" @click=${this.handleResetCurrentList}>Reset</button>
                  </div>
                </div>
              </dialog>
            </h1>
            <div class="input-wrapper">
              <input
                type="text"
                .value=${this.currentValue}
                @input=${this.handleTodoItemChange}
                @keyup=${this.handleTodoEnter}
                placeholder="Enter or click Add button ..."
                class="border-radius-style"
              >
              <button class="btn btn-icon" @click=${this.handleAddNewTodoItemClick}>
                <i class="material-icons">
                  add
                </i>
              </button>
            </div>
            <ul>
              ${this.getMessage()}
              ${this.lists[this.selectedList].todos.map((item, index) => html`
                ${item.visible
                  ? html`
                    <app-todo-item
                      name=${item.name}
                      ?isDone=${item.isDone}
                      .index=${index}
                      .date=${item.date}
                      .total=${this.lists[this.selectedList].todos.length}
                      id="todo-item-${index}"
                      @onToggle=${this.handleToggleTodoItem}
                      @onDelete=${this.handleDeleteTodoItem}
                      @onOpenSideNote=${this.handleOpenSideNote}
                      @onMoveup=${this.handleMoveUp}
                      @onMoveDown=${this.handleMoveDown}
                    ></app-todo-item>
                  `
                  : html``}
              `)}
            </ul>
          </div>
        </div>
        <div
          class="note-panel"
          style="transform: translateX(${this.isShowNotePanel ? '0px' : '304px'})"
        >
          <app-todo-side
            .name=${this.notePanelData.name}
            .date=${this.notePanelData.date}
            .note=${this.notePanelData.note}
            .index=${this.notePanelData.index}
            @onDataChanged=${this.handleTodoItemFromSideNoteChange}
          ></app-todo-side>
        </div>
      </div>
      ${this.isShowNotePanel
        ? html`
          <div class="overlay overlay-side-note" @click=${this.handleCloseSideNote}></div>
        `
        : html``}
      ${this.isShowMenu
        ? html`
          <div class="context-menu dropdown-menu">
            <app-filter @onToggleFilter=${this.handleFilter} selected=${this.selectedFilter}></app-filter>
            <div class="dropdown-divider"></div>
            <button class="dropdown-item">
              <i class="material-icons">
                save_alt
              </i>
              Export
            </button>
          </div>
          <div class="overlay" @click=${() => this.isShowMenu = false}></div>
        `
        : html``}
    `;
  }
}

customElements.define('app-main', AppMain);