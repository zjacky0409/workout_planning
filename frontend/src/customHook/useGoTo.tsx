import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export function useGoTo() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const navigateWithLang = (path: string) => {
    const new_path = i18n.language + path;
    console.log("new_path => ", new_path);
    return navigate("/" + new_path);
  };

  return navigateWithLang;
}
