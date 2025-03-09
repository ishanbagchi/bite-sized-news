import { UserAuthTypeEnum } from '../enums/UserAuthType.enum'

export const getHeaderText = (type: UserAuthTypeEnum): string => {
	const headerTextMap = {
		[UserAuthTypeEnum.LOGIN]: 'Welcome Back',
		[UserAuthTypeEnum.REGISTER]: 'Join Us',
	}

	return headerTextMap[type]
}

export const getSubmitButtonText = (type: UserAuthTypeEnum): string => {
	const buttonTextMap = {
		[UserAuthTypeEnum.LOGIN]: 'Login',
		[UserAuthTypeEnum.REGISTER]: 'Register',
	}

	return buttonTextMap[type]
}
