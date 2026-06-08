import React from "react";
import { clsx } from "clsx";
import styles from "./BackgroundBlur.module.css";

interface BlurBackgroundProps {
  active: boolean;
  onClick?: () => void;
  blurFor?: "addClothing" | "editProduct" | "default";
}

const BackgroundBlur = ({
  active,
  onClick = () => {},
  blurFor = "default",
}: BlurBackgroundProps) => {
  return (
    <div
      className={clsx(styles.background_blur, {
        [styles.active]: active,
        [styles[blurFor]]: blurFor,
      })}
      onClick={onClick}
    />
  );
};

export default React.memo(BackgroundBlur);
