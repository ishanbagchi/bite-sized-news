import { useState } from 'react'
import InputBox from '../components/input.component'
import { UserAuthTypeEnum } from './enums/UserAuthType.enum'
import { getHeaderText, getSubmitButtonText } from './utils/userAuthForm.util'
import { Link, To } from 'react-router-dom'
const googleIcon = new URL('../images/google.png', import.meta.url).href

interface Props {
	type: UserAuthTypeEnum
}

const UserAuthForm: React.FC<Props> = ({ type }) => {
	const isTypeLogin = type === UserAuthTypeEnum.LOGIN
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
		isTypeLogin ? `Don't have an account?` : `Already have an account?`,
		isTypeLogin ? `Join Us Today` : `Login Here.`,
		isTypeLogin ? `/register` : `/login`,
	)

	const renderOrDivider = (
		<div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold ">
			<hr className="w-1/2 border-black" />
			<p>or</p>
			<hr className="w-1/2 border-black" />
		</div>
	)

	const renderNameInput = !isTypeLogin ? (
		<InputBox
			name="name"
			type="text"
			placeholder="Full Name"
			leftIcon="fi-rr-user"
		/>
	) : null

	const renderEmailInput = (
		<InputBox
			name="email"
			type="email"
			placeholder="Email"
			leftIcon="fi-rr-at"
		/>
	)

	const renderPasswordInput = (
		<InputBox
			name="password"
			type={isPasswordVisible ? 'text' : 'password'}
			placeholder="Password"
			leftIcon="fi-rr-lock"
			rightIcon={`fi-rr-eye${isPasswordVisible ? '-crossed' : ''}`}
			onRightIconClick={() => setIsPasswordVisible((prev) => !prev)}
		/>
	)

	const renderSubmitButton = (
		<button type="submit" className="btn-dark center mt-14">
			{getSubmitButtonText(type)}
		</button>
	)

	const renderContinueWithGoogleButton = (
		<button className="btn-dark flex items-center justify-center gap-4 w-[90%] center">
			<img src={googleIcon} alt="" className="w-6" />
			<span>Continue with Google</span>
		</button>
	)

	const renderHeader = (
		<h1 className="text-4xl font-gelasio text-center capitalize mb-24">
			{getHeaderText(type)}
		</h1>
	)

	return (
		<section className="h-cover flex items-center justify-center">
			<form action="" className="w-[80%] max-w-[400px]">
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
	)
}

export default UserAuthForm
