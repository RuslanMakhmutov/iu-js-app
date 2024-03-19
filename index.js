const app = () => {
	const emailInput = document.getElementById('email');
	const emailErrorBlock = document.getElementById('email-error');
	const passwordInput = document.getElementById('password');
	const passwordErrorBlock = document.getElementById('password-error');
	const agreementCheckbox = document.getElementById('agreement');
	const agreementErrorBlock = document.getElementById('agreement-error');
	const submitButton = document.querySelector('#submit');
	const form = document.querySelector('form');

	const isPasswordValid = (password) => {
		return password.length !== 0 && password.length > 5;
	};

	const isEmailValid = (email) => {
		const regex =
			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

		return regex.test(email);
	};

	emailInput.addEventListener('input', (e) => {
		const currentValue = e.target.value;

		const isValid = isEmailValid(currentValue);

		if (isValid) {
			emailInput.classList.remove('input-error');
			emailErrorBlock.classList.add('d-none');
		} else {
			if (currentValue.length === 0) {
				emailErrorBlock.textContent = 'Email не может быть пустым';
			} else {
				emailErrorBlock.textContent = 'Введите корректный email';
			}
			emailInput.classList.add('input-error');
			emailErrorBlock.classList.remove('d-none');
		}
	});

	passwordInput.addEventListener('input', (e) => {
		const currentValue = e.target.value;

		const isValid = isPasswordValid(currentValue);

		if (isValid) {
			passwordInput.classList.remove('input-error');
			passwordErrorBlock.classList.add('d-none');
		} else {
			if (currentValue.length === 0) {
				passwordErrorBlock.textContent = 'Пароль не может быть пустым';
			} else {
				passwordErrorBlock.textContent = 'Пароль не может быть короче 6-и символов';
			}
			passwordInput.classList.add('input-error');
			passwordErrorBlock.classList.remove('d-none');
		}
	});

	agreementCheckbox.addEventListener('change', (e) => {
		const isChecked = e.target.checked;

		if (isChecked) {
			agreementCheckbox.classList.remove('input-error');
			agreementErrorBlock.classList.add('d-none');
		} else {
			agreementErrorBlock.textContent = 'Нужно дать согласие на обработку персональных данных';
			agreementCheckbox.classList.add('input-error');
			agreementErrorBlock.classList.remove('d-none');
		}
	});

    form.addEventListener('input', (e) => {
		const email = form.querySelector('#email').value;
		const password = form.querySelector('#password').value;
		const agreementChecked = form.querySelector('#agreement').checked;

		submitButton.disabled = !(isEmailValid(email) && isPasswordValid(password) && agreementChecked);
	});
};

export default app // для тестирования

// app() // для работы в браузере


