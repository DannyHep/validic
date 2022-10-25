import got from "got";
import HealthTrackerValues from "../models/healthTracker.js";
import { healthTrackerParser } from "./parsers/healthTrackerParser.js";

export async function createNewUser(req, res) {
  const  uid  = req.user._id; // this is Mongo user _ui
  try {
    const token = process.env.VALIDIC_TOKEN;
    const orgId = process.env.NSTFS_VALIDIC_ORGID;
    await got.post(
      `https://api.v2.validic.com/organizations/${orgId}/users?token=${token}`,
      {
        json: {
          uid: uid,
        },
      }
    );
    const localURL = process.env.LOCAL_URL;
    const apiURL = process.env.PATIENTAIDE_LOGIN_API;
    const updateValidicStatusResponse = await got.put(
      `${apiURL}/patAide/updateValidicStatus`,
      {
        json: {
          status: true,
          uid: uid,
        },
      }
    );
    res.send({
      success: true,
    });
  } catch (error) {
    res.send({ message: "Server Error" });
    console.log(error, "error response");
  }
}

export async function getValidicProfile(req, res) {

  const  patientId  = req.user._id; // MONGO_USER_ID
  try {
    const token = process.env.VALIDIC_TOKEN;
    const orgId = process.env.NSTFS_VALIDIC_ORGID;
    const response = await got.get(
      `https://api.v2.validic.com/organizations/${orgId}/users/${patientId}?token=${token}`
    );
    res.send(response.body);
  } catch (error) {
    res.send({ message: "Server Error" });
    console.log(error);
  }
}

export async function getValidicFitnessData(uid) {
  // const { uid } = req.body;
  try {
    const token = process.env.VALIDIC_TOKEN;
    const orgId = process.env.NSTFS_VALIDIC_ORGID;
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
    };

    return responseData;
  } catch (error) {
    res.send({ message: "Server Error" });
    console.log(error);
  }
}

export async function createTrackerMeasurements(req, res) {
  const { PASID } = req.body;

  try {
    const trackerMeasurements = new HealthTrackerValues({ PASID: PASID });

    const response = await trackerMeasurements.save();

    res.send(response);
  } catch (error) {
    res.send({ message: "Server Error" });
    console.log(error);
  }
}

export async function getTrackerMeasurements(PASID) {
  try {
    const trackerMeasurements = await HealthTrackerValues.findOne({
      PASID: PASID,
    });
    return trackerMeasurements;
  } catch (err) {
    res.send({ message: "Server Error" });
    res.send(err);
  }
}

export async function addTrackerData(req, res) {
  const { selectedDataType, newData, selectedCategory } = req.body; // PASID
  const pasID = req.user.PASID
  try {
    const trackerMeasurements = await HealthTrackerValues.findOne({
      PASID: pasID,
    });

    if (selectedDataType === "bloodPressure") {
      trackerMeasurements.circulatoryHealth.bloodPressure.systolic = [
        ...trackerMeasurements.circulatoryHealth.bloodPressure.systolic,
        {
          value: newData.value.systolic,
          date: newData.date,
          time: newData.time,
        },
      ];
      trackerMeasurements.circulatoryHealth.bloodPressure.diastolic = [
        ...trackerMeasurements.circulatoryHealth.bloodPressure.diastolic,
        {
          value: newData.value.diastolic,
          date: newData.date,
          time: newData.time,
        },
      ];
    } else if (selectedCategory === "fitness") {
      if (
        trackerMeasurements[selectedCategory][selectedDataType].find(
          (element) => element.date === newData.date
        )
      ) {
        const dbData = trackerMeasurements[selectedCategory][
          selectedDataType
        ].find((element) => element.date === newData.date);
        const newValue = newData.value;
        const newTime = newData.time;
        dbData.value = dbData.value + newValue;
        dbData.time = newTime;
      } else {
        trackerMeasurements[selectedCategory][selectedDataType] = [
          ...trackerMeasurements[selectedCategory][selectedDataType],
          newData,
        ];
      }
    } else if (selectedCategory === "nutrition") {
      if (
        trackerMeasurements[selectedCategory].find(
          (element) => element.date === newData.date
        )
      ) {
        const dbData = trackerMeasurements[selectedCategory].find(
          (element) => element.date === newData.date
        );
        const newValue = newData.value;
        dbData[selectedDataType].value =
          dbData[selectedDataType].value + newValue;
      } else {
        const nutritionObj = {
          calcium: {
            value: 0,
            unit: "mg/dl",
          },
          carbohydrate: {
            value: 0,
            unit: "g",
          },
          dietary_fiber: {
            value: 0,
            unit: "g",
          },
          energy_consumed: {
            value: 0,
            unit: "kcal",
          },
          fat: {
            value: 0,
            unit: "g",
          },
          protein: {
            value: 0,
            unit: "g",
          },
          saturated_fat: {
            value: 0,
            unit: "g",
          },
          unsaturated_fat: {
            value: 0,
            unit: "g",
          },
          sodium: {
            value: 0,
            unit: "mg",
          },
          sugars: {
            value: 0,
            unit: "g",
          },
          water: {
            value: 0,
            unit: "ml",
          },
          date: newData.date,
        };
        nutritionObj[selectedDataType].value = newData.value;
        trackerMeasurements[selectedCategory] = [
          ...trackerMeasurements[selectedCategory],
          nutritionObj,
        ];
      }
    } else if (selectedDataType == "bloodSodium") {
      trackerMeasurements.myHypertension[selectedDataType] = [
        ...trackerMeasurements.myHypertension[selectedDataType],
        newData,
      ];
    } else if (
      selectedDataType == "cholesterol" ||
      selectedDataType === "ldlCholesterol" ||
      selectedDataType === "hdlCholesterol"
    ) {
      trackerMeasurements.myDiabetes[selectedDataType] = [
        ...trackerMeasurements.myDiabetes[selectedDataType],
        newData,
      ];
    } else if (
      selectedDataType === "waistCircumference" ||
      selectedDataType === "weight"
    ) {
      trackerMeasurements.bodyMeasurements[selectedDataType] = [
        ...trackerMeasurements.bodyMeasurements[selectedDataType],
        newData,
      ];
    } else if (selectedDataType === "restingHeartRate") {
      trackerMeasurements.fitness[selectedDataType] = [
        ...trackerMeasurements.fitness[selectedDataType],
        newData,
      ];
    } else {
      trackerMeasurements[selectedCategory][selectedDataType] = [
        ...trackerMeasurements[selectedCategory][selectedDataType],
        newData,
      ];
    }
    const updatedValue = await trackerMeasurements.save();
    res.send(updatedValue);
  } catch (error) {
    res.send({ message: "Server Error" });
    console.log(error);
  }
}

export async function parsedTrackerData(req, res) {
  const  uid = req.user._id
  const PASID = req.user.PASID

  try {
    const validicData = await getValidicFitnessData(uid);
    const dbTrackerData = await getTrackerMeasurements(PASID);
    const parsedTrackingData = healthTrackerParser(validicData, dbTrackerData);
    res.send(parsedTrackingData);
  } catch (error) {
    console.log(error);
  }
}
