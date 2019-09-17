import { css } from 'lit-element';

export const typography = css`
  .display-4 {
    font-size: 3.5rem;
    font-weight: 300;
    line-height: 1.2;
  }
`;

export const button = css`
  .btn {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
    width: 75px;
    outline: none;
  }

  .btn:hover {
    text-decoration: none;
    color: #fff;
    background-color: #0069d9;
    border-color: #0062cc;
  }

  .btn.disabled, .btn:disabled {
    opacity: 0.65;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
  }

  .btn-danger {
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
  }

  .btn-danger:hover {
    color: #fff;
    background-color: #c82333;
    border-color: #bd2130;
  }

  .btn-danger.disabled, .btn-danger:disabled {
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
  }

  .btn-secondary {
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
  }

  .btn-secondary:hover {
    color: #fff;
    background-color: #5a6268;
    border-color: #545b62;
  }

  .btn-secondary.disabled, .btn-secondary:disabled {
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
  }

  .btn-secondary:not(:disabled):not(.disabled):active, .btn-secondary:not(:disabled):not(.disabled).active,
  .show > .btn-secondary.dropdown-toggle {
    color: #fff;
    background-color: #545b62;
    border-color: #4e555b;
  }
`;

export const inputText = css`
  input[type='text'] {
    min-height: calc(38px - 0.375rem - 0.375rem - 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  input[type='text']:focus {
    color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }

  input[type='text']::placeholder {
    color: #6c757d;
    opacity: 1;
  }

  input[type='text']:disabled, input[readonly] {
    background-color: #e9ecef;
    opacity: 1;
  }
`;

export const buttonGroup = css`
  .btn-group {
    position: relative;
    display: inline-flex;
    vertical-align: middle;
  }

  .btn-group > .btn {
    position: relative;
    flex: 1 1 auto;
  }

  .btn-group > .btn:hover, .btn-group > .btn:focus, .btn-group > .btn:active, .btn-group > .btn.active {
    z-index: 1;
  }

  .btn-group > .btn:not(:first-child),
  .btn-group > .btn-group:not(:first-child) {
    margin-left: -1px;
  }

  .btn-group > .btn:not(:last-child):not(.dropdown-toggle),
  .btn-group > .btn-group:not(:last-child) > .btn {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .btn-group > .btn:not(:first-child),
  .btn-group > .btn-group:not(:first-child) > .btn {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .btn-group-toggle > .btn,
  .btn-group-toggle > .btn-group > .btn {
    margin-bottom: 0;
  }

  .btn-group-toggle > .btn input[type="radio"],
  .btn-group-toggle > .btn input[type="checkbox"],
  .btn-group-toggle > .btn-group > .btn input[type="radio"],
  .btn-group-toggle > .btn-group > .btn input[type="checkbox"] {
    position: absolute;
    clip: rect(0, 0, 0, 0);
    pointer-events: none;
  }
`;