const { google } = require('googleapis');

exports.sheetsPost = async (req, res) => {
	const { name, email, phone, department, year, college, event } = req.body;
	const auth = new google.auth.GoogleAuth({
		keyFile: './credentials.json',
		scopes: 'https://www.googleapis.com/auth/spreadsheets'
	});

	const client = await auth.getClient();

	const googleSheets = google.sheets({ version: 'v4', auth: client });

	await googleSheets.spreadsheets.values
		.append({
			auth,
			spreadsheetId: '1LZsclGLfG7tWSvqLhoRHaXBGbRhjdRziSSwokBlA__0',
			range:
				event === 'Technical'
					? 'Technical'
					: event === 'Trojans CTF'
					? 'Trojans CTF'
					: event === 'Non-Technical'
					? 'Non-Technical'
					: event === 'Gaming'
					? 'Gaming'
					: 'Workshops',
			valueInputOption: 'USER_ENTERED',
			resource: {
				values: [[name, email, phone, department, year, college, event]]
			}
		})
		.then((response) => {
			res.status(200).json('ok');
		});
};
