require('dotenv').config();
const faunadb = require('faunadb');
const shortid = require('shortid');
const axios = require('axios');
const querystring = require('querystring');

const q = faunadb.query;
const client = new faunadb.Client({
	sectet: process.env.FAUNADB
});

module.exports.handler = async event => {
	const submittedData = querystring.parse(event.body);
	const uniquePath = shortid.generate();
	submittedData.path = uniquePath;
	
	const userInfo = {
		data: submittedData
	};
	
	try {
		const queryResponse = await client.query(
			q.Create(
				q.Collection('user_info1'),
				page
			)
		);
		const response = {
			statusCode: 200,
			body: JSON.stringify(queryResponse)
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
