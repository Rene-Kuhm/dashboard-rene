import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Create a unique file name
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    const fileName = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');

    // Always return a fake URL for development since Cloudinary isn't set up properly
    // This way we can test the image upload functionality
    const mockImageUrl = `https://picsum.photos/800/600?random=${fileName}`;
    return NextResponse.json({ url: mockImageUrl });

    /* Comment out the Cloudinary implementation until properly configured
    // Upload to Cloudinary if credentials exist
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append('file', file);
    cloudinaryFormData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'ml_default');

    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: cloudinaryFormData,
      }
    );

    if (!cloudinaryResponse.ok) {
      throw new Error('Cloudinary upload failed');
    }

    const data = await cloudinaryResponse.json();
    return NextResponse.json({ url: data.secure_url });
    */
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
}

// Keep the config
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
