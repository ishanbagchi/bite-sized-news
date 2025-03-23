import {
	ALL_FIELDS_REQUIRED_ERROR,
	EMAIL_REGEX,
	INVALID_EMAIL_ERROR,
	INVALID_NAME_ERROR,
	INVALID_PASSWORD_ERROR,
	PASSWORD_REGEX,
} from '../../common/constants/validation.constants'
import { ValidationStatusEnum } from '../../common/enums/ValidationStatus.enum'
import { ValidationModel } from '../../common/models/ValidationModel.type'
import { getValidationError } from '../../common/utils/validation.util'
import * as authPageConstants from '../../common/constants/authPage.constants'

export const authPageConstantsConfig = (isTypeLogin: boolean) => {
	const loginRegisterConstants = isTypeLogin
		? {
				questionText: authPageConstants.LOGIN_FORM_QUESTION,
				linkText: authPageConstants.LOGIN_FORM_LINK_TEXT,
				linkTarget: authPageConstants.LOGIN_ROUTE,
				submitButtonText: authPageConstants.LOGIN_SUBMIT_BUTTON_TEXT,
				headerText: authPageConstants.LOGIN_HEADER_TEXT,
		  }
		: {
				questionText: authPageConstants.REGISTER_FORM_QUESTION,
				linkText: authPageConstants.REGISTER_FORM_LINK_TEXT,
				linkTarget: authPageConstants.REGISTER_ROUTE,
				submitButtonText: authPageConstants.REGISTER_SUBMIT_BUTTON_TEXT,
				headerText: authPageConstants.REGISTER_HEADER_TEXT,
		  }
	return {
		...loginRegisterConstants,
		namePlaceholder: authPageConstants.NAME_PLACEHOLDER,
		emailPlaceholder: authPageConstants.EMAIL_PLACEHOLDER,
		passwordPlaceholder: authPageConstants.PASSWORD_PLACEHOLDER,
		googleLoginButtonText: authPageConstants.GOOGLE_LOGIN_BUTTON_TEXT,
	}
}

export const registerFormValidation = (
	email: string,
	name: string,
	password: string,
): ValidationModel => {
	const validations = [
		{
			condition: !name || !email || !password,
			error: ALL_FIELDS_REQUIRED_ERROR,
		},
		{ condition: name?.length < 3, error: INVALID_NAME_ERROR },
		{ condition: !EMAIL_REGEX.test(email), error: INVALID_EMAIL_ERROR },
		{
			condition: !PASSWORD_REGEX.test(password),
			error: INVALID_PASSWORD_ERROR,
		},
	]

	for (const { condition, error } of validations) {
		if (condition) return getValidationError(error)
	}

	return { status: ValidationStatusEnum.SUCCESS }
}

export const loginFormValidation = (
	email: string,
	password: string,
): ValidationModel => {
	const validations = [
		{ condition: !email || !password, error: ALL_FIELDS_REQUIRED_ERROR },
		{ condition: !EMAIL_REGEX.test(email), error: INVALID_EMAIL_ERROR },
	]

	for (const { condition, error } of validations) {
		if (condition) return getValidationError(error)
	}

	return { status: ValidationStatusEnum.SUCCESS }
}

export const getFormContent = (): {
	name: string
	email: string
	password: string
} => {
	const formElement = document.getElementById(
		'user-auth-form',
	) as HTMLFormElement
	const from = new FormData(formElement)
	const formData: Record<string, FormDataEntryValue> = {}

	for (const [key, value] of from.entries()) {
		formData[key] = value
	}

	const name = formData.name as string
	const email = formData.email as string
	const password = formData.password as string

	return {
		name,
		email,
		password,
	}
}
