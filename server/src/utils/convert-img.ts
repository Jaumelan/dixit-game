import fs from 'fs';
import path from 'path';

const convertImagesToBase64 = (images: string[]) => {
  const imagesBase64 = images.map((image) => {
    const imageBuffer = fs.readFileSync(
      path.resolve(__dirname, `../../src/assets/img/${image}`),
    );
    const imageBase64 = imageBuffer.toString('base64');
    return imageBase64;
  });
  return imagesBase64;
};

export { convertImagesToBase64 };
