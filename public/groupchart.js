var groupchartApp = angular.module("groupchartApp", []);

groupchartApp.controller('gcCtrl', function ($scope) {
    var margin = { top: 40, right: 20, bottom: 30, left: 40 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var formatPercent = d3.format(".0%");

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, 300], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
    //.tickFormat(formatPercent);

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function (d) {
            return "<strong>Percentage:</strong> <span style='color:red'>" + d.percentage + "</span>";
        })
    var arrdata = [];
    d3.tsv("/json/data.tsv", type, function (error, data) {
        for (i = 1; i <= 2; i++) {
            var ctrID = "chart" + i;
            var svg = d3.select("#" + ctrID).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            svg.call(tip);

            // d3.tsv("frequency.tsv", type, function (error, data) {
            x.domain(data.map(function (d) { return d.country; }));
            y.domain([0, d3.max(data, function (d) { return d.percentage; })]);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);
            //.append("text")
            //.attr("transform", "rotate(360)")
            //.style("text-anchor", "end")
            //.text("Country");


            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Percentage");

            svg.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function (d) { return x(d.country); })
                .attr("width", x.rangeBand())
                .attr("y", function (d) { return y(d.percentage); })
                .attr("height", function (d) { return height - y(d.percentage); })
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide)
        }
    });

    function type(d) {
        d.percentage = +d.percentage;
        return d;
    }
});