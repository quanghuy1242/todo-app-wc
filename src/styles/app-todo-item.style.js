import { css } from 'lit-element';
import { button, customCheckbox, dropdownMenu, overlay, typography } from './app.style';

export const style = css`
  ${button}
  ${customCheckbox}
  ${dropdownMenu}
  ${overlay}
  ${typography}

  .text {
    user-select: none;
  }

  .button {
    text-decoration: none !important;
    margin-left: 0.25rem;
  }
  
  li.done {
    opacity: 0.6;
    color: rgb(0, 123, 255);
    transition: all 0.15s ease-in-out;
  }

  li.done label.text {
    text-decoration: line-through;
  }

  li {
    position: relative;
    display: flex;
    background-color: #fff;
    width: calc(100% - 24px - 5px);
    transition: all 0.15s ease-in-out;
  }

  li + li {
    border-top-width: 0;
  }

  .btn-done {
    margin-right: 0.5rem;
    width: 82px !important;
  }

  .custom-control-label {
    margin-left: 0.2rem;
    flex-grow: 1;
    line-height: 1.5;
    min-height: 38px;
    display: flex;
    align-items: center;
  }

  .material-icons {
    zoom: 0.8;
    margin-bottom: 3px;
  }

  .mt-favorite:hover {
    color: #ffc107;
  }

  .mt-close:hover {
    color: #dc3545;
  }

  .mt-more:hover {
    color: #17a2b8;
  }
`;