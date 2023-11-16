import Image from "next/image";
import React from "react";

const ImagePreview = (img: any) => {
  const url = img;
  return (
    <div>
      <Image src={url} height={50} width={50} alt="imgge" />
    </div>
  );
};

export default ImagePreview;
