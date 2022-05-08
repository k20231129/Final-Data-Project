
var svgEthnicity,  divEthnicity, color_svg_ethnicity;

function initEthnicityGraph(){
  var width = 4899 //width of chart
  // var height = 224 //height of chart

  divEthnicity = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

//set up color key
  color_svg_ethnicity = d3.select('#color_key')
    .append('svg')
    .attr('width', 500)
    .attr('height', 50)
    .attr('class', 'colorSvg hidden');

  color_svg_ethnicity.append('rect')
    .attr('x', 65)
    .attr('y', 15)
    .attr('width', 50)
    .attr('height', 15)
    .style('fill', "rgb(225,225,225)") //light gray
    .attr('class', 'key');
  color_svg_ethnicity.append("text")   
    .text("White")
      .attr("id", "whiteLabel")   
      .attr("class", "keyLabel") 
      .attr("transform",
          "translate(" + 120 + " ," + 26 + ")")
    .style("text-anchor", "left")

  color_svg_ethnicity.append('rect')
    .attr('x', 65)
    .attr('y', 35)
    .attr('width', 50)
    .attr('height', 15)
    .style('fill', "rgb(243,226,152)") //yellow
    .attr('class', 'key');
  color_svg_ethnicity.append("text")             
    .attr("transform",
          "translate(" + 120 + " ," + 46 + ")")
    .style("text-anchor", "left")
    .text("Asian")
    .attr("class", "keyLabel") 

  color_svg_ethnicity.append('rect')
    .attr('x', 205)
    .attr('y', 15)
    .attr('width', 50)
    .attr('height', 15)
    .style('fill', "rgb(219,173,122") //light brown
    .attr('class', 'key');
  color_svg_ethnicity.append("text")             
    .attr("transform",
          "translate(" + 260 + " ," + 26 + ")")
    .style("text-anchor", "left")
    .text("Hispanic")
    .attr("class", "keyLabel") 

  color_svg_ethnicity.append('rect')
    .attr('x', 205)
    .attr('y', 35)
    .attr('width', 50)
    .attr('height', 15)
    .style('fill', 'rgb(106,58,38)') //dark brown
    .attr('class', 'key');
  color_svg_ethnicity.append("text")             
    .attr("transform",
          "translate(" + 260 + " ," + 46 + ")")
    .style("text-anchor", "left")
    .text("Black/African American")
    .attr("class", "keyLabel") 

  // text label for the x axis
  color_svg_ethnicity.append("text")             
  .attr("transform",
        "translate(" + 67 + " ," + 8 + ")")
  .style("text-anchor", "left")
  .text("Ethnicity of Nominee")
  .attr("class", "titleLabel") 

//import data
d3.json("BestDirectorNominationData.json").then(function (data) {
  let arr = Object.values(data);  

  svgEthnicity = d3.select("body").append("svg");
    svgEthnicity
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
      svgEthnicity
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
      // console.log(d.ethnicity[index]);
      return 50;
      })
      .attr("height", 30)
      .attr("fill", (d) => {
        if (d.ethnicity[index] == "Asian"){
          return "rgb(243,226,152)" //yellow
          // "rgb(255,99,93)"
          // "rgb(216,200,100)"
        }
        else if (d.ethnicity[index] == "Black"){
          return 'rgb(106,58,38)' //dark brown
        }
        else if (d.ethnicity[index] == "Hispanic"){
          return "rgb(219,173,122" //light brown
          // "rgb(184,108,58)"
        }
        return "rgb(225,225,225)" //light gray
      })

      .attr("stroke", 40)
      .on('mouseenter', function (evt, d) {
      d3.select(this).attr("stroke", "black")
      d3.select(this).attr('opacity', .2)
      //Makes div appear
      divEthnicity.transition()
          .duration(100)
          .style("opacity", 1);

      if(d.win[index] == true){
      //How to change color and font of individual words?  
      divEthnicity.html(
        `(Winner)
Name: ${d.names[index]}
Movie: ${d.movie[index]}
Age: ${d.age[index]}
Gender: ${d.gender[index]}
Ethnicity: ${d.ethnicity[index]}
Sexual Orientation: ${d["sexual orientation"][index]}`)
        .style("left", (event.clientX + window.scrollX + 20) + "px")
        .style("top", (event.clientY - 15) + "px");
    }
    else{
      divEthnicity.html(
        `Name: ${d.names[index]}
Movie: ${d.movie[index]}
Age: ${d.age[index]}
Gender: ${d.gender[index]}
Ethnicity: ${d.ethnicity[index]}
Sexual Orientation: ${d["sexual orientation"][index]}`)
          .style("left", (event.clientX + window.scrollX + 20) + "px")
          .style("top", (event.clientY - 15) + "px");
      }
      })
      
      .on('mouseleave', function (d) {
          d3.select(this).attr("stroke", "none")
          d3.select(this).attr('opacity', 1)
          //makes div disappear
          divEthnicity.transition()
              .duration('200')
              .style("opacity", 0);
              })
  }
  
  // add the x Axis
  svgEthnicity.append("g")
      .attr("transform", "translate(20," + 280 + ")")
      .call(d3.axisBottom(x));

  // add the y Axis
  svgEthnicity.append("g")
      .attr("transform", "translate(20," + -70 + ")")
      // .call(d3.axisLeft(y));
      .call(y_axis) 
  
  })
}
