import { sampleRule } from "./../constants/sampleData";
import { createContext, useContext, useState } from "react";

const FileContext = createContext();

export const FileContextProvider = ({ children }) => {
  const [ruleData, setRuleData] = useState(sampleRule);
  const [pipelineData, setPipelaneData] = useState("");

  return (
    <FileContext.Provider
      value={{ ruleData, setRuleData, pipelineData, setPipelaneData }}
    >
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => {
  return useContext(FileContext);
};
