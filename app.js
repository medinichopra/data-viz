const DUMMY_DATA = [
    { id: 'd1', value: 10, region: 'USA' },
    { id: 'd2', value: 8, region: 'India' },
    { id: 'd3', value: 6, region: 'UK' },
    { id: 'd4', value: 12, region: 'Europe' }
]

const xScale = d3.scaleBand().domain(DUMMY_DATA.map((dataPoint) => dataPoint.region)).rangeRound([0,250]).padding(0.1); //ordinal scale, same width
const yScale = d3.scaleLinear().domain([0, 15]).range([200,0]); //different heights, give functions allowing us to translate

const container = d3.select('svg') //can add class with . and id with #
    .classed('container', true)
    ;

const bars = container
    .selectAll('.bar') //all within container, returns empty if empty
    .data(DUMMY_DATA) //data to bind to .bar in container, can be array of many things though
    .enter() //return missing .bar
    .append('rect') //append rect to each missing .bar
    .classed('bar', true)
    .attr('width', xScale.bandwidth())
    .attr('height', (data) => 200 - yScale(data.value))
    .attr('x', data => xScale(data.region))
    .attr('y', data => yScale(data.value))
    ;