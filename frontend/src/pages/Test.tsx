import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";
import { CDBContainer } from "cdbreact";

interface LineChartData extends ChartData<"line"> {}

const Test: React.FC = () => {
  const [data] = useState<LineChartData>({
    labels: [
      "Eating",
      "Drinking",
      "Sleeping",
      "Designing",
      "Coding",
      "Cycling",
      "Running",
    ],
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgba(194, 116, 161, 0.5)",
        borderColor: "rgb(194, 116, 161)",
        data: [65, 59, 90, 81, 56, 55, 40],
      },
      {
        label: "My Second dataset",
        backgroundColor: "rgba(71, 225, 167, 0.5)",
        borderColor: "rgb(71, 225, 167)",
        data: [28, 48, 40, 19, 96, 27, 100],
      },
    ],
  });

  const options: ChartOptions<"line"> = {
    responsive: true,
  };

  // Use useEffect to perform cleanup
  useEffect(() => {
    return () => {
      // Destroy all charts to clean up and avoid the canvas reuse error
      if (Chart.instances.length > 0) {
        Chart.instances.forEach((chart) => chart.destroy());
      }
    };
  }, []);

  return (
    <CDBContainer>
      <h3 className="mt-5">Line chart</h3>
      <Line data={data} options={options} />
    </CDBContainer>
  );
};

export default Test;
