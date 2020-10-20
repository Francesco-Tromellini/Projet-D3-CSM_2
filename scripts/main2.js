
let currentYear = '2016';

let heyScaleX, heyScaleY ;
let heyBars ;
let heyColorScale;
let heyTitles;
const Carnaroli = 'Carnaroli';
const Vialone_Nano = 'Vialone_Nano';
const Augusto = 'Augusto';
const Soy = 'Soy';
const Wheat = 'Wheat';

function setupYears () {
    
    loadDataYears();
    
    setupHectaresYears();
    
}

const years = [
    {id: 2016, name: 2016},
    {id: 2017, name: 2017},
    {id: 2018, name: 2018},
    {id: 2019, name: 2019},
];

function loadDataYears(){
    d3.dsv(';',`Data/Data_per_Year/Année_${currentYear}.CSV`, function (d){
        return{
            year: d.Year,
            variety: d.Variety,
            production: d.Production,
            hectares: d.Hectares
        }
    } ).then(onDataLoadedYears); 
}

function onDataLoadedYears(data){
    prodDataYear = data;
    
    d3.select('#years')
    .selectAll('option')
    .data(years)
    .join('option')
    .attr('value', d => d.id)
    .text(d => d.name)
    .each(function(d){
        const option = d3.select(this);
        if (d.id === currentYear){
            option.attr('selected', '');
        } else {
            option.attr('selected', null);
        }
    })
    graphHectaresYears();
}

function setupHectaresYears(){
    
    // élément SVG et le configurer
    const svg = d3.select('#svgContainer')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('style', 'font: 10px sans-serif');
    
    // échelle horizontale
    heyScaleX = d3.scaleBand()
    .domain([Carnaroli, Vialone_Nano, Augusto, Soy, Wheat])
    .range([margin.left, width - margin.right])
    .padding(0.1)
    .round(true);
    
    // échelle verticale
    heyScaleY = d3.scaleLinear()
    .domain([0, 50])
    .range([height - margin.bottom - 5, margin.top])
    .interpolate(d3.interpolateRound);
    
    // échelle de couleur
    heyColorScale = d3.scaleSequential()
    .domain ([0, 50])
    .interpolator(d3.interpolateReds);
    
    // barres et titres
    heyBars = svg.append('g');
    heyTitles = svg.append('g')
    .style('fill', 'white')
    .attr('text-anchor', 'middle')
    .attr('transform', `translate(${heyScaleX.bandwidth() / 2}, 6)`);
    
    // axe horizontal
    svg.append('g')
    .attr('transform', `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(heyScaleX))
    .call(g => g.select('.domain').remove())
    
    // axe vertical
    svg.append('g')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(heyScaleY))
    .call(g => g.select('.domain').remove())
    
    // titre du graphique
    svg.append('text')
    .attr('font-size', '18px')
    .attr('class', 'title')
    .attr('x', width / 2 + margin.left / 2)
    .attr('y', 20)
    .attr('text-anchor', 'middle')
    .text('HectaresYears')
    .style('fill', 'red')
    
}

function graphHectaresYears(){
    const data = prodDataYear.filter(d => d.year === currentYear)
    console.log(prodDataYear);
    console.log(currentYear);
    
    // Barres
    heyBars.selectAll('rect')
    .data(data)
    .join('rect')
    .transition()
    .duration(1000)
    .attr('width', heyScaleX.bandwidth())
    .attr('height', d => heyScaleY(0) - heyScaleY(d.hectares))
    .attr('x', d => heyScaleX(d.variety))
    .attr('y', d => heyScaleY(d.hectares))
    .style('fill', d => heyColorScale(d.hectares))
    
    // Titres
    heyTitles.selectAll('text')
    .data(data)
    .join('text')
    .transition()
    .duration(1000)
    .attr('dy', '0.35em')
    .attr('x', d => heyScaleX(d.variety))
    .attr('y', d => heyScaleY(d.hectares))
    .text(d => d.hectares)
    
}

setupYears();