import React from "react";
import './App.css'
import {
  calculateMean,
  calculateMedian,
  calculateMode,
  calculateGammaProperty,
  calculateGammaStatistics,
} from "./statistics";

const wineData = [
  {
    Class: 1,
    Alcohol: 12.8,
    Flavanoids: 3.4,
    Ash: 2.2,
    Hue: 1.1,
    Magnesium: 100,
  },
  {
    Class: 2,
    Alcohol: 13.5,
    Flavanoids: 2.8,
    Ash: 2.4,
    Hue: 1.2,
    Magnesium: 95,
  },
  {
    Class: 1,
    Alcohol: 14.2,
    Flavanoids: 4.2,
    Ash: 2.3,
    Hue: 1.0,
    Magnesium: 110,
  },
  {
    Class: 2,
    Alcohol: 11.9,
    Flavanoids: 2.6,
    Ash: 2.1,
    Hue: 0.9,
    Magnesium: 88,
  },
  // Add more wine data objects as needed
];

const App = () => {
  const flavanoidsData = calculateStatisticalMeasures("Flavanoids");
  const gammaData = calculateGammaStatistics(wineData);

  return (
    <div className="displayf">
      <h1>Wine Data Statistics</h1>

      <h2>Flavanoids</h2>
      {renderStatisticalTable(flavanoidsData)}

      <h2>Gamma</h2>
      {renderStatisticalTable(gammaData)}
    </div>
  );
};

function calculateStatisticalMeasures(property) {
  const classData = {};

  for (const wine of wineData) {
    const wineClass = `Class ${wine.Class}`;
    if (!classData[wineClass]) {
      classData[wineClass] = [];
    }
    classData[wineClass].push(wine[property]);
  }

  const classMeans = {};
  const classMedians = {};
  const classModes = {};

  for (const className in classData) {
    const propertyValues = classData[className];
    classMeans[className] = calculateMean(propertyValues);
    classMedians[className] = calculateMedian(propertyValues);
    classModes[className] = calculateMode(propertyValues);
  }

  return {
    means: classMeans,
    medians: classMedians,
    modes: classModes,
  };
}

function renderStatisticalTable(data) {
  const { means, medians, modes } = data;

  const classNames = Object.keys(means);

  return (
    <table className="statistical-table">
      <thead>
        <tr>
          <th>Measure</th>
          {classNames.map((className) => (
            <th key={className}>{className}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td> Mean</td>
          {classNames.map((className) => (
            <td key={className} className="table-cell">{isNaN(means[className]) ? "N/A" : means[className].toFixed(3)}</td>
          ))}
        </tr>
        <tr>
          <td>Median</td>
          {classNames.map((className) => (
            <td key={className} className="table-cell">{isNaN(medians[className]) ? "N/A" : medians[className].toFixed(3)}</td>
          ))}
        </tr>
        <tr>
          <td>Mode</td>
          {classNames.map((className) => (
            <td key={className} className="table-cell">
              {Array.isArray(modes[className])
                ? modes[className].join(", ")
                : isNaN(modes[className])
                ? "N/A"
                : modes[className].toFixed(3)}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export default App;
