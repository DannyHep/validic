import moment from "moment/moment.js";

export const filterFitnessData = (validicData, dbData) => {
  const validicSteps = [];
  const validicDistance = [];
  const validicEnergyBurned = [];
  const ValidicrestingHeartRate = [];

  validicData.summary?.data.map((data) => {
    data?.metrics.map((metric) => {
      const values = {
        value: metric.value,
        unit: metric.unit,
        date: moment(data.end_time).format("DD/MM/YYYY"),
        time: moment(data.end_time).format("HH:mm"),
      };
      if (metric.type === "steps") {
        validicSteps.push(values);
      } else if (metric.type === "distance") {
        validicDistance.push(values);
      } else if (metric.type === "energy_burned") {
        validicEnergyBurned.push(values);
      } else if (metric.type === "resting_heart_rate") {
        ValidicrestingHeartRate.push(values);
      }
    });
  });

  const combineDbValidic = (validicData, dbData, type) => {
    let concatDbAndValidic = [];

    if (validicData && dbData) {
      validicData.map((validicMetric) => {
        // if validic date and db date are the same
        if (
          dbData.fitness[type].some((e) => {
            return e.date === validicMetric.date;
          })
        ) {
          // Find the db value with the same date
          const dbDataToPush = dbData.fitness[type].find((e) => {
            return e.date === validicMetric.date;
          });
          // Add the db value and the validic value together
          const value = {
            value: dbDataToPush.value + validicMetric.value,
            unit: dbDataToPush.unit,
            date: validicMetric.date,
            time: validicMetric.time,
          };
          concatDbAndValidic.push(value);
        } else {
          concatDbAndValidic.push(validicMetric);
        }
      });
      dbData.fitness[type].map((dbMetric) => {
        if (
          concatDbAndValidic.some((e) => e.date === dbMetric.date) === false
        ) {
          concatDbAndValidic.push(dbMetric);
        }
      });
    } else if (dbData) {
      concatDbAndValidic = dbData;
    } else if (validicData) {
      concatDbAndValidic = validicData;
    }

    return concatDbAndValidic.sort((a, b) => {
      const newADate = a.date.split("/").reverse().join("/");
      const newBDate = b.date.split("/").reverse().join("/");
      return new Date(newADate) - new Date(newBDate);
    });
  };

  return {
    steps: combineDbValidic(validicSteps, dbData, "steps"),
    distance: combineDbValidic(validicDistance, dbData, "distance"),
    energyBurned: combineDbValidic(validicEnergyBurned, dbData, "energyBurned"),
  };
};

// Nutrition functions
const addValidicDate = (validicData) => {
  const dayData = [];
  //If date does not match - validic data to array
  validicData.metrics.map((metric) => {
    const combinedValue = {
      name: metric.type,
      value: metric.value,
      unit: metric.unit,
    };
    dayData.push(combinedValue);
  });
  const date = moment(validicData.end_time).format("DD/MM/YYYY");
  dayData.push({ date: date });
  return dayData;
};

const addDbData = (nutritionData) => {
  const dbDayData = [];
  for (let dbDataValue in nutritionData) {
    switch (dbDataValue) {
      case "calcium":
      case "carbohydrate":
      case "dietary_fiber":
      case "energy_consumed":
      case "fat":
      case "protein":
      case "saturated_fat":
      case "unsaturated_fat":
      case "sodium":
      case "sugars":
      case "water":
        const combinedValue = {
          name: dbDataValue,
          value: nutritionData[dbDataValue].value,
          unit: nutritionData[dbDataValue].unit,
        };
        dbDayData.push(combinedValue);
        break;
    }
  }
  const date = nutritionData.date;
  dbDayData.push({ date: date });
  return dbDayData;
};

export const filterNutritionData = (validicData, dbData) => {
  const nutritionArray = [];

  if (dbData.nutrition.length) {
    dbData.nutrition.map((nutritionData) => {
      validicData?.nutrition.data.map((validicData) => {
        // If DB date is same as validic date
        if (
          nutritionData.date ===
          moment(validicData.end_time).format("DD/MM/YYYY")
        ) {
          const dayData = [];

          // check if metric name in db matches metric name in validic
          // if true, add the values together and push to day array
          for (let dbDataValue in nutritionData) {
            switch (dbDataValue) {
              case "calcium":
              case "carbohydrate":
              case "dietary_fiber":
              case "energy_consumed":
              case "fat":
              case "protein":
              case "saturated_fat":
              case "unsaturated_fat":
              case "sodium":
              case "sugars":
              case "water":
                validicData.metrics.map((metric) => {
                  if (metric.type === dbDataValue) {
                    const combinedValue = {
                      name: metric.type,
                      value: nutritionData[dbDataValue].value + metric.value,
                      unit: metric.unit,
                    };
                    dayData.push(combinedValue);
                  }
                });
                break;
            }
          }

          // Check if day array contains validic metric name and add values that are not already in the day array
          for (let dbDataValue in nutritionData) {
            switch (dbDataValue) {
              case "calcium":
              case "carbohydrate":
              case "dietary_fiber":
              case "energy_consumed":
              case "fat":
              case "protein":
              case "saturated_fat":
              case "unsaturated_fat":
              case "sodium":
              case "sugars":
              case "water":
                validicData.metrics.map((metric) => {
                  // check if any validic names don't match already what's in the day array and add if needed
                  if (
                    dayData.some((e) => {
                      return e.name === metric.type;
                    }) === false
                  ) {
                    const combinedValue = {
                      name: metric.type,
                      value: nutritionData[dbDataValue].value,
                      unit: nutritionData[dbDataValue].unit,
                    };
                    dayData.push(combinedValue);
                    // check if any DB names don't match already what's in the day array and add if needed
                  }
                });

                if (
                  dayData.some((e) => {
                    return e.name === dbDataValue;
                  }) === false
                ) {
                  const combinedValue = {
                    name: dbDataValue,
                    value: nutritionData[dbDataValue].value,
                    unit: nutritionData[dbDataValue].unit,
                  };
                  dayData.push(combinedValue);
                }
                break;
            }
          }

          const formattedDate = moment(validicData.end_time).format(
            "DD/MM/YYYY"
          );
          dayData.push({ date: formattedDate });
          nutritionArray.push(dayData);
        }
      });
    });

    dbData.nutrition.map((nutritionData) => {
      validicData?.nutrition.data.map((validicData) => {
        if (
          nutritionArray.some((e) => {
            return (
              e[e.length - 1].date ===
              moment(validicData.end_time).format("DD/MM/YYYY")
            );
          }) === false
        ) {
          nutritionArray.push(addValidicDate(validicData));
        }
      });

      if (
        nutritionArray.some(
          (e) => e[e.length - 1].date === nutritionData.date
        ) === false
      ) {
        nutritionArray.push(addDbData(nutritionData));
      }
    });
  } else {
    validicData?.nutrition.data.map((validicData) => {
      if (
        nutritionArray.some((e) => {
          return (
            e[e.length - 1].date ===
            moment(validicData.end_time).format("DD/MM/YYYY")
          );
        }) === false
      ) {
        nutritionArray.push(addValidicDate(validicData));
      }
    });
  }
  return {
    nutritionArray,
  };
};

export const filterCirculatoryHealth = (validicData, dbData) => {
  const validicSystolic = [];
  const validicDiastolic = [];
  const validicPulse = [];
  const validicBodyTemperature = [];
  const ValidicRestingHeartRate = [];

  validicData.measurements?.data.map((data) => {
    data?.metrics.map((metric) => {
      const values = {
        value: metric.value,
        unit: metric.unit,
        date: moment(data.end_time).format("DD/MM/YYYY"),
        time: moment(data.end_time).format("HH:mm"),
      };
      if (metric.type === "systolic") {
        validicSystolic.push(values);
      } else if (metric.type === "diastolic") {
        validicDiastolic.push(values);
      } else if (metric.type === "pulse") {
        validicPulse.push(values);
      } else if (metric.type === "body_temperature") {
        validicBodyTemperature.push(values);
      } else if (metric.type === "resting_heart_rate") {
        ValidicRestingHeartRate.push(values);
      }
    });
  });

  const combineDbValidic = (validicData, dbData, type) => {
    if (type === "systolic" || type === "diastolic") {
      return [
        ...validicData,
        ...dbData?.circulatoryHealth.bloodPressure[type],
      ].sort((a, b) => {
        const newADate = a.date.split("/").reverse().join("/");
        const newBDate = b.date.split("/").reverse().join("/");
        return new Date(newADate) - new Date(newBDate);
      });
    }
    if (type === "restingHeartRate") {
      return [...validicData, ...dbData?.fitness.restingHeartRate].sort(
        (a, b) => {
          const newADate = a.date.split("/").reverse().join("/");
          const newBDate = b.date.split("/").reverse().join("/");
          return new Date(newADate) - new Date(newBDate);
        }
      );
    } else {
      return [...validicData, ...dbData?.circulatoryHealth[type]].sort(
        (a, b) => {
          const newADate = a.date.split("/").reverse().join("/");
          const newBDate = b.date.split("/").reverse().join("/");
          return new Date(newADate) - new Date(newBDate);
        }
      );
    }
  };

  return {
    restingHeartRate: combineDbValidic(
      ValidicRestingHeartRate,
      dbData,
      "restingHeartRate"
    ),
    bloodPressure: {
      systolic: combineDbValidic(validicSystolic, dbData, "systolic"),
      diastolic: combineDbValidic(validicDiastolic, dbData, "diastolic"),
    },
    bodyTemperature: combineDbValidic(
      validicBodyTemperature,
      dbData,
      "bodyTemperature"
    ),
  };
};

export const filterRespiratoryHealth = (validicData, dbData) => {
  const validicSp02 = [];

  validicData.measurements?.data.map((data) => {
    data?.metrics.map((metric) => {
      const values = {
        value: metric.value,
        unit: metric.unit,
        date: moment(data.end_time).format("DD/MM/YYYY"),
        time: moment(data.end_time).format("HH:mm"),
      };
      if (metric.type === "spo2") {
        validicSp02.push(values);
      }
    });
  });

  const combineDbValidic = (validicData, dbData, type) => {
    return [...validicData, ...dbData?.respiratoryHealth[type]].sort((a, b) => {
      const newADate = a.date.split("/").reverse().join("/");
      const newBDate = b.date.split("/").reverse().join("/");
      return new Date(newADate) - new Date(newBDate);
    });
  };

  const sortDate = (data) => {
    if (Array.isArray(data)) {
      return data.sort((a, b) => {
        const newADate = a.date.split("/").reverse().join("/");
        const newBDate = b.date.split("/").reverse().join("/");
        return new Date(newADate) - new Date(newBDate);
      });
    }
  };

  return {
    sp02: combineDbValidic(validicSp02, dbData, "sp02"),
    respirationRate: sortDate(dbData?.respiratoryHealth["respirationRate"]),
    peakExpiratoryFlow: sortDate(
      dbData?.respiratoryHealth["peakExpiratoryFlow"]
    ),
    degreeOfBreathlessness: sortDate(
      dbData?.respiratoryHealth["degreeOfBreathlessness"]
    ),
  };
};

export const filterBodyMeasurements = (validicData, dbData) => {
  const validicBodyWeight = [];
  const validicBodyMuscle = [];
  const validicBodyFat = [];
  const validicBodyHeight = [];
  const validicBodyBone = [];
  const validicBodyWater = [];
  const validicBmi = [];
  const validicBodyWaist = [];

  validicData.measurements?.data.map((data) => {
    data?.metrics.map((metric) => {
      const values = {
        value: metric.value,
        unit: metric.unit,
        date: moment(data.end_time).format("DD/MM/YYYY"),
        time: moment(data.end_time).format("HH:mm"),
      };
      if (metric.type === "body_weight") {
        validicBodyWeight.push(values);
      } else if (metric.type === "body_height") {
        validicBodyHeight.push(values);
      } else if (metric.type === "body_fat") {
        validicBodyFat.push(values);
      } else if (metric.type === "body_muscle") {
        validicBodyMuscle.push(values);
      } else if (metric.type === "bmi") {
        validicBmi.push(values);
      } else if (metric.type === "body_water") {
        bodyWater.push(values);
      } else if (metric.type === "body_waist") {
        validicBodyWaist.push(values);
      } else if (metric.type === "body_bone") {
        validicBodyBone.push(values);
      }
    });
  });

  const combineDbValidic = (validicData, dbData, type) => {
    if (dbData) {
      return [...validicData, ...dbData?.bodyMeasurements[type]].sort(
        (a, b) => {
          const newADate = a.date.split("/").reverse().join("/");
          const newBDate = b.date.split("/").reverse().join("/");
          return new Date(newADate) - new Date(newBDate);
        }
      );
    } else {
      return validicData.sort((a, b) => {
        const newADate = a.date.split("/").reverse().join("/");
        const newBDate = b.date.split("/").reverse().join("/");
        return new Date(newADate) - new Date(newBDate);
      });
    }
  };

  return {
    weight: combineDbValidic(validicBodyWeight, dbData, "weight"),
    waistCircumference: combineDbValidic(
      validicBodyWaist,
      dbData,
      "waistCircumference"
    ),
    bmi: combineDbValidic(validicBmi, dbData, "bmi"),
    height: combineDbValidic(validicBodyHeight, dbData, "height"),
    bodyMusclePercentage: combineDbValidic(validicBodyMuscle),
    bodyFatPercentage: combineDbValidic(validicBodyFat),
    bodyBonePercentage: combineDbValidic(validicBodyBone),
    bodyWaterPercentage: combineDbValidic(validicBodyWater),
  };
};

export const filterMyDiabetes = (validicData, dbData) => {
  const validicBloodGlucose = [];
  const validicBloodKetone = [];
  const validicInsulin = [];
  const validicSystolic = [];
  const validicDiastolic = [];
  const validicCholesterol = [];

  validicData.measurements?.data.map((data) => {
    data?.metrics.map((metric) => {
      const values = {
        value: metric.value,
        unit: metric.unit,
        date: moment(data.end_time).format("DD/MM/YYYY"),
        time: moment(data.end_time).format("HH:mm"),
      };
      if (metric.type === "blood_glucose") {
        validicBloodGlucose.push(values);
      } else if (metric.type === "blood_ketone") {
        validicBloodKetone.push(values);
      } else if (metric.type === "insulin") {
        validicInsulin.push(values);
      } else if (metric.type === "systolic") {
        validicSystolic.push(values);
      } else if (metric.type === "diastolic") {
        validicDiastolic.push(values);
      } else if (metric.type === "cholesterol") {
        validicCholesterol.push(values);
      }
    });
  });

  const combineDbValidic = (validicData, dbData, type) => {
    if (type === "systolic" || type === "diastolic") {
      return [
        ...validicData,
        ...dbData?.circulatoryHealth.bloodPressure[type],
      ].sort((a, b) => {
        const newADate = a.date.split("/").reverse().join("/");
        const newBDate = b.date.split("/").reverse().join("/");
        return new Date(newADate) - new Date(newBDate);
      });
    } else {
      return [...validicData, ...dbData?.myDiabetes[type]].sort((a, b) => {
        const newADate = a.date.split("/").reverse().join("/");
        const newBDate = b.date.split("/").reverse().join("/");
        return new Date(newADate) - new Date(newBDate);
      });
    }
  };

  const sortDate = (data) => {
    if (Array.isArray(data)) {
      return data.sort((a, b) => {
        const newADate = a.date.split("/").reverse().join("/");
        const newBDate = b.date.split("/").reverse().join("/");
        return new Date(newADate) - new Date(newBDate);
      });
    }
  };

  return {
    bloodGlucose: combineDbValidic(validicBloodGlucose, dbData, "bloodGlucose"),
    bloodKetone: combineDbValidic(validicBloodKetone, dbData, "bloodKetone"),
    insulin: combineDbValidic(validicInsulin, dbData, "insulin"),
    hbA1c: sortDate(dbData?.myDiabetes.hbA1c),
    bloodPressure: {
      systolic: combineDbValidic(validicSystolic, dbData, "systolic"),
      diastolic: combineDbValidic(validicDiastolic, dbData, "diastolic"),
    },
    cholesterol: combineDbValidic(validicCholesterol, dbData, "cholesterol"),
    ldlCholesterol: sortDate(dbData?.myDiabetes.ldlCholesterol),
    hdlCholesterol: sortDate(dbData?.myDiabetes.hdlCholesterol),
    retinalScanInLastTwelveMonths: sortDate(
      dbData?.myDiabetes.retinalScanInLastTwelveMonths
    ),
    footScanInLastTwelveMonths: sortDate(
      dbData?.myDiabetes.footScanInLastTwelveMonths
    ),
  };
};

export const filterMyHypertension = (validicData, dbData) => {
  const validicSystolic = [];
  const validicDiastolic = [];
  const validicCholesterol = [];
  const validicBodyWaist = [];

  validicData.measurements?.data.map((data) => {
    data?.metrics.map((metric) => {
      const values = {
        value: metric.value,
        unit: metric.unit,
        date: moment(data.end_time).format("DD/MM/YYYY"),
        time: moment(data.end_time).format("HH:mm"),
      };
      if (metric.type === "systolic") {
        validicSystolic.push(values);
      } else if (metric.type === "diastolic") {
        validicDiastolic.push(values);
      } else if (metric.type === "cholesterol") {
        validicCholesterol.push(values);
      } else if (metric.type === "body_waist") {
        validicBodyWaist.push(values);
      }
    });
  });

  const combineDbValidic = (validicData, dbData, type) => {
    if (type === "systolic" || type === "diastolic") {
      return [
        ...validicData,
        ...dbData?.circulatoryHealth.bloodPressure[type],
      ].sort((a, b) => {
        const newADate = a.date.split("/").reverse().join("/");
        const newBDate = b.date.split("/").reverse().join("/");
        return new Date(newADate) - new Date(newBDate);
      });
    } else if (type === "cholesterol") {
      return [...validicData, ...dbData?.myDiabetes[type]].sort((a, b) => {
        const newADate = a.date.split("/").reverse().join("/");
        const newBDate = b.date.split("/").reverse().join("/");
        return new Date(newADate) - new Date(newBDate);
      });
    } else if (type === "waistCircumference") {
      return [...validicData, ...dbData?.bodyMeasurements[type]].sort(
        (a, b) => {
          const newADate = a.date.split("/").reverse().join("/");
          const newBDate = b.date.split("/").reverse().join("/");
          return new Date(newADate) - new Date(newBDate);
        }
      );
    } else {
      return [...validicData, ...dbData?.myHypertension[type]].sort((a, b) => {
        const newADate = a.date.split("/").reverse().join("/");
        const newBDate = b.date.split("/").reverse().join("/");
        return new Date(newADate) - new Date(newBDate);
      });
    }
  };

  const sortDate = (data) => {
    if (Array.isArray(data)) {
      return data.sort((a, b) => {
        const newADate = a.date.split("/").reverse().join("/");
        const newBDate = b.date.split("/").reverse().join("/");
        return new Date(newADate) - new Date(newBDate);
      });
    }
  };

  return {
    bloodSodium: combineDbValidic(validicSystolic, dbData, "bloodSodium"),
    bloodPressure: {
      systolic: combineDbValidic(validicSystolic, dbData, "systolic"),
      diastolic: combineDbValidic(validicDiastolic, dbData, "diastolic"),
    },
    cholesterol: combineDbValidic(validicCholesterol, dbData, "cholesterol"),
    ldlCholesterol: sortDate(dbData?.myDiabetes.ldlCholesterol),
    hdlCholesterol: sortDate(dbData?.myDiabetes.hdlCholesterol),
    waistCircumference: combineDbValidic(
      validicBodyWaist,
      dbData,
      "waistCircumference"
    ),
  };
};

export const filterMyHeartHealth = (validicData, dbData) => {
  const validicSystolic = [];
  const validicDiastolic = [];
  const validicCholesterol = [];
  const validicBodyWaist = [];
  const validicBodyWeight = [];

  validicData.measurements?.data.map((data) => {
    data?.metrics.map((metric) => {
      const values = {
        value: metric.value,
        unit: metric.unit,
        date: moment(data.end_time).format("DD/MM/YYYY"),
        time: moment(data.end_time).format("HH:mm"),
      };
      if (metric.type === "systolic") {
        validicSystolic.push(values);
      } else if (metric.type === "diastolic") {
        validicDiastolic.push(values);
      } else if (metric.type === "cholesterol") {
        validicCholesterol.push(values);
      } else if (metric.type === "body_waist") {
        validicBodyWaist.push(values);
      } else if (metric.type === "body_weight") {
        validicBodyWeight.push(values);
      }
    });
  });

  const combineDbValidic = (validicData, dbData, type) => {
    if (type === "systolic" || type === "diastolic") {
      return [
        ...validicData,
        ...dbData?.circulatoryHealth.bloodPressure[type],
      ].sort((a, b) => {
        const newADate = a.date.split("/").reverse().join("/");
        const newBDate = b.date.split("/").reverse().join("/");
        return new Date(newADate) - new Date(newBDate);
      });
    } else if (type === "cholesterol") {
      return [...validicData, ...dbData?.myDiabetes[type]].sort((a, b) => {
        const newADate = a.date.split("/").reverse().join("/");
        const newBDate = b.date.split("/").reverse().join("/");
        return new Date(newADate) - new Date(newBDate);
      });
    } else if (type === "bloodSodium") {
      return [...validicData, ...dbData?.myHypertension[type]].sort((a, b) => {
        const newADate = a.date.split("/").reverse().join("/");
        const newBDate = b.date.split("/").reverse().join("/");
        return new Date(newADate) - new Date(newBDate);
      });
    } else if (type === "waistCircumference" || type === "weight") {
      return [...validicData, ...dbData?.bodyMeasurements[type]].sort(
        (a, b) => {
          const newADate = a.date.split("/").reverse().join("/");
          const newBDate = b.date.split("/").reverse().join("/");
          return new Date(newADate) - new Date(newBDate);
        }
      );
    } else {
      return [...validicData, ...dbData?.myHypertension[type]].sort((a, b) => {
        const newADate = a.date.split("/").reverse().join("/");
        const newBDate = b.date.split("/").reverse().join("/");
        return new Date(newADate) - new Date(newBDate);
      });
    }
  };

  const sortDate = (data) => {
    if (Array.isArray(data)) {
      return data.sort((a, b) => {
        const newADate = a.date.split("/").reverse().join("/");
        const newBDate = b.date.split("/").reverse().join("/");
        return new Date(newADate) - new Date(newBDate);
      });
    }
  };

  return {
    bloodSodium: combineDbValidic(validicSystolic, dbData, "bloodSodium"),
    bloodPressure: {
      systolic: combineDbValidic(validicSystolic, dbData, "systolic"),
      diastolic: combineDbValidic(validicDiastolic, dbData, "diastolic"),
    },
    cholesterol: combineDbValidic(validicCholesterol, dbData, "cholesterol"),
    ldlCholesterol: sortDate(dbData?.myDiabetes.ldlCholesterol),
    hdlCholesterol: sortDate(dbData?.myDiabetes.hdlCholesterol),
    waistCircumference: combineDbValidic(
      validicBodyWaist,
      dbData,
      "waistCircumference"
    ),
    weight: combineDbValidic(validicBodyWeight, dbData, "weight"),
    bloodEGFR: sortDate(dbData?.myHeartHealth.bloodEGFR),
    bloodCreatinine: sortDate(dbData?.myHeartHealth.bloodCreatinine),
    daysOfBreathlessness: sortDate(dbData?.myHeartHealth.daysOfBreathlessness),
    daysOfSwollenAnkles: sortDate(dbData?.myHeartHealth.daysOfSwollenAnkles),
    daysOfChestPain: sortDate(dbData?.myHeartHealth.daysOfChestPain),
  };
};

export const filterMySleep = (validicData, dbData) => {
  const validicAwakeCount = [];
  const validicAwakeDuration = [];
  const validicDeepSleep = [];
  const validicHeartRateVariability = [];
  const validicInBedDuration = [];
  const validicLightSleep = [];
  const validicRemSleep = [];
  const validicSleepDuration = [];
  const validicSleepScore = [];

  validicData.sleep?.data.map((data) => {
    data?.metrics.map((metric) => {
      const values = {
        value: metric.value,
        unit: metric.unit,
        date: moment(data.end_time).format("DD/MM/YYYY"),
        time: moment(data.end_time).format("HH:mm"),
      };
      if (metric.type === "awake_count") {
        validicAwakeCount.push(values);
      } else if (metric.type === "awake_duration") {
        validicAwakeDuration.push(values);
      } else if (metric.type === "deep_sleep") {
        validicDeepSleep.push(values);
      } else if (metric.type === "heart_rate_variability") {
        validicHeartRateVariability.push(values);
      } else if (metric.type === "in_bed_duration") {
        validicInBedDuration.push(values);
      } else if (metric.type === "light_sleep") {
        validicLightSleep.push(values);
      } else if (metric.type === "rem_sleep") {
        validicRemSleep.push(values);
      } else if (metric.type === "sleep_duration") {
        validicSleepDuration.push(values);
      } else if (metric.type === "sleep_score") {
        validicSleepScore.push(values);
      }
    });
  });

  const combineDbValidic = (validicData) => {
    return validicData.sort((a, b) => {
      const newADate = a.date.split("/").reverse().join("/");
      const newBDate = b.date.split("/").reverse().join("/");
      return new Date(newADate) - new Date(newBDate);
    });
  };

  return {
    inBedDuration: combineDbValidic(validicInBedDuration),
    sleepDuration: combineDbValidic(validicSleepDuration),
    awakeCount: combineDbValidic(validicAwakeCount),
    awakeDuration: combineDbValidic(validicAwakeDuration),
    lightSleep: combineDbValidic(validicLightSleep),
    deepSleep: combineDbValidic(validicDeepSleep),
    remSleep: combineDbValidic(validicRemSleep),
    heartRateVariability: combineDbValidic(validicHeartRateVariability),
  };
};

export const filterStopSmoking = (dbData) => {
  const sortDate = (data) => {
    if (Array.isArray(data)) {
      return data.sort((a, b) => {
        const newADate = a.date.split("/").reverse().join("/");
        const newBDate = b.date.split("/").reverse().join("/");
        return new Date(newADate) - new Date(newBDate);
      });
    }
  };

  return {
    cigarettesPerDay: sortDate(dbData?.stopSmoking.cigarettesPerDay),
    morningTimeToFirstCigarette: sortDate(
      dbData?.stopSmoking.morningTimeToFirstCigarette
    ),
    lastCigaretteTimeDate: sortDate(dbData?.stopSmoking.lastCigaretteTimeDate),
    usingNicotineReplacement: sortDate(
      dbData?.stopSmoking.usingNicotineReplacement
    ),
    startDateOfStopSmokingProgram:
      dbData?.stopSmoking.startDateOfStopSmokingProgram,
  };
};

export const filterMyPain = (dbData) => {
  const sortDate = (data) => {
    if (Array.isArray(data)) {
      return data.sort((a, b) => {
        const newADate = a.date.split("/").reverse().join("/");
        const newBDate = b.date.split("/").reverse().join("/");
        return new Date(newADate) - new Date(newBDate);
      });
    }
  };
  return {
    numDaysWithMildModeratePain: sortDate(
      dbData?.myPain.numDaysWithMildModeratePain
    ),
    numDaysSeverePain: sortDate(dbData?.myPain.numDaysSeverePain),
    degreeOfPain: sortDate(dbData?.myPain.degreeOfPain),
  };
};

export const filterDrinkLess = (dbData) => {
  const sortDate = (data) => {
    if (Array.isArray(data)) {
      return data.sort((a, b) => {
        const newADate = a.date.split("/").reverse().join("/");
        const newBDate = b.date.split("/").reverse().join("/");
        return new Date(newADate) - new Date(newBDate);
      });
    }
  };
  return {
    numAlcoholUnits: sortDate(dbData?.drinkLess.numAlcoholUnits),
    hadADrinkToday: sortDate(dbData?.drinkLess.hadADrinkToday),
    alcoholFreeDays: sortDate(dbData?.drinkLess.alcoholFreeDays),
  };
};

export const filterMyMood = (dbData) => {
  const sortDate = (data) => {
    if (Array.isArray(data)) {
      return data.sort((a, b) => {
        const newADate = a.date.split("/").reverse().join("/");
        const newBDate = b.date.split("/").reverse().join("/");
        return new Date(newADate) - new Date(newBDate);
      });
    }
  };
  return {
    moodScale: sortDate(dbData?.myMood.moodScale),
  };
};
