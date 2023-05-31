// const country_foods = require('../data/foods.js');
import country_foods from '../data/foods.js';
import nationalFoods from '../data/country_food_data.json';

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  const openModalBtn = document.querySelector(".button");
  const closeModalBtn = document.querySelector(".btn-close");

  const openModal = function () {
   
    // console.log(typeof classList)
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  };

  const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  };

  openModalBtn.addEventListener("click", openModal); 
  closeModalBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

// const screenWidth = 13; // inches
// const diagonalRatio = Math.sqrt(16 ** 2 + 9 ** 2);

// const width = (screenWidth / diagonalRatio) * Math.sqrt(16 ** 2 / (16 ** 2 + 9 ** 2));
// const height = (width * 9) / 16;

// const svg = d3.select('body')
//   .append('svg')
//   .attr('width', width)
//   .attr('height', height);

// const projection = d3.geoMercator().scale(140).translate([width / 2, height / 1.4]);
// const path = d3.geoPath().projection(projection);

// const tooltip = svg.append('g');
  const width = 350;
  const height = 350;

  const svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const projection = d3.geoMercator().scale(140).translate([width / 2, height / 1.4]);
  const path = d3.geoPath().projection(projection);

  const tooltip = svg.append('g');


    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json').then(data => {
      const countries = topojson.feature(data, data.objects.countries);

      svg.selectAll('path')
        .data(countries.features)
        .enter()
        .append('path')
        .attr('class', 'country')
        .attr('d', path)
        .attr('data-countryname', (d) => d.properties.name)
        .append('title')
        .text(d => ` ${d.properties.name}`)
        .attr('class', 'tooltip-country');

      svg.on('mouseover', (d) => {
        // console.log('MOUSEOVER EVENT', d.target?.dataset);
        let selected_country = getCountryNameFromTarget(d.target?.dataset);
        
        if (nationalFoods[selected_country]) {
          document.getElementsByClassName("country").innerHTML = selected_country;
        }
      });

      svg.on("click", (d) => {
        let selected_country = getCountryNameFromTarget(d.target?.dataset);

        if (nationalFoods[selected_country]) {
          document.getElementById("food_displayer").innerHTML = selected_country + ": " + nationalFoods[selected_country].dish;
        }
      });
    });
  

  function getCountryNameFromTarget(target) {
    if (!target) {
      return "";
    }

    return target.countryname;


    if (!element) {
      // return "";
      console.log("no element")
    }

    let country_id_and_name = element.innerHTML;
    let split_index = country_id_and_name.indexOf(': ') + 2;
    let country_name = country_id_and_name.slice(split_index);

    return country_name;
  }



  let selector = document.getElementById('selector');

  for (let country in country_foods) {
    let option = document.createElement('option');
    option.value = country;
    option.innerHTML = country;
    selector.appendChild(option);
  }
  // countryjs.forEach(function (selectedItem) {
  //   let option = document.createElement('option');

  //   option.value = selectedItem;
  //   option.innerHTML = selectedItem;
  //   selector.appendChild(option);
  // });

  selector.onchange = function () {
    let selected_country = this.value;
    document.getElementById("food_displayer").innerHTML = selected_country + ": " + country_foods[selected_country].dish
    }




})

