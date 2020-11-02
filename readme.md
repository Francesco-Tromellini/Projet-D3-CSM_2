# 2016 - 2019 visualization of cereal production 
### The document uses the d3 library to present the visualization of the data relating to the cereal production in the "Cascina San Maiolo" farm between the years 2016 and 2019.
### [Clik here to see the document](https://francesco-tromellini.github.io/Projet-D3-CSM_2/)
## The project
This data visualization project was developed as part of the "Visualisation des données" course at the University of Lausanne (UNIL) held by professors Isaac Pante and Loïc Cattani.
The aim is to create a clear and interactive visualization of the cerial production of the farmhouse so that it is possible read the hectares, the production, and the productivity index at a glance.
## Explanation of graphic choices
The graphic choices tend towards simplicity and clarity. These are two series of three histograms of different colors that expose three types of data in two different ways. The first from the right, in green, represent the productivity in quintals, the second, in red, the quantity of hectares cultivated and the third, in blue, the productivity understood as the quantity of quintals produced per hectare. The three graphs of each of the series are updated simultaneously thanks to the drop-down menu which allows to modify the variety analyzed in the first case and the year of production in the second. In this way, it is possible to have a clear and intuitive idea of ​​the production of each year and each cereal.
The only part of the visualization that could be misleading is that the first two charts are absolute numbers while the third is a ratio. Therefore, even when the production is very low, the productivity rate can be good, so you can see the first two graphs go down while the third one stays high. But this type of visualization is very useful because having the productivity graph makes it possible to immediately have an eye on production anomalies, which are very clear, for example, in wheat. In this case, the production anomaly is due both to the climatic trend of the year, but also to the rotation of land, not all equally productive.
## The visualization
The visualization is mainly divided into two parts which show the same data in different ways. The first part allows you to view hectares, production and productivity (production per hectare) of all the years according to the variety selected with the drop-down menu.

![](img/First_part.png)
*View of the first part of the visualization*

The second part shows the same data but divides them by variety and allows you to select the year with the drop-down menu.

![](img/Second_part.png)
*View of the second part of the visualization*

## Packages
* [BootStrap](https://getbootstrap.com/)
* [D3](https://d3js.org/)
