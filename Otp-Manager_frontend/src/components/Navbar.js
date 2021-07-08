import { Link } from 'react-router-dom';
const Navbar = () => {
	return (
		<div className=' container '>
			<div className='navbar '>
				<div className='row center'>
					<div className='col s6'>
						<Link to='/generate' className='nav-items teal-text lighten-2'>
							Generate OTP
						</Link>
					</div>
					<div className='col s6'>
						<Link to='/verify' className='nav-items teal-text lighten-2'>
							Verify OTP
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
