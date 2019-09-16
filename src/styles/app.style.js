import { css } from 'lit-element';

export const button = css`
  button {
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
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
    width: 75px;
  }

  button:hover {
    text-decoration: none;
    color: #fff;
    background-color: #0069d9;
    border-color: #0062cc;
  }

  button:focus, button.focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5);
  }

  button.disabled, button:disabled {
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

  .btn-danger:focus, .btn-danger.focus {
    box-shadow: 0 0 0 0.2rem rgba(225, 83, 97, 0.5);
  }

  .btn-danger.disabled, .btn-danger:disabled {
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
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