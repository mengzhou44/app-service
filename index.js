require('dotenv').config(); 
const { BlobServiceClient } = require("@azure/storage-blob");

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.CONNECTION_STRING);
const express = require("express")

const app = express()

app.get('/', (req, res)=> {
    res.send("Hello World!")
})

app.get('/notes', async (req, res)=> {
    const content = await downloadBlob()
    res.send(content)
})
 
const port = 3000 || process.env.PORT

app.listen(port, ()=> {
    console.log("Server is listening on port "+ port)
})

async function downloadBlob() {
  const containerClient = blobServiceClient.getContainerClient(process.env.CONTAINER_NAME);
  const blobClient = containerClient.getBlobClient(process.env.BLOB_NAME);

  try {
    const blobContent = await blobClient.downloadToBuffer();
     return blobContent.toString();
  } catch (error) {
     return "Error downloading blob:";
  }
}

downloadBlob();