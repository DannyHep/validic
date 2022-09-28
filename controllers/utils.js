export const filterSummaryData = (validicData, dbData) => {
  const validicSteps = [];
  const validicDistance = [];
  const validicEnergyBurned = [];
  const restingHeartRate = [];

  validicData.summary?.data.map((data) => {
    // console.log(dbData[0].summary, "utils");

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
        restingHeartRate.push(values);
      }
    });
  });

  const parsedSteps = [...validicSteps, ...dbData?.summary.steps].sort(
    (a, b) => {
      return a.date - b.date;
    }
  );

  console.log(parsedSteps);

  const parsedDistance = [...validicDistance, ...dbData?.summary.distance].sort(
    (a, b) => {
      return a.date - b.date;
    }
  );

  return { steps: parsedSteps, distance: parsedDistance };
};
