import { Link, useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const GenerateOTP = () => {

	const [mail, setmail] = useState('');
	const [isLoading, setLoading] = useState(false);

	const history = useHistory();

	useEffect(() => {
		const M = window.M;
		M.AutoInit();
	});

	const handleGenerateOTP = async () => {

		if (!mail) {

			const M = window.M;
			M.toast({ html: 'Input Should not be empty..!' });

		}
		else {

			if (mail.includes('@') && mail.includes('.com')) {

				setLoading(true);

				let data = await fetch('https://opt-manager.herokuapp.com/generate', {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: mail,
						time : new Date().toLocaleTimeString()
					})
				})
				let res = await data.json();
				if (res.datas) {

					const M = window.M;
					M.toast({ html: 'OTP has been sent to your mail..!' });
					setLoading(false);
					setTimeout(() => {
						history.push('/verify');
					}, 2000);

				}
				else {

					const M = window.M;
					M.toast({ html: `${res.message}..!` });

				}

			} else {

				const M = window.M;
				M.toast({ html: 'Invalid Email..!' });

			}
		}
	};


	return (
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
							<div className='center'>
								<Link
									to='#'
									className='waves-effect waves-light btn '
									onClick={handleGenerateOTP}
									disabled={isLoading ? true : false}
								>
									Generate OTP
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GenerateOTP;
