//Config
var center = [300, 300];
var radius = 220;
var circleWidth = 10;
var characterSize = 4;
var numbersList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var currentTime = new Date();
var initialTime = [currentTime.getHours() % 12, currentTime.getMinutes(), currentTime.getSeconds()];
var handsLength = [radius - 15*circleWidth, radius - 8*circleWidth, radius - circleWidth];
var handsWidth = [9, 6, 3];
var handsColor = ["#8b4513", "#8b4513", "red"];
var screwRadius = handsWidth[0];
var screwColor = 'black';
var speed = 1;

//html body
var body = d3.select("body");

//main drawing area
var svg = body.append("svg")
            .style("width", 600)
            .style("height", 600)

//clock's boundry
var circle = svg.append("circle")
            .style("r", radius + 3 * circleWidth)
            .style("cx", center[0])
            .style("cy", center[1])
            .style("fill", "white")
            .style("stroke", "black")
            .style("stroke-width", circleWidth)

//clock's number: 1 to 12
var numbers  = svg.selectAll("text")
                .data(numbersList)
                    .enter()
                    .append("text")
                    .attr('x', function(d, i) {
                        var tempCharacterSize = characterSize;
                        if(i == 11) tempCharacterSize *= 2;
                        return center[0] + (radius * Math.cos(i * Math.PI/6 - Math.PI/3)) - tempCharacterSize;
                    })
                    .attr('y', function(d, i) {
                        return center[1] + (radius * Math.sin(i * Math.PI/6 - Math.PI/3)) + characterSize;
                    })
                    .text(function(d) { return  d; });
                    
//clock's three hands: brown, brown, red
var hands = svg.selectAll("line")
            .data(handsLength)
                    .enter()
                    .append("line")
                    .style("stroke", function(d, i){
                        return handsColor[i];
                    })
                    .style("stroke-width", function(d, i){
                        return handsWidth[i];
                    })
                    .attr('x1', center[0])
                    .attr('y1', center[1])
                    .attr('x2', function(d, i) {
                        var tempDevider = 30;
                        if(i == 0) tempDevider = 6;
                        return center[0] + (d * Math.cos(initialTime[i] * Math.PI/tempDevider - Math.PI/2));
                    })
                    .attr('y2', function(d, i) {
                        var tempDevider = 30;
                        if(i == 0) tempDevider = 6;
                        return center[1] + (d * Math.sin(initialTime[i] * Math.PI/tempDevider - Math.PI/2));
                    })

//clock's screw to hide the edges of the hands
var handsScrew = svg.append('circle')
                    .style("r", screwRadius)
                    .style("cx", center[0])
                    .style("cy", center[1])
                    .style("fill", screwColor);
    
//expected time gap between declaring the initial time and the clock's first tick
var expectedTimeGap = 2;

//time to be changing
var time = [initialTime[0], initialTime[1], initialTime[2] + expectedTimeGap];

//update clock's time
var changeTime = function(){
    svg.selectAll("line")
    .attr('x2', function(d, i) {
        var tempDevider = 30;
        if(i == 0) tempDevider = 6;
        return center[0] + (d * Math.cos(time[i] * Math.PI/tempDevider - Math.PI/2));
    })
    .attr('y2', function(d, i) {
        var tempDevider = 30;
        if(i == 0) tempDevider = 6;
        return center[0] + (d * Math.sin(time[i] * Math.PI/tempDevider - Math.PI/2));
    })

    time[2] += 1;
    if(time[2] == 60){
        time[2] = 0;
        time[1] += 1;
        if(time[1] == 60){
            time[1] = 0;
            time[0] += 1;
        }
    }

}

//start updating time
setInterval(changeTime, 1000 / speed);