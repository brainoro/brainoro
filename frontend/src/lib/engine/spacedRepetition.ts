export interface SM2Result {
  intervalDays: number;
  repetitionCount: number;
  easeFactor: number;
  retentionStability: number;
  retentionProbability: number;
  nextReviewDate: string;
  box: 1 | 2 | 3 | 4 | 5;
}

export class SpacedRepetitionClientEngine {
  static readonly MIN_EASE_FACTOR = 1.3;
  static readonly HARD_TO_MEMORIZE_PENALTY = 0.75;

  static calculateReview(
    quality: number, // 0 to 5
    currentRepetition: number = 0,
    currentInterval: number = 1,
    currentEaseFactor: number = 2.5,
    currentStability: number = 1.0,
    isHardToMemorize: boolean = false,
    elapsedDays: number = 1.0
  ): SM2Result {
    const q = Math.max(0, Math.min(5, quality));

    // 1. Update Ease Factor
    const deltaEf = 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02);
    const newEf = Math.max(this.MIN_EASE_FACTOR, currentEaseFactor + deltaEf);

    // 2. Interval & Repetition updates
    let newRepetition = currentRepetition;
    let newInterval = currentInterval;
    let newStability = currentStability;

    if (q < 3) {
      newRepetition = 0;
      newInterval = 1;
      newStability = Math.max(0.5, currentStability * 0.5);
    } else {
      newRepetition = currentRepetition + 1;
      if (newRepetition === 1) {
        newInterval = 1;
      } else if (newRepetition === 2) {
        newInterval = 6;
      } else {
        newInterval = Math.ceil(currentInterval * newEf);
      }
      newStability = currentStability * (1.0 + newEf * 0.4);
    }

    // 3. #HardToMemorize attenuation
    if (isHardToMemorize) {
      newInterval = Math.max(1, Math.floor(newInterval * this.HARD_TO_MEMORIZE_PENALTY));
      newStability = Math.max(0.5, newStability * 0.8);
    }

    // 4. Ebbinghaus retention probability R = exp(-t / S)
    const retentionProb = Math.exp(-elapsedDays / Math.max(0.1, newStability));

    // Map interval to Leitner Box 1..5
    let box: 1 | 2 | 3 | 4 | 5 = 1;
    if (newInterval >= 21) box = 5;
    else if (newInterval >= 10) box = 4;
    else if (newInterval >= 4) box = 3;
    else if (newInterval >= 2) box = 2;
    else box = 1;

    const reviewDate = new Date();
    reviewDate.setDate(reviewDate.getDate() + newInterval);

    return {
      intervalDays: newInterval,
      repetitionCount: newRepetition,
      easeFactor: Number(newEf.toFixed(3)),
      retentionStability: Number(newStability.toFixed(3)),
      retentionProbability: Number(Math.max(0.01, Math.min(1.0, retentionProb)).toFixed(4)),
      nextReviewDate: reviewDate.toLocaleDateString(),
      box
    };
  }

  static generateDecayCurve(stabilityDays: number, maxDays: number = 30) {
    const points: { day: number; retentionPercentage: number }[] = [];
    for (let day = 0; day <= maxDays; day++) {
      const prob = Math.exp(-day / Math.max(0.1, stabilityDays));
      points.push({
        day,
        retentionPercentage: Number((prob * 100).toFixed(1))
      });
    }
    return points;
  }
}
