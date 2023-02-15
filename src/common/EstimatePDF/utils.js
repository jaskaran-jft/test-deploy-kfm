export const setLabour = (labourObj) => {
  let incurredLabour = [],
    estimatedLabour = [],
    incurredLabourTotal = 0,
    estimatedLabourTotal = 0;
  if (labourObj.length > 0) {
    labourObj.map((_) => {
      if (_.type === "Incurred") {
        incurredLabour.push(_);
        incurredLabourTotal += Number(_.netPrice);
      } else {
        estimatedLabour.push(_);
        estimatedLabourTotal += Number(_.netPrice);
      }

      return _;
    });
  }
  return {
    incurredLabour,
    estimatedLabour,
    incurredLabourTotal,
    estimatedLabourTotal,
  };
};

export const setMaterial = (materialObj) => {
  let incurredMaterial = [],
    estimatedMaterial = [],
    incurredMaterialTotal = 0,
    estimatedMaterialTotal = 0;

  if (materialObj.length > 0) {
    materialObj.map((_) => {
      if (_.type === "Incurred") {
        incurredMaterial.push(_);
        incurredMaterialTotal += Number(_.netPrice);
      } else {
        estimatedMaterial.push(_);
        estimatedMaterialTotal += Number(_.netPrice);
      }

      return _;
    });
  }

  return {
    incurredMaterial,
    estimatedMaterial,
    incurredMaterialTotal,
    estimatedMaterialTotal,
  };
};

export const setTrip = (tripObj) => {
  let incurredTrip = [],
    estimatedTrip = [],
    incurredTripTotal = 0,
    estimatedTripTotal = 0;

  if (tripObj.length > 0) {
    tripObj.map((_) => {
      if (_.type === "Incurred") {
        incurredTrip.push(_);
        incurredTripTotal += Number(_.netPrice);
      } else {
        estimatedTrip.push(_);
        estimatedTripTotal += Number(_.netPrice);
      }

      return _;
    });
  }

  return { incurredTrip, estimatedTrip, incurredTripTotal, estimatedTripTotal };
};
