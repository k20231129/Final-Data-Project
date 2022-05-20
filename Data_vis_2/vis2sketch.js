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

function initScatterPlot(){
    // set the dimensions and margins of the graph
    const margin = {top: 150, right: 50, bottom: 30, left: 100},
    width = 1050 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("class", "plot")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom + 100)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    //Read the data
    d3.csv("NonWhitePercentage.csv").then( function(data) {

    // Add X axis
    const x = d3.scaleLinear()
    .domain([1, 100])
    .range([0, width ]);
    svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear()
    .domain([0, 100])
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y));

    // Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend on the data point.
    // Its opacity is set to 0: we don't see it by default.
    var tooltip = d3.select("#my_dataviz")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")

    // A function that change this tooltip when the user hover a point.
    // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
    var mouseover = function(d) {
    tooltip
    .style("opacity", 1)
    d3.select(this).attr("stroke", "black")
    d3.select(this).attr('opacity', .2)
    }

    var mousemove = function(d, i) {
    tooltip
    .html(Math.round(i['Percentage of Non-white Nominees'])+"% in Ceremony #" + i.CeremonyNum)
    // .html("The percentage of non-white nominees in Ceremony " + i.CeremonyNum + " is " + i['Percentage of Non-white Nominees'] + "%")
    .style("left", (d3.pointer(event)[0]) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
    .style("top", (d3.pointer(event)[1] + 130) +  "px")
    }

    // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
    var mouseleave = function(d) {
    tooltip
    .transition()
        .duration(200)
        .style("opacity", 0)
    d3.select(this).attr("stroke", "none")
    d3.select(this).attr('opacity', 1)
    }

    // Add dots
    svg.append('g')
    .selectAll("dot")
    .data(data)
    .join("circle")
    .attr("cx", function (d) { return x(d.CeremonyNum); } )
    .attr("cy", function (d) { return y(d['Percentage of Non-white Nominees']); } )
    .attr("r", 4)
    // .style("fill", "#800020")
    .style("fill", "#cbac56")
    .on("mouseover", mouseover )
    .on("mousemove", mousemove )
    .on("mouseleave", mouseleave )


    })
}