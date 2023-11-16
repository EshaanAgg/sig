import { useState, useEffect } from "react";

export const useOptionsData = () => {
  const [loading, setLoading] = useState(true);
  const [optionData, setOptionData] = useState({});

  useEffect(() => {
    const fetchOptionsData = async () => {
      try {
        const response = await fetch("http://localhost:8000/options");
        const data = await response.json();
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
