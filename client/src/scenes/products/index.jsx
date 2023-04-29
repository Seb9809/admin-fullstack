import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "../../components/Header.jsx";
import { useGetProductsQuery } from "../../state/api.js";
import { useState } from "react";

const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
}) => {
  const theme = useTheme(); // Use Material-UI's useTheme hook to get the theme object
  const [isExpanded, setIsExpanded] = useState(false); // Use React's useState hook to create a state variable and its setter function

  return (
    <Card
      sx={{
        // Style the card using Material-UI's sx prop
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />{" "}
        {/*  Render the rating as read-only */}
        {/*  Render the  product description */}
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{ color: theme.palette.neutral[300] }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography> {/* Render the product id */}
          <Typography>Supply Left: {supply}</Typography>{" "}
          {/* Render the supply   left */}
          <Typography>
            Yearly Sales This Year: {stat.yearlySalesTotal}
          </Typography>
          {/* Render the yearly sales total */}
          <Typography>
            Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
          </Typography>
          {/* Render the yearly total sold units */}
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = () => {
  // Fetch the products data from the API
  const { data, isLoading } = useGetProductsQuery();

  // Check if the screen size is greater than or equal to 1000px
  const isNonMobile = useMediaQuery("(min-width: 1000px");

  return (
    <Box m="1.5rem 2.5rem">
      {/* Render the header component */}
      <Header title="PRODUCTS" subtitle="See your list of Products" />

      {/* If the data has been loaded or is not currently being loaded, render the products */}
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {/* Map over the products data and render the Product component for each */}
          {data.map(
            ({ _id, name, description, price, rating, supply, stat }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                supply={supply}
                stat={stat}
              />
            )
          )}
        </Box>
      ) : (
        // Render a loading message if the data is still being fetched
        <>Loading...</>
      )}
    </Box>
  );
};

export default Products;
