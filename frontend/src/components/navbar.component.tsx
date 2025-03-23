import { Link, Outlet } from 'react-router-dom'
import { ReactElement, useCallback, useContext, useState } from 'react'
import { UserContext } from '../App'
import UserNavigationPanel from './user-navigation.component'
import * as navbarConstants from '../common/constants/navbar.constants'
import * as routesConstants from '../common/constants/routes.constants'
const logo = new URL('../images/logo.png', import.meta.url).href

const Navbar = (): ReactElement => {
	const [isSearchVisible, setIsSearchVisible] = useState(false)
	const [isNavPanelVisible, setIsNavPanelVisible] = useState(false)

	const toggleNavPanel = useCallback(() => {
		setIsNavPanelVisible((prev) => !prev)
	}, [])

	const handleOnNavPanelBlur = useCallback(() => {
		setTimeout(() => {
			setIsNavPanelVisible(false)
		}, 200)
	}, [])

	const {
		userAuth,
		userAuth: { access_token, profile_img },
		setUserAuth,
	} = useContext(UserContext)

	const handleOnSearchButtonClick = useCallback(() => {
		setIsSearchVisible((prev) => !prev)
	}, [])

	const renderAppName = (
		<Link
			to={routesConstants.HOME_ROUTE}
			className="flex items-center gap-2"
		>
			<img src={logo} className="w-10" alt="logo" />
			<h1 className="font-bold text-2xl w-[210px] hidden md:block">
				{navbarConstants.WEBSITE_NAME}
			</h1>
		</Link>
	)

	const renderSignInButtons = (
		<>
			<Link to={routesConstants.LOGIN_ROUTE} className="btn-dark py-2">
				<p>{navbarConstants.LOGIN_BUTTON_TEXT}</p>
			</Link>

			<Link
				to={routesConstants.REGISTER_ROUTE}
				className="btn-light hidden md:block py-2"
			>
				<p>{navbarConstants.REGISTER_BUTTON_TEXT}</p>
			</Link>
		</>
	)

	const renderDashboardNotification = (
		<>
			<Link to={routesConstants.DASHBOARD_NOTIFICATIONS_ROUTE}>
				<button className="w-12 h-12 rounded-full bg-grey relative hover:bg-black/10 flex items-center justify-center">
					<i className="fi fi-rr-bell text-2xl block mt-1" />
				</button>
			</Link>

			<div className="relative">
				<button
					className="w-12 h-12 mt-1"
					onClick={toggleNavPanel}
					onBlur={handleOnNavPanelBlur}
				>
					<img
						src={profile_img as string}
						className="w-full h-full object-cover rounded-full"
						alt="profile"
					/>
				</button>
				{isNavPanelVisible && <UserNavigationPanel />}
			</div>
		</>
	)

	const renderSearchBox = (
		<div
			className={`absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey/50 py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show ${
				isSearchVisible ? 'show' : 'hide'
			}`}
		>
			<input
				type="search"
				placeholder={navbarConstants.SEARCH_PLACEHOLDER_TEXT}
				className="w-full md:w-auto bg-grey/70 p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey text-black md:pl-12"
			/>
			<i className="fi fi-bs-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
		</div>
	)

	const renderRightSection = (
		<div className="flex items-center gap-3 md:gap-6 ml-auto">
			<button
				className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center"
				onClick={handleOnSearchButtonClick}
			>
				<i className="fi fi-br-search text-xl" />
			</button>

			<Link
				to={routesConstants.EDITOR_ROUTE}
				className="hidden md:flex gap-2 items-center link"
			>
				<i className="fi fi-rr-pen-clip" />
				<p>{navbarConstants.WRITE_BUTTON_TEXT}</p>
			</Link>

			{access_token ? renderDashboardNotification : renderSignInButtons}
		</div>
	)

	return (
		<>
			<nav className="navbar">
				{renderAppName}
				{renderSearchBox}
				{renderRightSection}
			</nav>
			<Outlet />
		</>
	)
}

export default Navbar
