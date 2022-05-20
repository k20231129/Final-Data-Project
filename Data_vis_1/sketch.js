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

var leftOffset2 = parseInt($("#selectButton").css('left'));
$(window).scroll(function(){
    $('#selectButton').css({
        'left': $(this).scrollLeft() + leftOffset2
    });
});

var leftOffset = parseInt($(document.getElementsByClassName('hFixed')).css('left'));
$(window).scroll(function(){
    $(document.getElementsByClassName('hFixed')).css({
        'left': $(this).scrollLeft() + leftOffset
    });
});

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
            svgAge.attr("class", "SvgAge")
            divAge.attr("class", "tooltip")
            color_svg_age.attr("class", "colorSvg")
            break;

        case "Gender": //1
            hideAll()
            // svgGender.attr("class", "SvgChart")
            svgGender.attr("class", "SvgAge")
            divGender.attr("class", "tooltip")
            color_svg_gender.attr("class", "colorSvg")
            break;

        case "Ethnicity": //2
            hideAll()
            svgEthnicity.attr("class", "SvgAge")
            divEthnicity.attr("class", "tooltip")
            color_svg_ethnicity.attr("class", "colorSvg")
            break;

        case "Winner": //3
            hideAll()
            svgWinner.attr("class", "SvgAge")
            divWinner.attr("class", "tooltip")
            color_svg_winner.attr("class", "colorSvg")
            break;
    }
  }
