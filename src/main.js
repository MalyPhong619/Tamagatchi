// import 'bootstrap';
// import 'bootstrap/scss/bootstrap.scss';
import $ from 'jquery';
import './sass/styles.scss';
import { Animal } from './Tamagotchi';
import { Plant } from './plant.js';
import "./assets/images/crop.png";
import "./assets/images/remove.png";
import "./assets/images/water-can.png";

$(document).ready(function() {
  let inputAnimal;
  let inputPlant;
  let newAnimal;
  let inputCity;


  $(".input-field").submit(function(event) {
    event.preventDefault();
    inputAnimal = $("#animal").val();
    inputPlant = $("#plant").val();
    inputCity = $("#city").val();
    $(".container").show();
    $(".form-container").hide();

    newAnimal = new Animal;



    // $.ajax({
    //   url: `http://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${process.env.WEATHER_API}`,
    //   type: 'GET',
    //   data: {
    //     format: 'json'
    //   },
    //   success: function(response) {
    //     $("#farmLocation").text(`Your farm location is in ${response.name}`);
    //     $('#farmTemp').text(`The temperature in ${response.name} is ${(((response.main.temp-273)*9/5)+32).toFixed()} F`);
    //     $('#farmWind').text(`The wind speed in ${response.name} is ${response.wind.speed}mph`);
    //   }
    // });


    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${process.env.WEATHER_API}`;
      request.onload(function() {
        if(this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response) {
      let body = JSON.parse(response);
      $("#farmLocation").text(`Your farm location is in ${response.name}`);
      $('#farmTemp').text(`The temperature in ${response.name} is ${(((response.main.temp-273)*9/5)+32).toFixed()} F`);
      $('#farmWind').text(`The wind speed in ${response.name} is ${response.wind.speed}mph`);
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });




    $.ajax({
      url: `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&limit=100&rating=G&q=${inputAnimal}&offset=0&lang=en`,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        $(".animal-gif").html(`<img src="${response.data[(Math.floor(Math.random()* 100))].images.original.url}">`);
      },
      error: function() {
        $('.oops').text("There was an error in processing your request");
      }
    });

    let request = new XMLHttpRequest();
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&limit=100&rating=G&q=${inputPlant}&offset=0&lang=en`;
    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response)
      }
    }
    request.open("GET", url, true);
    request.send();
    const getElements = function(response) {
      $(".plant-gif").html(`<img src="${response.data[Math.floor(Math.random()*100)].images.original.url}">`);
    }

    newAnimal.setLevel("foodLevel");
    newAnimal.setLevel("sleepLevel");
    newAnimal.setLevel("activityLevel");
    newAnimal.animalDeath();

    setInterval(() => {
      $("#foodLevel").text(newAnimal.foodLevel);
      $("#sleepLevel").text(newAnimal.sleepLevel);
      $("#activityLevel").text(newAnimal.activityLevel);

      if (newAnimal.animalDeath() === true) {
        $(".oops").text(`Your ${inputAnimal} has been loved too much.`);
        $(".buttonDiv").hide();
        $("#foodLevel").text("--");
        $("#sleepLevel").text("--");
        $("#activityLevel").text("--");
        $("#reset").show();
      } else {
        $(".oops").text("Love me!");
      }

    }, 500);

    $("#feed").click(function() {
      if (newAnimal.foodLevel < 100) {
        newAnimal.feedAnimal();
      } else {
        alert("You are overfeeding your animal!");
      }
    });

    $("#rest").click(() => {
      if (newAnimal.sleepLevel < 100) {
        newAnimal.restAnimal();
      } else {
        alert("Your animal is well-rested. Don't force it to be lazy.");
      }
    });

    $("#play").click(() => {
      if (newAnimal.activityLevel < 100) {
        newAnimal.playAnimal();
      } else {
        alert("Don't overwork your animal");
      }
    });

    $("#reset").click( () => {
      newAnimal.reset();
      $(".buttonDiv").show();
      $("#reset").hide();
    });


    let newPlant;
    let index = 0;
    const field = [];

    $("#plant-seed").click( function() {
      newPlant = new Plant;
      newPlant.setLife();
      newPlant.setHarvest();
      field.push(newPlant);
      $(".field").append('<div class="plant" id="plant' + index +'"><img src="assets/images/crop.png" alt="a plant"><div class="attributes"><h3>Hydration: <span id="waterLevel' + index + '"></span></h3><p id="water-level' + index + '"></p><h3>Ripeness: <span id="harvestLevel' + index + '"></span></h3><p id="harvest-level' + index + '"></p><h3>Harvested: <span id="pickedLevel' + index + '"></span></h3><p class="harvest-level"></p></div><div class="buttons buttons' + index +'"><img src="assets/images/water-can.png" class="water-button" id="water' + index +'"><button class="pick-button" id="harvest' + index +'" type="button" name="button">Pick Veggie</button></div><img src="assets/images/remove.png" class="remove-plant" id="remove' + index +'" ></div>')
      index++;

      let i = -1;
      field.forEach( function(plant) {
        setInterval(() => {
          $('#waterLevel'+i).text(field[i].plantLife);
          $("#harvestLevel"+i).text(field[i].harvestLevel);
          $("#pickedLevel"+i).text(field[i].yield);
          if (field[i].plantDeath() === true) {
            $(".buttons"+i).hide();
            $("#remove"+i).show();
            $("#waterLevel"+i).text("--");
            $("#harvestLevel"+i).text("--");
            $("#plant-reset"+i).show();
          } else {
            $(".plant-oops").text("Love me!");
          }
        }, 500);
        i += 1;
      });
      $("#water"+i).click(() => {
        if (field[i].plantLife < 100) {
          field[i].waterPlant();
        } else {
          alert("Don't overwater your plants!");
        }
      });
      $("#harvest"+i).click(() => {
        field[i].plantHarvest();
      });

      $("#remove"+i).click( () => {
        $("#plant"+i).hide();
      });
    });
  });
  $("#plant-reset").click(function() {
    location.reload();
  });

});
