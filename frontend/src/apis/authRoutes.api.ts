import axios from 'axios'
import { UserAuthTypeEnum } from '../pages/enums/UserAuthType.enum'
import toast from 'react-hot-toast'
import {
	USER_LOGIN_SUCCESS,
	USER_REGISTER_SUCCESS,
} from '../common/constants/validation.constants'

export const userLoginApi = ({
	email,
	password,
}: {
	email: string
	password: string
}) => {
	axios
		.post(import.meta.env.VITE_SERVER_DOMAIN + '/api/login', {
			email,
			password,
		})
		.then((res) => {
			sessionStorage.setItem('user', JSON.stringify(res.data))
			toast.success(USER_LOGIN_SUCCESS)
		})
		.catch((err) => toast.error(err.response.data.error))
}

export const userRegisterApi = ({
	name,
	email,
	password,
}: {
	name: string
	email: string
	password: string
}) => {
	axios
		.post(import.meta.env.VITE_SERVER_DOMAIN + '/api/register', {
			fullname: name,
			email,
			password,
		})
		.then((res) => {
			sessionStorage.setItem('user', JSON.stringify(res.data))
			toast.success(USER_REGISTER_SUCCESS)
		})
		.catch((err) => toast.error(err.response.data.error))
}

export const useUserAuth = (type: UserAuthTypeEnum) => {
	switch (type) {
		case UserAuthTypeEnum.LOGIN:
			return userLoginApi
		case UserAuthTypeEnum.REGISTER:
			return userRegisterApi
	}
}
