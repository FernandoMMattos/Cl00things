import React from "react";
import { clsx } from "clsx";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "caution";
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  children,
  ...props
}) => {
  return (
    <button className={clsx(styles.btn, styles[variant])} {...props}>
      {children}
    </button>
  );
};

export default React.memo(Button);
