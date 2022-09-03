import fs from 'fs';
import path from 'path';

const RandomIndex = (NumberOfImages: number) =>
  Math.floor(Math.random() * NumberOfImages + 1);

const convertImagesToBase64 = (imagesCount: string): any => {
  const result: string[] = [];
  const _imagesCount = parseInt(imagesCount);
  const imagesList = fs.readdirSync(
    path.resolve(__dirname, '../../src/assets/img/'),
  );

  for (let i = 0; i < _imagesCount; i++) {
    const randomIndex = RandomIndex(imagesList.length);

    const imageBuffer = fs.readFileSync(
      path.resolve(
        __dirname,
        `../../src/assets/img/${imagesList[randomIndex]}`,
      ),
    );
    const imageBase64 = imageBuffer.toString('base64');
    result.push(imageBase64);
  }
  return result;
};
export { convertImagesToBase64 };
