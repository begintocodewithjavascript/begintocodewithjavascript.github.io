# Navbuilder

The navbuilder.py program is used to build the index page for the site, adding in links to the code files for each section. 

The index page is in the indextemplate.html file and contains a placeholder for the links section. The program traverses the code folder and build links to each example folder which are added into the index. 

It is important that changes to the index file are not made to the root index, as this will be overwritten by when the index is updated. Navbuilder should be run whenever the organisation of the code folder changes.