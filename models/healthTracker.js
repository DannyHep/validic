const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HealthTrackerSchema = new Schema({
  summary: {
    steps: [
      { value: Number, date: String, unit: { type: String, default: "steps" } },
    ],
    distance: [
      { value: Number, date: String, unit: { type: String, default: "m" } },
    ],
    energyBurned: [
      { value: Number, date: String, unit: { type: String, default: "kcal" } },
    ],
    restingHeartRate: [
      { value: Number, date: String, unit: { type: String, default: "bpm" } },
    ],
  },
  circulatoryHealth: {
    heartRate: [
      { value: Number, date: String, unit: { type: String, default: "bpm" } },
    ],
    bloodPressure: {
      systolic: [
        {
          value: Number,
          date: String,
          unit: { type: String, default: "mm/hg" },
        },
      ],
      diastolic: [{ value: Number, date: String, unit: { default: "mm/hg" } }],
    },
    bodyTemperature: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "celcius" },
      },
    ],
  },
  respiratoryHealth: {
    sp02: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "%" },
      },
    ],
    smokedLastSevenDays: [
      {
        value: String,
        date: String,
      },
    ],
    respirationRate: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "breaths per minute" },
      },
    ],
    peakExpiratoryFlow: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "%" },
      },
    ],
    degreeOfBreathlessness: [
      {
        value: String,
        date: String,
      },
    ],
  },
  measurements: {
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
      },
    ],
    height: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "cm" },
      },
    ],
    bmi: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "kg" },
      },
    ],
  },
  myDiabetes: {
    bloodGlucose: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "mg/dL" },
      },
    ],
    HbA1c: {
      recordedInlastTwelceMonths: {
        value: Boolean,
        date: String,
        default: false,
      },

      measurements: [
        {
          value: Number,
          date: String,
          unit: { type: String, default: "%" },
        },
      ],
    },
    totalCholesterol: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "mg/dL" },
      },
    ],
    ldlCholesterol: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "mg/dL" },
      },
    ],
    hdlCholesterol: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "mg/dL" },
      },
    ],
    retinalScanInLastTwelveMonths: {
      value: Boolean,
      date: String,
      default: false,
    },
    footScanInLastTwelveMonths: {
      value: Boolean,
      date: String,
      default: false,
    },
  },
  myHypertension: {
    bloodSodium: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "mEq/L" },
      },
    ],
  },
  myHeartHealth: {
    bloodEGFR: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "mL/min" },
      },
    ],
    bloodCreatinine: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "mg/dL" },
      },
    ],
    daysOfBreathlessness: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "days" },
      },
    ],
    daysOfSwollenAnkles: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "days" },
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
      },
    ],
    lastCigaretteTimeDate: [
      {
        value: String,
        date: String,
      },
    ],
    usingNicotineReplacement: [
      {
        value: Boolean,
        date: String,
      },
    ],
    morningTimeToFirstCigarette: [
      {
        value: String,
        date: String,
      },
    ],
    startDateOfStopSmokingProgram: {
      value: String,
      date: String,
    },
  },
  myPain: {
    numDaysWithMildModeratePain: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "days" },
      },
    ],
    numDaysSeverePain: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "days" },
      },
    ],
    degreeOfPain: [
      {
        value: Number,
        date: String,
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
      },
    ],
    hadADrinkToday: [
      {
        value: Boolean,
        date: String,
        default: false,
      },
    ],
    alcoholFreeDays: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "days" },
        default: 0,
      },
    ],
  },
  myMood: {
    positiveDaysThisWeek: [
      {
        value: Number,
        date: String,
        unit: { type: String, default: "days" },
      },
    ],
    moodScale: [
      {
        value: Number,
        date: String,
      },
    ],
  },
});

const HealthTracker = mongoose.model("HealthTracker", HealthTrackerSchema);

module.exports = HealthTracker;
