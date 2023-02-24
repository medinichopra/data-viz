// JavaScript code for visualization.js

// Create an array of dummy data
var data = [
    { label: "A", value: 100, show: true },
    { label: "B", value: 200, show: true },
    { label: "C", value: 50, show: true },
    { label: "D", value: 75, show: true },
    { label: "E", value: 125, show: true }
  ];
  
  // Set the dimensions and margins of the chart
  var margin = { top: 20, right: 20, bottom: 30, left: 40 },
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
  
  // Create the x-scale
  var x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);
  
  // Create the y-scale
  var y = d3.scaleLinear()
    .range([height, 0]);
  
  // Create the SVG element
  var svg = d3.select("#visualization")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  // Set the domains of the x and y scales
  x.domain(data.map(function(d) { return d.label; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]);
  
  // Create the bars
  var bars = svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.label); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); });
  
  // Add the x-axis
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
  
  // Add the y-axis
  svg.append("g")
    .call(d3.axisLeft(y));
  
  // Create the checkboxes
  var checkboxes = d3.select("#controls").selectAll("input")
    .data(data)
    .enter().append("label")
      .text(function(d) { return d.label; })
    .append("input")
      .attr("type", "checkbox")
      .property("checked", function(d) { return d.show; })
      .on("change", function(d, i) {
        d.show = !d.show;
        bars.filter(function(d) { return !d.show; })
          .style("opacity", 0)
        .property("checked", true)
        .on("change", function(d) {
          d3.selectAll(".bar")
            .filter(function(e) { return e.label != d.label; })
            .style("opacity", d3.select(this).property("checked") ? 1 : 0);
        });
        });