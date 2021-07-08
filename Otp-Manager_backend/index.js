const express = require('express');
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
// const DBURL = 'mongodb://127.0.0.1:27017';
const DBURL = process.env.DBURL || 'mongodb://127.0.0.1:27017';
const Database = "Otp_Manager";
const Docs = 'Otp';
const PORT = process.env.PORT || 5000;


//--------------------------     coding start's here   ------------------------------------------

const { verifyTime, initialTime } = require("./verify");
const { Automate } = require("./automate");

setInterval(() => {
	Automate();
	// console.log("automative deletion..");
}, 5000);

app.get('/', async (req, res) => {
	res.send("This is from our awesome OTP backend server...");
})

app.post('/generate', async (req, res) => {
	try {
		const client = await mongoClient.connect(DBURL);
		const db = client.db(Database);
		const otp = Math.random().toString(10).split('.')[1].slice(0, 6);
		let datas = await db.collection(Docs).insertOne(
			{
				email: req.body.email,
				otp: otp,
				expiry: initialTime(new Date().toLocaleTimeString()),
				time: new Date().toLocaleTimeString()
			}
		);
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL,
				pass: process.env.PASSWORD,
			},
		});

		const mailOption = {
			from: process.env.EMAIL,
			to: req.body.email,
			subject: 'OTP Manager',
			text: 'Hi sir/madam',
			html: `
                       <p>Your OTP is for OTP Manager App is</p>
                       <h3>${otp}</h3>
                       <p>this OTP will be valid only <b>5 minutes</b> at the time of getting this mail</p>`
		};
		transporter.sendMail(mailOption, (err, data) => {
			if (data) {
				res.status(200).json({ message: 'created.', datas });
			} else if (err) {
				res.status(400).json({ err })
			}
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: 'something went wrong.' });
	}
});


app.post('/verify', async (req, res) => {
	try {
		const client = await mongoClient.connect(DBURL);
		const db = client.db(Database);
		const user = await db.collection(Docs).findOne({ email: req.body.email, otp: req.body.otp });
		if (user) {
			if (verifyTime(new Date().toLocaleTimeString(), user.time, user.expiry) === "valid") {
				await db.collection(Docs).findOneAndDelete({ otp: req.body.otp });
				res.status(200).json({ message: 'OTP Matched.', result: true });
			} else {
				res.status(400).json({ message: 'Otp Expired...Please genarate a new otp.', result: false });
			}
		} else {
			res.status(400).json({ message: 'Otp Expired...Please genarate a new otp.', result: false });
		}
	} catch (error) {
		console.log(error);
		res.json({ message: 'something went wrong.' });
	}
});

app.listen(PORT, () => console.log(`:::server started on port ${PORT}:::`));
