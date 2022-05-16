var svgGender,  divGender, color_svg_gender;


function initGenderGraph(){
    var width = 4899 //width of chart
    // var height = 224 //height of chart

    divGender = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
      
  //set up color key

    color_svg_gender = d3.select('#color_key')
      .append('svg')
      .attr('width', 500)
      .attr('height', 50)
      .attr('class', 'colorSvg hidden');

    color_svg_gender.append('rect')
      .attr('x', 60)
      .attr('y', 15)
      .attr('width', 50)
      .attr('height', 15)
      .style('fill', 'rgb(149,210,236)') //blue
      // .style('position', 'absolute')
      .attr('class', 'key');

    color_svg_gender.append("text")             
      .attr("transform",
            "translate(" + 120 + " ," + 24 + ")")
      .style("text-anchor", "left")
      .attr("class", "label") 
      .text("male")
      .attr("class", "keyLabel") 

    color_svg_gender.append('rect')
      .attr('x', 180)
      .attr('y', 15)
      .attr('width', 50)
      .attr('height', 15)
      .style('fill', 'rgb(255,99,93)') //red
      // .style('position', 'absolute')
      .attr('class', 'key');
    
    color_svg_gender.append("text")             
      .attr("transform",
            "translate(" + 240 + " ," + 24 + ")")
      .style("text-anchor", "left")
      .attr("class", "label") 
      .text("female")
      .attr("class", "keyLabel") 

        // text label for the x axis
        color_svg_gender.append("text")             
        .attr("transform",
              "translate(" + 51 + " ," + 8 + ")")
        .style("text-anchor", "left")
        .attr("class", "label") 
        .text("Gender of Nominee")
        .attr("class", "titleLabel") 

//import data
d3.json("BestDirectorNominationData.json").then(function (data) {
  let arr = Object.values(data);
  // console.log(arr[0].age[0])    

  svgGender = d3.select("body").append("svg");
    svgGender
    .attr("width", 5200)
    .attr("height", 300)
    .attr('class', 'SvgChart hidden');

  // set the x / y output ranges
  var x = d3.scaleBand()
      .range([0, width+5])
      .padding(0.25);
  
  var y = d3.scaleLinear()
      .range([350, 130]);
  
  var y_axis = d3.axisLeft().scale(y).ticks(7);

  // set the x / y input domains
  x.domain(arr.map(arr => arr.CeremonyNum)); 
  y.domain([0, 7]);
  // y.domain(d3.max(arr, arr => + 7))

  for (let index = 0; index < 8; index++)  {
      svgGender
      .selectAll()
      .data(arr)
      .enter()
      .append("rect")
      .attr("y", (d, i) => index*-32 + (250))
      .attr("x", (d, i) => i*52 + 30)
      .attr("width", (d, i) => {
      if (index >= d.age.length) {
          return 0;
      }
      // console.log(d.gender[index]);
      return 50;
      })
      .attr("height", 30)
      .attr("fill", (d) => {
        if (d.gender[index] == "Female"){
          return "rgb(255,99,93)"
        }
        return "rgb(149,210,236)"
      })

      .attr("stroke", 40)
      .on('mouseenter', function (evt, d) {
      d3.select(this).attr("stroke", "black")
      d3.select(this).attr('opacity', .2)
      //Makes div appear
      divGender.transition()
          .duration(100)
          .style("opacity", 1);
          
      // div.html("Age: " + d.age[index])
      if(d.win[index] == true){
      //How to change color and font of individual words?  
      divGender.html(
        `(Winner)
Name: ${d.names[index]}
Movie: ${d.movie[index]}
Age: ${d.age[index]}
Gender: ${d.gender[index]}
Ethnicity: ${d.ethnicity[index]}
Sexual Orientation: ${d["sexual orientation"][index]}`)
        .style("left", (event.clientX + window.scrollX + 20) + "px")
        .style("top", (event.clientY+ window.scrollY  - 15) + "px");
    }
    else{
        divGender.html(
        `Name: ${d.names[index]}
Movie: ${d.movie[index]}
Age: ${d.age[index]}
Gender: ${d.gender[index]}
Ethnicity: ${d.ethnicity[index]}
Sexual Orientation: ${d["sexual orientation"][index]}`)
          .style("left", (event.clientX + window.scrollX + 20) + "px")
          .style("top", (event.clientY + window.scrollY - 15) + "px");
      }
      })
      
      .on('mouseleave', function (d) {
          d3.select(this).attr("stroke", "none")
          d3.select(this).attr('opacity', 1)
          //makes div disappear
          divGender.transition()
              .duration('200')
              .style("opacity", 0);
              })
    }
    
    // add the x Axis
    svgGender.append("g")
        .attr("transform", "translate(20," + 280 + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    svgGender.append("g")
        .attr("transform", "translate(20," + -70 + ")")
        // .call(d3.axisLeft(y));
        .call(y_axis) 
    
    })
}
