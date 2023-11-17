import "./App.css";
import { useState, useEffect } from "react";

import { NavBar } from "./components/NavBar";
import SelectPipelines from "./components/SelectPipelines";
import RuleContent from "./components/RuleContent";

import { useOptionsData } from "./hooks/optionsData";
import { usePipelineContext } from "./context/PipelineContext";
import { useFileContext } from "./context/FileContext";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

import { toast } from "react-toastify";
import copy from "clipboard-copy";

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
  const { ruleData, pipelineData } = useFileContext();

  const [queryCode, setQueryCode] = useState("");

  const [outputStatus, setOutputStatus] = useState("normal");
  const getQueryOutputStyle = () => {
    if (outputStatus === "normal") return `text-gray-900 border-gray-300`;
    else if (outputStatus === "error") return `text-red-900 border-red-300`;
    else return `text-green-900 border-green-300`;
  };

  const getQueryCode = async () => {
    if (selectedBackend === "") {
      toast.error("You must choose a backend to make the conversion!");
      return;
    }

    if (selectedFormat === "") {
      toast.error("You must choose a format to make the conversion!");
      return;
    }

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/convert`,
      {
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
      }
    );

    if (response.status === 500) {
      setQueryCode(
        "Error: The pipelines you selected don't aren't valid for the selected backend-format pair. Please change the configuration and try again."
      );
      toast.error("There was an error in your request!");
      setOutputStatus("error");
      return;
    }

    if (response.status !== 200) {
      toast.error("There was an error in your request!");
      const error = await response.text();
      setQueryCode(
        `Error: The confguration you selected isn't (most probably) valid and thus caused our backend to crash. Here is the logged error so that you can debug the configuration better:\n\n${error}`
      );
      setOutputStatus("error");
      return;
    }

    toast.success("Conversion was successful!");
    setOutputStatus("success");
    const data = await response.json();
    if (typeof data.query === "string") setQueryCode(data.query);
    else setQueryCode(JSON.stringify(data.query, undefined, 4));
  };

  if (optionsLoading) return <>Please wait while we fetch the required data!</>;

  return (
    <>
      <NavBar />

      <div className="pb-">
        <h1 class="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 mx-10">
          Configuration Settings
        </h1>
        <div className="mx-10 rounded-lg border bg-gray-50">
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
                        <MenuItem value={backend} key={backend}>
                          {backend}
                        </MenuItem>
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
                        <MenuItem value={format.name} key={format.name}>
                          {format.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                {/* Choose the pipeline */}
                <SelectPipelines allPipelines={optionData.pipelines} />

                {/* Get Query button */}
                <Button variant="contained" onClick={getQueryCode}>
                  Get Query
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Inputs for rule.yml and pipeline.yml */}
        <div id="content-section" className="mx-10 mt-5">
          <div id="rule-grid" className="grid lg:grid-cols-2 gap-4">
            <div className="lg:col-span-1 self-start lg:px-2">
              <h1 class="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900">
                Input Files
              </h1>
              <div className="block p-2.5 w-full text-sm rounded-lg border bg-gray-50">
                <RuleContent />
              </div>
            </div>

            {/* Generated query */}
            <div className="lg:col-span-1 self-start lg:px-2 relative">
              <h1 class="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900">
                Generated Query
              </h1>

              <TextareaAutosize
                id="query-data"
                readOnly
                maxRows={28}
                minRows={28}
                className={`block p-2.5 w-full text-sm rounded-lg border bg-gray-50 focus:ring-blue-500 focus:border-blue-500 ${getQueryOutputStyle()}`}
                value={queryCode}
              />

              {/* Add the copy icon */}
              <div className="absolute top-0 right-0 m-4 mt-12">
                <button
                  onClick={() => {
                    copy(queryCode);
                    toast.info("Copied to clipboard!");
                  }}
                >
                  <i className="fa-regular fa-copy text-3xl border bg-white rounded-lg p-2"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
