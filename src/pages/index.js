import React from "react";
import Head from "next/head";
import { ScatteredChart4 } from "../components/charts/scattered4";

export default function Index() {
  return (
    <div>
      <Head>
        <title>Scatter connected chart</title>
        <meta name="description" content="scattered connected chart using d3" />
      </Head>
      <h2>Index Page</h2>
      <ScatteredChart4 />
    </div>
  );
}
