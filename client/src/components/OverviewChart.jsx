import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useGetSalesQuery } from "../state/api";

// This component renders a chart displaying total sales and units by month.

// The chart lines are colored using the theme from MUI.
const OverviewChart = ({ isDashboard = false, view }) => {
  // Importing hooks and utilities from MUI and React-Query
  const theme = useTheme();
  const { data, isLoading } = useGetSalesQuery();

  // useMemo is used to memoize the totalSalesLine and totalUnitsLine data.
  const [totalSalesLine, totalUnitsLine] = useMemo(() => {
    // If there is no data yet, return empty arrays
    if (!data) return [];

    // Destructure the monthlyData object from the API response
    const { monthlyData } = data;

    // Create a line for total sales
    const totalSalesLine = {
      id: "totalSales",
      color: theme.palette.secondary.main,
      data: [],
    };

    // Create a line for total units
    const totalUnitsLine = {
      id: "totalUnits",
      color: theme.palette.secondary[600],
      data: [],
    };

    // Iterate over the monthlyData object to generate the data for each line
    Object.values(monthlyData).reduce(
      (acc, { month, totalSales, totalUnits }) => {
        // Calculate the cumulative sales and units so far
        const curSales = acc.sales + totalSales;
        const curUnits = acc.units + totalUnits;

        // Add the current month's data point to each line's data array
        totalSalesLine.data = [
          ...totalSalesLine.data,
          { x: month, y: curSales },
        ];
        totalUnitsLine.data = [
          ...totalUnitsLine.data,
          { x: month, y: curUnits },
        ];

        // Return an object with the updated sales and units totals
        return { sales: curSales, units: curUnits };
      },
      // Set the initial sales and units totals to 0
      { sales: 0, units: 0 }
    );

    // Return the totalSalesLine and totalUnitsLine arrays as the result of the memoized function
    return [[totalSalesLine], [totalUnitsLine]];
    // Memoize the data object so that this function only re-runs when the data object changes
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  // If the data is still loading, display a "Loading..." message.
  if (!data || isLoading) return "Loading...";

  return (
    //The ResponsiveLine component from the nivo library is rendered with various props
    <ResponsiveLine
      data={view === "sales" ? totalSalesLine : totalUnitsLine}
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
      margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
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
      enableArea={isDashboard}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: (v) => {
          if (isDashboard) return v.slice(0, 3);
          return v;
        },
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? "" : "Month",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard
          ? ""
          : `Total ${view === "sales" ? "Revenue" : "Units"} for Year`,
        legendOffset: -60,
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
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 30,
                translateY: -40,
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
            ]
          : undefined
      }
    />
  );
};

export default OverviewChart;
