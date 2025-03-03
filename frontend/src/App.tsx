import { ReactElement } from 'react'
import Navbar from './components/navbar.component'
import { Route, Routes } from 'react-router-dom'

const App = (): ReactElement => {
	return (
		<Routes>
			<Route path="/" element={<Navbar />}>
				<Route path="login" element={<div>login</div>} />
				<Route path="*" element={<div>404</div>} />
			</Route>
		</Routes>
	)
}

export default App
