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

const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stats
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  // console.log("Is Working",stats);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius:"0.55rem"
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14}} color={theme.palette.secondary[700]} gutterBottom>
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{mb: "1.5rem"}} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly/>
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
        sx={{
          color: theme.palette.neutral[300]
        }}
      >
        <CardContent>
          <Typography>_id : {_id}</Typography>
          <Typography>Supply Left : {supply}</Typography>
          <Typography>Yearly Sales this Year : {stats[0].yearlySalesTotal}</Typography>
          <Typography>Yearly Units Sold this Year : {stats[0].yearlyTotalSoldUnits}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
};

function Products(props) {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  // const theme = useTheme();

  // console.log(data, isLoading);
  return (
    isLoading ? (      
        <LinearProgress color="inherit" />
    ) : (
      <Box m="1.5rem 2.5rem">
        <Header title="PRODUCTS" subtitle="List of Products" />
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4,minmax(0,1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{"& > div" : {gridColumn : isNonMobile ? undefined : "span 4"}}}
        >
          {data.map(({
            _id,
            name,
            description,
            price,
            rating,
            category,
            supply,
            stats
          }) => 
            <Product 
              key={_id}
              _id={_id}
              name={name}
              description={description}
              price={price}
              rating={rating}
              category={category}
              supply={supply}
              stats={stats}
            />
          )}
        </Box>
      </Box>
    )
    
  );
}

export default Products;
