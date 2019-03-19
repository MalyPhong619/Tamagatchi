import { Animal } from './../src/tamagotchi.js';
import { Plant } from './../src/plant.js';

describe('Animal', function() {
  let bear;

  beforeEach(function() {
    bear = new Animal;
    jasmine.clock().install();
    bear.setLevel("activityLevel");
    bear.setLevel("sleepLevel");
    bear.setLevel("foodLevel");
  });
  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it('decrease sleep level by 5 every 1 second', function() {
   jasmine.clock().tick(2001);
   expect(bear.sleepLevel).toEqual(90);
  });

  it('decrease activity level by 5 every 1 second', function() {
    jasmine.clock().tick(3001);
    expect(bear.activityLevel).toEqual(85);
  });

  it('decrease a level by 5 every second', function() {
    jasmine.clock().tick(3001);
    expect(bear.foodLevel).toEqual(85);
  })

  it('animal will die if any level decreases to 0', function() {
    bear.activityLevel = 0;
    expect(bear.animalDeath()).toEqual(true);
  });

  it('feeding will set animal foodLevel back to 100', function() {
    jasmine.clock().tick(5001);
    bear.feedAnimal();
    expect(bear.foodLevel).toEqual(100);
  });

  it('rest will set animal sleepLevel back to 100', function() {
    jasmine.clock().tick(5001);
    bear.restAnimal();
    expect(bear.sleepLevel).toEqual(100);
  });

  it('play will set animal activityLevel back to 100', function() {
    jasmine.clock().tick(5001);
    bear.playAnimal();
    expect(bear.activityLevel).toEqual(100);
  });

});

describe('Plant', function() {
  let plant;
  beforeEach( () => {
    plant = new Plant;
    jasmine.clock().install();
    plant.setHarvest();
    plant.setLife();
  });
  afterEach( () => {
    jasmine.clock().uninstall();
  });

  it('decrese plant life by 10 every second', () => {
    jasmine.clock().tick(1001);
    expect(plant.plantLife).toEqual(50);
  });

  it('increase plant life by 5 when watered', () => {
    jasmine.clock().tick(1001);
    plant.waterPlant();
    expect(plant.plantLife).toEqual(55);
  });

  it('increase harvest level by 1 every second', () => {
    jasmine.clock().tick(2001);
    expect(plant.harvestLevel).toEqual(2);
  });

  it('will increase yield and reset harvest interval when harvested', () => {
    jasmine.clock().tick(60001);
    plant.plantHarvest();
    expect(plant.yield).toEqual(1);
    expect(plant.harvestLevel).toEqual(0);
  });
});
