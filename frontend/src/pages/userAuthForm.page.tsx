import { useContext, useState } from 'react'
import InputBox from '../components/input.component'
import { UserAuthTypeEnum } from './enums/UserAuthType.enum'
import {
	authPageConstantsConfig,
	getFormContent,
	loginFormValidation,
	registerFormValidation,
} from './utils/userAuthForm.util'
import { Link, Navigate, To } from 'react-router-dom'
import AnimationWrapper from '../common/page-animation'
import { Toaster, toast } from 'react-hot-toast'
import { ValidationStatusEnum } from '../common/enums/ValidationStatus.enum'
import { useUserAuth } from '../apis/authRoutes.api'
import { LOWER_OR } from '../common/constants/common.constants'
import { UserContext } from '../App'
const googleIcon = new URL('../images/google.png', import.meta.url).href

interface Props {
	type: UserAuthTypeEnum
}

const UserAuthForm: React.FC<Props> = ({ type }) => {
	const {
		userAuth: { access_token },
		setUserAuth,
	} = useContext(UserContext)

	const isTypeLogin = type === UserAuthTypeEnum.LOGIN
	const authPageConfig = authPageConstantsConfig(isTypeLogin)
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)

	const renderRedirectSection = (
		questionText: string,
		linkText: string,
		linkTarget: To,
	) => (
		<p className="mt-6 text-dark-grey text-xl text-center">
			{questionText}
			<Link to={linkTarget} className="underline text-black text-xl ml-1">
				{linkText}
			</Link>
		</p>
	)

	const renderLoginRegisterRedirectSection = renderRedirectSection(
		authPageConfig.questionText,
		authPageConfig.linkText,
		authPageConfig.linkTarget,
	)

	const renderOrDivider = (
		<div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold ">
			<hr className="w-1/2 border-black" />
			<p>{LOWER_OR}</p>
			<hr className="w-1/2 border-black" />
		</div>
	)

	const renderNameInput = !isTypeLogin ? (
		<InputBox
			name="name"
			type="text"
			placeholder={authPageConfig.namePlaceholder}
			leftIcon="fi-rr-user"
		/>
	) : null

	const renderEmailInput = (
		<InputBox
			name="email"
			type="email"
			placeholder={authPageConfig.emailPlaceholder}
			leftIcon="fi-rr-at"
		/>
	)

	const renderPasswordInput = (
		<InputBox
			name="password"
			type={isPasswordVisible ? 'text' : 'password'}
			placeholder={authPageConfig.passwordPlaceholder}
			leftIcon="fi-rr-lock"
			rightIcon={`fi-rr-eye${isPasswordVisible ? '-crossed' : ''}`}
			onRightIconClick={() => setIsPasswordVisible((prev) => !prev)}
		/>
	)

	const handleSubmitClick = async (
		event: React.MouseEvent,
	): Promise<void> => {
		event.preventDefault()
		const { name, email, password } = getFormContent()

		const validStatus = isTypeLogin
			? loginFormValidation(email, password)
			: registerFormValidation(email, name, password)

		if (validStatus.status !== ValidationStatusEnum.SUCCESS) {
			toast.error(validStatus.message)
			return
		}

		useUserAuth(type)(
			{
				name,
				email,
				password,
			},
			setUserAuth,
		)
	}

	const renderSubmitButton = (
		<button
			type="submit"
			className="btn-dark center mt-14"
			onClick={handleSubmitClick}
		>
			{authPageConfig.submitButtonText}
		</button>
	)

	const renderContinueWithGoogleButton = (
		<button className="btn-dark flex items-center justify-center gap-4 w-[90%] center">
			<img src={googleIcon} alt="" className="w-6" />
			<span>{authPageConfig.googleLoginButtonText}</span>
		</button>
	)

	const renderHeader = (
		<h1 className="text-4xl font-gelasio text-center capitalize mb-24">
			{authPageConfig.headerText}
		</h1>
	)

	return access_token ? (
		<Navigate to="/" replace={true} />
	) : (
		<AnimationWrapper keyValue={type}>
			<section className="h-cover flex items-center justify-center">
				<Toaster />
				<form
					id="user-auth-form"
					action=""
					className="w-[80%] max-w-[400px]"
				>
					{renderHeader}
					{renderNameInput}
					{renderEmailInput}
					{renderPasswordInput}
					{renderSubmitButton}

					{renderOrDivider}
					{renderContinueWithGoogleButton}
					{renderLoginRegisterRedirectSection}
				</form>
			</section>
		</AnimationWrapper>
	)
}

export default UserAuthForm
