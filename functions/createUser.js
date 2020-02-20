require('dotenv').config();
const faunadb = require('faunadb');
const shortid = require('shortid');
const axios = require('axios');
const querystring = require('querystring');

const q = faunadb.query;
const client = new faunadb.Client({
	secret: process.env.FAUNADB
});

module.exports.handler = async event => {
	const submittedData = querystring.parse(event.body);
	const uniquePath = shortid.generate();
	submittedData.path = uniquePath;

	const userInfo = {
		data: submittedData
	};
	console.log('form data = ' + JSON.stringify(userInfo))

	try {
		const queryResponse = await client.query(
			q.Create(
				q.Collection('user_info1'),
				userInfo
			)
		);
		try {
			await axios.post('https://api.netlify.com/build_hooks/5e4ec86bb04c68a3687141f8')
		} catch (error) {
			console.log('Netlify build error...')
		}
		// const response = {
		// 	statusCode: 200,
		// 	body: JSON.stringify(queryResponse),
		// }
		const response = {
			statusCode: 302,
			body: JSON.stringify(queryResponse),
			headers: {
				Location: `/userdtl/${uniquePath}`
			}
		}
		return response;
	} catch (error) {
		console.log(error);
		const errorResponse = {
			statusCode: 400,
			body: JSON.stringify(error)
		}
		return errorResponse;
	}
}

/*
photo
name
email
role
twitter
facebook
linkedin
path
*/
