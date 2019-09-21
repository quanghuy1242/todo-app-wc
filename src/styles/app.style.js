import { css } from 'lit-element';

export const typography = css`
  * {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
  }

  .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
  }

  .display-4 {
    font-size: 2.5rem;
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
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
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

  .btn:focus, .btn.focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
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

  .btn-danger:focus, .btn-danger.focus {
    box-shadow: 0 0 0 0.2rem rgba(225, 83, 97, 0.5);
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

  .btn-secondary:focus, .btn-secondary.focus {
    box-shadow: 0 0 0 0.2rem rgba(130, 138, 145, 0.5);
  }

  .btn-secondary:not(:disabled):not(.disabled):active, .btn-secondary:not(:disabled):not(.disabled).active,
  .show > .btn-secondary.dropdown-toggle {
    color: #fff;
    background-color: #545b62;
    border-color: #4e555b;
  }

  .close {
    float: right;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
    color: black;
    text-shadow: 0 1px 0 #fff;
    opacity: .5;
  }

  .close span {
    font-size: inherit;
    font-weight: inherit;
  }

  .close:hover {
    color: #dc3545;
  }

  button.close {
    padding: 0;
    background-color: transparent;
    border: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
  }

  .btn-icon {
    border-radius: 50%;
    padding: 0.5rem;
    line-height: 0;
  }

  .btn-icon-sm {
    padding: 0.25rem;
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
`;

export const customCheckbox = css`
  ::after, ::before {
    box-sizing: border-box;
  }

  .custom-control {
    position: relative;
    min-height: 1.5rem;
    padding-left: 1.5rem;
  }

  .custom-control-input {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }

  .custom-control-input:checked ~ .custom-control-label::before {
    color: #fff;
    border-color: #007bff;
    background-color: #007bff;
  }

  .custom-control-input:focus ~ .custom-control-label::before {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }

  .custom-control-input:focus:not(:checked) ~ .custom-control-label::before {
    border-color: #80bdff;
  }

  .custom-control-input:not(:disabled):active ~ .custom-control-label::before {
    color: #fff;
    background-color: #b3d7ff;
    border-color: #b3d7ff;
  }

  .custom-control-input:disabled ~ .custom-control-label {
    color: #6c757d;
  }

  .custom-control-input:disabled ~ .custom-control-label::before {
    background-color: #e9ecef;
  }

  .custom-checkbox .custom-control-label::before {
    border-radius: 0.25rem;
  }

  .custom-checkbox .custom-control-input:checked ~ .custom-control-label::after {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
  }

  .custom-checkbox .custom-control-input:indeterminate ~ .custom-control-label::before {
    border-color: #007bff;
    background-color: #007bff;
  }

  .custom-checkbox .custom-control-input:indeterminate ~ .custom-control-label::after {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 4'%3e%3cpath stroke='%23fff' d='M0 2h4'/%3e%3c/svg%3e");
  }

  .custom-checkbox .custom-control-input:disabled:checked ~ .custom-control-label::before {
    background-color: rgba(0, 123, 255, 0.5);
  }

  .custom-checkbox .custom-control-input:disabled:indeterminate ~ .custom-control-label::before {
    background-color: rgba(0, 123, 255, 0.5);
  }

  .custom-control-label {
    position: relative;
    line-height: 38px;
  }

  .custom-control-label::before {
    position: absolute;
    top: 0.6rem;
    left: -1.5rem;
    display: block;
    width: 1rem;
    height: 1rem;
    pointer-events: none;
    content: "";
    background-color: #fff;
    border: #adb5bd solid 1px;
  }

  .custom-control-label::after {
    position: absolute;
    top: 0.6rem;
    left: -1.5rem;
    display: block;
    width: 1rem;
    height: 1rem;
    content: "";
    background: no-repeat 50% / 50% 50%;
  }

  .custom-checkbox .custom-control-input:checked ~ .custom-control-label::after {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
  }

  .custom-checkbox .custom-control-input:indeterminate ~ .custom-control-label::before {
    border-color: #007bff;
    background-color: #007bff;
  }

  .custom-checkbox .custom-control-input:indeterminate ~ .custom-control-label::after {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 4'%3e%3cpath stroke='%23fff' d='M0 2h4'/%3e%3c/svg%3e");
  }

  .custom-checkbox .custom-control-input:disabled:checked ~ .custom-control-label::before {
    background-color: rgba(0, 123, 255, 0.5);
  }

  .custom-checkbox .custom-control-input:disabled:indeterminate ~ .custom-control-label::before {
    background-color: rgba(0, 123, 255, 0.5);
  }

  .custom-control-label::before {
    transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
`;

export const listGroup = css`
  .list-group {
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
  }

  .list-group-item-action {
    width: 100%;
    color: #495057;
    text-align: left;
    outline: 0;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .list-group-item-action:focus {
    z-index: 1;
    color: #495057;
    text-decoration: none;
    background-color: #f8f9fa;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }

  .list-group-item-action:hover {
    z-index: 1;
    color: #495057;
    text-decoration: none;
    background-color: #f8f9fa;
  }

  .list-group-item-action:active {
    color: #212529;
    background-color: #e9ecef;
  }

  .list-group-item {
    position: relative;
    display: block;
    padding: 0.75rem 1.25rem;
    margin-bottom: -1px;
    background-color: #fff;
    border: 0;
    border-left: 0;
    border-right: 0;
  }

  /* .list-group-item:first-child {
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
  } */

  .list-group-item:not(:last-child) {
    margin-bottom: 0.25rem;
  }

  .list-group-item:last-child {
    margin-bottom: 0;
    /* border-bottom-right-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem; */
  }

  .list-group-item.disabled, .list-group-item:disabled {
    color: #6c757d;
    pointer-events: none;
    background-color: #fff;
  }

  .list-group-item.active {
    z-index: 2;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
  }

  .list-group-horizontal {
    -ms-flex-direction: row;
    flex-direction: row;
  }

  .list-group-horizontal .list-group-item {
    margin-right: -1px;
    margin-bottom: 0;
  }

  .list-group-horizontal .list-group-item:first-child {
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
    border-top-right-radius: 0;
  }

  .list-group-horizontal .list-group-item:last-child {
    margin-right: 0;
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
    border-bottom-left-radius: 0;
  }

`;

export const overlay = css`
  .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
  }
`;

export const badge = css`
  .badge {
    display: inline-block;
    padding: 0.25em 0.4em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .badge:empty {
    display: none;
  }

  .btn .badge {
    position: relative;
    top: -1px;
  }

  .badge-pill {
    padding-right: 0.6em;
    padding-left: 0.6em;
    border-radius: 10rem;
  }

  .badge-primary {
    color: #fff;
    background-color: #007bff;
  }

  .badge-secondary {
    color: #fff;
    background-color: #6c757d;
  }

  .badge-success {
    color: #fff;
    background-color: #28a745;
  }

  .badge-info {
    color: #fff;
    background-color: #17a2b8;
  }

  .badge-warning {
    color: #212529;
    background-color: #ffc107;
  }

  .badge-danger {
    color: #fff;
    background-color: #dc3545;
  }

  .badge-light {
    color: #212529;
    background-color: #f8f9fa;
  }

  .badge-dark {
    color: #fff;
    background-color: #343a40;
  }
`;

export const dropdownMenu = css`
  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    float: left;
    min-width: 10rem;
    padding: 0.5rem 0;
    margin: 0.125rem 0 0;
    font-size: 1rem;
    color: #212529;
    text-align: left;
    list-style: none;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
  }

  .dropdown-item {
    display: block;
    width: 100%;
    padding: 0.25rem 1.5rem;
    clear: both;
    font-weight: 400;
    color: #212529;
    text-align: inherit;
    white-space: nowrap;
    background-color: transparent;
    border: 0;
    outline: 0;
  }

  .dropdown-item:hover, .dropdown-item:focus {
    color: #16181b;
    text-decoration: none;
    background-color: #f8f9fa;
  }

  .dropdown-item.active, .dropdown-item:active {
    color: #fff;
    text-decoration: none;
    background-color: #007bff;
  }

  .dropdown-item.disabled, .dropdown-item:disabled {
    color: #6c757d;
    pointer-events: none;
    background-color: transparent;
  }

  .dropdown-divider {
    height: 0;
    margin: 0.5rem 0;
    overflow: hidden;
    border-top: 1px solid #e9ecef;
  }
`;