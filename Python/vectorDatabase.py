from langchain_community.vectorstores import Chroma
from langchain.schema import Document
from typing import List
import os

os.environ['OPENAI_API_KEY'] = "your-api-key"


# Create a document
doc = Document(text="This is an example document.", metadata={"id": "example1"}, page_content="This is an example document.")

# Initialize Chroma
chroma = Chroma()

# Add the document to the database
chroma.add_document(doc)

# Retrieve the document
retrieved_doc = chroma.get_document("example1")

# Print the document
print(retrieved_doc.text)