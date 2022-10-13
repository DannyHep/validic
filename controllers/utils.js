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
        date: data.end_time,
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
    return [...validicData, ...dbData?.fitness[type]].sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
  };

  return {
    steps: combineDbValidic(validicSteps, dbData, "steps"),
    distance: combineDbValidic(validicDistance, dbData, "distance"),
    energyBurned: combineDbValidic(validicEnergyBurned, dbData, "energyBurned"),
    restingHeartRate: combineDbValidic(
      ValidicrestingHeartRate,
      dbData,
      "restingHeartRate"
    ),
  };
};

export const filterNutritionData = (validicData, dbData) => {
  const nutritionArray = [];

  dbData.nutrition.map((dbData) => {
    console.log(dbData);
    // validicData.nutrition?.data.map((validicData) => {
    //   validicData.metrics.map((metric) => {
    //     console.log(metric.type);
    //     if (dbData[metric.type]) {
    //       console.log(data[metric.type]);
    //     }
    //   });
    // });
    nutritionArray.push(dbData);
  });

  // validicData.nutrition?.data.map((data) => {
  //   const dataObj = [];
  //   data?.metrics.map((metric) => {
  //     const value = {
  //       name: metric.type,
  //       value: metric.value,
  //       unit: metric.unit,
  //       date: data.end_time,
  //     };
  //     dataObj.push(value);
  //   });
  //   nutritionArray.push({ dataObj });
  // });

  // const dbKeysArr = Object.keys(dbData.nutrition);

  // const combineAndSortDbValidic = (validicData, dbData) => {
  //   // console.log(validicData);
  //   // console.log(validicData)
  //   validicData.map((data) => {
  //     // console.log(data);
  //     // console.log(dbData.nutrition, "here 1 ");
  //     for (let nutritionType in dbData.nutrition) {
  //       if (nutritionType === data.dataObj.name) {
  //         console.log("match");
  //       }
  //     }
  //     // dbData.nutrition.map((dbData) => {
  //     //   if (dbData.date === data.date) {
  //     //     console.log("match", dbData.date, data.date);
  //     // }
  //     // });
  //   });

  //   // dbData.nutrition[metric.type].map((data) => {
  //   //   console.log(metric.type);
  //   //   console.log(data);
  //   // });
  //   // nutritionArray.map((day) => {
  //   //   console.log(dbData?.nutrition[type]);
  //   //   dbData?.nutrition[type].map((dbType) => {});
  //   // });

  //   // return [...validicData, ...dbData?.nutrition[type]].sort((a, b) => {
  //   //   return new Date(a.date) - new Date(b.date);
  //   // });
  // };

  return {
    nutritionArray,
  };
};

export const filterCirculatoryHealth = (validicData, dbData) => {
  const validicSystolic = [];
  const validicDiastolic = [];
  const validicPulse = [];
  const validicBodyTemperature = [];

  validicData.measurements?.data.map((data) => {
    data?.metrics.map((metric) => {
      const values = {
        value: metric.value,
        unit: metric.unit,
        date: data.end_time,
      };
      if (metric.type === "systolic") {
        validicSystolic.push(values);
      } else if (metric.type === "diastolic") {
        validicDiastolic.push(values);
      } else if (metric.type === "pulse") {
        validicPulse.push(values);
      } else if (metric.type === "body_temperature") {
        validicBodyTemperature.push(values);
      }
    });
  });

  const combineDbValidic = (validicData, dbData, type) => {
    if (type === "systolic" || type === "diastolic") {
      return [
        ...validicData,
        ...dbData?.circulatoryHealth.bloodPressure[type],
      ].sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
    } else {
      return [...validicData, ...dbData?.circulatoryHealth[type]].sort(
        (a, b) => {
          return new Date(a.date) - new Date(b.date);
        }
      );
    }
  };

  return {
    pulse: combineDbValidic(validicPulse, dbData, "pulse"),
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
        date: data.end_time,
      };
      if (metric.type === "spo2") {
        validicSp02.push(values);
      }
    });
  });

  const combineDbValidic = (validicData, dbData, type) => {
    return [...validicData, ...dbData?.respiratoryHealth[type]].sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
  };

  return {
    sp02: combineDbValidic(validicSp02, dbData, "sp02"),
    respirationRate: dbData?.respiratoryHealth["respirationRate"],
    peakExpiratoryFlow: dbData?.respiratoryHealth["peakExpiratoryFlow"],
    degreeOfBreathlessness: dbData?.respiratoryHealth["degreeOfBreathlessness"],
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
        date: data.end_time,
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
          return new Date(a.date) - new Date(b.date);
        }
      );
    } else {
      return validicData.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
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
        date: data.end_time,
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
        return new Date(a.date) - new Date(b.date);
      });
    } else {
      return [...validicData, ...dbData?.myDiabetes[type]].sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
    }
  };

  return {
    bloodGlucose: combineDbValidic(validicBloodGlucose, dbData, "bloodGlucose"),
    bloodKetone: combineDbValidic(validicBloodKetone, dbData, "bloodKetone"),
    insulin: combineDbValidic(validicInsulin, dbData, "insulin"),
    hbA1c: {
      recordedInLastTwelveMonths:
        dbData?.myDiabetes.hbA1c.recordedInLastTwelveMonths,
      measurements: dbData?.myDiabetes.hbA1c.measurements,
    },
    bloodPressure: {
      systolic: combineDbValidic(validicSystolic, dbData, "systolic"),
      diastolic: combineDbValidic(validicDiastolic, dbData, "diastolic"),
    },
    cholesterol: combineDbValidic(validicCholesterol, dbData, "cholesterol"),
    ldlCholesterol: dbData?.myDiabetes.ldlCholesterol,
    hdlCholesterol: dbData?.myDiabetes.hdlCholesterol,
    retinalScanInLastTwelveMonths:
      dbData?.myDiabetes.retinalScanInLastTwelveMonths,
    footScanInLastTwelveMonths: dbData?.myDiabetes.footScanInLastTwelveMonths,
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
        date: data.end_time,
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
        return new Date(a.date) - new Date(b.date);
      });
    } else if (type === "cholesterol") {
      return [...validicData, ...dbData?.myDiabetes[type]].sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
    } else if (type === "waistCircumference") {
      return [...validicData, ...dbData?.bodyMeasurements[type]].sort(
        (a, b) => {
          return new Date(a.date) - new Date(b.date);
        }
      );
    } else {
      return [...validicData, ...dbData?.myHypertension[type]].sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
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
    ldlCholesterol: dbData?.myDiabetes.ldlCholesterol,
    hdlCholesterol: dbData?.myDiabetes.hdlCholesterol,
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
        date: data.end_time,
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
        return new Date(a.date) - new Date(b.date);
      });
    } else if (type === "cholesterol") {
      return [...validicData, ...dbData?.myDiabetes[type]].sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
    } else if (type === "bloodSodium") {
      return [...validicData, ...dbData?.myHypertension[type]].sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
    } else if (type === "waistCircumference" || type === "weight") {
      return [...validicData, ...dbData?.bodyMeasurements[type]].sort(
        (a, b) => {
          return new Date(a.date) - new Date(b.date);
        }
      );
    } else {
      return [...validicData, ...dbData?.myHypertension[type]].sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
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
    ldlCholesterol: dbData?.myDiabetes.ldlCholesterol,
    hdlCholesterol: dbData?.myDiabetes.hdlCholesterol,
    waistCircumference: combineDbValidic(
      validicBodyWaist,
      dbData,
      "waistCircumference"
    ),
    weight: combineDbValidic(validicBodyWeight, dbData, "weight"),
    bloodEGFR: dbData?.myHeartHealth.bloodEGFR,
    bloodCreatinine: dbData?.myHeartHealth.bloodCreatinine,
    daysOfBreathlessness: dbData?.myHeartHealth.daysOfBreathlessness,
    daysOfSwollenAnkles: dbData?.myHeartHealth.daysOfSwollenAnkles,
    daysOfChestPain: dbData?.myHeartHealth.daysOfChestPain,
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
        date: data.end_time,
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
      return new Date(a.date) - new Date(b.date);
    });
  };

  return {
    sleepScore: combineDbValidic(validicSleepScore),
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
  return {
    cigarettesPerDay: dbData?.stopSmoking.cigarettesPerDay,
    lastCigaretteTimeDate: dbData?.stopSmoking.lastCigaretteTimeDate,
    usingNicotineReplacement: dbData?.stopSmoking.usingNicotineReplacement,
    morningTimeToFirstCigarette:
      dbData?.stopSmoking.morningTimeToFirstCigarette,
    startDateOfStopSmokingProgram:
      dbData?.stopSmoking.startDateOfStopSmokingProgram,
  };
};

export const filterMyPain = (dbData) => {
  return {
    numDaysWithMildModeratePain: dbData?.myPain.numDaysWithMildModeratePain,
    numDaysSeverePain: dbData?.myPain.numDaysSeverePain,
    degreeOfPain: dbData?.myPain.degreeOfPain,
  };
};

export const filterDrinkLess = (dbData) => {
  return {
    numAlcoholUnits: dbData?.drinkLess.numAlcoholUnits,
    hadADrinkToday: dbData?.drinkLess.hadADrinkToday,
    alcoholFreeDays: dbData?.drinkLess.alcoholFreeDays,
  };
};

export const filterMyMood = (dbData) => {
  return {
    positiveDaysThisWeek: dbData?.myMood.positiveDaysThisWeek,
    moodScale: dbData?.myMood.moodScale,
  };
};
