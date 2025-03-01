import { useState } from "react";

export default function ImageUpload() {
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file)); // Show preview
        }
    };

    const handleUpload = async () => {
        if (!image) return alert("Please select an image!");

        const formData = new FormData();
        formData.append("file", image);

        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        if (response.ok) {
            alert("Image uploaded successfully!");
            console.log("Image URL:", data.url);
        } else {
            alert("Upload failed!");
            console.error(data);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            {previewUrl && <img src={previewUrl} alt="Preview" width="100" />}
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}
