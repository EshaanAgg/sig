import "./App.css";
import { useState, useEffect } from "react";
import { NavBar } from "./components/NavBar";
import { sampleRule } from "./constants/sampleData";
import { useOptionsData } from "./hooks/optionsData";

const App = () => {
  const [optionsLoading, optionData] = useOptionsData();

  const [selectedBackend, setSelectedBackend] = useState("");

  const [filteredFormats, setFilteredFormats] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState("");
  useEffect(() => {
    if (optionData.formats) {
      setFilteredFormats(
        optionData.formats.filter(
          (format) => format.backend === selectedBackend
        )
      );
    }
  }, [selectedBackend, optionData]);

  const [selectedPipelines, setSelectedPipelines] = useState([]);

  const [ruleData, setRuleData] = useState(sampleRule);
  const [pipelineData, setPipelaneData] = useState("");
  const [queryCode, setQueryCode] = useState("");

  const getQueryCode = async () => {
    const response = await fetch("http://localhost:8000/convert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rule: btoa(ruleData),
        pipelineYml: btoa(pipelineData),
        pipeline: selectedPipelines,
        target: selectedBackend,
        format: selectedFormat,
      }),
    });

    if (response.status !== 200) {
      const error = await response.text();
      setQueryCode(error);
      return;
    }

    const data = await response.json();
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
                <div className="lg:px-1">
                  <label htmlFor="select-backend" className="text-sigma-blue">
                    Backend:
                  </label>
                  <select
                    id="select-backend"
                    className="select-sigma"
                    autoComplete="off"
                    value={selectedBackend}
                    onChange={(e) => {
                      setSelectedBackend(e.target.value);
                    }}
                  >
                    {optionData.backends.map((backend) => (
                      <option value={backend} key={backend}>
                        {backend}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Choose the format */}
                <div className="lg:px-1">
                  <label htmlFor="select-format" className="text-sigma-blue">
                    Format:
                  </label>
                  <select
                    id="select-format"
                    className="select-sigma"
                    autoComplete="off"
                    value={selectedFormat}
                    onChange={(e) => {
                      setSelectedFormat(e.target.value);
                    }}
                  >
                    {filteredFormats.map((format) => (
                      <option value={format.name} key={format.name}>
                        {format.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Choose the pipeline */}
                <div className="lg:px-1">
                  <label htmlFor="select-pipeline" className="text-sigma-blue">
                    Pipeline:
                  </label>
                  <select
                    id="select-pipeline"
                    className="select-sigma"
                    placeholder="Select pipelines..."
                    multiple
                    autoComplete="off"
                    value={selectedPipelines}
                    onChange={(e) => {
                      setSelectedPipelines(
                        Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        )
                      );
                    }}
                  >
                    {optionData.pipelines.map((pipeline) => (
                      <option value={pipeline} key={pipeline}>
                        {pipeline}
                      </option>
                    ))}
                  </select>
                </div>
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
                Content for rule.yml
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
                Content for pipeline.yml
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
