var svgWinner,  divWinner, color_svg_winner;

function initWinnerGraph(){
  var width = 4899 //width of chart
  // var height = 224 //height of chart

  divWinner = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

//set up color key

      color_svg_winner = d3.select('#color_key')
        .append('svg')
        .attr('width', 500)
        .attr('height', 50)
        .attr('class', 'colorSvg hidden');

      color_svg_winner.append('rect')
        .attr('x', 65)
        .attr('y', 15)
        .attr('width', 50)
        .attr('height', 15)
        .style('fill', 'rgb(46,42,41)') //grey
        .attr('class', 'key');

      color_svg_winner.append("text")             
        .attr("transform",
              "translate(" + 120 + " ," + 26 + ")")
        .style("text-anchor", "left")
        .text("Nominated")
        .attr("class", "keyLabel") 

      color_svg_winner.append('rect')
        .attr('x', 65)
        .attr('y', 35)
        .attr('width', 50)
        .attr('height', 15)
        .style('fill', 'rgb(245,212,121)') //gold
        .attr('class', 'key');
      
      color_svg_winner.append("text")             
        .attr("transform",
              "translate(" + 120 + " ," + 46 + ")")
        .style("text-anchor", "left")
        .text("Winner")
        .attr("class", "keyLabel") 

      // text label for the x axis
      color_svg_winner.append("text")             
      .attr("transform",
            "translate(" + 51 + " ," + 8 + ")")
      .style("text-anchor", "left")
      .text("Gender of Nominee")
      .attr("class", "titleLabel") 

//import data
d3.json("BestDirectorNominationData.json").then(function (data) {
  let arr = Object.values(data);

  svgWinner = d3.select("#my_dataviz").append("svg");
  svgWinner
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

  for (let index = 0; index < 8; index++)  {
      svgWinner
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
      // console.log(d.win[index]);
      return 50;
      })
      .attr("height", 30)
      .attr("fill", (d) => {
        if (d.win[index] == true){
          return 'rgb(245,212,121)'
        }
        return 'rgb(46,42,41)'
      })

      .attr("stroke", 40)
      .on('mouseenter', function (evt, d) {
      d3.select(this).attr("stroke", "black")
      d3.select(this).attr('opacity', .2)
      //Makes div appear
      divWinner.transition()
          .duration(100)
          .style("opacity", 1);
      if(d.win[index] == true){
      //How to change color and font of individual words?  
      divWinner.html(
        `(Winner)
Name: ${d.names[index]}
Movie: ${d.movie[index]}
Age: ${d.age[index]}
Gender: ${d.gender[index]}
Ethnicity: ${d.ethnicity[index]}
Sexual Orientation: ${d["sexual orientation"][index]}`)
        .style("left", (event.clientX + window.scrollX + 20) + "px")
        .style("top", (event.clientY + window.scrollY - 15) + "px");
    }
    else{
        divWinner.html(
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
          divWinner.transition()
              .duration('200')
              .style("opacity", 0);
              })
  }
  
  // add the x Axis
  svgWinner.append("g")
      .attr("transform", "translate(20," + 280 + ")")
      .call(d3.axisBottom(x));

  // add the y Axis
  svgWinner.append("g")
      .attr("transform", "translate(20," + -70 + ")")
      // .call(d3.axisLeft(y));
      .call(y_axis) 
  
  })
}
