// {
//   users: [
//     'user1',
//     'user2'
//   ]
// }

require('dotenv').config();
const faunadb = require('faunadb');

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB
});

module.exports = () => {
  return new Promise((resolve, reject) => {
    client.query(
      q.Paginate(
        q.Match(
          q.Ref('indexes/all_user_info1')
        ),
        { size: 100 }
      )
    ).then(response => {
      const users = response.data;
      const getAllDataQuery = users.map(userRef => {
        return q.Get(userRef);
      });
      return client.query(getAllDataQuery).then(returnVal => {
        resolve(returnVal);
      })
    })
  }).catch(error => {
    console.error({error});
    reject(error);
  })
}
