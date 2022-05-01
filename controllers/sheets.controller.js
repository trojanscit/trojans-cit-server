const { google } = require('googleapis');

exports.sheetsPost = async (req, res) => {
	const {
		name,
		email,
		phone,
		department,
		college,
		event,
		paid,
		transactionID,
		enrollmentDate
	} = req.body;
	const auth = new google.auth.GoogleAuth({
		keyFile: './credentials.json',
		scopes: 'https://www.googleapis.com/auth/spreadsheets'
	});

	const client = await auth.getClient();

	const googleSheets = google.sheets({ version: 'v4', auth: client });

	await googleSheets.spreadsheets.values.append({
		auth,
		spreadsheetId: '1LZsclGLfG7tWSvqLhoRHaXBGbRhjdRziSSwokBlA__0',
		range:
			event === 'technical'
				? 'Technical'
				: event === 'ctf'
				? 'CTF'
				: event === 'non-technical'
				? 'Non-Technical'
				: event === 'games'
				? 'Games'
				: 'Workshops',
		valueInputOption: 'USER_ENTERED',
		resource: {
			values: [
				[
					name,
					email,
					phone,
					department,
					college,
					event,
					paid,
					transactionID,
					enrollmentDate
				]
			]
		}
	});
};
