// Paramètres de la visualisation
const width = 400;
const height = 300;
const margin = { top: 20, right: 20, bottom: 20, left: 40 };

d3.dsv(';','Data_2.CSV', function (d){
   return{
      year: d.Year,
      variety: d.Variety,
      production: d.Production,
   }
} ).then(function(data){

   //const year = data.filter(d => d.year === '2019')
   const variety = data.filter(d => d.variety === 'Carnaroli')

   console.log(variety);
   
   // Créer l'élément SVG et le configurer
   const svg = d3.select('body')
   .append('svg')
   .attr('width', width)
   .attr('height', height)
   .attr('style', 'font: 10px sans-serif')
   
   // Créer l'échelle horizontale (fonctions D3)
   const x = d3.scaleBand()
   .domain(variety.map(d => d.year))
   .range([margin.left, width - margin.right])
   .padding(0.1)
   .round(true)
   
   // Créer l'échelle verticale (fonctions D3)
   const y = d3.scaleLinear()
   .domain([0, d3.max(variety, d => d.production)])
   .range([height - margin.bottom - 5, margin.top])
   .interpolate(d3.interpolateRound)
   
   const teinte = d3.scaleSequential()
   .domain ([0, d3.max(variety, d => d.production)])
   .interpolator(d3.interpolateBlues)
   
   // Ajouter les barres
   svg.append('g')
   .selectAll('rect')
   .data(variety)
   .enter()
   .append('rect')
   .attr('width', x.bandwidth())
   .attr('height', d => y(0) - y(d.production))
   .attr('x', d => x(d.year))
   .attr('y', d => y(d.production))
   .style('fill', d => teinte(d.production))
   
   // Ajouter les titres
   svg.append('g')
   .style('fill', 'white')
   .attr('text-anchor', 'middle')
   .attr('transform', `translate(${x.bandwidth() / 2}, 6)`)
   .selectAll('text')
   .data(variety)
   .enter()
   .append('text')
   .attr('dy', '0.35em')
   .attr('x', d => x(d.year))
   .attr('y', d => y(d.production))
   .text(d => d.production)
   
   // Ajouter l'axe horizontal
   svg.append('g')
   .attr('transform', `translate(0, ${height - margin.bottom})`)
   .call(d3.axisBottom(x))
   .call(g => g.select('.domain').remove())
   
   // Ajouter l'axe vertical
   svg.append('g')
   .attr('transform', `translate(${margin.left}, 0)`)
   .call(d3.axisLeft(y))
   .call(g => g.select('.domain').remove())
});



// Source: https://observablehq.com/@d3/learn-d3-scales