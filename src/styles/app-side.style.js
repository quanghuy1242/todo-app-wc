import { css } from 'lit-element';
import { listGroup, overlay, button, badge, dropdownMenu, typography, dialog } from './app.style';

export const style = css`
  ${typography}
  ${listGroup}
  ${overlay}
  ${button}
  ${badge}
  ${dropdownMenu}
  ${dialog}

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

  .dialog-sample {
    width: 400px;
  }
`;