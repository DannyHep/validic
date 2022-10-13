import mongoose from "mongoose";
const Schema = mongoose.Schema;

const HealthTrackerValuesSchema = new Schema({
  PASID: { type: String, unique: true },
  fitness: {
    steps: [
      {
        value: Number,
        date: String,
        source: { type: String, default: "database" },
        unit: { type: String, default: "steps" },
      },
    ],
    distance: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "m" },
        source: { type: String, default: "database" },
      },
    ],
    energyBurned: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "kcal" },
        source: { type: String, default: "database" },
      },
    ],
    restingHeartRate: [
      { value: Number, date: String, unit: { type: String, default: "bpm" } },
    ],
  },
  nutrition: [
    {
      calcium: {
        value: Number,
        unit: { type: String, default: "mg/dl" },
      },

      carbohydrate: {
        value: Number,
        unit: { type: String, default: "g" },
      },

      dietary_fiber: {
        value: Number,
        unit: { type: String, default: "g" },
      },

      energy_consumed: {
        value: Number,
        unit: { type: String, default: "kcal" },
      },

      fat: {
        value: Number,
        unit: { type: String, default: "g" },
      },

      protein: {
        value: Number,
        unit: { type: String, default: "g" },
      },

      saturated_fat: {
        value: Number,
        unit: { type: String, default: "g" },
      },

      unsaturated_fat: {
        value: Number,
        unit: { type: String, default: "g" },
      },

      sodium: {
        value: Number,
        unit: { type: String, default: "mg" },
      },

      sugars: {
        value: Number,
        unit: { type: String, default: "g" },
      },

      water: {
        value: Number,
        unit: { type: String, default: "ml" },
      },
      date: String,
    },
  ],
  circulatoryHealth: {
    pulse: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "bpm" },
        source: { type: String, default: "database" },
      },
    ],
    bloodPressure: {
      systolic: [
        {
          value: Number,
          date: String,
          unit: { type: String, default: "mm/hg" },
          source: { type: String, default: "database" },
        },
      ],
      diastolic: [
        {
          value: Number,
          date: String,
          unit: { type: String, default: "mm/hg" },
          source: { type: String, default: "database" },
        },
      ],
    },
    bodyTemperature: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "celcius" },
        source: { type: String, default: "database" },
      },
    ],
  },
  respiratoryHealth: {
    sp02: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "%" },
        source: { type: String, default: "database" },
      },
    ],
    smokedLastSevenDays: [
      {
        value: String,
        date: String,
        source: { type: String, default: "database" },
      },
    ],
    respirationRate: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "breaths per minute" },
        source: { type: String, default: "database" },
      },
    ],
    peakExpiratoryFlow: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "%" },
        source: { type: String, default: "database" },
      },
    ],
    degreeOfBreathlessness: [
      {
        value: String,
        date: String,
        source: { type: String, default: "database" },
      },
    ],
  },
  bodyMeasurements: {
    weight: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "kg" },
      },
    ],
    waistCircumference: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "cm" },
        source: { type: String, default: "database" },
      },
    ],
    height: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "cm" },
        source: { type: String, default: "database" },
      },
    ],
    bmi: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "kg" },
        source: { type: String, default: "database" },
      },
    ],
  },
  myDiabetes: {
    bloodGlucose: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "mg/dL" },
        source: { type: String, default: "database" },
      },
    ],
    bloodKetone: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "mg/dL" },
        source: { type: String, default: "database" },
      },
    ],
    hbA1c:
      // recordedInLastTwelveMonths: {
      //   value: Boolean,
      //   date: String,
      //   default: false,
      // },

      // measurements:
      [
        {
          value: Number,
          date: String,
          unit: { type: String, default: "%" },
          source: { type: String, default: "database" },
        },
      ],
    cholesterol: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "mg/dL" },
        source: { type: String, default: "database" },
      },
    ],
    ldlCholesterol: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "mg/dL" },
        source: { type: String, default: "database" },
      },
    ],
    hdlCholesterol: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "mg/dL" },
        source: { type: String, default: "database" },
      },
    ],
    insulin: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "IU" },
        source: { type: String, default: "database" },
      },
    ],
    retinalScanInLastTwelveMonths: [
      {
        value: Boolean,
        date: String,
        default: false,
        source: { type: String, default: "database" },
      },
    ],
    footScanInLastTwelveMonths: [
      {
        value: Boolean,
        date: String,
        default: false,
        source: { type: String, default: "database" },
      },
    ],
  },
  myHypertension: {
    bloodSodium: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "mEq/L" },
        source: { type: String, default: "database" },
      },
    ],
  },
  myHeartHealth: {
    bloodEGFR: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "mL/min" },
        source: { type: String, default: "database" },
      },
    ],
    bloodCreatinine: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "mg/dL" },
        source: { type: String, default: "database" },
      },
    ],
    daysOfBreathlessness: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "day(s)" },
        source: { type: String, default: "database" },
      },
    ],
    daysOfSwollenAnkles: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "day(s)" },
        source: { type: String, default: "database" },
      },
    ],
    daysOfChestPain: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "day(s)" },
        source: { type: String, default: "database" },
      },
    ],
  },
  stopSmoking: {
    cigarettesPerDay: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "cigarettes" },
        default: 0,
        source: { type: String, default: "database" },
      },
    ],
    lastCigaretteTimeDate: [
      {
        value: String,
        date: String,
        source: { type: String, default: "database" },
      },
    ],
    usingNicotineReplacement: [
      {
        value: Boolean,
        date: String,
        source: { type: String, default: "database" },
      },
    ],
    morningTimeToFirstCigarette: [
      {
        value: String,
        date: String,
        source: { type: String, default: "database" },
      },
    ],
    startDateOfStopSmokingProgram: {
      value: { type: String, default: "N/A" },
      date: String,
      source: { type: String, default: "database" },
    },
  },
  myPain: {
    numDaysWithMildModeratePain: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "day(s)" },
        source: { type: String, default: "database" },
      },
    ],
    numDaysSeverePain: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "day(s)" },
        source: { type: String, default: "database" },
      },
    ],
    degreeOfPain: [
      {
        value: Number,
        date: String,
        source: { type: String, default: "database" },
      },
    ],
  },
  drinkLess: {
    numAlcoholUnits: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "units" },
        default: 0,
        source: { type: String, default: "database" },
      },
    ],
    hadADrinkToday: [
      {
        value: Boolean,
        date: String,
        default: false,
        source: { type: String, default: "database" },
      },
    ],
    alcoholFreeDays: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "day(s)" },
        default: 0,
        source: { type: String, default: "database" },
      },
    ],
  },
  myMood: {
    positiveDaysThisWeek: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "day(s)" },
        source: { type: String, default: "database" },
      },
    ],
    moodScale: [
      {
        value: Number,
        date: String,
        source: { type: String, default: "database" },
      },
    ],
  },
});

const HealthTrackerValues = mongoose.model(
  "HealthTrackerValues",
  HealthTrackerValuesSchema
);

export default HealthTrackerValues;
