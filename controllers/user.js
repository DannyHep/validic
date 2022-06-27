import got from "got";

// export async function getAllUsers(req, res) {
//   const { orgId, token } = req.query;

//   try {
//     console.log(orgId, token, "token");
//     const response = await got.get(
//       `https://api.v2.validic.com/organizations/${orgId}/users?token=${token}`
//     );
//     console.log(response, "here");
//     res.json({
//       userData: JSON.parse(response.body),
//     });
//     console.log(response.body);
//     //=> '<!doctype html> ...'
//   } catch (error) {
//     console.log(error.response.body, "error");
//     //=> 'Internal server error ...'
//   }
// }

export async function createNewUser(req, res) {
  const { orgId, token, uid } = req.body;
  try {
    const createUserResponse = await got.post(
      `https://api.v2.validic.com/organizations/${orgId}/users?token=${token}`,
      {
        json: {
          uid: uid,
          location: {
            timezone: "America/New_York",
            country_code: "GB",
          },
        },
      }
    );

    const localURL = process.env.LOCAL_URL;
    const updateValidicStatusResponse = await got.put(
      `${localURL}/user/updateValidicStatus`,
      {
        json: {
          status: true,
          uid: uid,
        },
      }
    );
    res.send({
      updateValidicStatusResponse: updateValidicStatusResponse,
      createUserResponse: createUserResponse.body,
    });
  } catch (error) {
    console.log(error, "error response");
  }
}

export async function getValidicProfile(req, res) {
  const { orgId, token, patientId } = req.body;
  try {
    const response = await got.get(
      `https://api.v2.validic.com/organizations/${orgId}/users/${patientId}?token=${token}`
    );
    console.log(response.body);
    res.send(response.body);
  } catch (error) {
    console.log(error);
  }
}

export async function getValidicFitnessData(req, res) {
  const { orgId, token, uid } = req.body;
  console.log(orgId, token, uid);
  try {
    const measurementsResponse = await got.get(
      `https://api.v2.validic.com/organizations/${orgId}/users/${uid}/measurements?token=${token}`
    );
    const nutritionResponse = await got.get(
      `https://api.v2.validic.com/organizations/${orgId}/users/${uid}/nutrition?token=${token}`
    );
    const sleepResponse = await got.get(
      `https://api.v2.validic.com/organizations/${orgId}/users/${uid}/sleep?token=${token}`
    );
    const summaryResponse = await got.get(
      `https://api.v2.validic.com/organizations/${orgId}/users/${uid}/summaries?token=${token}`
    );

    res.send({
      measurements: JSON.parse(measurementsResponse.body),
      nutrition: JSON.parse(measurementsResponse.body),
      sleep: JSON.parse(sleepResponse.body),
      summary: JSON.parse(summaryResponse.body),
    });
  } catch (error) {
    console.log(error);
  }
}
