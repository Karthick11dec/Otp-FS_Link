import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import GenerateOTP from './components/GenerateOTP';
import Navbar from './components/Navbar';
import Title from './components/Title';
import VerifyOTP from './components/VerifyOTP';

function App() {
	return (
		<BrowserRouter>
			<Title />
			<Navbar />
			<Switch>
				<Route path='/' exact>
					<GenerateOTP />
				</Route>
				<Route path='/generate' exact>
					<GenerateOTP />
				</Route>
				<Route path='/verify' exact>
					<VerifyOTP />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
