// Conversion factors for the public impact page. These are estimates, and
// the page shows them in its "How we calculate" section, so keep the two in
// sync if you change anything here.

// CO2e avoided per kg of plastic recycled instead of new plastic being made.
// Published lifecycle estimates for common plastics (PET, HDPE) range roughly
// 1–3 kg; we use the conservative low end.
export const CO2_KG_PER_KG_PLASTIC = 1.5;

// A typical 50cl PET drinks bottle
export const BOTTLE_KG = 0.012;

// CO2 a mature tree absorbs in a year (commonly cited ~22 kg)
export const TREE_CO2_KG_PER_YEAR = 22;

// Tailpipe CO2 per km for an average petrol car
export const CAR_CO2_KG_PER_KM = 0.25;

// Distance around the Earth at the equator
export const EARTH_CIRCUMFERENCE_KM = 40_075;

// Unladen weight of a typical Lagos danfo (VW-style minibus)
export const DANFO_KG = 1_400;

// Milestones step up in blocks of this size
export const MILESTONE_STEP_KG = 50_000;

export function computeImpact(plasticKg: number) {
  const co2Kg = plasticKg * CO2_KG_PER_KG_PLASTIC;
  const carKm = co2Kg / CAR_CO2_KG_PER_KM;
  const nextMilestoneKg =
    (Math.floor(plasticKg / MILESTONE_STEP_KG) + 1) * MILESTONE_STEP_KG;

  return {
    plasticKg,
    co2Tonnes: co2Kg / 1000,
    bottles: plasticKg / BOTTLE_KG,
    treeYears: co2Kg / TREE_CO2_KG_PER_YEAR,
    carKm,
    earthLaps: carKm / EARTH_CIRCUMFERENCE_KM,
    danfos: plasticKg / DANFO_KG,
    nextMilestoneKg,
    milestoneProgress: plasticKg / nextMilestoneKg,
  };
}

export type Impact = ReturnType<typeof computeImpact>;
