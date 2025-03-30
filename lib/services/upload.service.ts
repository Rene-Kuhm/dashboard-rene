export const uploadImage = async (file: File): Promise<string> => {
  try {
    // First, create a FormData object to upload
    const formData = new FormData();
    formData.append('file', file);
    
    // Use API route instead of direct Cloudinary API call
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Error uploading image');
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Error uploading image');
  }
};
