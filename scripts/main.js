// Paramètres de la visualisation
const width = 400;
const height = 300;
const margin = { top: 20, right: 20, bottom: 20, left: 40 };

let productionData ;
let matScaleX, matScaleY ;
let hecScaleX, hecScaleY ;
let matColorScale ;
let hecColorScale ;
let matBars ;
let hecBars ;
let matTitles ;
let hecTitles ;
let currentVariety = 'Carnaroli';

const varieties = [
   {id: 'Carnaroli', name: 'Carnaroli'},
   {id: 'Vialone Nano', name: 'Vialone Nano'},
   {id: 'Augusto', name: 'Augusto'},
   {id: 'Wheat', name:'Blé'},
   {id: 'Soy', name:'Soja'},
];

function setup () {

   loadData();

   setupProductionOf();

   setupProductionOf_2();
}

function loadData(){
   d3.dsv(';',`Data_${currentVariety}.CSV`, function (d){
      return{
         year: d.Year,
         variety: d.Variety,
         production: d.Production,
         hectares: d.Hectares
      }
   } ).then(onDataLoaded); 
}

function onDataLoaded(data){
   productionData = data;
   

   d3.select('#varieties')
      .selectAll('option')
      .data(varieties)
      .join('option')
         .attr('value', d => d.id)
         .text(d => d.name)
         .each(function(d){
            const option = d3.select(this);
            if (d.id === currentVariety){
               option.attr('selected', '');
            } else {
               option.attr('selected', null);
            }
         })
   graphProductionOf_2();
   graphProductionOf();
}

function setupProductionOf_2(){

   // élément SVG et le configurer
   const svg = d3.select('body')
   .append('svg')
   .attr('width', width)
   .attr('height', height)
   .attr('style', 'font: 10px sans-serif');

   // échelle horizontale
   hecScaleX = d3.scaleBand()
   .domain([2016, 2017, 2018, 2019])
   .range([margin.left, width - margin.right])
   .padding(0.1)
   .round(true);

   // échelle verticale
   hecScaleY = d3.scaleLinear()
   .domain([0, 50])
   .range([height - margin.bottom - 5, margin.top])
   .interpolate(d3.interpolateRound);

   // échelle de couleur
   hecColorScale = d3.scaleSequential()
   .domain ([0, 50])
   .interpolator(d3.interpolateReds);

   hecBars = svg.append('g');
   hecTitles = svg.append('g')
   .style('fill', 'white')
   .attr('text-anchor', 'middle')
   .attr('transform', `translate(${hecScaleX.bandwidth() / 2}, 6)`);

   // axe horizontal
   svg.append('g')
   .attr('transform', `translate(0, ${height - margin.bottom})`)
   .call(d3.axisBottom(hecScaleX))
   .call(g => g.select('.domain').remove())

   // axe vertical
   svg.append('g')
   .attr('transform', `translate(${margin.left}, 0)`)
   .call(d3.axisLeft(hecScaleY))
   .call(g => g.select('.domain').remove())

}

function graphProductionOf_2(){
   const data = productionData.filter(d => d.variety === currentVariety)

   // Barres
   hecBars.selectAll('rect')
   .data(data)
   .join('rect')
      .attr('width', hecScaleX.bandwidth())
      .attr('height', d => hecScaleY(0) - hecScaleY(d.hectares))
      .attr('x', d => hecScaleX(d.year))
      .attr('y', d => hecScaleY(d.hectares))
      .style('fill', d => hecColorScale(d.hectares))

   // Titres
   matTitles.selectAll('text')
   .data(data)
   .join('text')
      .attr('dy', '0.35em')
      .attr('x', d => hecScaleX(d.year))
      .attr('y', d => hecScaleY(d.hectares))
      .text(d => d.hectares)
}

function setupProductionOf(){

   // élément SVG et le configurer
   const svg = d3.select('body')
   .append('svg')
   .attr('width', width)
   .attr('height', height)
   .attr('style', 'font: 10px sans-serif');

   // échelle horizontale
   matScaleX = d3.scaleBand()
   .domain([2016, 2017, 2018, 2019])
   .range([margin.left, width - margin.right])
   .padding(0.1)
   .round(true);

   // échelle verticale
   matScaleY = d3.scaleLinear()
   .domain([0, 2700])
   .range([height - margin.bottom - 5, margin.top])
   .interpolate(d3.interpolateRound);

   // échelle de couleur
   matColorScale = d3.scaleSequential()
   .domain ([0, 2000])
   .interpolator(d3.interpolateGreens);

   matBars = svg.append('g');
   matTitles = svg.append('g')
   .style('fill', 'white')
   .attr('text-anchor', 'middle')
   .attr('transform', `translate(${matScaleX.bandwidth() / 2}, 6)`);

   // axe horizontal
   svg.append('g')
   .attr('transform', `translate(0, ${height - margin.bottom})`)
   .call(d3.axisBottom(matScaleX))
   .call(g => g.select('.domain').remove())

   // axe vertical
   svg.append('g')
   .attr('transform', `translate(${margin.left}, 0)`)
   .call(d3.axisLeft(matScaleY))
   .call(g => g.select('.domain').remove())

   d3.select('#varieties').on('change', (e) => {
      const variety = d3.event.target.value;
      currentVariety = variety;
      loadData();
   })

}

function graphProductionOf (){

   const data = productionData.filter(d => d.variety === currentVariety)

   // Barres
   matBars.selectAll('rect')
   .data(data)
   .join('rect')
      .attr('width', matScaleX.bandwidth())
      .attr('height', d => matScaleY(0) - matScaleY(d.production))
      .attr('x', d => matScaleX(d.year))
      .attr('y', d => matScaleY(d.production))
      .style('fill', d => matColorScale(d.production))

   // Titres
   matTitles.selectAll('text')
   .data(data)
   .join('text')
      .attr('dy', '0.35em')
      .attr('x', d => matScaleX(d.year))
      .attr('y', d => matScaleY(d.production))
      .text(d => d.production)

}

setup();

// Source: https://observablehq.com/@d3/learn-d3-scales