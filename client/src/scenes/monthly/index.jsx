import React, { useMemo } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { ResponsiveLine } from "@nivo/line";
import { useGetSalesQuery } from "../../state/api";

const Monthly = () => {
  const { data } = useGetSalesQuery(); // Call the useGetSalesQuery hook and extract the data object
  const theme = useTheme(); // Initializing the theme variable using the useTheme hook

  const [formattedData] = useMemo(() => {
    // Define a memoized callback function that formats the sales data for display

    if (!data) return []; // If there's no data, return an empty array

    const { monthlyData } = data; // Extract the monthlyData object from the data object

    const totalSalesLine = {
      // Define an object representing the line for total sales

      id: "totalSales", // Set the ID to "totalSales"

      color: theme.palette.secondary.main,

      data: [], // Initialize an empty array for the data points
    };
    const totalUnitsLine = {
      id: "totalUnits",
      color: theme.palette.secondary[600],
      data: [],
    };

    Object.values(monthlyData).forEach(({ month, totalSales, totalUnits }) => {
      // Loop through the monthlyData object, extracting the month, totalSales, and totalUnits values for each object

      totalSalesLine.data = [
        // Add a new data point to the total sales line

        ...totalSalesLine.data, // Copy the existing data points

        { x: month, y: totalSales }, // Add a new data point with the formatted date and total sales
      ];
      totalUnitsLine.data = [
        ...totalUnitsLine.data,
        { x: month, y: totalUnits },
      ];
    });

    // Declare a variable called formattedData and set it equal to an array that contains two objects representing lines on a chart
    const formattedData = [totalSalesLine, totalUnitsLine];

    return [formattedData]; // The useMemo hook caches the formattedData array and only recalculates it if its dependencies (data, startDate, endDate) change
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="MONTLY SALES" subtitle="Chart of monthly sales" />
      <Box height="75vh">
        {data ? (
          <ResponsiveLine /* The ResponsiveLine component from the nivo library is rendered with various props */
            data={formattedData}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
            colors={{ datum: "color" }}
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            yFormat=" >-.2f"
            curve="catmullRom"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: "Month",
              legendOffset: 60,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Total",
              legendOffset: -50,
              legendPosition: "middle",
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "top-right",
                direction: "column",
                justify: false,
                translateX: 50,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        ) : (
          <>Loading...</> //Otherwise show the Loading... message
        )}
      </Box>
    </Box>
  );
};

export default Monthly;
