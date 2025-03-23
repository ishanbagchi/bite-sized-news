import { FC, useContext } from 'react'
import AnimationWrapper from '../common/page-animation'
import { Link } from 'react-router-dom'
import { UserContext } from '../App'
import { removeFromSession } from '../common/session'
import { LOGOUT_BUTTON_TEXT } from '../common/constants/navbar.constants'
import { AT_SYMBOL } from '../common/constants/common.constants'
import { getUserNavigationList } from './utils/userNavigationPanel.util'

interface Props {}

const UserNavigationPanel: FC<Props> = ({}) => {
	const {
		userAuth: { username },
		setUserAuth,
	} = useContext(UserContext)

	const handleOnLogoutButtonClick = () => {
		removeFromSession('user')
		setUserAuth({ access_token: null })
	}

	const renderLogoutButton = (
		<button
			className="text-left p-4  hover:bg-grey w-full pl-8 py-4"
			onClick={handleOnLogoutButtonClick}
		>
			<h1 className="font-bold text-xl mg-1">{LOGOUT_BUTTON_TEXT}</h1>
			<p className="text-dark-grey ">
				{AT_SYMBOL}
				{`${username}`}
			</p>
		</button>
	)

	const renderNavLinks = getUserNavigationList(username as string).map(
		({ link, text, image, linkClass }) => (
			<Link
				key={link}
				to={link}
				className={`link pl-8 py-4 ${linkClass ?? ''}`}
			>
				{image && <i className={image} />}
				{text}
			</Link>
		),
	)

	return (
		<AnimationWrapper
			className="absolute right-0 z-50"
			transition={{ duration: 0.2, y: { duration: 0.1 } }}
		>
			<div className="bg-white absolute right-0 border border-grey w-60 duration-200">
				{renderNavLinks}
				<span className="absolute border-t border-grey ml-6 w-[100%]" />
				{renderLogoutButton}
			</div>
		</AnimationWrapper>
	)
}

export default UserNavigationPanel
