var svgAge,  divAge, color_svg_age;

function initAgeGraph(){
    var width = 4899 //width of chart
    // var height = 224 //height of chart

    divAge = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);


    const myColor = d3.scaleSequential()         
        // .interpolator(d3.interpolatePuOr)
        .interpolator(d3.interpolateRdGy) 
        // .interpolator(d3.interpolateRdBu)
        .domain([10,80])

//set up color key
        var colors = [ 'rgb(105,1,31)', 'rgb(184, 45, 53)', 'rgb(229, 133, 106)', 'rgb(250, 209, 186)', 'rgb(252, 242, 236)', 'rgb(199, 199, 199)', 'rgb(142, 142, 142)', 'rgb(82, 82, 82)', 'rgb(28,28,28)' ];

        color_svg_age = d3.select('#color_key')
          .append('svg')
          .attr('width', 500)
          .attr('height', 50)
          .attr('class', 'colorSvg');

        var grad = color_svg_age.append('defs')
          .append('linearGradient')
          .attr('id', 'grad')
          .attr('y1', '0%')
          .attr('y2', '0%')
          .attr('x1', '0%')
          .attr('x2', '100%');

        grad.selectAll('stop')
          .data(colors)
          .enter()
          .append('stop')
          .style('stop-color', function(d){ return d; })
          .attr('offset', function(d,i){
            return 100 * (i / (colors.length - 1)) + '%';
          })

        color_svg_age.append('rect')
          .attr('x', 50)
          .attr('y', 15) 
          .attr('width', 400)
          .attr('height', 15)
          .style('fill', 'url(#grad)')
          // .style('position', 'absolute')
          .attr('class', 'key');

        let colorX = d3.scaleLinear()
          .domain([10, 80])
          .range([0, 400]);

        // add the x Axis
        color_svg_age.append("g")
          .attr("transform", "translate(50," + 30 + ")")
          .call(d3.axisBottom(colorX));

        // text label for the x axis
        color_svg_age.append("text")             
        .attr("transform",
              "translate(" + 51 + " ," + 8 + ")")
        .style("text-anchor", "left")
        .text("Age of Nominee")
        .attr("class", "titleLabel") 

//import data
d3.json("BestDirectorNominationData.json").then(function (data) {
    let arr = Object.values(data);

    svgAge = d3.select("#my_dataviz").append("svg");
      svgAge
      .attr("width", 5200)
      .attr("height", 300)
      .attr('class', 'SvgAge');

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
        svgAge
        .selectAll()
        .data(arr)
        .enter()
        .append("rect")
        .attr("y", (d, i) => index*-32 + (250)) //change y position 
        .attr("x", (d, i) => i*52 + 30)
        .attr("width", (d, i) => {
        if (index >= d.age.length) {
            return 0;
        }
        // console.log(d.age);
        return 50;
        })
        .attr("height", 30)
        .attr("fill", (d) => myColor(d.age[index]))
        .attr("stroke", 40)
        .on('mouseenter', function (evt, d) {
        d3.select(this).attr("stroke", "black")
        d3.select(this).attr('opacity', .2)
        //Makes div appear
        divAge.transition()
            .duration(100)
            .style("opacity", 1);

        if(d.win[index] == true){
        //How to change color and font of individual words?  
            divAge.html(
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
            divAge.html(
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
            divAge.transition()
                .duration('200')
                .style("opacity", 0);
                })
    }
    
    // add the x Axis
    svgAge.append("g")
        .attr("transform", "translate(20," + 280 + ")") //change x and y
        .call(d3.axisBottom(x));

    // add the y Axis
    svgAge.append("g")
        .attr("transform", "translate(20," + -70 + ")")
        .call(y_axis) 
    
    })
}
