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
    const apiURL = process.env.PATIENTAIDE_LOGIN_API;
    const updateValidicStatusResponse = await got.put(
      `${apiURL}/user/updateValidicStatus`,
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
    res.send(response.body);
  } catch (error) {
    console.log(error);
  }
}

export async function getValidicFitnessData(req, res) {
  const { orgId, token, uid } = req.body;
  try {
    const todayDate = new Date();
    const todayDateStr = todayDate.toISOString().slice(0, 10);
    const startDate = new Date(new Date().setDate(todayDate.getDate() - 30))
      .toISOString()
      .slice(0, 10);
    const measurementsResponse = await got.get(
      `https://api.v2.validic.com/organizations/${orgId}/users/${uid}/measurements?start_date=${startDate}&&end_date=${todayDateStr}&token=${token}`
    );
    const nutritionResponse = await got.get(
      `https://api.v2.validic.com/organizations/${orgId}/users/${uid}/nutrition?start_date=${startDate}&&end_date=${todayDateStr}&token=${token}`
    );
    const sleepResponse = await got.get(
      `https://api.v2.validic.com/organizations/${orgId}/users/${uid}/sleep?start_date=${startDate}&&end_date=${todayDateStr}&token=${token}`
    );
    const summaryResponse = await got.get(
      `https://api.v2.validic.com/organizations/${orgId}/users/${uid}/summaries?start_date=${startDate}&&end_date=${todayDateStr}&token=${token}`
    );
    const workoutResponse = await got.get(
      `https://api.v2.validic.com/organizations/${orgId}/users/${uid}/workouts?start_date=${startDate}&&end_date=${todayDateStr}&token=${token}`
    );
    const intradayResponse = await got.get(
      `https://api.v2.validic.com/organizations/${orgId}/users/${uid}/intraday?start_date=${startDate}&&end_date=${todayDateStr}&token=${token}`
    );

    const responseData = {
      measurements: JSON.parse(measurementsResponse.body),
      nutrition: JSON.parse(nutritionResponse.body),
      sleep: JSON.parse(sleepResponse.body),
      summary: JSON.parse(summaryResponse.body),
      workout: JSON.parse(workoutResponse.body),
      intraday: JSON.parse(intradayResponse.body),
      startDate: startDate,
      todayDateStr: todayDateStr,
    };

    res.send(responseData);
  } catch (error) {
    console.log(error);
  }
}
