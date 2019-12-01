import { css } from 'lit-element';
import { inputText, buttonGroup, button, typography } from './app.style';

export const style = css`
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

  .note-showing {
    height: 150px;
    overflow: auto;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    padding: 0.375rem 0.75rem;
  }

  .note-showing::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  .note-showing::-webkit-scrollbar-thumb {
    background-color: rgba(108, 117, 125, 0.5);
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

  .note-editor-wrapper {
    height: calc(150px + 0.8rem);
  }

  .note-editor-wrapper textarea {
    flex-grow: 1;
    height: calc(100% - 0.75rem) !important;
  }

  .note-editor-main {
    display: flex;
    flex-grow: 1;
    height: calc(100% - 46px - 0.75rem);
  }

  .note-editor-action {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.5rem;
  }

  .note-editor-action .btn:not(:last-child) {
    margin-right: 0.5rem;
  }
`;