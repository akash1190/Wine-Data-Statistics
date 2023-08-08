// Function to calculate the mean of an array of numbers
function calculateMean(data) {
    if (!data || data.length === 0) {
      return 0;
    }
  
    const sum = data.reduce((acc, value) => acc + value, 0);
    return sum / data.length;
  }
  
  // Function to calculate the median of an array of numbers
  function calculateMedian(data) {
    if (!data || data.length === 0) {
      return 0;
    }
  
    const sortedData = data.slice().sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedData.length / 2);
  
    if (sortedData.length % 2 === 0) {
      return (sortedData[middleIndex - 1] + sortedData[middleIndex]) / 2;
    } else {
      return sortedData[middleIndex];
    }
  }
  
  // Function to calculate the mode of an array of numbers
  function calculateMode(data) {
    if (!data || data.length === 0) {
      return 0;
    }
  
    const frequencyMap = data.reduce((acc, value) => {
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});
  
    let maxFrequency = 0;
    let mode = 0;
  
    for (const value in frequencyMap) {
      if (frequencyMap[value] > maxFrequency) {
        maxFrequency = frequencyMap[value];
        mode = value;
      }
    }
  
    return parseFloat(mode);
  }
  

// Function to calculate the "Gamma" property for each point in the dataset
function calculateGammaProperty(wine) {
  const { Ash, Hue, Magnesium } = wine;
  // console.log("Ash:", Ash);
  // console.log("Hue:", Hue);
  // console.log("Magnesium:", Magnesium);

  if (Magnesium !== 0 && typeof Ash === 'number' && typeof Hue === 'number' && typeof Magnesium === 'number') {
    return (Ash * Hue) / Magnesium;
  } else {
    return NaN; // or any other appropriate value, depending on your use case
  }
}


// Function to calculate the class-wise mean, median, and mode of "Gamma" for the entire dataset
function calculateGammaStatistics(dataset) {
  const classData = {};

  for (const wine of dataset) {
    const wineClass = `Class ${wine.Class}`;
    if (!classData[wineClass]) {
      classData[wineClass] = [];
    }
    classData[wineClass].push(calculateGammaProperty(wine));
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

export { calculateMean, calculateMedian, calculateMode, calculateGammaProperty, calculateGammaStatistics };

  
  