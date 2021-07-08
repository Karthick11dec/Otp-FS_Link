import { Link, useHistory } from 'react-router-dom';
import React, { useState } from 'react';

const VerifyOTP = () => {

	const [mail, setmail] = useState('');
	const [Otp, setOpt] = useState('');
	const [isLoading, setLoading] = useState(false);

	const history = useHistory();

	const verifyData = async () => {

		if (!mail || !Otp) {

			const M = window.M;
			M.toast({ html: 'Input Should not be empty..!' });

		}
		else {

			if (!mail.includes('@') || !mail.includes('.com')) {

				const M = window.M;
				M.toast({ html: 'Invalid Email..!' });

			} else if (Otp.toString().length !== 6) {

				const M = window.M;
				M.toast({ html: 'OTP should containes 6 digits..!' });

			} else {

				setLoading(true);

				let data = await fetch('https://opt-manager.herokuapp.com/verify', {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: mail,
						otp: Otp
					})
				})
				let res = await data.json();
				if (res.result === true) {

					const M = window.M;
					M.toast({ html: 'OTP Matched..!' });
					setTimeout(() => {
						window.location.replace("https://www.google.com/");
					}, 3000);

				}
				else {

					const M = window.M;
					M.toast({ html: `${res.message}..!` });
					setTimeout(() => {
						history.replace('/generate');
					}, 3000);

				}
				setLoading(false);
			}
		}
	};


	return (
		<div className='verify-otp'>
			<div className='generate-otp container'>
				<div className='row'>
					<div className='col l8 offset-l2 s10 offset-s1'>
						<div className='card generate-card '>
							<div className='card-content'>
								<div className='input-field '>
									<input
										id='email'
										type='email'
										className='validate'
										value={mail}
										onChange={(e) => setmail(e.target.value)}
									/>
									<label htmlFor='email'>Email</label>
								</div>
								<div className='input-field '>
									<input
										id='otp'
										type='number'
										className='validate'
										value={Otp}
										onChange={(e) => setOpt(e.target.value)}
									/>
									<label htmlFor='otp'>OTP</label>
								</div>
								<div className='center'>
									<Link className='waves-effect waves-light btn ' onClick={verifyData} disabled={isLoading ? true : false} >
										Verify OTP
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VerifyOTP;
