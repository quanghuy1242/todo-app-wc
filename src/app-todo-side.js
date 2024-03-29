import { LitElement, html } from 'lit-element';
import { style } from './styles/app-todo-side.style';

export class AppTodoSide extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      date: { type: Object },
      note: { type: String },
      index: { type: Number },
      isShowEditorNote: { type: Boolean }
    };
  }

  static get styles() {
    return style;
  }

  constructor() {
    super();

    this.name = '';
    this.date = null;
    this.note = '';
    this.index = 0;
    this.isShowEditorNote = false;
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

  handleShowEditNote() {
    this.isShowEditorNote = true;
  }

  closeNoteEditor() {
    this.isShowEditorNote = false;
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
          <input type="text" class="input-name" .value=${this.name} @input=${this.handleNameChange}>
        </div>
        <div class="form-group">
          <label for="">Note</label>
          ${this.isShowEditorNote
            ? html`
              <div class="note-editor-wrapper">
                <div class="note-editor-main">
                  <textarea class="note" @input=${this.handleNoteChange}>${this.note}</textarea>
                </div>
                <div class="note-editor-action">
                  <button
                    class="btn"
                    @click=${this.closeNoteEditor}
                  >
                    Done
                  </button>
                </div>
              </div>
            `
            : html`
              <div
                class="note-showing"
                @click=${this.handleShowEditNote}
                title="Click to edit"
              >
                ${this.note ? this.note.split(/(\n|\r|\r\n)/).map(p => html`<div>${p}</div>`) : ''}
              </div>
            `}
        </div>
      </div>
    `;
  }
}

customElements.define('app-todo-side', AppTodoSide);