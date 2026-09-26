import { AssessmentItem } from '../types';

export interface IRTStudentState {
  currentTheta: number; // Student latent ability [-3, +3]
  standardError: number;
  itemsCompleted: number;
  history: {
    itemId: string;
    difficultyB: number;
    discriminationA: number;
    isCorrect: boolean;
    thetaAfter: number;
  }[];
}

export class IRTClientEngine {
  static readonly THETA_MIN = -3.5;
  static readonly THETA_MAX = 3.5;

  static calculateProbability(
    theta: number,
    difficultyB: number,
    discriminationA: number = 1.0,
    guessingC: number = 0.0
  ): number {
    const exponent = -discriminationA * (theta - difficultyB);
    if (exponent > 35) return guessingC;
    if (exponent < -35) return 1.0;
    const logistic = 1.0 / (1.0 + Math.exp(exponent));
    return guessingC + (1.0 - guessingC) * logistic;
  }

  static calculateFisherInformation(
    theta: number,
    difficultyB: number,
    discriminationA: number = 1.0,
    guessingC: number = 0.0
  ): number {
    const p = this.calculateProbability(theta, difficultyB, discriminationA, guessingC);
    const q = 1.0 - p;
    if (guessingC === 0.0) {
      return discriminationA * discriminationA * p * q;
    }
    const num = Math.pow(discriminationA, 2) * Math.pow(p - guessingC, 2) * q;
    const den = Math.pow(1.0 - guessingC, 2) * p;
    return den > 0 ? num / den : 0.0;
  }

  static updateTheta(
    currentState: IRTStudentState,
    item: AssessmentItem,
    isCorrect: boolean
  ): IRTStudentState {
    const responses = [
      ...currentState.history.map(h => ({
        b: h.difficultyB,
        a: h.discriminationA,
        c: 0.0,
        u: h.isCorrect ? 1.0 : 0.0
      })),
      {
        b: item.difficultyB,
        a: item.discriminationA,
        c: item.guessingC,
        u: isCorrect ? 1.0 : 0.0
      }
    ];

    let theta = currentState.currentTheta;
    const priorMean = 0.0;
    const priorVar = 1.0;

    for (let iter = 0; iter < 20; iter++) {
      let firstDeriv = -(theta - priorMean) / priorVar;
      let secondDeriv = -1.0 / priorVar;

      for (const r of responses) {
        const p = this.calculateProbability(theta, r.b, r.a, r.c);
        const q = 1.0 - p;
        const dp = r.a * p * q;
        if (p > 0 && q > 0) {
          firstDeriv += ((r.u - p) / (p * q)) * dp;
          const info = this.calculateFisherInformation(theta, r.b, r.a, r.c);
          secondDeriv -= info;
        }
      }

      if (Math.abs(secondDeriv) < 1e-6) break;
      const step = firstDeriv / secondDeriv;
      const thetaNext = Math.max(this.THETA_MIN, Math.min(this.THETA_MAX, theta - step));
      if (Math.abs(thetaNext - theta) < 0.001) {
        theta = thetaNext;
        break;
      }
      theta = thetaNext;
    }

    // Estimate standard error
    let totalInfo = 1.0 / priorVar;
    for (const r of responses) {
      totalInfo += this.calculateFisherInformation(theta, r.b, r.a, r.c);
    }
    const se = 1.0 / Math.sqrt(Math.max(0.01, totalInfo));

    return {
      currentTheta: Number(theta.toFixed(3)),
      standardError: Number(se.toFixed(3)),
      itemsCompleted: currentState.itemsCompleted + 1,
      history: [
        ...currentState.history,
        {
          itemId: item.id,
          difficultyB: item.difficultyB,
          discriminationA: item.discriminationA,
          isCorrect,
          thetaAfter: Number(theta.toFixed(3))
        }
      ]
    };
  }

  static selectNextItem(
    currentTheta: number,
    bank: AssessmentItem[],
    completedIds: string[]
  ): AssessmentItem | null {
    let bestItem: AssessmentItem | null = null;
    let maxInfo = -1;

    for (const item of bank) {
      if (completedIds.includes(item.id)) continue;
      const info = this.calculateFisherInformation(
        currentTheta,
        item.difficultyB,
        item.discriminationA,
        item.guessingC
      );
      if (info > maxInfo) {
        maxInfo = info;
        bestItem = item;
      }
    }
    return bestItem;
  }
}
