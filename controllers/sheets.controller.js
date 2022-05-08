const { google } = require('googleapis');

exports.sheetsPost = async (req, res) => {
	const {
		name,
		email,
		phone,
		department,
		year,
		college,
		event,
		workshops,
		gaming,
		paper,
		abstract,
		presentation
	} = req.body;

	const auth = new google.auth.GoogleAuth({
		keyFile: './credentials.json',
		scopes: 'https://www.googleapis.com/auth/spreadsheets'
	});

	const client = await auth.getClient();

	const googleSheets = google.sheets({ version: 'v4', auth: client });
	if (event != 'Paper Bytes') {
		await googleSheets.spreadsheets.values
			.append({
				auth,
				spreadsheetId: '1LZsclGLfG7tWSvqLhoRHaXBGbRhjdRziSSwokBlA__0',
				range:
					event === 'Technical and Non-Technical'
						? 'Technical and Non-Technical'
						: event === 'Trojans CTF'
						? 'Trojans CTF'
						: event === 'Gaming'
						? 'Gaming'
						: 'Workshops',
				valueInputOption: 'USER_ENTERED',
				resource: {
					values: [
						[
							name,
							email,
							phone,
							department,
							year,
							college,
							event === 'Workshops'
								? workshops
								: event === 'Gaming'
								? gaming
								: event,
							false,
							new Date().toDateString()
						]
					]
				}
			})
			.then((response) => {
				res.status(200).json('ok');
			});
	} else {
		await googleSheets.spreadsheets.values
			.append({
				auth,
				spreadsheetId: '1LZsclGLfG7tWSvqLhoRHaXBGbRhjdRziSSwokBlA__0',
				range: 'Paper Bytes',
				valueInputOption: 'USER_ENTERED',
				resource: {
					values: [
						[
							name,
							email,
							phone,
							department,
							year,
							college,
							event,
							paper,
							abstract,
							presentation,
							false,
							new Date().toDateString()
						]
					]
				}
			})
			.then((response) => {
				res.status(200).json('ok');
			});
	}
};
