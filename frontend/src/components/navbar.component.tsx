import { Link, Outlet } from 'react-router-dom'
import { ReactElement, useCallback, useState } from 'react'
const logo = new URL('../images/logo.png', import.meta.url).href

const Navbar = (): ReactElement => {
	const [isSearchVisible, setIsSearchVisible] = useState(false)

	const handleOnSearchButtonClick = useCallback(() => {
		setIsSearchVisible((prev) => !prev)
	}, [])

	const renderAppName = (
		<Link to="/" className="flex items-center gap-2">
			<img src={logo} className="w-10" alt="logo" />
			<h1 className="font-bold text-2xl w-[210px] hidden md:block">
				Bite-Sized News
			</h1>
		</Link>
	)

	const renderSearchBox = (
		<div
			className={`absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey/50 py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show ${
				isSearchVisible ? 'show' : 'hide'
			}`}
		>
			<input
				type="search"
				placeholder="Search"
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
				<i className="fi fi-br-search text-xl"></i>
			</button>

			<Link
				to="/editor"
				className="hidden md:flex gap-2 items-center link"
			>
				<i className="fi fi-rr-pen-clip"></i>
				<p>Write</p>
			</Link>

			<Link to="/login" className="btn-dark py-2">
				<p>Login</p>
			</Link>

			<Link to="/register" className="btn-light hidden md:block py-2">
				<p>Sign Up</p>
			</Link>
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
