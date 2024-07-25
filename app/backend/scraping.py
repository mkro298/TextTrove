import numpy as np
from PyPDF2 import PdfReader
from summerization import *
import pymupdf
import os 


def seperate_file(file_name, chapter_name=None, ret=True):
    toc = get_toc(file_name=file_name)
    return extract_chapters(file_name, toc, chapter_name, ret=ret)

def get_toc(file_name):
    doc = pymupdf.open(file_name)
    toc = doc.get_toc()
    return toc

def extract_chapters(file_name, toc, chapter_name, ret=True):

    if (chapter_name == None):
        return file_name, read_file(file_name=file_name)

    doc = pymupdf.open(file_name)
    start = 0
    end = 0

    heir = 0 
    name = ""

    for i in range(len(toc)):
        heirarchy = int(toc[i][0])
        title = toc[i][1]
        page_num = int(toc[i][2])

        if (heir != 0 and heirarchy == heir):
            #start is already defined 
            end = page_num - 2 
            print(name)
            return turn_into_pdf(start=start, end=end, doc=doc, title=chapter_name, ret=ret)
        elif (title.strip().lower() == chapter_name.strip().lower()):
            #right chapter 
            start = page_num - 1
            name = title
            heir = heirarchy
    
        

def turn_into_pdf(start, end, doc, title, ret=True):
    chap = pymupdf.open()
    chap.insert_pdf(doc, from_page=start, to_page=end)
    chap.save(f"{title}.pdf")
    if (ret):
        return f"{title}.pdf", read_file(f"{title}.pdf")
    else:
        return f"{title}.pdf"; 

    

def read_file(file_name):
    reader = PdfReader(file_name)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return run(text)


def delete_file(file_name):
    os.remove(file_name)
    return 
