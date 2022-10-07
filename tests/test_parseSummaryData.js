import { validicTrackerData } from "./mockData.js";
import { dBTrackerData } from "./mockData.js";
import {
  filterFitnessData,
  filterCirculatoryHealth,
} from "../controllers/utils.js";
import { healthTrackerParser } from "../controllers/parsers/healthTrackerParser.js";

const parser = healthTrackerParser(validicTrackerData, dBTrackerData);
console.log(parser);

const summaryDataParser = filterFitnessData(validicTrackerData, dBTrackerData);
// console.log(summaryDataParser);

const circulatoryHealthParser = filterCirculatoryHealth(
  validicTrackerData,
  dBTrackerData
);
// console.log(circulatoryHealthParser);
