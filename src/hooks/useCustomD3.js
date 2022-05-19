import React, { useEffect } from 'react';
import * as d3 from 'd3';

export const useCustomD3 = (renderChartFn, dependencies) => {
    const ref = React.useRef();
    useEffect(() => {
        renderChartFn(d3.select(ref.current));
    }, [dependencies]);
    return ref;
}