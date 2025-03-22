export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}$/

export const ALL_FIELDS_REQUIRED_ERROR = 'All fields are required'
export const INVALID_NAME_ERROR = 'Name must be at least 3 characters long'
export const INVALID_EMAIL_ERROR = 'Invalid email address'
export const INVALID_PASSWORD_ERROR =
	'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number'

export const USER_LOGIN_SUCCESS = 'User logged in successfully'
export const USER_REGISTER_SUCCESS = 'User registered successfully'
