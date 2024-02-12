import './home.scss'

import { loadPage } from "../../index";

import IMask from 'imask';



export const render = async () => {
    await loadPage('./home.html');

    const openModalButton = document.getElementById('open-modal');
    const closeModalButton = document.querySelector('.close-modal');
    const modal = document.querySelector('.modal-window');
    const form = document.getElementById('feedback-form')
    const notification = document.getElementById('modal')
    const notificationMessage = document.getElementById('modal-message')

    function openModal() {
        modal.style.display = 'block'
        setTimeout(() => {
            modal.classList.add("show");
            modal.classList.remove("hide");
        }, 200)
    }

    function closeModal() {
        modal.classList.add("hide");
        modal.classList.remove("show");
        setTimeout(() => {
            modal.style.display = 'none'
        }, 200)
    }

    openModalButton.addEventListener("click", openModal);
    closeModalButton.addEventListener("click", closeModal);

    IMask(
        document.getElementById('phone'),
        {
            mask: '+{7}(000)000-00-00'
        }
    )

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const messageInput = document.getElementById('message');
        const formData = {
            nameInput,
            emailInput,
            phoneInput,
            messageInput
        }

        let isValid = true;

        if (!nameInput.value.trim() || !emailInput.value.trim() || !phoneInput.value.trim() || !messageInput.value.trim()) {
            isValid = false;
            showError(nameInput, 'All fields are required.');
        } else {
            hideError(nameInput);
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            isValid = false;
            showError(emailInput, 'Please enter a valid email address.');
        } else {
            hideError(emailInput);
        }

        if (isValid) {
            const response = await submitForm(formData);
            if (response.status === 'success') {
                form.reset();
                showModal(response.msg);
            } else if (response.status === 'error') {
                showModal(response.msg);
            }
        }
    });

    function showError(input, message) {
        input.classList.add('error');
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        input.parentNode.appendChild(errorElement);
    }

    function hideError(input) {
        input.classList.remove('error');
        const errorElement = input.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    function showModal(message) {
        notificationMessage.textContent = message;
        notification.style.display = 'block';
    }

    notification.addEventListener('click', (e) => {
        if (e.target.classList.contains('close')) {
            modal.classList.remove('active')
            notification.style.display = 'none';
        }
    });

    async function submitForm(data) {
        const url = 'http://localhost:9090/api/registration';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return {
            status: response.status == 200 ? 'success' : 'error',
            msg: response.status == 200 ? 'Ваша заявка успешно отправлена' : 'Произошла ошибка',
        };
    }
};


