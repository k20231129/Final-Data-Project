//Graph Setup
const Age = 0;
const Gender= 1;
const Ethnicity = 2;
const Winner = 3;


//FIX THE SELECTION THING, UPDATE TEXT
var currentGraph = "Age";

//init all graphs
initGenderGraph();
initAgeGraph();
initEthnicityGraph();
initWinnerGraph();

// switchGraph();

function hideAll() {
    svgGender.attr("class", "hidden")
    divGender.attr("class", "hidden")
    color_svg_gender.attr("class", "hidden")

    svgAge.attr("class", "hidden")
    divAge.attr("class", "hidden")
    color_svg_age.attr("class", "hidden")

    svgEthnicity.attr("class", "hidden")
    divEthnicity.attr("class", "hidden")
    color_svg_ethnicity.attr("class", "hidden")

    svgWinner.attr("class", "hidden")
    divWinner.attr("class", "hidden")
    color_svg_winner.attr("class", "hidden")
}

function switchGraph(){
    switch (currentGraph) {
        case "Age": //0
            hideAll()
            // svgGender.attr("class", "hidden")
            // divGender.attr("class", "hidden")
            // color_svg_gender.attr("class", "hidden")

            svgAge.attr("class", "SvgAge")
            divAge.attr("class", "tooltip")
            color_svg_age.attr("class", "colorSvg")

            // svgEthnicity.attr("class", "hidden")
            // divEthnicity.attr("class", "hidden")
            // color_svg_ethnicity.attr("hidden")

            // svgWinner.attr("class", "hidden")
            // divWinner.attr("class", "hidden")
            // color_svg_winner.attr("hidden")
        
            break;
        case "Gender": //1
            hideAll()
            svgGender.attr("class", "SvgChart")
            divGender.attr("class", "tooltip")
            color_svg_gender.attr("class", "colorSvg")

            // svgAge.attr("class", "hidden")
            // divAge.attr("class", "hidden")
            // color_svg_age.attr("class", "hidden")

            // svgEthnicity.attr("class", "hidden")
            // divEthnicity.attr("class", "hidden")
            // color_svg_ethnicity.attr("hidden")

            // svgWinner.attr("class", "hidden")
            // divWinner.attr("class", "hidden")
            // color_svg_winner.attr("hidden")
            break;
        case "Ethnicity": //2
            hideAll()
            // svgGender.attr("class", "hidden")
            // divGender.attr("class", "hidden")
            // color_svg_gender.attr("class", "hidden")

            // svgAge.attr("class", "hidden")
            // divAge.attr("class", "hidden")
            // color_svg_age.attr("class", "hidden")

            svgEthnicity.attr("class", "SvgChart")
            divEthnicity.attr("class", "tooltip")
            color_svg_ethnicity.attr("class", "colorSvg")

            // svgWinner.attr("class", "hidden")
            // divWinner.attr("class", "hidden")
            // color_svg_winner.attr("hidden")
            break;
        case "Winner": //3
            hideAll()
            // svgGender.attr("class", "hidden")
            // divGender.attr("class", "hidden")
            // color_svg_gender.attr("class", "hidden")

            // svgAge.attr("class", "hidden")
            // divAge.attr("class", "hidden")
            // color_svg_age.attr("class", "hidden")

            // svgEthnicity.attr("class", "hidden")
            // divEthnicity.attr("class", "hidden")
            // color_svg_ethnicity.attr("hidden")

            svgWinner.attr("class", "SvgChart")
            divWinner.attr("class", "tooltip")
            color_svg_winner.attr("class", "colorSvg")
            break;
    }
  }
