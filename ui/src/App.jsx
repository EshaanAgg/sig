import "./App.css";
import { useState, useEffect } from "react";
import { NavBar } from "./components/NavBar";
import SelectPipelines from "./components/SelectPipelines";
import { sampleRule } from "./constants/sampleData";
import { useOptionsData } from "./hooks/optionsData";
import { usePipelineContext } from "./context/PipelineContext";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const App = () => {
  const [optionsLoading, optionData] = useOptionsData();

  const [selectedBackend, setSelectedBackend] = useState("");

  const [filteredFormats, setFilteredFormats] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState("");
  useEffect(() => {
    if (selectedBackend === "") {
      setFilteredFormats([]);
      return;
    }

    if (optionData.formats) {
      const formats = optionData.formats.filter(
        (format) => format.backend === selectedBackend
      );
      formats.sort((a, b) => a.name - b.name);
      setFilteredFormats(formats);
    }
  }, [selectedBackend, optionData]);

  const { chosenPipelines } = usePipelineContext([]);

  const [ruleData, setRuleData] = useState(sampleRule);
  const [pipelineData, setPipelaneData] = useState("");
  const [queryCode, setQueryCode] = useState("");

  const [outputStatus, setOutputStatus] = useState("normal");

  const getQueryCode = async () => {
    const response = await fetch("http://localhost:8000/convert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rule: btoa(ruleData),
        pipelineYml: btoa(pipelineData),
        pipeline: chosenPipelines,
        target: selectedBackend,
        format: selectedFormat,
      }),
    });

    if (response.status === 500) {
      setQueryCode(
        "The pipelines select aren't valid for the selected backend-format pair."
      );
      setOutputStatus("error");
      return;
    }

    if (response.status !== 200) {
      const error = await response.text();
      setQueryCode(error);
      setOutputStatus("error");
      return;
    }

    const data = await response.json();
    setOutputStatus("success");
    if (typeof data.query === "string") setQueryCode(data.query);
    else setQueryCode(JSON.stringify(data.query, undefined, 4));
  };

  if (optionsLoading) return <>Please wait while we fetch the required data!</>;

  return (
    <>
      <NavBar />

      <div>
        <div id="form-section" className="mx-10 py-2">
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="lg:col-span-1 self-center">
              {/* Conversion options selection */}
              <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-4 sm:p-4">
                {/* Choose the backend */}
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="select-backend-label">Backend</InputLabel>
                    <Select
                      labelId="select-backend-label"
                      label="Backend"
                      id="select-backend"
                      value={selectedBackend}
                      onChange={(e) => {
                        setSelectedBackend(e.target.value);
                      }}
                    >
                      {optionData.backends.map((backend) => (
                        <MenuItem value={backend}>{backend}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                {/* Choose the format */}
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="select-format-label">Format</InputLabel>
                    <Select
                      labelId="select-format-label"
                      label="Format"
                      id="select-format"
                      value={selectedFormat}
                      onChange={(e) => {
                        setSelectedFormat(e.target.value);
                      }}
                    >
                      {filteredFormats.map((format) => (
                        <MenuItem value={format.name}>{format.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                {/* Choose the pipeline */}
                <SelectPipelines allPipelines={optionData.pipelines} />
              </div>
            </div>
          </div>
        </div>

        {/* Inputs for rule.yml and pipeline.yml */}
        <div id="content-section" className="mx-10 mt-5">
          <div id="rule-grid" className="grid lg:grid-cols-2 gap-4">
            <div id="rule-section" className="lg:col-span-1 self-start lg:px-2">
              {/* Content for rule.yml */}
              <label
                htmlFor="rule-yml"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Content of rule.yml
              </label>
              <textarea
                id="rule-yml"
                rows="20"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                value={ruleData}
                onChange={(e) => {
                  setRuleData(e.target.value);
                }}
              />

              {/* Content for pipeline.yml */}
              <label
                htmlFor="pipeline-yml"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Content of pipeline.yml
              </label>
              <textarea
                id="pipeline-yml"
                rows="20"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                value={pipelineData}
                onChange={(e) => {
                  setPipelaneData(e.target.value);
                }}
              />
            </div>

            <button onClick={getQueryCode}>Get Query</button>

            {/* Generated query */}
            <label
              htmlFor="query-data"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Generated Query
            </label>
            <textarea
              id="query-data"
              readOnly
              rows="20"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              value={queryCode}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
