import { createGlobalStyle } from 'styled-components';
import 'react-circular-progressbar/dist/styles.css';

export default createGlobalStyle`
  @import url( 'https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap' );

  * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box; 

        &:focus {
            border: #59bfff solid 1px;
        }
    }

    body {
        font: 400 14px Roboto, sans-serif;
        background-color: #EEE;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
    }

    a {
        text-decoration: none;
        cursor: pointer;
    }

    .container {
        max-width: 1200px;
        margin: auto;
    }

    .form-noimg {
        width: 100%;
        margin-left: 250px;
    }

    .header {
        font-size: 27px;
        margin-top: 20px;
        margin-left: 5px;
        margin-bottom: 10px;
    }

    .body, .footer {
        width: 100%;
        background-color: #FFF;
        border-radius: 3px;
        padding: 0;
        box-shadow: 0 0 3px #999;
        margin: 0 0 ;
        display: flex;
    }

    .footer {
        margin-top: 10px;
        margin-bottom: 2px;
        padding: 10px;
    }

    form .area--input input:not([type='checkbox']), form select {
        width: 100%;
        height: 40px;
        color: #333;
        border: 1px solid #95A5A6;
        border-radius: 8px;
        padding: 0 24px;
        outline: 0;
        transition: all ease 0.5s;
    }

    form input[type='checkbox'] {
        width: 30px;
        height: 30px;
        color: #333;
        border: 1px solid #95A5A6;
        border-radius: 10px;
        padding: 0 24px;
        outline: 0;
        transition: all ease 0.5s;
        cursor: pointer;
    }

    form input:focus {
        border: #59bfff solid 1px;
    }

    button {
        cursor: pointer;
    }

    .btn {
        width: 100%;
        max-width: 120px;
        height: 40px;
        background-color: #333;
        border: 0;
        border-radius: 5px;
        color: #FFF;
        font-weight: 700;
        margin-top: 16px;
        display: inline-block !important;
        text-align: center;
        text-decoration: none;
        font-size: 20px;
        line-height: 40px;  
        cursor: pointer;
        transition: all ease 0.5s; 

        &:hover {
            filter: brightness( 90% );
        }

        & + .btn-success {
            background-color: #0089FF !important;
            opacity: 0.8;
        }

        & + .btn-danger {
            background-color: #D91E18 !important;
            opacity: 0.8;
        }

        & + .btn-search {
            background-color: #D91E18 !important;
            opacity: 0.8;
        }
    }

    .error-message {
        font-size: 25px;
        font-weight: 400;
        margin: 10px 0;
        padding: 5px;
        background-color: #f74640;
        border: 2px solid #CCC;
        text-align: center;
    }

    .box-padding {
        padding: 5px;
    }

    .help-block {
        color: #999;
        font-size: 12px;
    }

    input[type='number'] {
        text-align: center;
    }

    textarea {
        width: 100%;
        resize: none;
        height: 150px;
        color: #333;   
        border-radius: 8px;
        border: 1px solid #95A5A6;
        padding: 10px;
        line-height: 18px;
        font-size: 16px;
        overflow: auto;
    }
`
