import { MouseEventHandler } from "react";

export default interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  id?: string;
  name?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon?: string;
  buttonType?: string;
}
