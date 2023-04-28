import React, { useState } from "react";
import Header from "components/Header";
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
  LinearProgress
} from "@mui/material";
import { useGetProductsQuery } from "state/api";

function Products(props) {
  const { data, isLoading } = useGetProductsQuery();
  const theme = useTheme();

  console.log(data, isLoading);
  return (
    isLoading ? (      
        <LinearProgress color="inherit" />
    ) : (
      <Box>
        <Header title="PRODUCTS" subtitle="List of Products" />
      </Box>
    )
    
  );
}

export default Products;
