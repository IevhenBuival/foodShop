import { useEffect, useRef, useState } from 'react';

import Styles from './ImgBlur.module.css';
interface IImgBlurProps {
  name: string;
  size?: string;
}

const ImgBlur = ({ name, size }: IImgBlurProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, Setloaded] = useState(false);

  const onImageLoaded = () => {
    Setloaded(true);
  };

  useEffect(() => {
    const imgElCurrent = imgRef.current;
    if (imgElCurrent) {
      imgElCurrent.addEventListener('load', onImageLoaded);
      return () => {
        imgElCurrent.removeEventListener('load', onImageLoaded);
      };
    }
  }, [imgRef]);

  return (
    <div
      className={`${Styles.blur_img}`}
      style={{
        backgroundImage:
          'url(' +
          process.env.PUBLIC_URL +
          '/images/' +
          name.replaceAll(' ', '%20') +
          '-blur.jpg)',
      }}
    >
      <img
        className={`${Styles.img} img-fluid ${loaded ? Styles.loaded : ''}`}
        ref={imgRef}
        onLoad={() => Setloaded(true)}
        src={process.env.PUBLIC_URL + '/images/' + name}
        alt={name}
        loading="lazy"
      />
    </div>
  );
};

export default ImgBlur;
