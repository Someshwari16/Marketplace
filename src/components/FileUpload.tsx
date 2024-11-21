
import React, { useState } from "react";

type ProductDetails = {
  name: string;
  description: string;
  imageUrl: string;
};

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  // Upload file to the backend
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File upload failed.");
      }

      const data: ProductDetails = await response.json();
      setProductDetails(data);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading the file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Upload Social Media Content</h1>
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*,video/*"
        style={{ marginBottom: "10px" }}
      />
      <br />
      <button onClick={handleUpload} disabled={loading || !file}>
        {loading ? "Processing..." : "Upload"}
      </button>

      {productDetails && (
        <div style={{ marginTop: "20px" }}>
          <h2>Generated Amazon Listing</h2>
          <p>
            <strong>Product Name:</strong> {productDetails.name}
          </p>
          <p>
            <strong>Description:</strong> {productDetails.description}
          </p>
          {productDetails.imageUrl && (
            <img
              src={productDetails.imageUrl}
              alt="Product"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
