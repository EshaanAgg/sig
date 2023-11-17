import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Editor from "@monaco-editor/react";

import { useFileContext } from "../context/FileContext";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0.5 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function RuleContent() {
  const [value, setValue] = React.useState(0);

  const { ruleData, setRuleData, pipelineData, setPipelaneData } =
    useFileContext();

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          aria-label="rules-content-tab"
        >
          <Tab
            label="rule.yml"
            sx={{ textTransform: "none" }}
            {...a11yProps(0)}
          />
          <Tab
            label="pipeline.yml"
            sx={{ textTransform: "none" }}
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>

      {/* Panel for rule.yml */}
      <CustomTabPanel value={value} index={0}>
        <Editor
          height="500px"
          language="yaml"
          value={ruleData}
          theme="vs-dark"
          onChange={(e) => {
            setRuleData(e.target.value);
          }}
          options={{
            inlineSuggest: true,
            fontSize: "12px",
            formatOnType: true,
            autoClosingBrackets: true,
          }}
        />
      </CustomTabPanel>

      {/* Panel for pipeline.yml */}
      <CustomTabPanel value={value} index={1}>
        <Editor
          height="500px"
          language="yaml"
          value={pipelineData}
          theme="vs-dark"
          onChange={(e) => {
            setPipelaneData(e.target.value);
          }}
          options={{
            inlineSuggest: true,
            fontSize: "12px",
            formatOnType: true,
            autoClosingBrackets: true,
          }}
        />
      </CustomTabPanel>
    </Box>
  );
}
