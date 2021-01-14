import React, { useEffect, useState } from 'react';
import { ViolinPlot, BoxPlot } from '@vx/stats';
import { LinearGradient } from '@vx/gradient';
import { scaleBand, scaleLinear } from '@vx/scale';
import { withTooltip, Tooltip, defaultStyles as defaultTooltipStyles } from '@vx/tooltip';
import { WithTooltipProvidedProps } from '@vx/tooltip/lib/enhancers/withTooltip';
import { PatternLines } from '@vx/pattern';
import { useParams } from 'react-router-dom';

function Violinplot() {
    let params = useParams()
    let { userId, projectId, statsString } = useParams()
    const [dataSetId, setDataSetId] = useState(0)
    const [boxPlotData, setBoxPlotData] = useState([])
    const [violinPlotData, setViolinPlotData] = useState()

    const width = 500
    const height = 500

    const xMax = width;
    const yMax = height - 30;
    const minYValue = boxPlotData ? boxPlotData.min : null
    const maxYValue = boxPlotData ? boxPlotData.max : null

    const yScale = scaleLinear({
        range: [yMax, 40],
        round: true,
        domain: [minYValue, maxYValue],
    });

    const xScale = scaleBand({
        range: [0, xMax],
        round: true,
        domain: ["Test 1"],
        padding: 0.4,
    });

    const boxWidth = xScale.bandwidth();
    const constrainedWidth = Math.max(40, boxWidth);

    useEffect(() => {
        const fetchDataSetId = async () => {
            let res = await fetch(`/api/projects/${projectId}`)
            let resJson = await res.json()
            if (resJson.data_set_id) setDataSetId(resJson.data_set_id)
        }
        fetchDataSetId()
    }, [])

    useEffect(() => {
        if (!dataSetId) return
        const fetchStatsData = async () => {
            let res = await fetch(`/api/data/${dataSetId}/violinplot/${statsString}`)
            let resJson = await res.json()
            if (resJson.data_for_box_plot) setBoxPlotData(resJson.data_for_box_plot)
            // array.sort(a,b => a.value - b.value)
            if (resJson.data_for_violin_plot) {
                let sortArr = resJson.data_for_violin_plot.sort((a, b) => b.value - a.value)
                setViolinPlotData(sortArr)
            }
        }
        fetchStatsData()
    }, [dataSetId])

    // console.log("BOX PLOT DATA: ", boxPlotData)
    // console.log("VIOLIN FETCH: ", `/api/data/${dataSetId}/violinplot/${statsString}`)
    console.log("VIOLIN PLOT DATA: ", violinPlotData)

    return (
        <div style={{ position: 'relative' }}>
            <svg width={width} height={height}>
                <LinearGradient id="statsplot" to="#8b6ce7" from="#87f2d4" />
                <rect x={0} y={0} width={width} height={height} fill="url(#statsplot)" rx={14} />
                <PatternLines
                    id="hViolinLines"
                    height={3}
                    width={3}
                    stroke="#ced4da"
                    strokeWidth={1}
                    // fill="rgba(0,0,0,0.3)"
                    orientation={['horizontal']}
                />
                {violinPlotData && violinPlotData.length && <ViolinPlot
                    data={violinPlotData}
                    stroke="#dee2e6"
                    left={xScale("Test 1")}
                    width={constrainedWidth}
                    valueScale={yScale}
                    fill="url(#hViolinLines)"
                    top={50}
                />}
                {boxPlotData && <BoxPlot
                    min={boxPlotData.min}
                    max={boxPlotData.max}
                    left={xScale("Test 1") + 0.3 * constrainedWidth}
                    firstQuartile={boxPlotData.first_quartile}
                    thirdQuartile={boxPlotData.third_quartile}
                    median={boxPlotData.median}
                    boxWidth={constrainedWidth * 0.4}
                    fill="#FFFFFF"
                    fillOpacity={0.3}
                    stroke="#FFFFFF"
                    strokeWidth={2}
                    valueScale={yScale}
                    outliers={boxPlotData.outliers}
                    top={10000000}
                />}
            </svg>

        </div>
    )
}

export default Violinplot
