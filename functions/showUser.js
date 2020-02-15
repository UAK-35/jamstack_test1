require('dotenv').config();
const faunadb = require('faunadb');

const q = faunadb.query;
const client = new faunadb.Client({
	sectet: process.env.FAUNADB
});

module.exports.handler = async event => {
	const path = event.queryStringParameters.id.replace('/', '');
		
	try {
		const queryResponse = await client.query(
			q.Get(
				q.Match(
					q.Index('user_by_path'), path
				)
			)
		);
		const response = {
			statusCode: 200,
			body: JSON.stringify(queryResponse.data)
		}
		return response;
	} catch (error) {
		console.log(error);
		const errorResponse = {
			statusCode: 301,
			headers: {
				Location: '/notfound.html'
			}
		}
		return errorResponse;
	}
}
