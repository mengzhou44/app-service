require('dotenv').config(); 
const { BlobServiceClient } = require("@azure/storage-blob");
 
console.log(process.env.CONNECTION_STRING)

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.CONNECTION_STRING);

async function downloadBlob() {
  const containerClient = blobServiceClient.getContainerClient(process.env.CONTAINER_NAME);
  const blobClient = containerClient.getBlobClient(process.env.BLOB_NAME);

  try {
    const blobContent = await blobClient.downloadToBuffer();
    console.log("Blob content:", blobContent.toString());
  } catch (error) {
    console.error("Error downloading blob:", error);
  }
}

downloadBlob();