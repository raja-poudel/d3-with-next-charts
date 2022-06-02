import React from "react";
import Head from "next/head";
import { ScatteredChart } from '../components/charts/scattered';

export default function Index() {
  return (
    <div>
      <Head>
        <title>Scatter connected chart</title>
        <meta name="description" content="scattered connected chart using d3" />
      </Head>
      <h2>Index Page</h2>
      <ScatteredChart />
    </div>
  );
}
