import { ReactElement } from 'react'
import Navbar from './components/navbar.component'
import { Route, Routes } from 'react-router-dom'
import UserAuthForm from './pages/userAuthForm.page'
import { UserAuthTypeEnum } from './pages/enums/UserAuthType.enum'

const App = (): ReactElement => {
	return (
		<Routes>
			<Route path="/" element={<Navbar />}>
				<Route
					path="login"
					element={<UserAuthForm type={UserAuthTypeEnum.LOGIN} />}
				/>
				<Route
					path="register"
					element={<UserAuthForm type={UserAuthTypeEnum.REGISTER} />}
				/>
				<Route path="*" element={<div>404</div>} />
			</Route>
		</Routes>
	)
}

export default App
