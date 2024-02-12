import './login.scss'

import { loadPage } from "../../index";
import { logged } from '../../index';
import { isLogged } from '../../index';

export const render = async () => {
     await loadPage('./login.html');
     const loginTab = document.querySelector('#login-tab + label')
     const registrationTab = document.querySelector('#registration-tab + label')
     const registrationForm = document.getElementById('registration-form')
     const loginForm = document.getElementById('login-form')

     if (isLogged()) {
          loginTab.style.display = "none"
     } else {
          loginTab.style.display = "block"
     }

     loginTab.addEventListener('click', (e) => {
          if (e.target.innerText == "Login") {
               registrationForm.style.display = 'none'
               loginForm.style.display = 'block'
          }
     })

     registrationTab.addEventListener('click', (e) => {
          if (e.target.innerText == "Registration") {
               loginForm.style.display = 'none'
               registrationForm.style.display = 'block'
          }
     })

     registrationForm.addEventListener("submit", function (event) {
          event.preventDefault();

          const username = registrationForm.name.value;
          const email = registrationForm.email.value;
          const password = registrationForm.password.value;

          localStorage.setItem("username", username);
          localStorage.setItem("email", email);
          localStorage.setItem("password", password);


          registrationForm.reset();

          console.log("Вы успешно зарегистрировались!");
     });

     loginForm.addEventListener("submit", function (event) {

          event.preventDefault();

          const email = loginForm.email.value;
          const password = loginForm.password.value;

          const storedEmail = localStorage.getItem("email");
          const storedPassword = localStorage.getItem("password");

          if (email === storedEmail && password === storedPassword) {
               logged(true)
               localStorage.setItem("status", true);
               const url = '/';
               const state = {};
               history.pushState(state, '', url);

               const popStateEvent = new PopStateEvent('popstate', { state: state });
               dispatchEvent(popStateEvent);
               alert("Вы успешно вошли в систему!");
          } else {
               alert("Неверное имя пользователя или пароль! Попробуйте еще раз!");
          }
     });

};