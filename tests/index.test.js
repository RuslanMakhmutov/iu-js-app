import '@testing-library/jest-dom';
import testingLibrary from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import path from 'node:path';
import fs from 'node:fs';
import app from '../index.js'
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const { screen } = testingLibrary;

let elements;

beforeEach(() => {
	const pathToHTML = path.join(__dirname, '..', 'index.html');
	const html = fs.readFileSync(pathToHTML, 'utf-8');

	document.body.innerHTML = html.toString();
	app();

	elements = {
		emailInput: screen.getByTestId('email'),
		passwordInput: screen.getByTestId('password'),
		agreementCheckbox: screen.getByTestId('agreement'),
		emailErrorBlock: document.getElementById('email-error'),
		passwordErrorBlock: document.getElementById('password-error'),
		agreementErrorBlock: document.getElementById('agreement-error'),
		submitButton: document.getElementById('submit'),
	};
});

test('Первая отрисовка формы', () => {
	expect(elements.emailErrorBlock).toHaveClass('d-none');
	expect(elements.passwordErrorBlock).toHaveClass('d-none');
	expect(elements.agreementErrorBlock).toHaveClass('d-none');

	expect(elements.emailInput).not.toHaveClass('input-error');
	expect(elements.passwordInput).not.toHaveClass('input-error');
	expect(elements.agreementCheckbox).not.toHaveClass('input-error');

	expect(elements.agreementCheckbox).not.toBeChecked()

	expect(elements.submitButton).toHaveAttribute('disabled');
});

test('Введены валидные данные', async () => {
	await userEvent.type(elements.emailInput, 'ya@ya.ru');
	expect(elements.emailInput).not.toHaveClass('input-error');
	expect(elements.emailErrorBlock).toHaveClass('d-none');

	await userEvent.type(elements.passwordInput, '123456');
	expect(elements.passwordInput).not.toHaveClass('input-error');
	expect(elements.passwordErrorBlock).toHaveClass('d-none');

	await userEvent.click(elements.agreementCheckbox);
	expect(elements.agreementCheckbox).not.toHaveClass('input-error');
	expect(elements.agreementErrorBlock).toHaveClass('d-none');
	expect(elements.agreementCheckbox).toBeChecked()

	expect(elements.submitButton).not.toHaveAttribute('disabled');
});

test('Введены невалидные данные', async () => {
	await userEvent.type(elements.emailInput, 'ya.ru');
	expect(elements.emailInput).toHaveClass('input-error');
	expect(elements.emailErrorBlock).toBeInTheDocument();
	expect(screen.queryByText('Введите корректный email')).toBeInTheDocument();

	await userEvent.type(elements.passwordInput, '123');
	expect(elements.passwordInput).toHaveClass('input-error');
	expect(elements.passwordErrorBlock).toBeInTheDocument();
	expect(screen.queryByText('Пароль не может быть короче 6-и символов')).toBeInTheDocument();

	expect(elements.submitButton).toHaveAttribute('disabled');
});

test('Введены данные и поля очищены', async () => {
	await userEvent.type(elements.emailInput, 'ya.ru');
	await userEvent.clear(elements.emailInput);

	expect(elements.emailInput).toHaveClass('input-error');
	expect(elements.emailErrorBlock).toBeInTheDocument();
	expect(screen.queryByText('Email не может быть пустым')).toBeInTheDocument();
	expect(screen.queryByText('Введите корректный email')).not.toBeInTheDocument();

	await userEvent.type(elements.passwordInput, '123');
	await userEvent.clear(elements.passwordInput);

	expect(elements.passwordInput).toHaveClass('input-error');
	expect(elements.passwordErrorBlock).toBeInTheDocument();
	expect(screen.queryByText('Пароль не может быть пустым')).toBeInTheDocument();
	expect(screen.queryByText('Пароль не может быть короче 6-и символов')).not.toBeInTheDocument();

	await userEvent.dblClick(elements.agreementCheckbox);
	expect(elements.agreementCheckbox).not.toBeChecked()
	expect(elements.agreementCheckbox).toHaveClass('input-error');
	expect(elements.agreementErrorBlock).not.toHaveClass('d-none');
	expect(screen.queryByText('Нужно дать согласие на обработку персональных данных')).toBeInTheDocument();

	expect(elements.submitButton).toHaveAttribute('disabled');
});

test('Комплексный тест', async () => {
	expect(elements.emailErrorBlock).toHaveClass('d-none');
	expect(elements.passwordErrorBlock).toHaveClass('d-none');
	expect(elements.agreementErrorBlock).toHaveClass('d-none');

	expect(elements.emailInput).not.toHaveClass('input-error');
	expect(elements.passwordInput).not.toHaveClass('input-error');
	expect(elements.agreementCheckbox).not.toHaveClass('input-error');

	expect(elements.agreementCheckbox).not.toBeChecked()
	expect(elements.submitButton).toHaveAttribute('disabled');

	await userEvent.type(elements.emailInput, 'ya.ru');
	expect(elements.emailInput).toHaveClass('input-error');
	expect(elements.emailErrorBlock).not.toHaveClass('d-none');
	expect(screen.queryByText('Введите корректный email')).toBeInTheDocument();

	await userEvent.type(elements.passwordInput, '123');
	expect(elements.passwordInput).toHaveClass('input-error');
	expect(elements.passwordErrorBlock).not.toHaveClass('d-none');
	expect(screen.queryByText('Пароль не может быть короче 6-и символов')).toBeInTheDocument();

	await userEvent.clear(elements.emailInput);
	await userEvent.type(elements.emailInput, 'ya@ya.ru');
	expect(elements.emailInput).not.toHaveClass('input-error');
	expect(elements.emailErrorBlock).toHaveClass('d-none');

	await userEvent.clear(elements.passwordInput);
	await userEvent.type(elements.passwordInput, '123456');
	expect(elements.passwordInput).not.toHaveClass('input-error');
	expect(elements.passwordErrorBlock).toHaveClass('d-none');

	await userEvent.click(elements.agreementCheckbox);
	expect(elements.agreementCheckbox).not.toHaveClass('input-error');
	expect(elements.agreementErrorBlock).toHaveClass('d-none');
	expect(elements.agreementCheckbox).toBeChecked()
});

test('Проверка блокировки и разблокировки кнопки', async () => {
	expect(elements.submitButton).toHaveAttribute('disabled');

	await userEvent.type(elements.emailInput, 'ya.ru');
	await userEvent.type(elements.passwordInput, '123');
	expect(elements.submitButton).toHaveAttribute('disabled');

	await userEvent.clear(elements.emailInput);
	await userEvent.type(elements.emailInput, 'ya@ya.ru');
	expect(elements.submitButton).toHaveAttribute('disabled');

	await userEvent.clear(elements.emailInput);
	await userEvent.type(elements.emailInput, 'ya@ya.ru');
	await userEvent.click(elements.agreementCheckbox);
	expect(elements.submitButton).toHaveAttribute('disabled');

	await userEvent.clear(elements.passwordInput);
	await userEvent.type(elements.passwordInput, '123456');
	expect(elements.submitButton).not.toHaveAttribute('disabled');

	await userEvent.clear(elements.emailInput);
	await userEvent.clear(elements.passwordInput);
	await userEvent.click(elements.agreementCheckbox);
	expect(elements.submitButton).toHaveAttribute('disabled');

	await userEvent.type(elements.emailInput, 'ya@ya.ru');
	expect(elements.submitButton).toHaveAttribute('disabled');

	await userEvent.type(elements.passwordInput, '123456');
	await userEvent.click(elements.agreementCheckbox);
	expect(elements.submitButton).not.toHaveAttribute('disabled');
});
