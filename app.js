const DUMMY_DATA = [
    { id: 'd1', value: 10, region: 'USA' },
    { id: 'd2', value: 8, region: 'India' },
    { id: 'd3', value: 6, region: 'UK' },
    { id: 'd4', value: 12, region: 'Europe' }
];

const MARGINS = {top: 20, bottom: 10};
const CHART_WIDTH = 600; 
const CHART_HEIGHT = 300 - MARGINS.top - MARGINS.bottom;

let selectedData = DUMMY_DATA;

const chartContainer = d3
    .select('svg') //container that holds chart, picks up svg tag from html, all bars rendered in svg
    .attr('width', CHART_WIDTH) 
    .attr('height', CHART_HEIGHT + MARGINS.top + MARGINS.bottom)
    ;                 

const chart = chartContainer.append('g'); //why this helper function?

const xScale = d3
    .scaleBand() //equally sized and distributed on x-axis
    .rangeRound([0,CHART_WIDTH]) //give range, rounds actual calculated numbers
    .padding(0.1) //ordinal scale, same width, 10% of the space
    .domain(DUMMY_DATA.map(d => d.region)); //how many items positions/which data should be scaled

const yScale = d3
    .scaleLinear()
    .range([200,0]) //different heights, give functions allowing us to translate, gives exact values, coordinate system starts in top-left corner
    .domain([0,d3.max(DUMMY_DATA, d => d.value) + 3])
    ;
//domains mapped to widths and heights
chart.append('g')
    .call(d3.axisBottom(xScale).tickSizeOuter(0))
    .attr('transform', `translate(0, ${CHART_HEIGHT})`)
    .attr('color', '#360909')
    ;

function renderChart() {
    chart.selectAll('.bar') //all within container, returns empty if empty
    .data(selectedData, data => data.id) //data to bind to .bar in container, can be array of many things though
    .enter() //return missing .bar data
    .append('rect') //append rect to each missing .bar
    .classed('bar', true)
    .attr('width', xScale.bandwidth()) //equal width for all bars, each one, taking into account padding
    .attr('height', (data) => CHART_HEIGHT - yScale(data.value)) //gives height of item
    .attr('x', data => xScale(data.region)) //gives where the item should be
    .attr('y', data => yScale(data.value))
    ;

    chart.selectAll('.bar')
    .data(selectedData, data => data.id)
    .exit()
    .remove()
    ;

    chart.selectAll('.label')
    .data(selectedData, data => data.id)
    .enter()
    .append('text')
    .text(data => data.value)
    .attr('x', data => xScale(data.region) + xScale.bandwidth() / 2)
    .attr('y', data => yScale(data.value) - 20)
    .attr('text-anchor', 'middle')
    .classed('label', true)
    ;

    chart.selectAll('.label')
    .data(selectedData, data => data.id)
    .exit()
    .remove()
    ;
}

renderChart();

const listItems = d3
    .select('#data')
    .select('ul')
    .selectAll('li')
    .data(DUMMY_DATA)
    .enter()
    .append('li')
    ;

listItems.append('span')
    .text((data) => data.region)
    ;

let unselectedIds = [];

listItems.append('input')
    .attr('type', 'checkbox')
    .attr('checked', true)
    .on('change', function() {
        console.log(data);
        if (unselectedIds.indexOf(data.id) === -1){
            unselectedIds.push(data.id);
            console.log(data.id);
        } else {
            unselectedIds = unselectedIds.filter((id) => id !== data.id);
        }
        selectedData = DUMMY_DATA.filter(
            (d) => unselectedIds.indexOf(d.id) === -1);
        console.log(selectedData);
        renderChart();
    });