import React, { ReactElement, useEffect } from 'react'
import Navbar from './components/navbar.component'
import { Route, Routes } from 'react-router-dom'
import UserAuthForm from './pages/userAuthForm.page'
import { UserAuthTypeEnum } from './pages/enums/UserAuthType.enum'
import { getFromSession } from './common/session'

export const UserContext = React.createContext<{
	userAuth: Record<string, unknown>
	setUserAuth: (data: Record<string, unknown>) => void
}>({
	userAuth: {},
	setUserAuth: () => {},
})

const App = (): ReactElement => {
	const [userAuth, setUserAuth] = React.useState({})

	useEffect(() => {
		const user = getFromSession('user')
		setUserAuth(user ? JSON.parse(user) : { access_token: null })
	}, [])

	return (
		<UserContext.Provider value={{ userAuth, setUserAuth }}>
			<Routes>
				<Route path="/" element={<Navbar />}>
					<Route
						path="login"
						element={<UserAuthForm type={UserAuthTypeEnum.LOGIN} />}
					/>
					<Route
						path="register"
						element={
							<UserAuthForm type={UserAuthTypeEnum.REGISTER} />
						}
					/>
					<Route path="*" element={<div>404</div>} />
				</Route>
			</Routes>
		</UserContext.Provider>
	)
}

export default App
