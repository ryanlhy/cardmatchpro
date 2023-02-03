import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Section from "./Section";

function StatsSection(props) {
  const items = [
    {
      title: "Users",
      stat: "5,456",
    },
    {
      title: "Requests",
      stat: "69,347",
    },
    {
      title: "Transactions",
      stat: "890",
    },
    {
      title: "Reviews",
      stat: "205",
    },
  ];

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <Grid container={true} justifyContent="center" spacing={4}>
          {items.map((item, index) => (
            <Grid item={true} xs={12} sm={3} key={index}>
              <Box textAlign="center">
                <Typography variant="overline">{item.title}</Typography>
                <Typography variant="h4">{item.stat}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export default StatsSection;
