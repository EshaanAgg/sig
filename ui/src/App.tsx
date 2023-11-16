import "./App.css";
import { NavBar } from "./components/NavBar";
import { sampleRule } from "./constants/sampleData";
import { useOptionsData } from "./hooks/optionsData";

const App = () => {
  const [optionsLoading, optionData] = useOptionsData();

  if (optionsLoading) return <>Please wait while we fetch the required data!</>;

  return (
    <>
      <NavBar />

      <div className="bg-sigma-dark">
        <div id="form-section" className="mx-10 py-2">
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="lg:col-span-1 self-center">
              {/* Conversion options selection */}
              <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-4 sm:p-4">
                {/* Choose the backend */}
                <div className="lg:px-1">
                  <label for="select-backend" className="text-sigma-blue">
                    Backend:
                  </label>
                  <select
                    id="select-backend"
                    className="select-sigma"
                    autocomplete="off"
                  >
                    {optionData.backends.map((backend) => (
                      <option value={backend} key={backend}>
                        {{ backend }}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Choose the format */}
                <div className="lg:px-1">
                  <label for="select-format" className="text-sigma-blue">
                    Format:
                  </label>
                  <select
                    id="select-format"
                    className="select-sigma"
                    autocomplete="off"
                  >
                    {optionData.backends.map((format) => (
                      <option
                        hidden
                        backend={format.backend}
                        value={format.name}
                        key={format.name}
                      >
                        {format.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Choose the pipeline */}
                <div className="lg:px-1">
                  <label for="select-pipeline" className="text-sigma-blue">
                    Pipeline:
                  </label>
                  <select
                    id="select-pipeline"
                    className="select-sigma"
                    name="pipeline[]"
                    placeholder="select pipelines..."
                    multiple
                    autocomplete="off"
                  >
                    {optionData.pipleines.map((pipeline) => (
                      <option
                        hidden
                        backend={pipeline.backends}
                        value={pipeline.name}
                        key={pipeline.name}
                      >
                        {pipeline.name}
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
              <p className="text-lg text-white font-bold">
                <span className="px-3 py-2 border-x border-t rounded border-sigma-blue">
                  <i
                    id="rule-share-btn"
                    className="fas fa-share-nodes px-1 py-0 my-0 text-sm text-sigma-blue cursor-pointer"
                  ></i>
                </span>
                <span
                  id="tab-rule"
                  className="px-3 py-2 ml-1 border-x border-t rounded border-sigma-blue bg-sigma-blue text-sigma-dark cursor-pointer file-tab"
                >
                  rule.yml
                </span>
                <span
                  id="tab-pipeline"
                  className="px-3 py-2 ml-1 border-x border-t rounded border-sigma-blue cursor-pointer file-tab"
                >
                  pipeline.yml
                </span>
              </p>
              <pre
                onclick="focusSelect('rule-code')"
                className="border border-sigma-blue tab-code"
              >
                <code id="rule-code" className="language-yaml text-sm">
                  {sampleRule}
                </code>
              </pre>
              <pre
                onclick="focusSelect('pipeline-code')"
                className="border border-sigma-blue tab-code hidden"
              >
                <code
                  id="pipeline-code"
                  className="language-yaml text-sm"
                ></code>
              </pre>
            </div>

            {/* Output box to show the generated query */}
            <div className="lg:col-span-1 self-start lg:px-2">
              <p className="text-lg text-white font-bold">
                <span className="px-3 py-2 border-x border-t rounded border-sigma-blue">
                  <i
                    id="query-copy-btn"
                    className="fas fa-copy px-1 py-0 my-0 text-sm text-sigma-blue cursor-pointer"
                  ></i>
                  Query
                </span>
              </p>
              <pre className="border border-sigma-blue">
                <code id="query-code" className="language-splunk-spl text-sm">
                  the generated query should be displayed here :)
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
