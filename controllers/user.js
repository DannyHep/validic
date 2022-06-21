import got from "got";

export default function getAllUsers(req, res) {
  console.log("here");
  console.log(req.query, "data");
  const { orgId, token } = req.query(async () => {
    try {
      const response = await got(
        `https://api.v2.validic.com/organizations/${orgId}/users?token=${token}`
      );
      console.log(response.body);
      //=> '<!doctype html> ...'
    } catch (error) {
      console.log(error.response.body);
      //=> 'Internal server error ...'
    }
  })();

  // https://api.v2.validic.com/organizations/{{ORGID}}/users?token={{TOKEN}}
}
