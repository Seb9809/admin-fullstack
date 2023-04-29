import React, { useState, useMemo } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { ResponsiveLine } from "@nivo/line";
import { useGetSalesQuery } from "../../state/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Define the Daily component
const Daily = () => {
  const [startDate, setStartDate] = useState(new Date("2021-02-01")); // Define a startDate state variable initialized to February 1, 2021
  const [endDate, setEndDate] = useState(new Date("2023-03-01")); // Define an endDate state variable initialized to March 1, 2023
  const { data } = useGetSalesQuery(); // Call the useGetSalesQuery hook and extract the data object
  const theme = useTheme(); // Initializing the theme variable using the useTheme hook

  const [formattedData] = useMemo(() => {
    // Define a memoized callback function that formats the sales data for display

    if (!data) return []; // If there's no data, return an empty array

    const { dailyData } = data; // Extract the dailyData object from the data object

    const totalSalesLine = {
      // Define an object representing the line for total sales

      id: "totalSales", // Set the ID to "totalSales"

      color: theme.palette.secondary.main, // Set the color to the secondary main color from the theme

      data: [], // Initialize an empty array for the data points
    };
    const totalUnitsLine = {
      id: "totalUnits",
      color: theme.palette.secondary[600],
      data: [],
    };

    Object.values(dailyData).forEach(({ date, totalSales, totalUnits }) => {
      // Loop through the dailyData object, extracting the date, totalSales, and totalUnits values for each object

      const dateFormatted = new Date(date); // Convert the date string to a Date object

      if (dateFormatted >= startDate && dateFormatted <= endDate) {
        // If the date is within the selected date range

        const splitDate = date.substring(date.indexOf("-") + 1); // Extract the month and day from the date string

        totalSalesLine.data = [
          // Add a new data point to the total sales line

          ...totalSalesLine.data, // Copy the existing data points

          { x: splitDate, y: totalSales }, // Add a new data point with the formatted date and total sales
        ];
        totalUnitsLine.data = [
          ...totalUnitsLine.data,
          { x: splitDate, y: totalUnits },
        ];
      }
    });

    // Declare a variable called formattedData and set it equal to an array that contains two objects representing lines on a chart
    const formattedData = [totalSalesLine, totalUnitsLine];

    return [formattedData]; // The useMemo hook caches the formattedData array and only recalculates it if its dependencies (data, startDate, endDate) change
  }, [data, startDate, endDate]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="DAILY SALES" subtitle="Chart of daily sales" />
      <Box height="75vh">
        <Box display="flex" justifyContent="flex-end">
          <Box>
            {/* rendering a date picker interface with two date picker components that are used to select a start date and an end date.  */}
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          </Box>
          <Box>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </Box>
        </Box>

        {data ? (
          /* The ResponsiveLine component from the nivo library is rendered with various props */
          <ResponsiveLine
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
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
};

export default Daily;
