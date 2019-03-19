export class Plant {
  constructor() {
    this.plantLife = 60;
    this.harvestLevel = 0;
    this.yield = 0;
  }

  setLife() {
    setInterval(() => {
      this.plantLife -= 4;
    }, 1000);
  }

  waterPlant() {
    this.plantLife += 30;
  }

  setHarvest() {
    setInterval(() => {
      this.harvestLevel += 1;
    }, 1000);
  }

  plantHarvest() {
    if (this.harvestLevel >= 40) {
      this.yield += 1;
      this.harvestLevel = 0;
    }
  }

  plantDeath() {
    if (this.plantLife <= 0 ) {
      return true;
    } else {
      return false;
    }
  }

  reset() {
    this.plantLife = 60;
    this.harvestLevel = 0;
  }
}
