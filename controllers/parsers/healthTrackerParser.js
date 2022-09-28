import { filterSummaryData } from "../utils.js";

export const healthTrackerParser = async (validicData, dbData) => {
  //   console.log(validicData, "healthTrackerParser");
  // console.log(dbData, "healthTrackerParser");

  return {
    summary: filterSummaryData(validicData, dbData),
    // {
    //   steps: [dbData.steps.contact(validicData.data)],
    //   distance: [],
    //   energyBurned: [],
    //   restingHeartRate: [],
    // },
    circulatoryHealth: [],
    respiratoryHealth: [],
    measurements: [],
    myDiabetes: [],
    myHypertension: [],
    myHeartHealth: [],
    stopSmoking: [],
    myPain: [],
    drinkLess: [],
    myMood: [],
  };
};
