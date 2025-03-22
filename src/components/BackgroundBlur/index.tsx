import React from "react";
import styles from "./BackgroundBlur.module.css";
import classNames from "classnames";

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
      className={classNames(styles.background_blur, {
        [styles.active]: active,
        [styles[blurFor]]: blurFor,
      })}
      onClick={onClick}
    />
  );
};

export default React.memo(BackgroundBlur);
