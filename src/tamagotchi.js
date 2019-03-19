export class Animal {
  constructor() {
    this.foodLevel = 100,
    this.sleepLevel = 100,
    this.activityLevel = 100
  }

  setLevel(arg) {
    setInterval(() => {
      this[arg] -= 5;
    }, 1000);
  }

  animalDeath() {
    if (this.foodLevel <= 0 || this.sleepLevel <= 0 || this.activityLevel <= 0) {
      return true;
    } else {
      return false;
    }
  }

  feedAnimal() {
    this.foodLevel += 50;
  }

  restAnimal() {
    this.sleepLevel = 100;
  }

  playAnimal() {
    this.activityLevel = 100;
  }

  reset() {
    this.foodLevel = 100;
    this.sleepLevel = 100;
    this.activityLevel = 100;
  }
}
