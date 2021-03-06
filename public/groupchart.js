var groupchartApp = angular.module("groupchartApp", []);

groupchartApp.service('metricgroupRepository', function ($http) {
    this.getGroupMetric= function (guniquename) {
        var url = "http://salesforce-python.pureprofile.com/getgroupmetrics/" + guniquename ;
        return $http.get(url);
    };
});

groupchartApp.controller('gcCtrl', function ($scope, metricgroupRepository) {
    $scope.groupuniquename = guniquename;
    $scope.groupmetricdetails = {};

    metricgroupRepository.getGroupMetric($scope.groupuniquename).success(function (groupmetricData) {
        $scope.groupmetricdetails = groupmetricData.group_details;
        var locationdata = [];
        var obj1={
            text : "NSW",
            percentage : parseFloat(groupmetricData.group_details.location.nsw)
        }
        locationdata.push(obj1);

        var obj2={
            text : "VIC",
            percentage : parseFloat(groupmetricData.group_details.location.vic)
        }
        locationdata.push(obj2);

        var obj3={
            text : "QLD",
            percentage : parseFloat(groupmetricData.group_details.location.qld)
        }
        locationdata.push(obj3);

        var obj4={
            text : "SA",
            percentage : parseFloat(groupmetricData.group_details.location.sa)
        }
        locationdata.push(obj4);

        var obj5={
            text : "WA",
            percentage : parseFloat(groupmetricData.group_details.location.wa)
        }
        locationdata.push(obj5);

        var obj6={
            text : "TAS",
            percentage : parseFloat(groupmetricData.group_details.location.tas)
        }
        locationdata.push(obj6);

        var obj7={
            text : "ACT",
            percentage : parseFloat(groupmetricData.group_details.location.act)
        }
        locationdata.push(obj7);

        var obj8={
            text : "NT",
            percentage : parseFloat(groupmetricData.group_details.location.nt)
        }
        locationdata.push(obj8);

        var agergroups= [];
        var obja1={
            text : "18-24",
            percentage : parseFloat(groupmetricData.group_details.agegroup.years_18_24)
        }
        agergroups.push(obja1);

        var obja2={
            text : "25-34",
            percentage : parseFloat(groupmetricData.group_details.agegroup.years_25_34)
        }
        agergroups.push(obja2);

        var obja3={
            text : "35-44",
            percentage : parseFloat(groupmetricData.group_details.agegroup.years_35_44)
        }
        agergroups.push(obja3);

        var obja4={
            text : "45-54",
            percentage : parseFloat(groupmetricData.group_details.agegroup.years_45_54)
        }
        agergroups.push(obja4);

        var obja5={
            text : "55-64",
            percentage : parseFloat(groupmetricData.group_details.agegroup.years_55_64)
        }
        agergroups.push(obja5);

        var obja6={
            text : "65+",
            percentage : parseFloat(groupmetricData.group_details.agegroup.years_65_above)
        }
        agergroups.push(obja6);

        var chartgroups = [];
        var objLocGroup = {
            isLocation : 1,
            chartdata : locationdata
        }
        chartgroups.push(objLocGroup);

        var objchartAgeGroup = {
            isLocation : 0,
            chartdata  : agergroups
            }
        chartgroups.push(objchartAgeGroup);

        var margin = { top: 40, right: 20, bottom: 30, left: 40 },
        width = 800 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var formatPercent = d3.format(".0%");

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, 600], .3);

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
   // d3.tsv("/json/data.tsv", type, function (error, data) {
        for (i = 1; i <= chartgroups.length; i++) {
         var objchartdata = chartgroups[i - 1];
            var objdata = objchartdata.chartdata;
            var isLocation = objchartdata.isLocation;

            if (isLocation == 0) {
                generateAgeChart(objdata);
            } else {
                var ctrID = "chart" + i;
                var svg = d3.select("#" + ctrID).append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

               // svg.call(tip);

                var maxPercentage = d3.max(objdata, function (d) {
                    return d.percentage;
                });
                // d3.tsv("frequency.tsv", type, function (error, data) {
                x.domain(objdata.map(function (d) {
                    return d.text;
                }));
                //y.domain([0, d3.max(objdata, function (d) { return d.percentage;})]);
                //y.domain([0, maxPercentage+5]);
                y.domain([0, 100]);

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
                    //.text("Percentage");

                svg.selectAll(".bar")
                    .data(objdata)
                    .enter().append("rect")
                    .attr("class", "bar")
                    .attr("x", function (d) {
                        return x(d.text);
                    })
                    .attr("width", x.rangeBand())
                    .attr("y", function (d) {
                        return y(d.percentage);
                    })
                    .attr("height", function (d) {
                        return height - y(d.percentage);
                    })
                    .on('mouseover', tip.show)
                    .on('mouseout', tip.hide)

                svg.selectAll("text.bar")
                    .data(objdata)
                    .enter().append("text")
                    //.attr("class", "value bartext")
                    .attr("class","bartext")
                    .attr("text-anchor", "middle")
                    .attr("dx", "1.5em") //vertical align middle
                    .attr("dy", ".70em") //vertical align middle
                    .attr("x", function(d) { return x(d.text); })
                    .attr("y", function(d) { return y(d.percentage) - 12; })
                    .text(function(d) { return d.percentage; });
            }
        }
    });
  //  });

    function generateAgeChart(data){

        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function (d) {
                return "<strong>Percentage:</strong> <span style='color:red'>" + d.percentage + "</span>";
            })

        var chart = document.getElementById("chart2"),
            axisMargin = 20,
            margin = 20,
            valueMargin = 4,
            width = chart.offsetWidth,
            height = chart.offsetHeight,
            barHeight = (height - axisMargin - margin * 2) * 0.4 / data.length,
            barPadding = (height - axisMargin - margin * 2) * 0.6 / data.length,
            data, bar, svg, scale, xAxis, labelWidth = 0;

        max = d3.max(data.map(function (i) {
            return i.percentage;
        }));

        svg = d3.select(chart)
            .append("svg")
            .attr("width", width)
            .attr("height", 400);

        //svg.call(tip);

        bar = svg.selectAll("g")
            .data(data)
            .enter()
            .append("g");

        bar.attr("class", "bar")
            .attr("cx", 0)
            .attr("transform", function (d, i) {
                return "translate(" + margin + "," + (i * (barHeight + barPadding) + barPadding) + ")";
            });

        bar.append("text")
           // .attr("class", "tick value")
            .attr("class","bartext")
            .attr("y", barHeight / 2)
            .attr("dy", ".35em") //vertical align middle
            .text(function (d) {
                return d.text;
            }).each(function () {
                labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width));
            });

        scale = d3.scale.linear()
            .domain([0, max + 10])
            .range([0, width - margin * 2 - labelWidth]);

        xAxis = d3.svg.axis()
            .scale(scale)
            .tickSize(-height + 2 * margin + axisMargin)
            .orient("bottom");

        bar.append("rect")
            .attr("transform", "translate(" + labelWidth + ", 0)")
            .attr("height", barHeight)
            .attr("width", function (d) {
                return scale(d.percentage);
            });

        bar.append("text")
           // .attr("class", "value")
            .attr("class","bartext")
            .attr("y", barHeight / 2)
            .attr("text-anchor", "middle")
            .attr("dx", "5.6em") //margin right
            .attr("dy", ".35em") //vertical align middle
            .attr("text-anchor", "end")
            .text(function (d) {
                return d.percentage;
            })
            .attr("x", function (d) {
                var width = this.getBBox().width;
                return Math.max(width + valueMargin, scale(d.percentage));
            });
              svg.insert("g", ":first-child")
            .attr("class", "axis")
            .attr("transform", "translate(" + (margin + labelWidth) + "," + (height - axisMargin - margin) + ")")
            .call(xAxis);
    }

    function type(d) {
        d.percentage = +d.percentage;
        return d;
    }
});