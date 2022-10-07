import {
  filterBodyMeasurements,
  filterCirculatoryHealth,
  filterDrinkLess,
  filterFitnessData,
  filterMyDiabetes,
  filterMyHeartHealth,
  filterMyHypertension,
  filterMyMood,
  filterMyPain,
  filterMySleep,
  filterNutritionData,
  filterRespiratoryHealth,
  filterStopSmoking,
} from "../utils.js";

export const healthTrackerParser = (validicData, dbData) => {
  return {
    fitness: filterFitnessData(validicData, dbData),
    nutrition: filterNutritionData(validicData, dbData),
    circulatoryHealth: filterCirculatoryHealth(validicData, dbData),
    respiratoryHealth: filterRespiratoryHealth(validicData, dbData),
    bodyMeasurements: filterBodyMeasurements(validicData, dbData),
    myDiabetes: filterMyDiabetes(validicData, dbData),
    myHypertension: filterMyHypertension(validicData, dbData),
    myHeartHealth: filterMyHeartHealth(validicData, dbData),
    stopSmoking: filterStopSmoking(dbData),
    myPain: filterMyPain(dbData),
    drinkLess: filterDrinkLess(dbData),
    myMood: filterMyMood(dbData),
    mySleep: filterMySleep(validicData),
  };
};
