# Builds an index file for the links to the example code
# The original index is in index.template
# We replace a placeholder with the index information.
# This is not elegant, but it does work.
# Rob Miles 2019

import os

print("Starting")
filename = "indextemplate.html"
with open(filename) as f:
    templatePage = f.read()

# Set the directory you want to start from
rootDir = '../../code'
links = "<ul>"

# Spin through the files in the directory
for dirName, subdirList, fileList in os.walk(rootDir):
    for fname in fileList:
        if fname=="index.html":
            # there is an index file, link to it
            truncDir = dirName[len(rootDir)+1:]
            pagelink = "<a href=\"code\\" +truncDir+"\\"+fname + "\">"+truncDir+ "</a>"
            pagelink = pagelink.replace('\\','/')
            pagelink = "<li>" + pagelink + "</li>"
            links = links + pagelink + "\n"

links = links + "</ul>"

# Drop the links into the page
finalPage = templatePage.replace("#LINKS#", links)
print(finalPage)
# save the new index
text_file = open("../../index.html", "w")
text_file.write(finalPage)
text_file.close()