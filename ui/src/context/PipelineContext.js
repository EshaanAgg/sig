import { createContext, useContext, useState } from "react";

const PipelineContext = createContext();

export const PipelineContextProvider = ({ children }) => {
  const [chosenPipelines, setChosenPipelines] = useState([]);

  const updateChosenPipelines = (newValue) => {
    setChosenPipelines(newValue);
  };

  return (
    <PipelineContext.Provider
      value={{ chosenPipelines, updateChosenPipelines }}
    >
      {children}
    </PipelineContext.Provider>
  );
};

export const usePipelineContext = () => {
  return useContext(PipelineContext);
};
