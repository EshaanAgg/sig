import { useState, useEffect } from "react";

export const useOptionsData = () => {
  const [loading, setLoading] = useState(true);
  const [optionData, setOptionData] = useState({});

  useEffect(() => {
    const fetchOptionsData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/options`
        );
        const data = await response.json();

        // Sort the arrays in the alphabetical order
        data.backends.sort();
        data.pipelines.sort();

        setOptionData(data);
      } catch (error) {
        console.error("Error fetching options data:", error);
      }
      setLoading(false);
    };

    setLoading(true);
    fetchOptionsData();
  }, []);

  return [loading, optionData];
};
