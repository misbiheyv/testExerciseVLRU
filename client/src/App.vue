<template>
  <div id="main">
    <router-view />
  </div>
</template>

<style>
  /* Обнуление */
  *{padding:0;margin:0;border:0;}
  *,*:before,*:after{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;}
  :focus,:active{outline:none;}
  a:focus,a:active{outline:none;}
  nav,footer,header,aside{display:block;}
  html,body{height:100%;width:100%;font-size:100%;line-height:1;font-size:14px;-ms-text-size-adjust:100%;-moz-text-size-adjust:100%;-webkit-text-size-adjust:100%;}
  input,button,textarea{font-family:inherit;}
  input::-ms-clear{display:none;}
  button{cursor:pointer;}
  button::-moz-focus-inner{padding:0;border:0;}
  a,a:visited{text-decoration:none;}
  a:hover{text-decoration:none;}
  ul li{list-style:none;}
  img{vertical-align:top;}
  h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit;}
  /* Глобальные стили */
  * {
    font-family: Arial, Helvetica, sans-serif;
  }
  #main {
    min-height: 100vh;
    background-color: #f8fafd;
  }
  .card-container {
    background-color: white;
    padding: 15px 25px;
    display: flex;
    flex-direction: column;
    border-radius: 3px;
    -webkit-box-shadow: 0px 0px 10px -6px rgba(34, 60, 80, 0.5); 
    -moz-box-shadow: 0px 0px 10px -6px rgba(34, 60, 80, 0.5); 
    box-shadow: 0px 0px 10px -6px rgba(34, 60, 80, 0.5);
  }
  .card-label-title {
    font-size: 1.5rem;
    line-height: 150%;
    color: rgba(0, 0, 0, 0.75);
  }
  .action-btn {
    background-color: #0091da !important;
    color: white;
  }
  .delete-btn {
    background-color: #ee4e4a !important;
    color: white;
  }
  .info-block {  
    font-size: 1.2rem;
    line-height: 160%;
  }  
  .hidden {
    display: none;
  }
</style>
