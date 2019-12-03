import { css } from 'lit-element';
import { button, inputText, typography, dropdownMenu, overlay, dialog } from './app.style';

export const style = css`
  ${typography}
  ${button}
  ${inputText}
  ${dropdownMenu}
  ${overlay}
  ${dialog}

  /* .container {
    padding-right: 15px;
    padding-left: 15px;
  } */

  ul {
    display: flex;
    flex-direction: column;
    padding-left: 0;
    list-style: none;
    border-bottom: 1px solid rgb(206, 212, 218);
    border-top: 1px solid rgb(206, 212, 218);
    height: calc(100vh - 3rem - 105px - 1rem - 3px);
    overflow-y: auto;
    overflow-x: hidden;
    margin-top: 1rem;
    margin-bottom: 0;
  }

  ul::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  ul::-webkit-scrollbar-thumb {
    background-color: rgba(108, 117, 125, 0.5);
  }

  ul app-todo-item:not(:last-child) {
    border-bottom: 1px solid rgb(206, 212, 218);
  }

  .input-wrapper {
    display: flex;
    margin: 0 !important;
  }

  .input-wrapper input {
    flex-grow: 1;
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }

  .input-wrapper .btn:not(:last-child) {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }

  .input-wrapper .btn:last-child {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }

  h1 {
    margin: 1rem 0;
  }

  .message {
    min-height: 38px;
    line-height: 1.5;
    display: flex;
    align-items: center;
  }

  /* Layout */

  .main-container {
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  .main-container > :not(:last-child) {
    margin-right: 1.5rem;
  }

  .right-panel {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  .note-panel {
    width: 280px;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 8;
  }

  .overlay-side-note {
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 7;
  }
  /* End Layout */

  app-filter {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  h1.display-4 {
    margin: 0.5rem 0;
  }

  .icon-header {
    font-size: 1.75rem;
    margin-right: 0.5rem;
  }

  .header {
    display: flex;
    align-items: center;
  }

  .spacer {
    flex: 1 1 auto;
  }

  .border-radius-style {
    border-radius: 100px !important;
  }

  .btn-more {
    margin-right: 0.25rem;
  }

  .dropdown-menu .material-icons {
    zoom: 0.8;
    margin-bottom: 3px;
  }

  .dialog .content {
    min-width: 350px;
    text-align: center;
  }
`;