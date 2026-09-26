# Brainoro Cognitive OS - Audit Report

**Generated:** 2026-09-18T20:26:32.507Z
**Data Source:** supabase:curriculum_concepts
**Total Scanned:** 846

## Summary

| Metric | Count |
|---|---|
| Total Flagged | 213 |
| Content-ID Mismatches (CHECK_1) | 132 |
| Visual Fallback Issues (CHECK_2) | 57 |
| Templated Text Issues (CHECK_3) | 37 |
| Clean Records | 633 |

### By Board

| Board | Total | Flagged | Clean |
|---|---|---|---|
| IB_MYP | 282 | 55 | 227 |
| CBSE | 282 | 79 | 203 |
| CAMBRIDGE | 282 | 79 | 203 |

### By Subject

| Subject | Total | Flagged | Clean |
|---|---|---|---|
| BIOLOGY | 198 | 65 | 133 |
| MATH | 252 | 17 | 235 |
| CHEMISTRY | 189 | 97 | 92 |
| PHYSICS | 207 | 34 | 173 |

## Flagged Records

### [IB_MYP-G6-BIOLOGY-FOOD-VIT] Vitamins, Minerals & Deficiency Diseases
- **Board:** IB_MYP | **Grade:** 6 | **Subject:** BIOLOGY
- **Unit:** Unit 1: Food & Biological Macromolecules
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Vitamins, Minerals & Deficiency Diseases" [IB_MYP-G6-BIOLOGY-FOOD-VIT]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [CAMBRIDGE-G6-BIOLOGY-FOOD-VIT] Vitamins, Minerals & Deficiency Diseases
- **Board:** CAMBRIDGE | **Grade:** 6 | **Subject:** BIOLOGY
- **Unit:** Unit 1: Food & Biological Macromolecules
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Vitamins, Minerals & Deficiency Diseases" [CAMBRIDGE-G6-BIOLOGY-FOOD-VIT]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
#### TEMPLATED_TEXT
Boilerplate text detected in "Vitamins, Minerals & Deficiency Diseases" [CAMBRIDGE-G6-BIOLOGY-FOOD-VIT]
```
{
  "matchedPatterns": [
    "State the primary definition and rule governing",
    "Calculate the result when standard numerical values are applied to"
  ]
}
```
---
### [CAMBRIDGE-G6-CHEMISTRY-MAT-SOLUBLE] Solubility, Solutes & Saturated Solutions
- **Board:** CAMBRIDGE | **Grade:** 6 | **Subject:** CHEMISTRY
- **Unit:** Unit 1: States & Properties of Matter
- **Resolved Diagram:** `reaction_energy`

#### TEMPLATED_TEXT
Boilerplate text detected in "Solubility, Solutes & Saturated Solutions" [CAMBRIDGE-G6-CHEMISTRY-MAT-SOLUBLE]
```
{
  "matchedPatterns": [
    "State the primary definition and rule governing",
    "Calculate the result when standard numerical values are applied to"
  ]
}
```
---
### [CBSE-G6-MATH-NUMSYS-FRAC] Fractions, Decimals & Equivalence
- **Board:** CBSE | **Grade:** 6 | **Subject:** MATH
- **Unit:** Unit 1: Number Systems & Arithmetic Continuity
- **Resolved Diagram:** `number_line`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Fractions, Decimals & Equivalence" [CBSE-G6-MATH-NUMSYS-FRAC]
```
{
  "taxonomyKey": "FRACTIONS",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "angle sum"
  ],
  "hint": "Text contains forbidden keywords: [angle sum] - wrong topic content stored."
}
```
---
### [CAMBRIDGE-G6-BIOLOGY-PLANT-MORPH] Root, Stem & Leaf Morphological Roles
- **Board:** CAMBRIDGE | **Grade:** 6 | **Subject:** BIOLOGY
- **Unit:** Unit 2: Plant Structure & Physiological Adaptation
- **Resolved Diagram:** `photosynthesis_cycle`

#### TEMPLATED_TEXT
Boilerplate text detected in "Root, Stem & Leaf Morphological Roles" [CAMBRIDGE-G6-BIOLOGY-PLANT-MORPH]
```
{
  "matchedPatterns": [
    "State the primary definition and rule governing",
    "Calculate the result when standard numerical values are applied to"
  ]
}
```
---
### [CBSE-G6-PHYSICS-ELEC-CELL] Electric Cells & Chemical Potential
- **Board:** CBSE | **Grade:** 6 | **Subject:** PHYSICS
- **Unit:** Unit 3: Electricity & Simple Circuits
- **Resolved Diagram:** `circuit_diagram`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Electric Cells & Chemical Potential" [CBSE-G6-PHYSICS-ELEC-CELL]
```
{
  "taxonomyKey": "WORK_ENERGY",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph"
  ],
  "hint": "Text contains forbidden keywords: [ph] - wrong topic content stored."
}
```
---
### [CBSE-G6-CHEMISTRY-MAT-SOLUBLE] Solubility, Solutes & Saturated Solutions
- **Board:** CBSE | **Grade:** 6 | **Subject:** CHEMISTRY
- **Unit:** Unit 1: States & Properties of Matter
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Solubility, Solutes & Saturated Solutions" [CBSE-G6-CHEMISTRY-MAT-SOLUBLE]
```
{
  "taxonomyKey": "STATES_OF_MATTER",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "reactivity",
    "acid"
  ],
  "hint": "Text contains forbidden keywords: [reactivity, acid] - wrong topic content stored."
}
```
---
### [CBSE-G6-CHEMISTRY-MAT-DENSITY] Mass, Volume & Density Floatation
- **Board:** CBSE | **Grade:** 6 | **Subject:** CHEMISTRY
- **Unit:** Unit 1: States & Properties of Matter
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Mass, Volume & Density Floatation" [CBSE-G6-CHEMISTRY-MAT-DENSITY]
```
{
  "taxonomyKey": "STATES_OF_MATTER",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "reactivity",
    "acid"
  ],
  "hint": "Text contains forbidden keywords: [reactivity, acid] - wrong topic content stored."
}
```
---
### [CBSE-G6-CHEMISTRY-MAT-STATES] Solids, Liquids & Gases: Particle Packing
- **Board:** CBSE | **Grade:** 6 | **Subject:** CHEMISTRY
- **Unit:** Unit 1: States & Properties of Matter
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Solids, Liquids & Gases: Particle Packing" [CBSE-G6-CHEMISTRY-MAT-STATES]
```
{
  "taxonomyKey": "STATES_OF_MATTER",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "reactivity",
    "acid"
  ],
  "hint": "Text contains forbidden keywords: [reactivity, acid] - wrong topic content stored."
}
```
---
### [CBSE-G6-CHEMISTRY-CHG-EVID] Indicators of Chemical Change
- **Board:** CBSE | **Grade:** 6 | **Subject:** CHEMISTRY
- **Unit:** Unit 3: Physical & Chemical Changes
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Indicators of Chemical Change" [CBSE-G6-CHEMISTRY-CHG-EVID]
```
{
  "taxonomyKey": "ACIDS_BASES",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "reactivity series",
    "displacement"
  ],
  "hint": "Text contains forbidden keywords: [reactivity series, displacement] - wrong topic content stored."
}
```
---
### [CBSE-G6-BIOLOGY-FOOD-DIET] Balanced Diets & Calorific Equilibrium
- **Board:** CBSE | **Grade:** 6 | **Subject:** BIOLOGY
- **Unit:** Unit 1: Food & Biological Macromolecules
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Balanced Diets & Calorific Equilibrium" [CBSE-G6-BIOLOGY-FOOD-DIET]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [CBSE-G6-CHEMISTRY-AIR-COMP] Atmospheric Gas Composition
- **Board:** CBSE | **Grade:** 6 | **Subject:** CHEMISTRY
- **Unit:** Unit 4: Air, Water & Atmospheric Cycles
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Atmospheric Gas Composition" [CBSE-G6-CHEMISTRY-AIR-COMP]
```
{
  "taxonomyKey": "ACIDS_BASES",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "reactivity series",
    "displacement"
  ],
  "hint": "Text contains forbidden keywords: [reactivity series, displacement] - wrong topic content stored."
}
```
---
### [CBSE-G6-CHEMISTRY-AIR-OXY] Oxygen & Combustion Reactions
- **Board:** CBSE | **Grade:** 6 | **Subject:** CHEMISTRY
- **Unit:** Unit 4: Air, Water & Atmospheric Cycles
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Oxygen & Combustion Reactions" [CBSE-G6-CHEMISTRY-AIR-OXY]
```
{
  "taxonomyKey": "ACIDS_BASES",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "reactivity series",
    "displacement"
  ],
  "hint": "Text contains forbidden keywords: [reactivity series, displacement] - wrong topic content stored."
}
```
---
### [CBSE-G6-CHEMISTRY-CHG-CHEM] Irreversible Chemical Reactions
- **Board:** CBSE | **Grade:** 6 | **Subject:** CHEMISTRY
- **Unit:** Unit 3: Physical & Chemical Changes
- **Resolved Diagram:** `bohr_atom`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Irreversible Chemical Reactions" [CBSE-G6-CHEMISTRY-CHG-CHEM]
```
{
  "taxonomyKey": "ACIDS_BASES",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "reactivity series",
    "displacement"
  ],
  "hint": "Text contains forbidden keywords: [reactivity series, displacement] - wrong topic content stored."
}
```
---
### [CBSE-G6-BIOLOGY-FOOD-VIT] Vitamins, Minerals & Deficiency Diseases
- **Board:** CBSE | **Grade:** 6 | **Subject:** BIOLOGY
- **Unit:** Unit 1: Food & Biological Macromolecules
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Vitamins, Minerals & Deficiency Diseases" [CBSE-G6-BIOLOGY-FOOD-VIT]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [CBSE-G6-BIOLOGY-FOOD-NUTRI] Carbohydrates, Lipids & Proteins
- **Board:** CBSE | **Grade:** 6 | **Subject:** BIOLOGY
- **Unit:** Unit 1: Food & Biological Macromolecules
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Carbohydrates, Lipids & Proteins" [CBSE-G6-BIOLOGY-FOOD-NUTRI]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [CBSE-G6-CHEMISTRY-CHG-PHYS] Reversible Physical Transformations
- **Board:** CBSE | **Grade:** 6 | **Subject:** CHEMISTRY
- **Unit:** Unit 3: Physical & Chemical Changes
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Reversible Physical Transformations" [CBSE-G6-CHEMISTRY-CHG-PHYS]
```
{
  "taxonomyKey": "ACIDS_BASES",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "reactivity series",
    "displacement"
  ],
  "hint": "Text contains forbidden keywords: [reactivity series, displacement] - wrong topic content stored."
}
```
---
### [CBSE-G6-BIOLOGY-PLANT-VEN] Venation Patterns & Root System Types
- **Board:** CBSE | **Grade:** 6 | **Subject:** BIOLOGY
- **Unit:** Unit 2: Plant Structure & Physiological Adaptation
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Venation Patterns & Root System Types" [CBSE-G6-BIOLOGY-PLANT-VEN]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [CBSE-G6-BIOLOGY-SKELET-BONES] Bones, Cartilage & Muscular Antagonism
- **Board:** CBSE | **Grade:** 6 | **Subject:** BIOLOGY
- **Unit:** Unit 3: Animal Locomotion & Skeletal Systems
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Bones, Cartilage & Muscular Antagonism" [CBSE-G6-BIOLOGY-SKELET-BONES]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [CBSE-G7-MATH-FRAC-MULT] Multiplication & Division of Rational Fractions
- **Board:** CBSE | **Grade:** 7 | **Subject:** MATH
- **Unit:** Unit 2: Fractions, Decimals & Scientific Form
- **Resolved Diagram:** `number_line`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Multiplication & Division of Rational Fractions" [CBSE-G7-MATH-FRAC-MULT]
```
{
  "taxonomyKey": "FRACTIONS",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "angle sum"
  ],
  "hint": "Text contains forbidden keywords: [angle sum] - wrong topic content stored."
}
```
---
### [CBSE-G6-BIOLOGY-PLANT-FLOWER] Floral Anatomy & Reproductive Parts
- **Board:** CBSE | **Grade:** 6 | **Subject:** BIOLOGY
- **Unit:** Unit 2: Plant Structure & Physiological Adaptation
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Floral Anatomy & Reproductive Parts" [CBSE-G6-BIOLOGY-PLANT-FLOWER]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [CBSE-G6-BIOLOGY-SKELET-JOINTS] Synovial Joints & Skeletal Articulation
- **Board:** CBSE | **Grade:** 6 | **Subject:** BIOLOGY
- **Unit:** Unit 3: Animal Locomotion & Skeletal Systems
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Synovial Joints & Skeletal Articulation" [CBSE-G6-BIOLOGY-SKELET-JOINTS]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [CBSE-G7-MATH-DEC-OPER] Operations on Multi-Digit Decimals
- **Board:** CBSE | **Grade:** 7 | **Subject:** MATH
- **Unit:** Unit 2: Fractions, Decimals & Scientific Form
- **Resolved Diagram:** `number_line`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Operations on Multi-Digit Decimals" [CBSE-G7-MATH-DEC-OPER]
```
{
  "taxonomyKey": "FRACTIONS",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "angle sum"
  ],
  "hint": "Text contains forbidden keywords: [angle sum] - wrong topic content stored."
}
```
---
### [CBSE-G7-MATH-DEC-PERIOD] Terminating vs Non-Terminating Decimals
- **Board:** CBSE | **Grade:** 7 | **Subject:** MATH
- **Unit:** Unit 2: Fractions, Decimals & Scientific Form
- **Resolved Diagram:** `number_line`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Terminating vs Non-Terminating Decimals" [CBSE-G7-MATH-DEC-PERIOD]
```
{
  "taxonomyKey": "FRACTIONS",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "angle sum"
  ],
  "hint": "Text contains forbidden keywords: [angle sum] - wrong topic content stored."
}
```
---
### [CBSE-G7-PHYSICS-HEAT-THERM] Temperature vs Heat Energy
- **Board:** CBSE | **Grade:** 7 | **Subject:** PHYSICS
- **Unit:** Unit 1: Heat, Temperature & Thermal Transfer
- **Resolved Diagram:** `energy_transfer`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Temperature vs Heat Energy" [CBSE-G7-PHYSICS-HEAT-THERM]
```
{
  "taxonomyKey": "TEMPERATURE_HEAT",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "pendulum"
  ],
  "hint": "Text contains forbidden keywords: [pendulum] - wrong topic content stored."
}
```
---
### [CBSE-G7-PHYSICS-HEAT-COND] Conduction in Solids & Lattice Vibrations
- **Board:** CBSE | **Grade:** 7 | **Subject:** PHYSICS
- **Unit:** Unit 1: Heat, Temperature & Thermal Transfer
- **Resolved Diagram:** `energy_transfer`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Conduction in Solids & Lattice Vibrations" [CBSE-G7-PHYSICS-HEAT-COND]
```
{
  "taxonomyKey": "TEMPERATURE_HEAT",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "pendulum"
  ],
  "hint": "Text contains forbidden keywords: [pendulum] - wrong topic content stored."
}
```
---
### [CBSE-G7-CHEMISTRY-IND-NEUT] Indicators & Neutralization Reactions
- **Board:** CBSE | **Grade:** 7 | **Subject:** CHEMISTRY
- **Unit:** Unit 1: Acids, Bases & Chemical Indicators
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Indicators & Neutralization Reactions" [CBSE-G7-CHEMISTRY-IND-NEUT]
```
{
  "taxonomyKey": "ACIDS_BASES",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "reactivity series",
    "displacement"
  ],
  "hint": "Text contains forbidden keywords: [reactivity series, displacement] - wrong topic content stored."
}
```
---
### [CBSE-G7-CHEMISTRY-ACID-PROP] Arrhenius Acids & Hydrogen Ion Liberation
- **Board:** CBSE | **Grade:** 7 | **Subject:** CHEMISTRY
- **Unit:** Unit 1: Acids, Bases & Chemical Indicators
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Arrhenius Acids & Hydrogen Ion Liberation" [CBSE-G7-CHEMISTRY-ACID-PROP]
```
{
  "taxonomyKey": "ACIDS_BASES",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "reactivity series",
    "displacement"
  ],
  "hint": "Text contains forbidden keywords: [reactivity series, displacement] - wrong topic content stored."
}
```
---
### [CBSE-G7-CHEMISTRY-RUST-MECH] Corrosion & Rusting of Iron
- **Board:** CBSE | **Grade:** 7 | **Subject:** CHEMISTRY
- **Unit:** Unit 2: Physical & Chemical Transformations
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Corrosion & Rusting of Iron" [CBSE-G7-CHEMISTRY-RUST-MECH]
```
{
  "taxonomyKey": "ACIDS_BASES",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "reactivity series",
    "displacement"
  ],
  "hint": "Text contains forbidden keywords: [reactivity series, displacement] - wrong topic content stored."
}
```
---
### [CBSE-G7-CHEMISTRY-CRYST-SEP] Crystallization & Solid Purification
- **Board:** CBSE | **Grade:** 7 | **Subject:** CHEMISTRY
- **Unit:** Unit 2: Physical & Chemical Transformations
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Crystallization & Solid Purification" [CBSE-G7-CHEMISTRY-CRYST-SEP]
```
{
  "taxonomyKey": "ACIDS_BASES",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "reactivity series",
    "displacement"
  ],
  "hint": "Text contains forbidden keywords: [reactivity series, displacement] - wrong topic content stored."
}
```
---
### [CBSE-G7-CHEMISTRY-COMB-MAG] Magnesium Combustion & Basic Oxide Formation
- **Board:** CBSE | **Grade:** 7 | **Subject:** CHEMISTRY
- **Unit:** Unit 2: Physical & Chemical Transformations
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Magnesium Combustion & Basic Oxide Formation" [CBSE-G7-CHEMISTRY-COMB-MAG]
```
{
  "taxonomyKey": "ACIDS_BASES",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "reactivity series",
    "displacement"
  ],
  "hint": "Text contains forbidden keywords: [reactivity series, displacement] - wrong topic content stored."
}
```
---
### [CBSE-G7-BIOLOGY-PHOTO-EQ] Photosynthetic Chemistry & Chloroplasts
- **Board:** CBSE | **Grade:** 7 | **Subject:** BIOLOGY
- **Unit:** Unit 1: Autotrophic & Heterotrophic Plant Nutrition
- **Resolved Diagram:** `visual_model_pending`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Photosynthetic Chemistry & Chloroplasts" [CBSE-G7-BIOLOGY-PHOTO-EQ]
```
{
  "taxonomyKey": "PHOTOSYNTHESIS",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "blood",
    "digestive"
  ],
  "hint": "Text contains forbidden keywords: [blood, digestive] - wrong topic content stored."
}
```
#### VISUAL_FALLBACK
No topic-specific diagram for "Photosynthetic Chemistry & Chloroplasts" [CBSE-G7-BIOLOGY-PHOTO-EQ]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [CBSE-G7-BIOLOGY-PLANT-PARASIT] Parasitic, Saprophytic & Symbiotic Plants
- **Board:** CBSE | **Grade:** 7 | **Subject:** BIOLOGY
- **Unit:** Unit 1: Autotrophic & Heterotrophic Plant Nutrition
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Parasitic, Saprophytic & Symbiotic Plants" [CBSE-G7-BIOLOGY-PLANT-PARASIT]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [CBSE-G7-BIOLOGY-PLANT-STOMATA] Stomatal Guard Cells & Gas Exchange
- **Board:** CBSE | **Grade:** 7 | **Subject:** BIOLOGY
- **Unit:** Unit 1: Autotrophic & Heterotrophic Plant Nutrition
- **Resolved Diagram:** `plant_transport`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Stomatal Guard Cells & Gas Exchange" [CBSE-G7-BIOLOGY-PLANT-STOMATA]
```
{
  "taxonomyKey": "PHOTOSYNTHESIS",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "blood",
    "digestive"
  ],
  "hint": "Text contains forbidden keywords: [blood, digestive] - wrong topic content stored."
}
```
---
### [CBSE-G7-BIOLOGY-CIRC-BLOOD] Blood Composition: Plasma, Erythrocytes & Leukocytes
- **Board:** CBSE | **Grade:** 7 | **Subject:** BIOLOGY
- **Unit:** Unit 4: Circulation & Transportation Systems
- **Resolved Diagram:** `heart_circulation`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Blood Composition: Plasma, Erythrocytes & Leukocytes" [CBSE-G7-BIOLOGY-CIRC-BLOOD]
```
{
  "taxonomyKey": "HEART_CIRCULATION",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "xylem",
    "phloem"
  ],
  "hint": "Text contains forbidden keywords: [xylem, phloem] - wrong topic content stored."
}
```
---
### [CBSE-G8-MATH-LINEQ-FRAC] Equations with Fractional Denominators
- **Board:** CBSE | **Grade:** 8 | **Subject:** MATH
- **Unit:** Unit 2: Linear Equations with Variables on Both Sides
- **Resolved Diagram:** `coordinate_grid`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Equations with Fractional Denominators" [CBSE-G8-MATH-LINEQ-FRAC]
```
{
  "taxonomyKey": "FRACTIONS",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "angle sum"
  ],
  "hint": "Text contains forbidden keywords: [angle sum] - wrong topic content stored."
}
```
---
### [CBSE-G8-CHEMISTRY-MET-PHYS] Malleability, Ductility & Thermal Conductivity
- **Board:** CBSE | **Grade:** 8 | **Subject:** CHEMISTRY
- **Unit:** Unit 2: Metals, Non-Metals & Chemical Reactivity
- **Resolved Diagram:** `bohr_atom`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Malleability, Ductility & Thermal Conductivity" [CBSE-G8-CHEMISTRY-MET-PHYS]
```
{
  "taxonomyKey": "REACTIVITY_SERIES",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "litmus",
    "neutrali",
    "antacid"
  ],
  "hint": "Text contains forbidden keywords: [litmus, neutrali, antacid] - wrong topic content stored."
}
```
---
### [CBSE-G8-CHEMISTRY-MET-DISP] The Reactivity Series & Single Displacement Reactions
- **Board:** CBSE | **Grade:** 8 | **Subject:** CHEMISTRY
- **Unit:** Unit 2: Metals, Non-Metals & Chemical Reactivity
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "The Reactivity Series & Single Displacement Reactions" [CBSE-G8-CHEMISTRY-MET-DISP]
```
{
  "taxonomyKey": "REACTIVITY_SERIES",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "litmus",
    "neutrali",
    "antacid"
  ],
  "hint": "Text contains forbidden keywords: [litmus, neutrali, antacid] - wrong topic content stored."
}
```
---
### [CBSE-G8-CHEMISTRY-MET-OXY] Metal Reactions with Oxygen, Water & Acids
- **Board:** CBSE | **Grade:** 8 | **Subject:** CHEMISTRY
- **Unit:** Unit 2: Metals, Non-Metals & Chemical Reactivity
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Metal Reactions with Oxygen, Water & Acids" [CBSE-G8-CHEMISTRY-MET-OXY]
```
{
  "taxonomyKey": "REACTIVITY_SERIES",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "litmus",
    "neutrali",
    "antacid"
  ],
  "hint": "Text contains forbidden keywords: [litmus, neutrali, antacid] - wrong topic content stored."
}
```
---
### [CBSE-G8-BIOLOGY-AGRI-NUTRI] Manure vs Chemical Fertilizers & Crop Rotation
- **Board:** CBSE | **Grade:** 8 | **Subject:** BIOLOGY
- **Unit:** Unit 1: Agricultural Management & Crop Production
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Manure vs Chemical Fertilizers & Crop Rotation" [CBSE-G8-BIOLOGY-AGRI-NUTRI]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [CBSE-G8-CHEMISTRY-COMB-COND] Ignition Temperature & Fire Triangle
- **Board:** CBSE | **Grade:** 8 | **Subject:** CHEMISTRY
- **Unit:** Unit 4: Combustion, Calorimetry & Flame Anatomy
- **Resolved Diagram:** `bohr_atom`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Ignition Temperature & Fire Triangle" [CBSE-G8-CHEMISTRY-COMB-COND]
```
{
  "taxonomyKey": "ATOMIC_STRUCTURE",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph",
    "acid",
    "reactivity"
  ],
  "hint": "Text contains forbidden keywords: [ph, acid, reactivity] - wrong topic content stored."
}
```
---
### [CBSE-G8-BIOLOGY-AGRI-SOW] Seed Selection & Sowing Techniques
- **Board:** CBSE | **Grade:** 8 | **Subject:** BIOLOGY
- **Unit:** Unit 1: Agricultural Management & Crop Production
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Seed Selection & Sowing Techniques" [CBSE-G8-BIOLOGY-AGRI-SOW]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [CBSE-G8-CHEMISTRY-FLAME-ZONES] Flame Structure: Outer, Middle & Innermost Zones
- **Board:** CBSE | **Grade:** 8 | **Subject:** CHEMISTRY
- **Unit:** Unit 4: Combustion, Calorimetry & Flame Anatomy
- **Resolved Diagram:** `bohr_atom`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Flame Structure: Outer, Middle & Innermost Zones" [CBSE-G8-CHEMISTRY-FLAME-ZONES]
```
{
  "taxonomyKey": "ATOMIC_STRUCTURE",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph",
    "acid",
    "reactivity"
  ],
  "hint": "Text contains forbidden keywords: [ph, acid, reactivity] - wrong topic content stored."
}
```
---
### [CBSE-G8-BIOLOGY-MICRO-PATH] Pathogenic Transmission & Vaccine Immunology
- **Board:** CBSE | **Grade:** 8 | **Subject:** BIOLOGY
- **Unit:** Unit 2: Microorganisms: Mutualists & Pathogens
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Pathogenic Transmission & Vaccine Immunology" [CBSE-G8-BIOLOGY-MICRO-PATH]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [CBSE-G8-CHEMISTRY-COMB-CALOR] Calorific Value & Enthalpy of Fuels
- **Board:** CBSE | **Grade:** 8 | **Subject:** CHEMISTRY
- **Unit:** Unit 4: Combustion, Calorimetry & Flame Anatomy
- **Resolved Diagram:** `bohr_atom`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Calorific Value & Enthalpy of Fuels" [CBSE-G8-CHEMISTRY-COMB-CALOR]
```
{
  "taxonomyKey": "ATOMIC_STRUCTURE",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph",
    "acid",
    "reactivity"
  ],
  "hint": "Text contains forbidden keywords: [ph, acid, reactivity] - wrong topic content stored."
}
```
---
### [CBSE-G9-PHYSICS-NEWT-LAW3] Newton's Third Law & Momentum Conservation
- **Board:** CBSE | **Grade:** 9 | **Subject:** PHYSICS
- **Unit:** Unit 2: Forces & Newton's Laws of Motion
- **Resolved Diagram:** `energy_transfer`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Newton's Third Law & Momentum Conservation" [CBSE-G9-PHYSICS-NEWT-LAW3]
```
{
  "taxonomyKey": "WORK_ENERGY",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph"
  ],
  "hint": "Text contains forbidden keywords: [ph] - wrong topic content stored."
}
```
---
### [CBSE-G9-PHYSICS-ENG-CONSERV] Gravitational Potential Energy & Energy Conservation
- **Board:** CBSE | **Grade:** 9 | **Subject:** PHYSICS
- **Unit:** Unit 4: Work, Energy & Power
- **Resolved Diagram:** `energy_transfer`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Gravitational Potential Energy & Energy Conservation" [CBSE-G9-PHYSICS-ENG-CONSERV]
```
{
  "taxonomyKey": "WORK_ENERGY",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph"
  ],
  "hint": "Text contains forbidden keywords: [ph] - wrong topic content stored."
}
```
---
### [CBSE-G9-PHYSICS-WORK-DEF] Scientific Work Done (W = F * d * cos θ)
- **Board:** CBSE | **Grade:** 9 | **Subject:** PHYSICS
- **Unit:** Unit 4: Work, Energy & Power
- **Resolved Diagram:** `energy_transfer`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Scientific Work Done (W = F * d * cos θ)" [CBSE-G9-PHYSICS-WORK-DEF]
```
{
  "taxonomyKey": "WORK_ENERGY",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph"
  ],
  "hint": "Text contains forbidden keywords: [ph] - wrong topic content stored."
}
```
---
### [CBSE-G9-PHYSICS-SOUND-ULTRASON] Echoes, Reverberation & SONAR Applications
- **Board:** CBSE | **Grade:** 9 | **Subject:** PHYSICS
- **Unit:** Unit 5: Sound Waves & Acoustic Propagation
- **Resolved Diagram:** `ray_optics`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Echoes, Reverberation & SONAR Applications" [CBSE-G9-PHYSICS-SOUND-ULTRASON]
```
{
  "taxonomyKey": "SOUND_WAVES",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "optics",
    "lens"
  ],
  "hint": "Text contains forbidden keywords: [optics, lens] - wrong topic content stored."
}
```
---
### [CBSE-G9-CHEMISTRY-MAT-KINETIC] Kinetic Molecular Theory of Matter
- **Board:** CBSE | **Grade:** 9 | **Subject:** CHEMISTRY
- **Unit:** Unit 1: Matter & Kinetic Particle Theory
- **Resolved Diagram:** `states_of_matter`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Kinetic Molecular Theory of Matter" [CBSE-G9-CHEMISTRY-MAT-KINETIC]
```
{
  "taxonomyKey": "STATES_OF_MATTER",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "acid"
  ],
  "hint": "Text contains forbidden keywords: [acid] - wrong topic content stored."
}
```
---
### [CBSE-G9-PHYSICS-GRAV-MASS] Mass vs Weight & Gravitational Potential
- **Board:** CBSE | **Grade:** 9 | **Subject:** PHYSICS
- **Unit:** Unit 3: Gravitation & Orbital Motion
- **Resolved Diagram:** `physics_vector`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Mass vs Weight & Gravitational Potential" [CBSE-G9-PHYSICS-GRAV-MASS]
```
{
  "taxonomyKey": "WORK_ENERGY",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph"
  ],
  "hint": "Text contains forbidden keywords: [ph] - wrong topic content stored."
}
```
---
### [CBSE-G9-PHYSICS-ENG-KINETIC] Kinetic Energy Derivation (KE = 1/2 m v²)
- **Board:** CBSE | **Grade:** 9 | **Subject:** PHYSICS
- **Unit:** Unit 4: Work, Energy & Power
- **Resolved Diagram:** `energy_transfer`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Kinetic Energy Derivation (KE = 1/2 m v²)" [CBSE-G9-PHYSICS-ENG-KINETIC]
```
{
  "taxonomyKey": "WORK_ENERGY",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph"
  ],
  "hint": "Text contains forbidden keywords: [ph] - wrong topic content stored."
}
```
---
### [CBSE-G9-CHEMISTRY-MAT-LATENT] Latent Heat of Fusion & Vaporization
- **Board:** CBSE | **Grade:** 9 | **Subject:** CHEMISTRY
- **Unit:** Unit 1: Matter & Kinetic Particle Theory
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Latent Heat of Fusion & Vaporization" [CBSE-G9-CHEMISTRY-MAT-LATENT]
```
{
  "taxonomyKey": "STATES_OF_MATTER",
  "expectedKeywordsFound": false,
  "forbiddenKeywordsFound": [
    "acid"
  ],
  "hint": "Text contains forbidden keywords: [acid] - wrong topic content stored."
}
```
---
### [CBSE-G9-CHEMISTRY-ATOM-ISOTOPE] Atomic Number, Mass Number, Isotopes & Isobars
- **Board:** CBSE | **Grade:** 9 | **Subject:** CHEMISTRY
- **Unit:** Unit 4: Atomic Structure & Subatomic Particles
- **Resolved Diagram:** `bohr_atom`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Atomic Number, Mass Number, Isotopes & Isobars" [CBSE-G9-CHEMISTRY-ATOM-ISOTOPE]
```
{
  "taxonomyKey": "ATOMIC_STRUCTURE",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph",
    "acid",
    "reactivity"
  ],
  "hint": "Text contains forbidden keywords: [ph, acid, reactivity] - wrong topic content stored."
}
```
---
### [CBSE-G9-CHEMISTRY-ATOM-RUTH] Rutherford Gold Foil Experiment & Nucleus
- **Board:** CBSE | **Grade:** 9 | **Subject:** CHEMISTRY
- **Unit:** Unit 4: Atomic Structure & Subatomic Particles
- **Resolved Diagram:** `bohr_atom`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Rutherford Gold Foil Experiment & Nucleus" [CBSE-G9-CHEMISTRY-ATOM-RUTH]
```
{
  "taxonomyKey": "ATOMIC_STRUCTURE",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph",
    "acid",
    "reactivity"
  ],
  "hint": "Text contains forbidden keywords: [ph, acid, reactivity] - wrong topic content stored."
}
```
---
### [CBSE-G9-CHEMISTRY-ATOM-MOLE] The Mole Concept & Avogadro's Number (N_A = 6.022e23)
- **Board:** CBSE | **Grade:** 9 | **Subject:** CHEMISTRY
- **Unit:** Unit 3: Atoms, Molecules & Chemical Stoichiometry
- **Resolved Diagram:** `bohr_atom`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "The Mole Concept & Avogadro's Number (N_A = 6.022e23)" [CBSE-G9-CHEMISTRY-ATOM-MOLE]
```
{
  "taxonomyKey": "ATOMIC_STRUCTURE",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph",
    "acid",
    "reactivity"
  ],
  "hint": "Text contains forbidden keywords: [ph, acid, reactivity] - wrong topic content stored."
}
```
---
### [CBSE-G9-CHEMISTRY-ATOM-BOHR] Bohr Atomic Model & Quantized Energy Shells
- **Board:** CBSE | **Grade:** 9 | **Subject:** CHEMISTRY
- **Unit:** Unit 4: Atomic Structure & Subatomic Particles
- **Resolved Diagram:** `bohr_atom`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Bohr Atomic Model & Quantized Energy Shells" [CBSE-G9-CHEMISTRY-ATOM-BOHR]
```
{
  "taxonomyKey": "ATOMIC_STRUCTURE",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph",
    "reactivity"
  ],
  "hint": "Text contains forbidden keywords: [ph, reactivity] - wrong topic content stored."
}
```
---
### [CBSE-G9-CHEMISTRY-ATOM-LAWS] Laws of Chemical Combination (Mass & Proportions)
- **Board:** CBSE | **Grade:** 9 | **Subject:** CHEMISTRY
- **Unit:** Unit 3: Atoms, Molecules & Chemical Stoichiometry
- **Resolved Diagram:** `bohr_atom`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Laws of Chemical Combination (Mass & Proportions)" [CBSE-G9-CHEMISTRY-ATOM-LAWS]
```
{
  "taxonomyKey": "ATOMIC_STRUCTURE",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph",
    "acid",
    "reactivity"
  ],
  "hint": "Text contains forbidden keywords: [ph, acid, reactivity] - wrong topic content stored."
}
```
---
### [CBSE-G9-CHEMISTRY-ATOM-DALTON] Dalton's Atomic Postulates & Modern Revisions
- **Board:** CBSE | **Grade:** 9 | **Subject:** CHEMISTRY
- **Unit:** Unit 3: Atoms, Molecules & Chemical Stoichiometry
- **Resolved Diagram:** `bohr_atom`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Dalton's Atomic Postulates & Modern Revisions" [CBSE-G9-CHEMISTRY-ATOM-DALTON]
```
{
  "taxonomyKey": "ATOMIC_STRUCTURE",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph",
    "acid",
    "reactivity"
  ],
  "hint": "Text contains forbidden keywords: [ph, acid, reactivity] - wrong topic content stored."
}
```
---
### [CBSE-G9-BIOLOGY-TISS-PLANT] Meristematic vs Permanent Plant Tissues
- **Board:** CBSE | **Grade:** 9 | **Subject:** BIOLOGY
- **Unit:** Unit 2: Plant & Animal Tissues
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Meristematic vs Permanent Plant Tissues" [CBSE-G9-BIOLOGY-TISS-PLANT]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [CBSE-G9-BIOLOGY-CYCLE-NITRO] The Nitrogen Cycle & Biological Fixation
- **Board:** CBSE | **Grade:** 9 | **Subject:** BIOLOGY
- **Unit:** Unit 4: Biogeochemical Cycles & Sustainability
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "The Nitrogen Cycle & Biological Fixation" [CBSE-G9-BIOLOGY-CYCLE-NITRO]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [CBSE-G10-PHYSICS-ELEC-JOULE] Electric Power & Joule Dissipation (P = V*I = I²*R)
- **Board:** CBSE | **Grade:** 10 | **Subject:** PHYSICS
- **Unit:** Unit 3: Electricity & Circuit Analysis
- **Resolved Diagram:** `ray_optics`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Electric Power & Joule Dissipation (P = V*I = I²*R)" [CBSE-G10-PHYSICS-ELEC-JOULE]
```
{
  "taxonomyKey": "ELECTRICITY",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "lens"
  ],
  "hint": "Text contains forbidden keywords: [lens] - wrong topic content stored."
}
```
---
### [CBSE-G10-PHYSICS-ELEC-SERIES] Resistors in Series & Parallel Networks
- **Board:** CBSE | **Grade:** 10 | **Subject:** PHYSICS
- **Unit:** Unit 3: Electricity & Circuit Analysis
- **Resolved Diagram:** `circuit_diagram`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Resistors in Series & Parallel Networks" [CBSE-G10-PHYSICS-ELEC-SERIES]
```
{
  "taxonomyKey": "WORK_ENERGY",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "temperature",
    "ph"
  ],
  "hint": "Text contains forbidden keywords: [temperature, ph] - wrong topic content stored."
}
```
---
### [CBSE-G10-CHEMISTRY-MET-IONIC] Ionic Bonding & Lattice Enthalpy
- **Board:** CBSE | **Grade:** 10 | **Subject:** CHEMISTRY
- **Unit:** Unit 3: Metals, Non-Metals & Extractive Metallurgy
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Ionic Bonding & Lattice Enthalpy" [CBSE-G10-CHEMISTRY-MET-IONIC]
```
{
  "taxonomyKey": "CHEMICAL_BONDING",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "reactivity series",
    "ph scale"
  ],
  "hint": "Text contains forbidden keywords: [reactivity series, ph scale] - wrong topic content stored."
}
```
---
### [CBSE-G10-CHEMISTRY-ACID-BUFFER] Water of Crystallization & Hydrate Salts
- **Board:** CBSE | **Grade:** 10 | **Subject:** CHEMISTRY
- **Unit:** Unit 2: Acids, Bases, Salts & The pH Scale
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Water of Crystallization & Hydrate Salts" [CBSE-G10-CHEMISTRY-ACID-BUFFER]
```
{
  "taxonomyKey": "ACIDS_BASES",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "reactivity series",
    "displacement"
  ],
  "hint": "Text contains forbidden keywords: [reactivity series, displacement] - wrong topic content stored."
}
```
---
### [CBSE-G10-CHEMISTRY-ACID-PH] The Logarithmic pH Scale & Hydronium Concentration
- **Board:** CBSE | **Grade:** 10 | **Subject:** CHEMISTRY
- **Unit:** Unit 2: Acids, Bases, Salts & The pH Scale
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "The Logarithmic pH Scale & Hydronium Concentration" [CBSE-G10-CHEMISTRY-ACID-PH]
```
{
  "taxonomyKey": "ACIDS_BASES",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "reactivity series",
    "displacement"
  ],
  "hint": "Text contains forbidden keywords: [reactivity series, displacement] - wrong topic content stored."
}
```
---
### [CBSE-G10-CHEMISTRY-ACID-SALTS] Common Salts: NaCl, NaHCO3, Na2CO3 & CaSO4
- **Board:** CBSE | **Grade:** 10 | **Subject:** CHEMISTRY
- **Unit:** Unit 2: Acids, Bases, Salts & The pH Scale
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Common Salts: NaCl, NaHCO3, Na2CO3 & CaSO4" [CBSE-G10-CHEMISTRY-ACID-SALTS]
```
{
  "taxonomyKey": "ACIDS_BASES",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "reactivity series",
    "displacement"
  ],
  "hint": "Text contains forbidden keywords: [reactivity series, displacement] - wrong topic content stored."
}
```
---
### [CBSE-G10-CHEMISTRY-CARB-HOMOL] Homologous Series & Functional Groups
- **Board:** CBSE | **Grade:** 10 | **Subject:** CHEMISTRY
- **Unit:** Unit 4: Carbon & Its Covalent Compounds
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Homologous Series & Functional Groups" [CBSE-G10-CHEMISTRY-CARB-HOMOL]
```
{
  "taxonomyKey": "CHEMICAL_BONDING",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "reactivity series",
    "ph scale"
  ],
  "hint": "Text contains forbidden keywords: [reactivity series, ph scale] - wrong topic content stored."
}
```
---
### [CBSE-G10-CHEMISTRY-CARB-TETRA] Tetravalency, Catenation & Allotropy
- **Board:** CBSE | **Grade:** 10 | **Subject:** CHEMISTRY
- **Unit:** Unit 4: Carbon & Its Covalent Compounds
- **Resolved Diagram:** `bohr_atom`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Tetravalency, Catenation & Allotropy" [CBSE-G10-CHEMISTRY-CARB-TETRA]
```
{
  "taxonomyKey": "CHEMICAL_BONDING",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "reactivity series"
  ],
  "hint": "Text contains forbidden keywords: [reactivity series] - wrong topic content stored."
}
```
---
### [CBSE-G10-BIOLOGY-LIFE-EXCR] Renal Excretion & Nephron Ultrafiltration
- **Board:** CBSE | **Grade:** 10 | **Subject:** BIOLOGY
- **Unit:** Unit 1: Life Processes: Metabolic Physiology
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Renal Excretion & Nephron Ultrafiltration" [CBSE-G10-BIOLOGY-LIFE-EXCR]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [CBSE-G10-CHEMISTRY-PER-TRENDS] Periodic Trends: Atomic Radii, Electronegativity & Ionization
- **Board:** CBSE | **Grade:** 10 | **Subject:** CHEMISTRY
- **Unit:** Unit 5: Periodic Classification of Elements
- **Resolved Diagram:** `bohr_atom`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Periodic Trends: Atomic Radii, Electronegativity & Ionization" [CBSE-G10-CHEMISTRY-PER-TRENDS]
```
{
  "taxonomyKey": "ATOMIC_STRUCTURE",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph",
    "acid",
    "reactivity"
  ],
  "hint": "Text contains forbidden keywords: [ph, acid, reactivity] - wrong topic content stored."
}
```
---
### [CBSE-G10-CHEMISTRY-PER-MODERN] Modern Periodic Law & Atomic Numbers
- **Board:** CBSE | **Grade:** 10 | **Subject:** CHEMISTRY
- **Unit:** Unit 5: Periodic Classification of Elements
- **Resolved Diagram:** `bohr_atom`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Modern Periodic Law & Atomic Numbers" [CBSE-G10-CHEMISTRY-PER-MODERN]
```
{
  "taxonomyKey": "ATOMIC_STRUCTURE",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph",
    "acid",
    "reactivity"
  ],
  "hint": "Text contains forbidden keywords: [ph, acid, reactivity] - wrong topic content stored."
}
```
---
### [CBSE-G10-CHEMISTRY-CARB-REAC] Esterification, Saponification & Combustion
- **Board:** CBSE | **Grade:** 10 | **Subject:** CHEMISTRY
- **Unit:** Unit 4: Carbon & Its Covalent Compounds
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Esterification, Saponification & Combustion" [CBSE-G10-CHEMISTRY-CARB-REAC]
```
{
  "taxonomyKey": "CHEMICAL_BONDING",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "reactivity series",
    "ph scale"
  ],
  "hint": "Text contains forbidden keywords: [reactivity series, ph scale] - wrong topic content stored."
}
```
---
### [CAMBRIDGE-G6-MATH-NUMSYS-INT] Integers & The Number Line
- **Board:** CAMBRIDGE | **Grade:** 6 | **Subject:** MATH
- **Unit:** Unit 1: Number Systems & Arithmetic Continuity
- **Resolved Diagram:** `number_line`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Integers & The Number Line" [CAMBRIDGE-G6-MATH-NUMSYS-INT]
```
{
  "taxonomyKey": "INTEGERS",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "angle"
  ],
  "hint": "Text contains forbidden keywords: [angle] - wrong topic content stored."
}
```
---
### [CBSE-G10-BIOLOGY-REPRO-HEALTH] Contraception, Barrier Methods & Reproductive Health
- **Board:** CBSE | **Grade:** 10 | **Subject:** BIOLOGY
- **Unit:** Unit 3: Reproductive Biology & Development
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Contraception, Barrier Methods & Reproductive Health" [CBSE-G10-BIOLOGY-REPRO-HEALTH]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [CBSE-G6-MATH-NUMSYS-INT] Integers & The Number Line
- **Board:** CBSE | **Grade:** 6 | **Subject:** MATH
- **Unit:** Unit 1: Number Systems & Arithmetic Continuity
- **Resolved Diagram:** `number_line`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Integers & The Number Line" [CBSE-G6-MATH-NUMSYS-INT]
```
{
  "taxonomyKey": "INTEGERS",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "angle"
  ],
  "hint": "Text contains forbidden keywords: [angle] - wrong topic content stored."
}
```
---
### [CAMBRIDGE-G6-MATH-GEO-CIRC] Circles: Radius, Diameter & Circumference
- **Board:** CAMBRIDGE | **Grade:** 6 | **Subject:** MATH
- **Unit:** Unit 3: Basic Geometry & Spatial Structures
- **Resolved Diagram:** `circle_geometry`

#### TEMPLATED_TEXT
Boilerplate text detected in "Circles: Radius, Diameter & Circumference" [CAMBRIDGE-G6-MATH-GEO-CIRC]
```
{
  "matchedPatterns": [
    "State the primary definition and rule governing",
    "Calculate the result when standard numerical values are applied to"
  ]
}
```
---
### [CAMBRIDGE-G6-MATH-GEO-POINTS] Points, Lines, Rays & Angles
- **Board:** CAMBRIDGE | **Grade:** 6 | **Subject:** MATH
- **Unit:** Unit 3: Basic Geometry & Spatial Structures
- **Resolved Diagram:** `number_line`

#### TEMPLATED_TEXT
Boilerplate text detected in "Points, Lines, Rays & Angles" [CAMBRIDGE-G6-MATH-GEO-POINTS]
```
{
  "matchedPatterns": [
    "State the primary definition and rule governing",
    "Calculate the result when standard numerical values are applied to"
  ]
}
```
---
### [CBSE-G6-CHEMISTRY-WATER-CYCLE] The Hydrological Cycle & Phase Dynamics
- **Board:** CBSE | **Grade:** 6 | **Subject:** CHEMISTRY
- **Unit:** Unit 4: Air, Water & Atmospheric Cycles
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "The Hydrological Cycle & Phase Dynamics" [CBSE-G6-CHEMISTRY-WATER-CYCLE]
```
{
  "taxonomyKey": "ACIDS_BASES",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "reactivity series",
    "displacement"
  ],
  "hint": "Text contains forbidden keywords: [reactivity series, displacement] - wrong topic content stored."
}
```
---
### [CAMBRIDGE-G6-MATH-DATA-TABLES] Tally Marks & Frequency Tables
- **Board:** CAMBRIDGE | **Grade:** 6 | **Subject:** MATH
- **Unit:** Unit 5: Data Handling & Basic Probability
- **Resolved Diagram:** `number_line`

#### TEMPLATED_TEXT
Boilerplate text detected in "Tally Marks & Frequency Tables" [CAMBRIDGE-G6-MATH-DATA-TABLES]
```
{
  "matchedPatterns": [
    "State the primary definition and rule governing",
    "Calculate the result when standard numerical values are applied to"
  ]
}
```
---
### [CAMBRIDGE-G6-MATH-DATA-BAR] Bar Graphs & Visual Representation
- **Board:** CAMBRIDGE | **Grade:** 6 | **Subject:** MATH
- **Unit:** Unit 5: Data Handling & Basic Probability
- **Resolved Diagram:** `number_line`

#### TEMPLATED_TEXT
Boilerplate text detected in "Bar Graphs & Visual Representation" [CAMBRIDGE-G6-MATH-DATA-BAR]
```
{
  "matchedPatterns": [
    "State the primary definition and rule governing",
    "Calculate the result when standard numerical values are applied to"
  ]
}
```
---
### [CAMBRIDGE-G6-PHYSICS-ELEC-CELL] Electric Cells & Chemical Potential
- **Board:** CAMBRIDGE | **Grade:** 6 | **Subject:** PHYSICS
- **Unit:** Unit 3: Electricity & Simple Circuits
- **Resolved Diagram:** `circuit_diagram`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Electric Cells & Chemical Potential" [CAMBRIDGE-G6-PHYSICS-ELEC-CELL]
```
{
  "taxonomyKey": "WORK_ENERGY",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph"
  ],
  "hint": "Text contains forbidden keywords: [ph] - wrong topic content stored."
}
```
---
### [CAMBRIDGE-G6-MATH-DATA-PROB] Likelihood & Elementary Chance
- **Board:** CAMBRIDGE | **Grade:** 6 | **Subject:** MATH
- **Unit:** Unit 5: Data Handling & Basic Probability
- **Resolved Diagram:** `number_line`

#### TEMPLATED_TEXT
Boilerplate text detected in "Likelihood & Elementary Chance" [CAMBRIDGE-G6-MATH-DATA-PROB]
```
{
  "matchedPatterns": [
    "State the primary definition and rule governing",
    "Calculate the result when standard numerical values are applied to"
  ]
}
```
---
### [CAMBRIDGE-G6-CHEMISTRY-MAT-STATES] Solids, Liquids & Gases: Particle Packing
- **Board:** CAMBRIDGE | **Grade:** 6 | **Subject:** CHEMISTRY
- **Unit:** Unit 1: States & Properties of Matter
- **Resolved Diagram:** `states_of_matter`

#### TEMPLATED_TEXT
Boilerplate text detected in "Solids, Liquids & Gases: Particle Packing" [CAMBRIDGE-G6-CHEMISTRY-MAT-STATES]
```
{
  "matchedPatterns": [
    "State the primary definition and rule governing",
    "Calculate the result when standard numerical values are applied to"
  ]
}
```
---
### [CBSE-G6-BIOLOGY-SKELET-INVERT] Invertebrate Locomotion Mechanisms
- **Board:** CBSE | **Grade:** 6 | **Subject:** BIOLOGY
- **Unit:** Unit 3: Animal Locomotion & Skeletal Systems
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Invertebrate Locomotion Mechanisms" [CBSE-G6-BIOLOGY-SKELET-INVERT]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [CAMBRIDGE-G6-CHEMISTRY-SEP-FILTER] Filtration & Decantation Mechanics
- **Board:** CAMBRIDGE | **Grade:** 6 | **Subject:** CHEMISTRY
- **Unit:** Unit 2: Separation of Substances
- **Resolved Diagram:** `reaction_energy`

#### TEMPLATED_TEXT
Boilerplate text detected in "Filtration & Decantation Mechanics" [CAMBRIDGE-G6-CHEMISTRY-SEP-FILTER]
```
{
  "matchedPatterns": [
    "State the primary definition and rule governing",
    "Calculate the result when standard numerical values are applied to"
  ]
}
```
---
### [CAMBRIDGE-G6-CHEMISTRY-MAT-DENSITY] Mass, Volume & Density Floatation
- **Board:** CAMBRIDGE | **Grade:** 6 | **Subject:** CHEMISTRY
- **Unit:** Unit 1: States & Properties of Matter
- **Resolved Diagram:** `reaction_energy`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Mass, Volume & Density Floatation" [CAMBRIDGE-G6-CHEMISTRY-MAT-DENSITY]
```
{
  "taxonomyKey": "STATES_OF_MATTER",
  "expectedKeywordsFound": false,
  "forbiddenKeywordsFound": [],
  "hint": "None of expected keywords [solid, liquid, gas...] found in content."
}
```
#### TEMPLATED_TEXT
Boilerplate text detected in "Mass, Volume & Density Floatation" [CAMBRIDGE-G6-CHEMISTRY-MAT-DENSITY]
```
{
  "matchedPatterns": [
    "State the primary definition and rule governing",
    "Calculate the result when standard numerical values are applied to"
  ]
}
```
---
### [CAMBRIDGE-G6-BIOLOGY-FOOD-NUTRI] Carbohydrates, Lipids & Proteins
- **Board:** CAMBRIDGE | **Grade:** 6 | **Subject:** BIOLOGY
- **Unit:** Unit 1: Food & Biological Macromolecules
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Carbohydrates, Lipids & Proteins" [CAMBRIDGE-G6-BIOLOGY-FOOD-NUTRI]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
#### TEMPLATED_TEXT
Boilerplate text detected in "Carbohydrates, Lipids & Proteins" [CAMBRIDGE-G6-BIOLOGY-FOOD-NUTRI]
```
{
  "matchedPatterns": [
    "State the primary definition and rule governing",
    "Calculate the result when standard numerical values are applied to"
  ]
}
```
---
### [CAMBRIDGE-G6-BIOLOGY-FOOD-DIET] Balanced Diets & Calorific Equilibrium
- **Board:** CAMBRIDGE | **Grade:** 6 | **Subject:** BIOLOGY
- **Unit:** Unit 1: Food & Biological Macromolecules
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Balanced Diets & Calorific Equilibrium" [CAMBRIDGE-G6-BIOLOGY-FOOD-DIET]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
#### TEMPLATED_TEXT
Boilerplate text detected in "Balanced Diets & Calorific Equilibrium" [CAMBRIDGE-G6-BIOLOGY-FOOD-DIET]
```
{
  "matchedPatterns": [
    "State the primary definition and rule governing",
    "Calculate the result when standard numerical values are applied to"
  ]
}
```
---
### [CAMBRIDGE-G6-BIOLOGY-SKELET-INVERT] Invertebrate Locomotion Mechanisms
- **Board:** CAMBRIDGE | **Grade:** 6 | **Subject:** BIOLOGY
- **Unit:** Unit 3: Animal Locomotion & Skeletal Systems
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Invertebrate Locomotion Mechanisms" [CAMBRIDGE-G6-BIOLOGY-SKELET-INVERT]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
#### TEMPLATED_TEXT
Boilerplate text detected in "Invertebrate Locomotion Mechanisms" [CAMBRIDGE-G6-BIOLOGY-SKELET-INVERT]
```
{
  "matchedPatterns": [
    "State the primary definition and rule governing",
    "Calculate the result when standard numerical values are applied to"
  ]
}
```
---
### [CAMBRIDGE-G6-BIOLOGY-PLANT-FLOWER] Floral Anatomy & Reproductive Parts
- **Board:** CAMBRIDGE | **Grade:** 6 | **Subject:** BIOLOGY
- **Unit:** Unit 2: Plant Structure & Physiological Adaptation
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Floral Anatomy & Reproductive Parts" [CAMBRIDGE-G6-BIOLOGY-PLANT-FLOWER]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
#### TEMPLATED_TEXT
Boilerplate text detected in "Floral Anatomy & Reproductive Parts" [CAMBRIDGE-G6-BIOLOGY-PLANT-FLOWER]
```
{
  "matchedPatterns": [
    "State the primary definition and rule governing",
    "Calculate the result when standard numerical values are applied to"
  ]
}
```
---
### [CAMBRIDGE-G6-BIOLOGY-PLANT-VEN] Venation Patterns & Root System Types
- **Board:** CAMBRIDGE | **Grade:** 6 | **Subject:** BIOLOGY
- **Unit:** Unit 2: Plant Structure & Physiological Adaptation
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Venation Patterns & Root System Types" [CAMBRIDGE-G6-BIOLOGY-PLANT-VEN]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
#### TEMPLATED_TEXT
Boilerplate text detected in "Venation Patterns & Root System Types" [CAMBRIDGE-G6-BIOLOGY-PLANT-VEN]
```
{
  "matchedPatterns": [
    "State the primary definition and rule governing",
    "Calculate the result when standard numerical values are applied to"
  ]
}
```
---
### [CAMBRIDGE-G6-BIOLOGY-SKELET-JOINTS] Synovial Joints & Skeletal Articulation
- **Board:** CAMBRIDGE | **Grade:** 6 | **Subject:** BIOLOGY
- **Unit:** Unit 3: Animal Locomotion & Skeletal Systems
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Synovial Joints & Skeletal Articulation" [CAMBRIDGE-G6-BIOLOGY-SKELET-JOINTS]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
#### TEMPLATED_TEXT
Boilerplate text detected in "Synovial Joints & Skeletal Articulation" [CAMBRIDGE-G6-BIOLOGY-SKELET-JOINTS]
```
{
  "matchedPatterns": [
    "State the primary definition and rule governing",
    "Calculate the result when standard numerical values are applied to"
  ]
}
```
---
### [CAMBRIDGE-G6-BIOLOGY-SKELET-BONES] Bones, Cartilage & Muscular Antagonism
- **Board:** CAMBRIDGE | **Grade:** 6 | **Subject:** BIOLOGY
- **Unit:** Unit 3: Animal Locomotion & Skeletal Systems
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Bones, Cartilage & Muscular Antagonism" [CAMBRIDGE-G6-BIOLOGY-SKELET-BONES]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
#### TEMPLATED_TEXT
Boilerplate text detected in "Bones, Cartilage & Muscular Antagonism" [CAMBRIDGE-G6-BIOLOGY-SKELET-BONES]
```
{
  "matchedPatterns": [
    "State the primary definition and rule governing",
    "Calculate the result when standard numerical values are applied to"
  ]
}
```
---
### [CAMBRIDGE-G7-PHYSICS-HEAT-THERM] Temperature vs Heat Energy
- **Board:** CAMBRIDGE | **Grade:** 7 | **Subject:** PHYSICS
- **Unit:** Unit 1: Heat, Temperature & Thermal Transfer
- **Resolved Diagram:** `energy_transfer`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Temperature vs Heat Energy" [CAMBRIDGE-G7-PHYSICS-HEAT-THERM]
```
{
  "taxonomyKey": "TEMPERATURE_HEAT",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "pendulum"
  ],
  "hint": "Text contains forbidden keywords: [pendulum] - wrong topic content stored."
}
```
---
### [CAMBRIDGE-G7-PHYSICS-HEAT-COND] Conduction in Solids & Lattice Vibrations
- **Board:** CAMBRIDGE | **Grade:** 7 | **Subject:** PHYSICS
- **Unit:** Unit 1: Heat, Temperature & Thermal Transfer
- **Resolved Diagram:** `energy_transfer`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Conduction in Solids & Lattice Vibrations" [CAMBRIDGE-G7-PHYSICS-HEAT-COND]
```
{
  "taxonomyKey": "TEMPERATURE_HEAT",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "pendulum"
  ],
  "hint": "Text contains forbidden keywords: [pendulum] - wrong topic content stored."
}
```
---
### [CBSE-G7-CHEMISTRY-BASE-PROP] Bases, Alkalis & Hydroxide Ions
- **Board:** CBSE | **Grade:** 7 | **Subject:** CHEMISTRY
- **Unit:** Unit 1: Acids, Bases & Chemical Indicators
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Bases, Alkalis & Hydroxide Ions" [CBSE-G7-CHEMISTRY-BASE-PROP]
```
{
  "taxonomyKey": "ACIDS_BASES",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "reactivity series",
    "displacement"
  ],
  "hint": "Text contains forbidden keywords: [reactivity series, displacement] - wrong topic content stored."
}
```
---
### [CAMBRIDGE-G7-CHEMISTRY-WATER-DEP] Industrial Depletion & Recharge Techniques
- **Board:** CAMBRIDGE | **Grade:** 7 | **Subject:** CHEMISTRY
- **Unit:** Unit 3: Water: Hydrological Depletion & Conservation
- **Resolved Diagram:** `reaction_energy`

#### TEMPLATED_TEXT
Boilerplate text detected in "Industrial Depletion & Recharge Techniques" [CAMBRIDGE-G7-CHEMISTRY-WATER-DEP]
```
{
  "matchedPatterns": [
    "State the primary definition and rule governing",
    "Calculate the result when standard numerical values are applied to"
  ]
}
```
---
### [CAMBRIDGE-G7-CHEMISTRY-SEW-COMP] Domestic & Industrial Effluent Composition
- **Board:** CAMBRIDGE | **Grade:** 7 | **Subject:** CHEMISTRY
- **Unit:** Unit 4: Wastewater Clarification & Ecology
- **Resolved Diagram:** `reaction_energy`

#### TEMPLATED_TEXT
Boilerplate text detected in "Domestic & Industrial Effluent Composition" [CAMBRIDGE-G7-CHEMISTRY-SEW-COMP]
```
{
  "matchedPatterns": [
    "State the primary definition and rule governing",
    "Calculate the result when standard numerical values are applied to"
  ]
}
```
---
### [CAMBRIDGE-G7-BIOLOGY-PHOTO-EQ] Photosynthetic Chemistry & Chloroplasts
- **Board:** CAMBRIDGE | **Grade:** 7 | **Subject:** BIOLOGY
- **Unit:** Unit 1: Autotrophic & Heterotrophic Plant Nutrition
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Photosynthetic Chemistry & Chloroplasts" [CAMBRIDGE-G7-BIOLOGY-PHOTO-EQ]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [CAMBRIDGE-G7-CHEMISTRY-WATER-AQUIF] Aquifers & Water Table Dynamics
- **Board:** CAMBRIDGE | **Grade:** 7 | **Subject:** CHEMISTRY
- **Unit:** Unit 3: Water: Hydrological Depletion & Conservation
- **Resolved Diagram:** `reaction_energy`

#### TEMPLATED_TEXT
Boilerplate text detected in "Aquifers & Water Table Dynamics" [CAMBRIDGE-G7-CHEMISTRY-WATER-AQUIF]
```
{
  "matchedPatterns": [
    "State the primary definition and rule governing",
    "Calculate the result when standard numerical values are applied to"
  ]
}
```
---
### [CAMBRIDGE-G8-MATH-SQR-PROPS] Properties of Perfect Squares & Units Digits
- **Board:** CAMBRIDGE | **Grade:** 8 | **Subject:** MATH
- **Unit:** Unit 4: Squares, Square Roots, Cubes & Cube Roots
- **Resolved Diagram:** `number_line`

#### TEMPLATED_TEXT
Boilerplate text detected in "Properties of Perfect Squares & Units Digits" [CAMBRIDGE-G8-MATH-SQR-PROPS]
```
{
  "matchedPatterns": [
    "State the primary definition and rule governing",
    "Calculate the result when standard numerical values are applied to"
  ]
}
```
---
### [CBSE-G7-BIOLOGY-CIRC-HEART] The Human Heart & Double Circulation
- **Board:** CBSE | **Grade:** 7 | **Subject:** BIOLOGY
- **Unit:** Unit 4: Circulation & Transportation Systems
- **Resolved Diagram:** `heart_circulation`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "The Human Heart & Double Circulation" [CBSE-G7-BIOLOGY-CIRC-HEART]
```
{
  "taxonomyKey": "HEART_CIRCULATION",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "xylem",
    "phloem"
  ],
  "hint": "Text contains forbidden keywords: [xylem, phloem] - wrong topic content stored."
}
```
---
### [CAMBRIDGE-G8-MATH-POLY-MULT] Monomial, Binomial & Polynomial Multiplication
- **Board:** CAMBRIDGE | **Grade:** 8 | **Subject:** MATH
- **Unit:** Unit 5: Algebraic Expressions & Polynomial Identities
- **Resolved Diagram:** `number_line`

#### TEMPLATED_TEXT
Boilerplate text detected in "Monomial, Binomial & Polynomial Multiplication" [CAMBRIDGE-G8-MATH-POLY-MULT]
```
{
  "matchedPatterns": [
    "State the primary definition and rule governing",
    "Calculate the result when standard numerical values are applied to"
  ]
}
```
---
### [CAMBRIDGE-G8-MATH-CUBE-ROOTS] Cubes, Prime Factorization & Estimation
- **Board:** CAMBRIDGE | **Grade:** 8 | **Subject:** MATH
- **Unit:** Unit 4: Squares, Square Roots, Cubes & Cube Roots
- **Resolved Diagram:** `number_line`

#### TEMPLATED_TEXT
Boilerplate text detected in "Cubes, Prime Factorization & Estimation" [CAMBRIDGE-G8-MATH-CUBE-ROOTS]
```
{
  "matchedPatterns": [
    "State the primary definition and rule governing",
    "Calculate the result when standard numerical values are applied to"
  ]
}
```
---
### [CAMBRIDGE-G8-CHEMISTRY-MET-OXY] Metal Reactions with Oxygen, Water & Acids
- **Board:** CAMBRIDGE | **Grade:** 8 | **Subject:** CHEMISTRY
- **Unit:** Unit 2: Metals, Non-Metals & Chemical Reactivity
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Metal Reactions with Oxygen, Water & Acids" [CAMBRIDGE-G8-CHEMISTRY-MET-OXY]
```
{
  "taxonomyKey": "REACTIVITY_SERIES",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "litmus",
    "neutrali",
    "antacid"
  ],
  "hint": "Text contains forbidden keywords: [litmus, neutrali, antacid] - wrong topic content stored."
}
```
---
### [CAMBRIDGE-G8-CHEMISTRY-POLY-ENV] Plastic Biodegradation & Environmental Microplastics
- **Board:** CAMBRIDGE | **Grade:** 8 | **Subject:** CHEMISTRY
- **Unit:** Unit 1: Synthetic Polymers & Plastics
- **Resolved Diagram:** `reaction_energy`

#### TEMPLATED_TEXT
Boilerplate text detected in "Plastic Biodegradation & Environmental Microplastics" [CAMBRIDGE-G8-CHEMISTRY-POLY-ENV]
```
{
  "matchedPatterns": [
    "State the primary definition and rule governing",
    "Calculate the result when standard numerical values are applied to"
  ]
}
```
---
### [CAMBRIDGE-G8-CHEMISTRY-MET-DISP] The Reactivity Series & Single Displacement Reactions
- **Board:** CAMBRIDGE | **Grade:** 8 | **Subject:** CHEMISTRY
- **Unit:** Unit 2: Metals, Non-Metals & Chemical Reactivity
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "The Reactivity Series & Single Displacement Reactions" [CAMBRIDGE-G8-CHEMISTRY-MET-DISP]
```
{
  "taxonomyKey": "REACTIVITY_SERIES",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "litmus",
    "neutrali",
    "antacid"
  ],
  "hint": "Text contains forbidden keywords: [litmus, neutrali, antacid] - wrong topic content stored."
}
```
---
### [CAMBRIDGE-G8-CHEMISTRY-FOSS-COAL] Carboniferous Fossilization & Destructive Distillation
- **Board:** CAMBRIDGE | **Grade:** 8 | **Subject:** CHEMISTRY
- **Unit:** Unit 3: Fossil Fuels, Coal & Petroleum
- **Resolved Diagram:** `reaction_energy`

#### TEMPLATED_TEXT
Boilerplate text detected in "Carboniferous Fossilization & Destructive Distillation" [CAMBRIDGE-G8-CHEMISTRY-FOSS-COAL]
```
{
  "matchedPatterns": [
    "State the primary definition and rule governing",
    "Calculate the result when standard numerical values are applied to"
  ]
}
```
---
### [CAMBRIDGE-G8-BIOLOGY-AGRI-NUTRI] Manure vs Chemical Fertilizers & Crop Rotation
- **Board:** CAMBRIDGE | **Grade:** 8 | **Subject:** BIOLOGY
- **Unit:** Unit 1: Agricultural Management & Crop Production
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Manure vs Chemical Fertilizers & Crop Rotation" [CAMBRIDGE-G8-BIOLOGY-AGRI-NUTRI]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
#### TEMPLATED_TEXT
Boilerplate text detected in "Manure vs Chemical Fertilizers & Crop Rotation" [CAMBRIDGE-G8-BIOLOGY-AGRI-NUTRI]
```
{
  "matchedPatterns": [
    "State the primary definition and rule governing",
    "Calculate the result when standard numerical values are applied to"
  ]
}
```
---
### [CAMBRIDGE-G8-CHEMISTRY-FOSS-GAS] Compressed Natural Gas (CNG) & Petrochemical Feedstocks
- **Board:** CAMBRIDGE | **Grade:** 8 | **Subject:** CHEMISTRY
- **Unit:** Unit 3: Fossil Fuels, Coal & Petroleum
- **Resolved Diagram:** `reaction_energy`

#### TEMPLATED_TEXT
Boilerplate text detected in "Compressed Natural Gas (CNG) & Petrochemical Feedstocks" [CAMBRIDGE-G8-CHEMISTRY-FOSS-GAS]
```
{
  "matchedPatterns": [
    "State the primary definition and rule governing",
    "Calculate the result when standard numerical values are applied to"
  ]
}
```
---
### [CAMBRIDGE-G8-CHEMISTRY-FLAME-ZONES] Flame Structure: Outer, Middle & Innermost Zones
- **Board:** CAMBRIDGE | **Grade:** 8 | **Subject:** CHEMISTRY
- **Unit:** Unit 4: Combustion, Calorimetry & Flame Anatomy
- **Resolved Diagram:** `bohr_atom`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Flame Structure: Outer, Middle & Innermost Zones" [CAMBRIDGE-G8-CHEMISTRY-FLAME-ZONES]
```
{
  "taxonomyKey": "ATOMIC_STRUCTURE",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph"
  ],
  "hint": "Text contains forbidden keywords: [ph] - wrong topic content stored."
}
```
---
### [CAMBRIDGE-G8-CHEMISTRY-COMB-CALOR] Calorific Value & Enthalpy of Fuels
- **Board:** CAMBRIDGE | **Grade:** 8 | **Subject:** CHEMISTRY
- **Unit:** Unit 4: Combustion, Calorimetry & Flame Anatomy
- **Resolved Diagram:** `bohr_atom`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Calorific Value & Enthalpy of Fuels" [CAMBRIDGE-G8-CHEMISTRY-COMB-CALOR]
```
{
  "taxonomyKey": "ATOMIC_STRUCTURE",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph"
  ],
  "hint": "Text contains forbidden keywords: [ph] - wrong topic content stored."
}
```
---
### [CAMBRIDGE-G8-CHEMISTRY-COMB-COND] Ignition Temperature & Fire Triangle
- **Board:** CAMBRIDGE | **Grade:** 8 | **Subject:** CHEMISTRY
- **Unit:** Unit 4: Combustion, Calorimetry & Flame Anatomy
- **Resolved Diagram:** `bohr_atom`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Ignition Temperature & Fire Triangle" [CAMBRIDGE-G8-CHEMISTRY-COMB-COND]
```
{
  "taxonomyKey": "ATOMIC_STRUCTURE",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph"
  ],
  "hint": "Text contains forbidden keywords: [ph] - wrong topic content stored."
}
```
---
### [CAMBRIDGE-G8-BIOLOGY-AGRI-SOW] Seed Selection & Sowing Techniques
- **Board:** CAMBRIDGE | **Grade:** 8 | **Subject:** BIOLOGY
- **Unit:** Unit 1: Agricultural Management & Crop Production
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Seed Selection & Sowing Techniques" [CAMBRIDGE-G8-BIOLOGY-AGRI-SOW]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
#### TEMPLATED_TEXT
Boilerplate text detected in "Seed Selection & Sowing Techniques" [CAMBRIDGE-G8-BIOLOGY-AGRI-SOW]
```
{
  "matchedPatterns": [
    "State the primary definition and rule governing",
    "Calculate the result when standard numerical values are applied to"
  ]
}
```
---
### [CAMBRIDGE-G8-BIOLOGY-AGRI-PREP] Soil Preparation, Ploughing & Levelling
- **Board:** CAMBRIDGE | **Grade:** 8 | **Subject:** BIOLOGY
- **Unit:** Unit 1: Agricultural Management & Crop Production
- **Resolved Diagram:** `trophic_pyramid`

#### TEMPLATED_TEXT
Boilerplate text detected in "Soil Preparation, Ploughing & Levelling" [CAMBRIDGE-G8-BIOLOGY-AGRI-PREP]
```
{
  "matchedPatterns": [
    "State the primary definition and rule governing",
    "Calculate the result when standard numerical values are applied to"
  ]
}
```
---
### [CAMBRIDGE-G8-BIOLOGY-REPRO-SEX] Sexual Reproduction: Gametogenesis & Zygotes
- **Board:** CAMBRIDGE | **Grade:** 8 | **Subject:** BIOLOGY
- **Unit:** Unit 5: Reproduction in Animal Species
- **Resolved Diagram:** `dna_helix`

#### TEMPLATED_TEXT
Boilerplate text detected in "Sexual Reproduction: Gametogenesis & Zygotes" [CAMBRIDGE-G8-BIOLOGY-REPRO-SEX]
```
{
  "matchedPatterns": [
    "State the primary definition and rule governing",
    "Calculate the result when standard numerical values are applied to"
  ]
}
```
---
### [CAMBRIDGE-G8-BIOLOGY-REPRO-FERT] Internal vs External Fertilization Strategies
- **Board:** CAMBRIDGE | **Grade:** 8 | **Subject:** BIOLOGY
- **Unit:** Unit 5: Reproduction in Animal Species
- **Resolved Diagram:** `taxonomy_tree`

#### TEMPLATED_TEXT
Boilerplate text detected in "Internal vs External Fertilization Strategies" [CAMBRIDGE-G8-BIOLOGY-REPRO-FERT]
```
{
  "matchedPatterns": [
    "State the primary definition and rule governing",
    "Calculate the result when standard numerical values are applied to"
  ]
}
```
---
### [CAMBRIDGE-G8-BIOLOGY-MICRO-PATH] Pathogenic Transmission & Vaccine Immunology
- **Board:** CAMBRIDGE | **Grade:** 8 | **Subject:** BIOLOGY
- **Unit:** Unit 2: Microorganisms: Mutualists & Pathogens
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Pathogenic Transmission & Vaccine Immunology" [CAMBRIDGE-G8-BIOLOGY-MICRO-PATH]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
#### TEMPLATED_TEXT
Boilerplate text detected in "Pathogenic Transmission & Vaccine Immunology" [CAMBRIDGE-G8-BIOLOGY-MICRO-PATH]
```
{
  "matchedPatterns": [
    "State the primary definition and rule governing",
    "Calculate the result when standard numerical values are applied to"
  ]
}
```
---
### [CAMBRIDGE-G9-PHYSICS-WORK-DEF] Scientific Work Done (W = F * d * cos θ)
- **Board:** CAMBRIDGE | **Grade:** 9 | **Subject:** PHYSICS
- **Unit:** Unit 4: Work, Energy & Power
- **Resolved Diagram:** `energy_transfer`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Scientific Work Done (W = F * d * cos θ)" [CAMBRIDGE-G9-PHYSICS-WORK-DEF]
```
{
  "taxonomyKey": "WORK_ENERGY",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph"
  ],
  "hint": "Text contains forbidden keywords: [ph] - wrong topic content stored."
}
```
---
### [CAMBRIDGE-G9-PHYSICS-ENG-CONSERV] Gravitational Potential Energy & Energy Conservation
- **Board:** CAMBRIDGE | **Grade:** 9 | **Subject:** PHYSICS
- **Unit:** Unit 4: Work, Energy & Power
- **Resolved Diagram:** `energy_transfer`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Gravitational Potential Energy & Energy Conservation" [CAMBRIDGE-G9-PHYSICS-ENG-CONSERV]
```
{
  "taxonomyKey": "WORK_ENERGY",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph"
  ],
  "hint": "Text contains forbidden keywords: [ph] - wrong topic content stored."
}
```
---
### [CAMBRIDGE-G9-PHYSICS-NEWT-LAW3] Newton's Third Law & Momentum Conservation
- **Board:** CAMBRIDGE | **Grade:** 9 | **Subject:** PHYSICS
- **Unit:** Unit 2: Forces & Newton's Laws of Motion
- **Resolved Diagram:** `energy_transfer`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Newton's Third Law & Momentum Conservation" [CAMBRIDGE-G9-PHYSICS-NEWT-LAW3]
```
{
  "taxonomyKey": "WORK_ENERGY",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph"
  ],
  "hint": "Text contains forbidden keywords: [ph] - wrong topic content stored."
}
```
---
### [CAMBRIDGE-G9-PHYSICS-GRAV-MASS] Mass vs Weight & Gravitational Potential
- **Board:** CAMBRIDGE | **Grade:** 9 | **Subject:** PHYSICS
- **Unit:** Unit 3: Gravitation & Orbital Motion
- **Resolved Diagram:** `physics_vector`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Mass vs Weight & Gravitational Potential" [CAMBRIDGE-G9-PHYSICS-GRAV-MASS]
```
{
  "taxonomyKey": "WORK_ENERGY",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph"
  ],
  "hint": "Text contains forbidden keywords: [ph] - wrong topic content stored."
}
```
---
### [CAMBRIDGE-G9-CHEMISTRY-MAT-EVAP] Evaporative Cooling Dynamics
- **Board:** CAMBRIDGE | **Grade:** 9 | **Subject:** CHEMISTRY
- **Unit:** Unit 1: Matter & Kinetic Particle Theory
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Evaporative Cooling Dynamics" [CAMBRIDGE-G9-CHEMISTRY-MAT-EVAP]
```
{
  "taxonomyKey": "STATES_OF_MATTER",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "acid"
  ],
  "hint": "Text contains forbidden keywords: [acid] - wrong topic content stored."
}
```
---
### [CAMBRIDGE-G9-CHEMISTRY-ATOM-LAWS] Laws of Chemical Combination (Mass & Proportions)
- **Board:** CAMBRIDGE | **Grade:** 9 | **Subject:** CHEMISTRY
- **Unit:** Unit 3: Atoms, Molecules & Chemical Stoichiometry
- **Resolved Diagram:** `bohr_atom`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Laws of Chemical Combination (Mass & Proportions)" [CAMBRIDGE-G9-CHEMISTRY-ATOM-LAWS]
```
{
  "taxonomyKey": "ATOMIC_STRUCTURE",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph",
    "reactivity"
  ],
  "hint": "Text contains forbidden keywords: [ph, reactivity] - wrong topic content stored."
}
```
---
### [CAMBRIDGE-G9-PHYSICS-SOUND-ULTRASON] Echoes, Reverberation & SONAR Applications
- **Board:** CAMBRIDGE | **Grade:** 9 | **Subject:** PHYSICS
- **Unit:** Unit 5: Sound Waves & Acoustic Propagation
- **Resolved Diagram:** `ray_optics`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Echoes, Reverberation & SONAR Applications" [CAMBRIDGE-G9-PHYSICS-SOUND-ULTRASON]
```
{
  "taxonomyKey": "SOUND_WAVES",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "optics",
    "lens"
  ],
  "hint": "Text contains forbidden keywords: [optics, lens] - wrong topic content stored."
}
```
---
### [CAMBRIDGE-G9-CHEMISTRY-MAT-LATENT] Latent Heat of Fusion & Vaporization
- **Board:** CAMBRIDGE | **Grade:** 9 | **Subject:** CHEMISTRY
- **Unit:** Unit 1: Matter & Kinetic Particle Theory
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Latent Heat of Fusion & Vaporization" [CAMBRIDGE-G9-CHEMISTRY-MAT-LATENT]
```
{
  "taxonomyKey": "STATES_OF_MATTER",
  "expectedKeywordsFound": false,
  "forbiddenKeywordsFound": [
    "acid"
  ],
  "hint": "Text contains forbidden keywords: [acid] - wrong topic content stored."
}
```
---
### [CAMBRIDGE-G9-CHEMISTRY-ATOM-BOHR] Bohr Atomic Model & Quantized Energy Shells
- **Board:** CAMBRIDGE | **Grade:** 9 | **Subject:** CHEMISTRY
- **Unit:** Unit 4: Atomic Structure & Subatomic Particles
- **Resolved Diagram:** `bohr_atom`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Bohr Atomic Model & Quantized Energy Shells" [CAMBRIDGE-G9-CHEMISTRY-ATOM-BOHR]
```
{
  "taxonomyKey": "ATOMIC_STRUCTURE",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "reactivity"
  ],
  "hint": "Text contains forbidden keywords: [reactivity] - wrong topic content stored."
}
```
---
### [CAMBRIDGE-G9-CHEMISTRY-ATOM-RUTH] Rutherford Gold Foil Experiment & Nucleus
- **Board:** CAMBRIDGE | **Grade:** 9 | **Subject:** CHEMISTRY
- **Unit:** Unit 4: Atomic Structure & Subatomic Particles
- **Resolved Diagram:** `bohr_atom`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Rutherford Gold Foil Experiment & Nucleus" [CAMBRIDGE-G9-CHEMISTRY-ATOM-RUTH]
```
{
  "taxonomyKey": "ATOMIC_STRUCTURE",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph",
    "reactivity"
  ],
  "hint": "Text contains forbidden keywords: [ph, reactivity] - wrong topic content stored."
}
```
---
### [CAMBRIDGE-G9-BIOLOGY-TISS-PLANT] Meristematic vs Permanent Plant Tissues
- **Board:** CAMBRIDGE | **Grade:** 9 | **Subject:** BIOLOGY
- **Unit:** Unit 2: Plant & Animal Tissues
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Meristematic vs Permanent Plant Tissues" [CAMBRIDGE-G9-BIOLOGY-TISS-PLANT]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [CAMBRIDGE-G9-CHEMISTRY-ATOM-ISOTOPE] Atomic Number, Mass Number, Isotopes & Isobars
- **Board:** CAMBRIDGE | **Grade:** 9 | **Subject:** CHEMISTRY
- **Unit:** Unit 4: Atomic Structure & Subatomic Particles
- **Resolved Diagram:** `bohr_atom`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Atomic Number, Mass Number, Isotopes & Isobars" [CAMBRIDGE-G9-CHEMISTRY-ATOM-ISOTOPE]
```
{
  "taxonomyKey": "ATOMIC_STRUCTURE",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph",
    "reactivity"
  ],
  "hint": "Text contains forbidden keywords: [ph, reactivity] - wrong topic content stored."
}
```
---
### [CAMBRIDGE-G9-CHEMISTRY-ATOM-DALTON] Dalton's Atomic Postulates & Modern Revisions
- **Board:** CAMBRIDGE | **Grade:** 9 | **Subject:** CHEMISTRY
- **Unit:** Unit 3: Atoms, Molecules & Chemical Stoichiometry
- **Resolved Diagram:** `bohr_atom`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Dalton's Atomic Postulates & Modern Revisions" [CAMBRIDGE-G9-CHEMISTRY-ATOM-DALTON]
```
{
  "taxonomyKey": "ATOMIC_STRUCTURE",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph",
    "reactivity"
  ],
  "hint": "Text contains forbidden keywords: [ph, reactivity] - wrong topic content stored."
}
```
---
### [CAMBRIDGE-G9-BIOLOGY-CYCLE-NITRO] The Nitrogen Cycle & Biological Fixation
- **Board:** CAMBRIDGE | **Grade:** 9 | **Subject:** BIOLOGY
- **Unit:** Unit 4: Biogeochemical Cycles & Sustainability
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "The Nitrogen Cycle & Biological Fixation" [CAMBRIDGE-G9-BIOLOGY-CYCLE-NITRO]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [CAMBRIDGE-G10-PHYSICS-ELEC-SERIES] Resistors in Series & Parallel Networks
- **Board:** CAMBRIDGE | **Grade:** 10 | **Subject:** PHYSICS
- **Unit:** Unit 3: Electricity & Circuit Analysis
- **Resolved Diagram:** `circuit_diagram`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Resistors in Series & Parallel Networks" [CAMBRIDGE-G10-PHYSICS-ELEC-SERIES]
```
{
  "taxonomyKey": "WORK_ENERGY",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "temperature",
    "ph"
  ],
  "hint": "Text contains forbidden keywords: [temperature, ph] - wrong topic content stored."
}
```
---
### [CAMBRIDGE-G10-PHYSICS-ELEC-JOULE] Electric Power & Joule Dissipation (P = V*I = I²*R)
- **Board:** CAMBRIDGE | **Grade:** 10 | **Subject:** PHYSICS
- **Unit:** Unit 3: Electricity & Circuit Analysis
- **Resolved Diagram:** `ray_optics`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Electric Power & Joule Dissipation (P = V*I = I²*R)" [CAMBRIDGE-G10-PHYSICS-ELEC-JOULE]
```
{
  "taxonomyKey": "ELECTRICITY",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "lens"
  ],
  "hint": "Text contains forbidden keywords: [lens] - wrong topic content stored."
}
```
---
### [CAMBRIDGE-G10-CHEMISTRY-REAC-TYPES] Combination, Decomposition & Displacement
- **Board:** CAMBRIDGE | **Grade:** 10 | **Subject:** CHEMISTRY
- **Unit:** Unit 1: Chemical Reactions & Equations
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Combination, Decomposition & Displacement" [CAMBRIDGE-G10-CHEMISTRY-REAC-TYPES]
```
{
  "taxonomyKey": "REACTIVITY_SERIES",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph scale"
  ],
  "hint": "Text contains forbidden keywords: [ph scale] - wrong topic content stored."
}
```
---
### [CAMBRIDGE-G10-CHEMISTRY-ACID-SALTS] Common Salts: NaCl, NaHCO3, Na2CO3 & CaSO4
- **Board:** CAMBRIDGE | **Grade:** 10 | **Subject:** CHEMISTRY
- **Unit:** Unit 2: Acids, Bases, Salts & The pH Scale
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Common Salts: NaCl, NaHCO3, Na2CO3 & CaSO4" [CAMBRIDGE-G10-CHEMISTRY-ACID-SALTS]
```
{
  "taxonomyKey": "ACIDS_BASES",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "displacement"
  ],
  "hint": "Text contains forbidden keywords: [displacement] - wrong topic content stored."
}
```
---
### [CAMBRIDGE-G10-CHEMISTRY-MET-IONIC] Ionic Bonding & Lattice Enthalpy
- **Board:** CAMBRIDGE | **Grade:** 10 | **Subject:** CHEMISTRY
- **Unit:** Unit 3: Metals, Non-Metals & Extractive Metallurgy
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Ionic Bonding & Lattice Enthalpy" [CAMBRIDGE-G10-CHEMISTRY-MET-IONIC]
```
{
  "taxonomyKey": "CHEMICAL_BONDING",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph scale"
  ],
  "hint": "Text contains forbidden keywords: [ph scale] - wrong topic content stored."
}
```
---
### [CAMBRIDGE-G10-CHEMISTRY-ACID-BUFFER] Water of Crystallization & Hydrate Salts
- **Board:** CAMBRIDGE | **Grade:** 10 | **Subject:** CHEMISTRY
- **Unit:** Unit 2: Acids, Bases, Salts & The pH Scale
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Water of Crystallization & Hydrate Salts" [CAMBRIDGE-G10-CHEMISTRY-ACID-BUFFER]
```
{
  "taxonomyKey": "ACIDS_BASES",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "displacement"
  ],
  "hint": "Text contains forbidden keywords: [displacement] - wrong topic content stored."
}
```
---
### [CAMBRIDGE-G10-CHEMISTRY-ACID-PH] The Logarithmic pH Scale & Hydronium Concentration
- **Board:** CAMBRIDGE | **Grade:** 10 | **Subject:** CHEMISTRY
- **Unit:** Unit 2: Acids, Bases, Salts & The pH Scale
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "The Logarithmic pH Scale & Hydronium Concentration" [CAMBRIDGE-G10-CHEMISTRY-ACID-PH]
```
{
  "taxonomyKey": "ACIDS_BASES",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "displacement"
  ],
  "hint": "Text contains forbidden keywords: [displacement] - wrong topic content stored."
}
```
---
### [CAMBRIDGE-G10-CHEMISTRY-PER-TRENDS] Periodic Trends: Atomic Radii, Electronegativity & Ionization
- **Board:** CAMBRIDGE | **Grade:** 10 | **Subject:** CHEMISTRY
- **Unit:** Unit 5: Periodic Classification of Elements
- **Resolved Diagram:** `bohr_atom`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Periodic Trends: Atomic Radii, Electronegativity & Ionization" [CAMBRIDGE-G10-CHEMISTRY-PER-TRENDS]
```
{
  "taxonomyKey": "ATOMIC_STRUCTURE",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph",
    "reactivity"
  ],
  "hint": "Text contains forbidden keywords: [ph, reactivity] - wrong topic content stored."
}
```
---
### [CAMBRIDGE-G10-CHEMISTRY-CARB-HOMOL] Homologous Series & Functional Groups
- **Board:** CAMBRIDGE | **Grade:** 10 | **Subject:** CHEMISTRY
- **Unit:** Unit 4: Carbon & Its Covalent Compounds
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Homologous Series & Functional Groups" [CAMBRIDGE-G10-CHEMISTRY-CARB-HOMOL]
```
{
  "taxonomyKey": "CHEMICAL_BONDING",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph scale"
  ],
  "hint": "Text contains forbidden keywords: [ph scale] - wrong topic content stored."
}
```
---
### [CAMBRIDGE-G10-CHEMISTRY-CARB-REAC] Esterification, Saponification & Combustion
- **Board:** CAMBRIDGE | **Grade:** 10 | **Subject:** CHEMISTRY
- **Unit:** Unit 4: Carbon & Its Covalent Compounds
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Esterification, Saponification & Combustion" [CAMBRIDGE-G10-CHEMISTRY-CARB-REAC]
```
{
  "taxonomyKey": "CHEMICAL_BONDING",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph scale"
  ],
  "hint": "Text contains forbidden keywords: [ph scale] - wrong topic content stored."
}
```
---
### [CAMBRIDGE-G10-CHEMISTRY-PER-MODERN] Modern Periodic Law & Atomic Numbers
- **Board:** CAMBRIDGE | **Grade:** 10 | **Subject:** CHEMISTRY
- **Unit:** Unit 5: Periodic Classification of Elements
- **Resolved Diagram:** `bohr_atom`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Modern Periodic Law & Atomic Numbers" [CAMBRIDGE-G10-CHEMISTRY-PER-MODERN]
```
{
  "taxonomyKey": "ATOMIC_STRUCTURE",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph",
    "reactivity"
  ],
  "hint": "Text contains forbidden keywords: [ph, reactivity] - wrong topic content stored."
}
```
---
### [CAMBRIDGE-G10-BIOLOGY-LIFE-EXCR] Renal Excretion & Nephron Ultrafiltration
- **Board:** CAMBRIDGE | **Grade:** 10 | **Subject:** BIOLOGY
- **Unit:** Unit 1: Life Processes: Metabolic Physiology
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Renal Excretion & Nephron Ultrafiltration" [CAMBRIDGE-G10-BIOLOGY-LIFE-EXCR]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [CAMBRIDGE-G10-BIOLOGY-REPRO-HEALTH] Contraception, Barrier Methods & Reproductive Health
- **Board:** CAMBRIDGE | **Grade:** 10 | **Subject:** BIOLOGY
- **Unit:** Unit 3: Reproductive Biology & Development
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Contraception, Barrier Methods & Reproductive Health" [CAMBRIDGE-G10-BIOLOGY-REPRO-HEALTH]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [CAMBRIDGE-G10-BIOLOGY-ENDO-HORMONES] Endocrine System & Hormonal Feedback Loops
- **Board:** CAMBRIDGE | **Grade:** 10 | **Subject:** BIOLOGY
- **Unit:** Unit 2: Control & Neuroendocrine Coordination
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Endocrine System & Hormonal Feedback Loops" [CAMBRIDGE-G10-BIOLOGY-ENDO-HORMONES]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [IB_MYP-G6-PHYSICS-ELEC-CELL] Electric Cells & Chemical Potential
- **Board:** IB_MYP | **Grade:** 6 | **Subject:** PHYSICS
- **Unit:** Unit 3: Electricity & Simple Circuits
- **Resolved Diagram:** `circuit_diagram`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Electric Cells & Chemical Potential" [IB_MYP-G6-PHYSICS-ELEC-CELL]
```
{
  "taxonomyKey": "WORK_ENERGY",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph"
  ],
  "hint": "Text contains forbidden keywords: [ph] - wrong topic content stored."
}
```
---
### [IB_MYP-G6-CHEMISTRY-MAT-DENSITY] Mass, Volume & Density Floatation
- **Board:** IB_MYP | **Grade:** 6 | **Subject:** CHEMISTRY
- **Unit:** Unit 1: States & Properties of Matter
- **Resolved Diagram:** `reaction_energy`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Mass, Volume & Density Floatation" [IB_MYP-G6-CHEMISTRY-MAT-DENSITY]
```
{
  "taxonomyKey": "STATES_OF_MATTER",
  "expectedKeywordsFound": false,
  "forbiddenKeywordsFound": [],
  "hint": "None of expected keywords [solid, liquid, gas...] found in content."
}
```
---
### [IB_MYP-G6-BIOLOGY-FOOD-NUTRI] Carbohydrates, Lipids & Proteins
- **Board:** IB_MYP | **Grade:** 6 | **Subject:** BIOLOGY
- **Unit:** Unit 1: Food & Biological Macromolecules
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Carbohydrates, Lipids & Proteins" [IB_MYP-G6-BIOLOGY-FOOD-NUTRI]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [IB_MYP-G6-BIOLOGY-FOOD-DIET] Balanced Diets & Calorific Equilibrium
- **Board:** IB_MYP | **Grade:** 6 | **Subject:** BIOLOGY
- **Unit:** Unit 1: Food & Biological Macromolecules
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Balanced Diets & Calorific Equilibrium" [IB_MYP-G6-BIOLOGY-FOOD-DIET]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [IB_MYP-G6-BIOLOGY-PLANT-FLOWER] Floral Anatomy & Reproductive Parts
- **Board:** IB_MYP | **Grade:** 6 | **Subject:** BIOLOGY
- **Unit:** Unit 2: Plant Structure & Physiological Adaptation
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Floral Anatomy & Reproductive Parts" [IB_MYP-G6-BIOLOGY-PLANT-FLOWER]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [IB_MYP-G6-BIOLOGY-PLANT-VEN] Venation Patterns & Root System Types
- **Board:** IB_MYP | **Grade:** 6 | **Subject:** BIOLOGY
- **Unit:** Unit 2: Plant Structure & Physiological Adaptation
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Venation Patterns & Root System Types" [IB_MYP-G6-BIOLOGY-PLANT-VEN]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [IB_MYP-G6-BIOLOGY-SKELET-INVERT] Invertebrate Locomotion Mechanisms
- **Board:** IB_MYP | **Grade:** 6 | **Subject:** BIOLOGY
- **Unit:** Unit 3: Animal Locomotion & Skeletal Systems
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Invertebrate Locomotion Mechanisms" [IB_MYP-G6-BIOLOGY-SKELET-INVERT]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [IB_MYP-G6-BIOLOGY-SKELET-BONES] Bones, Cartilage & Muscular Antagonism
- **Board:** IB_MYP | **Grade:** 6 | **Subject:** BIOLOGY
- **Unit:** Unit 3: Animal Locomotion & Skeletal Systems
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Bones, Cartilage & Muscular Antagonism" [IB_MYP-G6-BIOLOGY-SKELET-BONES]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [IB_MYP-G7-PHYSICS-HEAT-THERM] Temperature vs Heat Energy
- **Board:** IB_MYP | **Grade:** 7 | **Subject:** PHYSICS
- **Unit:** Unit 1: Heat, Temperature & Thermal Transfer
- **Resolved Diagram:** `energy_transfer`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Temperature vs Heat Energy" [IB_MYP-G7-PHYSICS-HEAT-THERM]
```
{
  "taxonomyKey": "TEMPERATURE_HEAT",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "pendulum"
  ],
  "hint": "Text contains forbidden keywords: [pendulum] - wrong topic content stored."
}
```
---
### [IB_MYP-G7-PHYSICS-HEAT-COND] Conduction in Solids & Lattice Vibrations
- **Board:** IB_MYP | **Grade:** 7 | **Subject:** PHYSICS
- **Unit:** Unit 1: Heat, Temperature & Thermal Transfer
- **Resolved Diagram:** `energy_transfer`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Conduction in Solids & Lattice Vibrations" [IB_MYP-G7-PHYSICS-HEAT-COND]
```
{
  "taxonomyKey": "TEMPERATURE_HEAT",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "pendulum"
  ],
  "hint": "Text contains forbidden keywords: [pendulum] - wrong topic content stored."
}
```
---
### [CBSE-G9-CHEMISTRY-MAT-EVAP] Evaporative Cooling Dynamics
- **Board:** CBSE | **Grade:** 9 | **Subject:** CHEMISTRY
- **Unit:** Unit 1: Matter & Kinetic Particle Theory
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Evaporative Cooling Dynamics" [CBSE-G9-CHEMISTRY-MAT-EVAP]
```
{
  "taxonomyKey": "STATES_OF_MATTER",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "acid"
  ],
  "hint": "Text contains forbidden keywords: [acid] - wrong topic content stored."
}
```
---
### [IB_MYP-G7-BIOLOGY-PHOTO-EQ] Photosynthetic Chemistry & Chloroplasts
- **Board:** IB_MYP | **Grade:** 7 | **Subject:** BIOLOGY
- **Unit:** Unit 1: Autotrophic & Heterotrophic Plant Nutrition
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Photosynthetic Chemistry & Chloroplasts" [IB_MYP-G7-BIOLOGY-PHOTO-EQ]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [IB_MYP-G7-BIOLOGY-PLANT-PARASIT] Parasitic, Saprophytic & Symbiotic Plants
- **Board:** IB_MYP | **Grade:** 7 | **Subject:** BIOLOGY
- **Unit:** Unit 1: Autotrophic & Heterotrophic Plant Nutrition
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Parasitic, Saprophytic & Symbiotic Plants" [IB_MYP-G7-BIOLOGY-PLANT-PARASIT]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [IB_MYP-G7-BIOLOGY-TRANS-VASC] Plant Vascular Bundles: Xylem & Phloem
- **Board:** IB_MYP | **Grade:** 7 | **Subject:** BIOLOGY
- **Unit:** Unit 4: Circulation & Transportation Systems
- **Resolved Diagram:** `heart_circulation`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Plant Vascular Bundles: Xylem & Phloem" [IB_MYP-G7-BIOLOGY-TRANS-VASC]
```
{
  "taxonomyKey": "XYLEM_PHLOEM",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "cardiac"
  ],
  "hint": "Text contains forbidden keywords: [cardiac] - wrong topic content stored."
}
```
---
### [IB_MYP-G8-CHEMISTRY-MET-OXY] Metal Reactions with Oxygen, Water & Acids
- **Board:** IB_MYP | **Grade:** 8 | **Subject:** CHEMISTRY
- **Unit:** Unit 2: Metals, Non-Metals & Chemical Reactivity
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Metal Reactions with Oxygen, Water & Acids" [IB_MYP-G8-CHEMISTRY-MET-OXY]
```
{
  "taxonomyKey": "REACTIVITY_SERIES",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "litmus",
    "neutrali",
    "antacid"
  ],
  "hint": "Text contains forbidden keywords: [litmus, neutrali, antacid] - wrong topic content stored."
}
```
---
### [IB_MYP-G8-CHEMISTRY-MET-DISP] The Reactivity Series & Single Displacement Reactions
- **Board:** IB_MYP | **Grade:** 8 | **Subject:** CHEMISTRY
- **Unit:** Unit 2: Metals, Non-Metals & Chemical Reactivity
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "The Reactivity Series & Single Displacement Reactions" [IB_MYP-G8-CHEMISTRY-MET-DISP]
```
{
  "taxonomyKey": "REACTIVITY_SERIES",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "litmus",
    "neutrali",
    "antacid"
  ],
  "hint": "Text contains forbidden keywords: [litmus, neutrali, antacid] - wrong topic content stored."
}
```
---
### [IB_MYP-G8-BIOLOGY-AGRI-SOW] Seed Selection & Sowing Techniques
- **Board:** IB_MYP | **Grade:** 8 | **Subject:** BIOLOGY
- **Unit:** Unit 1: Agricultural Management & Crop Production
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Seed Selection & Sowing Techniques" [IB_MYP-G8-BIOLOGY-AGRI-SOW]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [IB_MYP-G8-BIOLOGY-MICRO-PATH] Pathogenic Transmission & Vaccine Immunology
- **Board:** IB_MYP | **Grade:** 8 | **Subject:** BIOLOGY
- **Unit:** Unit 2: Microorganisms: Mutualists & Pathogens
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Pathogenic Transmission & Vaccine Immunology" [IB_MYP-G8-BIOLOGY-MICRO-PATH]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [IB_MYP-G8-CHEMISTRY-COMB-COND] Ignition Temperature & Fire Triangle
- **Board:** IB_MYP | **Grade:** 8 | **Subject:** CHEMISTRY
- **Unit:** Unit 4: Combustion, Calorimetry & Flame Anatomy
- **Resolved Diagram:** `bohr_atom`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Ignition Temperature & Fire Triangle" [IB_MYP-G8-CHEMISTRY-COMB-COND]
```
{
  "taxonomyKey": "ATOMIC_STRUCTURE",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph"
  ],
  "hint": "Text contains forbidden keywords: [ph] - wrong topic content stored."
}
```
---
### [IB_MYP-G8-BIOLOGY-AGRI-NUTRI] Manure vs Chemical Fertilizers & Crop Rotation
- **Board:** IB_MYP | **Grade:** 8 | **Subject:** BIOLOGY
- **Unit:** Unit 1: Agricultural Management & Crop Production
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Manure vs Chemical Fertilizers & Crop Rotation" [IB_MYP-G8-BIOLOGY-AGRI-NUTRI]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [IB_MYP-G8-CHEMISTRY-COMB-CALOR] Calorific Value & Enthalpy of Fuels
- **Board:** IB_MYP | **Grade:** 8 | **Subject:** CHEMISTRY
- **Unit:** Unit 4: Combustion, Calorimetry & Flame Anatomy
- **Resolved Diagram:** `bohr_atom`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Calorific Value & Enthalpy of Fuels" [IB_MYP-G8-CHEMISTRY-COMB-CALOR]
```
{
  "taxonomyKey": "ATOMIC_STRUCTURE",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph"
  ],
  "hint": "Text contains forbidden keywords: [ph] - wrong topic content stored."
}
```
---
### [IB_MYP-G9-PHYSICS-ENG-CONSERV] Gravitational Potential Energy & Energy Conservation
- **Board:** IB_MYP | **Grade:** 9 | **Subject:** PHYSICS
- **Unit:** Unit 4: Work, Energy & Power
- **Resolved Diagram:** `energy_transfer`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Gravitational Potential Energy & Energy Conservation" [IB_MYP-G9-PHYSICS-ENG-CONSERV]
```
{
  "taxonomyKey": "WORK_ENERGY",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph"
  ],
  "hint": "Text contains forbidden keywords: [ph] - wrong topic content stored."
}
```
---
### [IB_MYP-G9-PHYSICS-ENG-KINETIC] Kinetic Energy Derivation (KE = 1/2 m v²)
- **Board:** IB_MYP | **Grade:** 9 | **Subject:** PHYSICS
- **Unit:** Unit 4: Work, Energy & Power
- **Resolved Diagram:** `energy_transfer`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Kinetic Energy Derivation (KE = 1/2 m v²)" [IB_MYP-G9-PHYSICS-ENG-KINETIC]
```
{
  "taxonomyKey": "WORK_ENERGY",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph"
  ],
  "hint": "Text contains forbidden keywords: [ph] - wrong topic content stored."
}
```
---
### [CBSE-G10-CHEMISTRY-REAC-TYPES] Combination, Decomposition & Displacement
- **Board:** CBSE | **Grade:** 10 | **Subject:** CHEMISTRY
- **Unit:** Unit 1: Chemical Reactions & Equations
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Combination, Decomposition & Displacement" [CBSE-G10-CHEMISTRY-REAC-TYPES]
```
{
  "taxonomyKey": "REACTIVITY_SERIES",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph scale"
  ],
  "hint": "Text contains forbidden keywords: [ph scale] - wrong topic content stored."
}
```
---
### [IB_MYP-G9-PHYSICS-GRAV-MASS] Mass vs Weight & Gravitational Potential
- **Board:** IB_MYP | **Grade:** 9 | **Subject:** PHYSICS
- **Unit:** Unit 3: Gravitation & Orbital Motion
- **Resolved Diagram:** `physics_vector`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Mass vs Weight & Gravitational Potential" [IB_MYP-G9-PHYSICS-GRAV-MASS]
```
{
  "taxonomyKey": "WORK_ENERGY",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph"
  ],
  "hint": "Text contains forbidden keywords: [ph] - wrong topic content stored."
}
```
---
### [IB_MYP-G9-PHYSICS-WORK-DEF] Scientific Work Done (W = F * d * cos θ)
- **Board:** IB_MYP | **Grade:** 9 | **Subject:** PHYSICS
- **Unit:** Unit 4: Work, Energy & Power
- **Resolved Diagram:** `energy_transfer`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Scientific Work Done (W = F * d * cos θ)" [IB_MYP-G9-PHYSICS-WORK-DEF]
```
{
  "taxonomyKey": "WORK_ENERGY",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph"
  ],
  "hint": "Text contains forbidden keywords: [ph] - wrong topic content stored."
}
```
---
### [IB_MYP-G9-CHEMISTRY-MAT-EVAP] Evaporative Cooling Dynamics
- **Board:** IB_MYP | **Grade:** 9 | **Subject:** CHEMISTRY
- **Unit:** Unit 1: Matter & Kinetic Particle Theory
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Evaporative Cooling Dynamics" [IB_MYP-G9-CHEMISTRY-MAT-EVAP]
```
{
  "taxonomyKey": "STATES_OF_MATTER",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "acid"
  ],
  "hint": "Text contains forbidden keywords: [acid] - wrong topic content stored."
}
```
---
### [CBSE-G10-BIOLOGY-ENDO-HORMONES] Endocrine System & Hormonal Feedback Loops
- **Board:** CBSE | **Grade:** 10 | **Subject:** BIOLOGY
- **Unit:** Unit 2: Control & Neuroendocrine Coordination
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Endocrine System & Hormonal Feedback Loops" [CBSE-G10-BIOLOGY-ENDO-HORMONES]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [IB_MYP-G9-CHEMISTRY-ATOM-DALTON] Dalton's Atomic Postulates & Modern Revisions
- **Board:** IB_MYP | **Grade:** 9 | **Subject:** CHEMISTRY
- **Unit:** Unit 3: Atoms, Molecules & Chemical Stoichiometry
- **Resolved Diagram:** `bohr_atom`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Dalton's Atomic Postulates & Modern Revisions" [IB_MYP-G9-CHEMISTRY-ATOM-DALTON]
```
{
  "taxonomyKey": "ATOMIC_STRUCTURE",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph",
    "reactivity"
  ],
  "hint": "Text contains forbidden keywords: [ph, reactivity] - wrong topic content stored."
}
```
---
### [IB_MYP-G9-CHEMISTRY-MAT-LATENT] Latent Heat of Fusion & Vaporization
- **Board:** IB_MYP | **Grade:** 9 | **Subject:** CHEMISTRY
- **Unit:** Unit 1: Matter & Kinetic Particle Theory
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Latent Heat of Fusion & Vaporization" [IB_MYP-G9-CHEMISTRY-MAT-LATENT]
```
{
  "taxonomyKey": "STATES_OF_MATTER",
  "expectedKeywordsFound": false,
  "forbiddenKeywordsFound": [
    "acid"
  ],
  "hint": "Text contains forbidden keywords: [acid] - wrong topic content stored."
}
```
---
### [IB_MYP-G9-PHYSICS-SOUND-ULTRASON] Echoes, Reverberation & SONAR Applications
- **Board:** IB_MYP | **Grade:** 9 | **Subject:** PHYSICS
- **Unit:** Unit 5: Sound Waves & Acoustic Propagation
- **Resolved Diagram:** `ray_optics`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Echoes, Reverberation & SONAR Applications" [IB_MYP-G9-PHYSICS-SOUND-ULTRASON]
```
{
  "taxonomyKey": "SOUND_WAVES",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "optics",
    "lens"
  ],
  "hint": "Text contains forbidden keywords: [optics, lens] - wrong topic content stored."
}
```
---
### [IB_MYP-G9-CHEMISTRY-ATOM-LAWS] Laws of Chemical Combination (Mass & Proportions)
- **Board:** IB_MYP | **Grade:** 9 | **Subject:** CHEMISTRY
- **Unit:** Unit 3: Atoms, Molecules & Chemical Stoichiometry
- **Resolved Diagram:** `bohr_atom`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Laws of Chemical Combination (Mass & Proportions)" [IB_MYP-G9-CHEMISTRY-ATOM-LAWS]
```
{
  "taxonomyKey": "ATOMIC_STRUCTURE",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph",
    "reactivity"
  ],
  "hint": "Text contains forbidden keywords: [ph, reactivity] - wrong topic content stored."
}
```
---
### [CBSE-G10-BIOLOGY-REPRO-HUMAN10] Human Reproductive Anatomy & Menstrual Cycle
- **Board:** CBSE | **Grade:** 10 | **Subject:** BIOLOGY
- **Unit:** Unit 3: Reproductive Biology & Development
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Human Reproductive Anatomy & Menstrual Cycle" [CBSE-G10-BIOLOGY-REPRO-HUMAN10]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [IB_MYP-G9-CHEMISTRY-ATOM-RUTH] Rutherford Gold Foil Experiment & Nucleus
- **Board:** IB_MYP | **Grade:** 9 | **Subject:** CHEMISTRY
- **Unit:** Unit 4: Atomic Structure & Subatomic Particles
- **Resolved Diagram:** `bohr_atom`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Rutherford Gold Foil Experiment & Nucleus" [IB_MYP-G9-CHEMISTRY-ATOM-RUTH]
```
{
  "taxonomyKey": "ATOMIC_STRUCTURE",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph",
    "reactivity"
  ],
  "hint": "Text contains forbidden keywords: [ph, reactivity] - wrong topic content stored."
}
```
---
### [IB_MYP-G9-CHEMISTRY-ATOM-MOLE] The Mole Concept & Avogadro's Number (N_A = 6.022e23)
- **Board:** IB_MYP | **Grade:** 9 | **Subject:** CHEMISTRY
- **Unit:** Unit 3: Atoms, Molecules & Chemical Stoichiometry
- **Resolved Diagram:** `bohr_atom`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "The Mole Concept & Avogadro's Number (N_A = 6.022e23)" [IB_MYP-G9-CHEMISTRY-ATOM-MOLE]
```
{
  "taxonomyKey": "ATOMIC_STRUCTURE",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph",
    "reactivity"
  ],
  "hint": "Text contains forbidden keywords: [ph, reactivity] - wrong topic content stored."
}
```
---
### [IB_MYP-G9-CHEMISTRY-ATOM-BOHR] Bohr Atomic Model & Quantized Energy Shells
- **Board:** IB_MYP | **Grade:** 9 | **Subject:** CHEMISTRY
- **Unit:** Unit 4: Atomic Structure & Subatomic Particles
- **Resolved Diagram:** `bohr_atom`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Bohr Atomic Model & Quantized Energy Shells" [IB_MYP-G9-CHEMISTRY-ATOM-BOHR]
```
{
  "taxonomyKey": "ATOMIC_STRUCTURE",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "reactivity"
  ],
  "hint": "Text contains forbidden keywords: [reactivity] - wrong topic content stored."
}
```
---
### [IB_MYP-G9-BIOLOGY-TISS-PLANT] Meristematic vs Permanent Plant Tissues
- **Board:** IB_MYP | **Grade:** 9 | **Subject:** BIOLOGY
- **Unit:** Unit 2: Plant & Animal Tissues
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Meristematic vs Permanent Plant Tissues" [IB_MYP-G9-BIOLOGY-TISS-PLANT]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [IB_MYP-G9-CHEMISTRY-ATOM-ISOTOPE] Atomic Number, Mass Number, Isotopes & Isobars
- **Board:** IB_MYP | **Grade:** 9 | **Subject:** CHEMISTRY
- **Unit:** Unit 4: Atomic Structure & Subatomic Particles
- **Resolved Diagram:** `bohr_atom`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Atomic Number, Mass Number, Isotopes & Isobars" [IB_MYP-G9-CHEMISTRY-ATOM-ISOTOPE]
```
{
  "taxonomyKey": "ATOMIC_STRUCTURE",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph",
    "reactivity"
  ],
  "hint": "Text contains forbidden keywords: [ph, reactivity] - wrong topic content stored."
}
```
---
### [IB_MYP-G9-BIOLOGY-CYCLE-NITRO] The Nitrogen Cycle & Biological Fixation
- **Board:** IB_MYP | **Grade:** 9 | **Subject:** BIOLOGY
- **Unit:** Unit 4: Biogeochemical Cycles & Sustainability
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "The Nitrogen Cycle & Biological Fixation" [IB_MYP-G9-BIOLOGY-CYCLE-NITRO]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [CAMBRIDGE-G6-MATH-ALG-EXPR] Forming & Evaluating Algebraic Expressions
- **Board:** CAMBRIDGE | **Grade:** 6 | **Subject:** MATH
- **Unit:** Unit 2: Algebraic Foundations & Patterns
- **Resolved Diagram:** `number_line`

#### TEMPLATED_TEXT
Boilerplate text detected in "Forming & Evaluating Algebraic Expressions" [CAMBRIDGE-G6-MATH-ALG-EXPR]
```
{
  "matchedPatterns": [
    "State the primary definition and rule governing",
    "Calculate the result when standard numerical values are applied to"
  ]
}
```
---
### [IB_MYP-G10-PHYSICS-ELEC-SERIES] Resistors in Series & Parallel Networks
- **Board:** IB_MYP | **Grade:** 10 | **Subject:** PHYSICS
- **Unit:** Unit 3: Electricity & Circuit Analysis
- **Resolved Diagram:** `circuit_diagram`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Resistors in Series & Parallel Networks" [IB_MYP-G10-PHYSICS-ELEC-SERIES]
```
{
  "taxonomyKey": "WORK_ENERGY",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "temperature",
    "ph"
  ],
  "hint": "Text contains forbidden keywords: [temperature, ph] - wrong topic content stored."
}
```
---
### [IB_MYP-G10-PHYSICS-ENG-WIND] Wind, Hydroelectric & Geothermal Power Generation
- **Board:** IB_MYP | **Grade:** 10 | **Subject:** PHYSICS
- **Unit:** Unit 5: Sustainable Energy Resources
- **Resolved Diagram:** `energy_transfer`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Wind, Hydroelectric & Geothermal Power Generation" [IB_MYP-G10-PHYSICS-ENG-WIND]
```
{
  "taxonomyKey": "TEMPERATURE_HEAT",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "pendulum"
  ],
  "hint": "Text contains forbidden keywords: [pendulum] - wrong topic content stored."
}
```
---
### [IB_MYP-G10-CHEMISTRY-CARB-HOMOL] Homologous Series & Functional Groups
- **Board:** IB_MYP | **Grade:** 10 | **Subject:** CHEMISTRY
- **Unit:** Unit 4: Carbon & Its Covalent Compounds
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Homologous Series & Functional Groups" [IB_MYP-G10-CHEMISTRY-CARB-HOMOL]
```
{
  "taxonomyKey": "CHEMICAL_BONDING",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph scale"
  ],
  "hint": "Text contains forbidden keywords: [ph scale] - wrong topic content stored."
}
```
---
### [IB_MYP-G10-CHEMISTRY-REAC-TYPES] Combination, Decomposition & Displacement
- **Board:** IB_MYP | **Grade:** 10 | **Subject:** CHEMISTRY
- **Unit:** Unit 1: Chemical Reactions & Equations
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Combination, Decomposition & Displacement" [IB_MYP-G10-CHEMISTRY-REAC-TYPES]
```
{
  "taxonomyKey": "REACTIVITY_SERIES",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph scale"
  ],
  "hint": "Text contains forbidden keywords: [ph scale] - wrong topic content stored."
}
```
---
### [IB_MYP-G10-CHEMISTRY-ACID-PH] The Logarithmic pH Scale & Hydronium Concentration
- **Board:** IB_MYP | **Grade:** 10 | **Subject:** CHEMISTRY
- **Unit:** Unit 2: Acids, Bases, Salts & The pH Scale
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "The Logarithmic pH Scale & Hydronium Concentration" [IB_MYP-G10-CHEMISTRY-ACID-PH]
```
{
  "taxonomyKey": "ACIDS_BASES",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "displacement"
  ],
  "hint": "Text contains forbidden keywords: [displacement] - wrong topic content stored."
}
```
---
### [IB_MYP-G10-CHEMISTRY-ACID-BUFFER] Water of Crystallization & Hydrate Salts
- **Board:** IB_MYP | **Grade:** 10 | **Subject:** CHEMISTRY
- **Unit:** Unit 2: Acids, Bases, Salts & The pH Scale
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Water of Crystallization & Hydrate Salts" [IB_MYP-G10-CHEMISTRY-ACID-BUFFER]
```
{
  "taxonomyKey": "ACIDS_BASES",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "displacement"
  ],
  "hint": "Text contains forbidden keywords: [displacement] - wrong topic content stored."
}
```
---
### [IB_MYP-G10-CHEMISTRY-ACID-SALTS] Common Salts: NaCl, NaHCO3, Na2CO3 & CaSO4
- **Board:** IB_MYP | **Grade:** 10 | **Subject:** CHEMISTRY
- **Unit:** Unit 2: Acids, Bases, Salts & The pH Scale
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Common Salts: NaCl, NaHCO3, Na2CO3 & CaSO4" [IB_MYP-G10-CHEMISTRY-ACID-SALTS]
```
{
  "taxonomyKey": "ACIDS_BASES",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "displacement"
  ],
  "hint": "Text contains forbidden keywords: [displacement] - wrong topic content stored."
}
```
---
### [IB_MYP-G10-CHEMISTRY-PER-MODERN] Modern Periodic Law & Atomic Numbers
- **Board:** IB_MYP | **Grade:** 10 | **Subject:** CHEMISTRY
- **Unit:** Unit 5: Periodic Classification of Elements
- **Resolved Diagram:** `bohr_atom`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Modern Periodic Law & Atomic Numbers" [IB_MYP-G10-CHEMISTRY-PER-MODERN]
```
{
  "taxonomyKey": "ATOMIC_STRUCTURE",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph",
    "reactivity"
  ],
  "hint": "Text contains forbidden keywords: [ph, reactivity] - wrong topic content stored."
}
```
---
### [IB_MYP-G10-BIOLOGY-LIFE-EXCR] Renal Excretion & Nephron Ultrafiltration
- **Board:** IB_MYP | **Grade:** 10 | **Subject:** BIOLOGY
- **Unit:** Unit 1: Life Processes: Metabolic Physiology
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Renal Excretion & Nephron Ultrafiltration" [IB_MYP-G10-BIOLOGY-LIFE-EXCR]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [IB_MYP-G10-BIOLOGY-ENDO-HORMONES] Endocrine System & Hormonal Feedback Loops
- **Board:** IB_MYP | **Grade:** 10 | **Subject:** BIOLOGY
- **Unit:** Unit 2: Control & Neuroendocrine Coordination
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Endocrine System & Hormonal Feedback Loops" [IB_MYP-G10-BIOLOGY-ENDO-HORMONES]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [IB_MYP-G10-CHEMISTRY-PER-TRENDS] Periodic Trends: Atomic Radii, Electronegativity & Ionization
- **Board:** IB_MYP | **Grade:** 10 | **Subject:** CHEMISTRY
- **Unit:** Unit 5: Periodic Classification of Elements
- **Resolved Diagram:** `bohr_atom`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Periodic Trends: Atomic Radii, Electronegativity & Ionization" [IB_MYP-G10-CHEMISTRY-PER-TRENDS]
```
{
  "taxonomyKey": "ATOMIC_STRUCTURE",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph",
    "reactivity"
  ],
  "hint": "Text contains forbidden keywords: [ph, reactivity] - wrong topic content stored."
}
```
---
### [IB_MYP-G10-BIOLOGY-REPRO-HUMAN10] Human Reproductive Anatomy & Menstrual Cycle
- **Board:** IB_MYP | **Grade:** 10 | **Subject:** BIOLOGY
- **Unit:** Unit 3: Reproductive Biology & Development
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Human Reproductive Anatomy & Menstrual Cycle" [IB_MYP-G10-BIOLOGY-REPRO-HUMAN10]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [IB_MYP-G10-BIOLOGY-REPRO-HEALTH] Contraception, Barrier Methods & Reproductive Health
- **Board:** IB_MYP | **Grade:** 10 | **Subject:** BIOLOGY
- **Unit:** Unit 3: Reproductive Biology & Development
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Contraception, Barrier Methods & Reproductive Health" [IB_MYP-G10-BIOLOGY-REPRO-HEALTH]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [CAMBRIDGE-G7-CHEMISTRY-WATER-IRRIG] Drip & Sprinkler Efficient Irrigation
- **Board:** CAMBRIDGE | **Grade:** 7 | **Subject:** CHEMISTRY
- **Unit:** Unit 3: Water: Hydrological Depletion & Conservation
- **Resolved Diagram:** `reaction_energy`

#### TEMPLATED_TEXT
Boilerplate text detected in "Drip & Sprinkler Efficient Irrigation" [CAMBRIDGE-G7-CHEMISTRY-WATER-IRRIG]
```
{
  "matchedPatterns": [
    "State the primary definition and rule governing",
    "Calculate the result when standard numerical values are applied to"
  ]
}
```
---
### [CAMBRIDGE-G7-BIOLOGY-PLANT-PARASIT] Parasitic, Saprophytic & Symbiotic Plants
- **Board:** CAMBRIDGE | **Grade:** 7 | **Subject:** BIOLOGY
- **Unit:** Unit 1: Autotrophic & Heterotrophic Plant Nutrition
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Parasitic, Saprophytic & Symbiotic Plants" [CAMBRIDGE-G7-BIOLOGY-PLANT-PARASIT]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [CAMBRIDGE-G8-MATH-ID-STD] Standard Identities: (a+b)², (a-b)² & (a²-b²)
- **Board:** CAMBRIDGE | **Grade:** 8 | **Subject:** MATH
- **Unit:** Unit 5: Algebraic Expressions & Polynomial Identities
- **Resolved Diagram:** `number_line`

#### TEMPLATED_TEXT
Boilerplate text detected in "Standard Identities: (a+b)², (a-b)² & (a²-b²)" [CAMBRIDGE-G8-MATH-ID-STD]
```
{
  "matchedPatterns": [
    "State the primary definition and rule governing",
    "Calculate the result when standard numerical values are applied to"
  ]
}
```
---
### [CAMBRIDGE-G8-CHEMISTRY-POLY-THERM] Thermoplastics vs Thermosetting Polymers
- **Board:** CAMBRIDGE | **Grade:** 8 | **Subject:** CHEMISTRY
- **Unit:** Unit 1: Synthetic Polymers & Plastics
- **Resolved Diagram:** `reaction_energy`

#### TEMPLATED_TEXT
Boilerplate text detected in "Thermoplastics vs Thermosetting Polymers" [CAMBRIDGE-G8-CHEMISTRY-POLY-THERM]
```
{
  "matchedPatterns": [
    "State the primary definition and rule governing",
    "Calculate the result when standard numerical values are applied to"
  ]
}
```
---
### [CAMBRIDGE-G9-PHYSICS-ENG-KINETIC] Kinetic Energy Derivation (KE = 1/2 m v²)
- **Board:** CAMBRIDGE | **Grade:** 9 | **Subject:** PHYSICS
- **Unit:** Unit 4: Work, Energy & Power
- **Resolved Diagram:** `energy_transfer`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Kinetic Energy Derivation (KE = 1/2 m v²)" [CAMBRIDGE-G9-PHYSICS-ENG-KINETIC]
```
{
  "taxonomyKey": "WORK_ENERGY",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph"
  ],
  "hint": "Text contains forbidden keywords: [ph] - wrong topic content stored."
}
```
---
### [CAMBRIDGE-G9-CHEMISTRY-ATOM-MOLE] The Mole Concept & Avogadro's Number (N_A = 6.022e23)
- **Board:** CAMBRIDGE | **Grade:** 9 | **Subject:** CHEMISTRY
- **Unit:** Unit 3: Atoms, Molecules & Chemical Stoichiometry
- **Resolved Diagram:** `bohr_atom`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "The Mole Concept & Avogadro's Number (N_A = 6.022e23)" [CAMBRIDGE-G9-CHEMISTRY-ATOM-MOLE]
```
{
  "taxonomyKey": "ATOMIC_STRUCTURE",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph",
    "reactivity"
  ],
  "hint": "Text contains forbidden keywords: [ph, reactivity] - wrong topic content stored."
}
```
---
### [CAMBRIDGE-G10-BIOLOGY-REPRO-HUMAN10] Human Reproductive Anatomy & Menstrual Cycle
- **Board:** CAMBRIDGE | **Grade:** 10 | **Subject:** BIOLOGY
- **Unit:** Unit 3: Reproductive Biology & Development
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Human Reproductive Anatomy & Menstrual Cycle" [CAMBRIDGE-G10-BIOLOGY-REPRO-HUMAN10]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [IB_MYP-G10-CHEMISTRY-CARB-REAC] Esterification, Saponification & Combustion
- **Board:** IB_MYP | **Grade:** 10 | **Subject:** CHEMISTRY
- **Unit:** Unit 4: Carbon & Its Covalent Compounds
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Esterification, Saponification & Combustion" [IB_MYP-G10-CHEMISTRY-CARB-REAC]
```
{
  "taxonomyKey": "CHEMICAL_BONDING",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph scale"
  ],
  "hint": "Text contains forbidden keywords: [ph scale] - wrong topic content stored."
}
```
---
### [IB_MYP-G6-BIOLOGY-SKELET-JOINTS] Synovial Joints & Skeletal Articulation
- **Board:** IB_MYP | **Grade:** 6 | **Subject:** BIOLOGY
- **Unit:** Unit 3: Animal Locomotion & Skeletal Systems
- **Resolved Diagram:** `visual_model_pending`

#### VISUAL_FALLBACK
No topic-specific diagram for "Synovial Joints & Skeletal Articulation" [IB_MYP-G6-BIOLOGY-SKELET-JOINTS]
```
{
  "resolvedDiagram": "visual_model_pending",
  "note": "Correctly showing pending - needs dedicated diagram asset."
}
```
---
### [IB_MYP-G10-CHEMISTRY-MET-IONIC] Ionic Bonding & Lattice Enthalpy
- **Board:** IB_MYP | **Grade:** 10 | **Subject:** CHEMISTRY
- **Unit:** Unit 3: Metals, Non-Metals & Extractive Metallurgy
- **Resolved Diagram:** `ph_scale`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Ionic Bonding & Lattice Enthalpy" [IB_MYP-G10-CHEMISTRY-MET-IONIC]
```
{
  "taxonomyKey": "CHEMICAL_BONDING",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph scale"
  ],
  "hint": "Text contains forbidden keywords: [ph scale] - wrong topic content stored."
}
```
---
### [IB_MYP-G8-CHEMISTRY-FLAME-ZONES] Flame Structure: Outer, Middle & Innermost Zones
- **Board:** IB_MYP | **Grade:** 8 | **Subject:** CHEMISTRY
- **Unit:** Unit 4: Combustion, Calorimetry & Flame Anatomy
- **Resolved Diagram:** `bohr_atom`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Flame Structure: Outer, Middle & Innermost Zones" [IB_MYP-G8-CHEMISTRY-FLAME-ZONES]
```
{
  "taxonomyKey": "ATOMIC_STRUCTURE",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph"
  ],
  "hint": "Text contains forbidden keywords: [ph] - wrong topic content stored."
}
```
---
### [IB_MYP-G9-PHYSICS-NEWT-LAW3] Newton's Third Law & Momentum Conservation
- **Board:** IB_MYP | **Grade:** 9 | **Subject:** PHYSICS
- **Unit:** Unit 2: Forces & Newton's Laws of Motion
- **Resolved Diagram:** `energy_transfer`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Newton's Third Law & Momentum Conservation" [IB_MYP-G9-PHYSICS-NEWT-LAW3]
```
{
  "taxonomyKey": "WORK_ENERGY",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "ph"
  ],
  "hint": "Text contains forbidden keywords: [ph] - wrong topic content stored."
}
```
---
### [IB_MYP-G10-PHYSICS-ELEC-JOULE] Electric Power & Joule Dissipation (P = V*I = I²*R)
- **Board:** IB_MYP | **Grade:** 10 | **Subject:** PHYSICS
- **Unit:** Unit 3: Electricity & Circuit Analysis
- **Resolved Diagram:** `ray_optics`

#### CONTENT_ID_MISMATCH
Content taxonomy mismatch for "Electric Power & Joule Dissipation (P = V*I = I²*R)" [IB_MYP-G10-PHYSICS-ELEC-JOULE]
```
{
  "taxonomyKey": "ELECTRICITY",
  "expectedKeywordsFound": true,
  "forbiddenKeywordsFound": [
    "lens"
  ],
  "hint": "Text contains forbidden keywords: [lens] - wrong topic content stored."
}
```
---