var nominee_gender, nominee_ethnicity, nominee_sexuality, pieSvg, radius, pieColor;
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }
  window.addEventListener("scroll", reveal);
function initPieCharts(){
    // set the dimensions and margins of the graph
    // const width = 450,
    // height = 450,
    // margin = 40;

    width = window.innerWidth/2.3,
    height = 450,
    // height = window.innerHeight/2,
    margin = 40;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    radius = Math.min(width, height) / 2 - margin;

    // append the svg object to the div called 'my_dataviz'
    pieSvg = d3.select(".my_dataviz3")
    .append("svg")
    .attr("class", "chart")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);
    // .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // create 2 data_set
    // const nominee_gender = { male: 460, female: 8 }
    // const nominee_ethnicity = { white: 442, asian: 13, black: 6, hispanic: 7 }
    // const nominee_sexuality = { straight: 405, bisexual: 12, gay: 18, na: 33 }
    nominee_gender = { male: 460, female: 8 }
    nominee_ethnicity = { white: 442, asian: 13, black: 6, hispanic: 7 }
    nominee_sexuality = { straight: 405, bisexual: 12, gay: 18, na: 33 }

    // set the color scale
    pieColor = d3.scaleOrdinal()
    .domain(["male", "female", "white", "asian", "black", "Hispanic", "straight", "bisexual", "gay", "na"])
    // .range(d3.schemeBlues);
    // .range(d3.schemeAccent);
    .range(["rgb(69,87,149)", "rgb(213,181, 219)",
    "rgb(227,209,227)", "rgb(234,174,212", "rgb(198,79,99)", "rgb(219,123,159)",
    // "rgb(165,38,43",
    "rgb(220,148,168)", "rgb(154,90,128)", "rgb(99,60,105)", "rgb(50,36,79)", "rgb(220,148,168)", "rgb(0,19,51)"])

    tooltip = d3.select("body").append("div")
    .attr("class", "tooltipV3")
    .style("opacity", 0);

}

// A function that create / update the plot for a given variable:
function update3(data) {
  if (data == nominee_gender){
    document.getElementById('genderBtn').setAttribute("class","disabled"); 
    document.getElementById('ethnicityBtn').setAttribute("class",""); 
    document.getElementById('sexualityBtn').setAttribute("class",""); 
    }
    else if (data == nominee_ethnicity){
    document.getElementById('ethnicityBtn').setAttribute("class","disabled"); 
    document.getElementById('genderBtn').setAttribute("class",""); 
    document.getElementById('sexualityBtn').setAttribute("class",""); 
    }
    else if (data == nominee_sexuality){
    document.getElementById('sexualityBtn').setAttribute("class","disabled"); 
    document.getElementById('genderBtn').setAttribute("class",""); 
    document.getElementById('ethnicityBtn').setAttribute("class",""); 
    }
    
    // Compute the position of each group on the pie:
    const pie = d3.pie()
    .value(function (d) { return d[1]; })
    .sort(function (a, b) { return d3.ascending(a.key, b.key); }) // This make sure that group order remains the same in the pie chart
    const data_ready = pie(Object.entries(data))

    // map to data
    const u = pieSvg.selectAll("path")
        .data(data_ready)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    u
    .join('path')
    .on('mouseenter', function (evt, d) {
        d3.select(this).attr('opacity', 1)
        d3.select(this).attr("stroke", "white")
        d3.select(this).attr("filter", "saturate(1.2)")
        d3.select(this).attr("filter", "brightness(115%")
        
        //Makes div appear
        tooltip.transition()
        .duration(100)
        .style("opacity", 1);
    })
    .on('mousemove', function (evt, d) {
        d3.select(this).attr("stroke", "white")
        tooltip.html(((d.value / 468) * 100).toFixed(2) + "% " + d.data[0])
        // .style("left", (d3.pointer(event)[0] + 120) + "px")
        // .style("top", (d3.pointer(event)[1] - 30) + "px")
        .style("left", (event.clientX + 20 + window.scrollX) + "px")
        .style("top", (event.clientY - 15 + window.scrollY) + "px");
    })
    .on('mouseleave', function (d) {
        d3.select(this).attr("stroke", "none")
        d3.select(this).attr('opacity', .9)
        d3.select(this).attr("filter", "brightness(100%")
        d3.select(this).attr("filter", "saturate(.8)")
        //makes div disappear
        tooltip.transition()
        .duration('200')
        .style("opacity", 0);
    })
    .transition()
    .duration(1000)
    .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(radius)
    )
    .attr('fill', function (d) { return (pieColor(d.data[0])) })
    .attr("stroke", "none")
    .style("stroke-width", "2px")

    }
    