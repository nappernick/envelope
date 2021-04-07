import React, { useEffect, useState } from 'react';
import { Group } from '@visx/group';
import { ViolinPlot, BoxPlot } from '@vx/stats';
import { LinearGradient } from '@vx/gradient';
import { scaleBand, scaleLinear } from '@vx/scale';
import { useTooltip, Tooltip, defaultStyles as defaultTooltipStyles } from '@vx/tooltip';
// import { WithTooltipProvidedProps } from '@vx/tooltip/lib/enhancers/withTooltip';
import { PatternLines } from '@vx/pattern';
import { useParams } from 'react-router-dom';
import AutoSizer from "react-virtualized-auto-sizer";

function ByEnum({ statsField = "duration", h, w }) {
    let { projectId, statsString } = useParams()
    const [dataSetId, setDataSetId] = useState(0)
    const [dataByEnum, setDataByEnum] = useState([])

    const {
        tooltipData,
        tooltipLeft,
        tooltipTop,
        tooltipOpen,
        showTooltip,
        hideTooltip,
    } = useTooltip();

    useEffect(() => {
        const fetchDataSetId = async () => {
            let res = await fetch(`/api/projects/${projectId}`)
            let resJson = await res.json()
            if (resJson.data_set_id) setDataSetId(resJson.data_set_id)
        }
        fetchDataSetId()
    }, [projectId])

    useEffect(() => {
        if (!dataSetId) return
        const fetchStatsData = async () => {
            let res = await fetch(`/api/data/${dataSetId}/projects/${projectId}/violinplot/${statsString ? statsString : statsField}/by-enumerator`)
            let resJson = await res.json()
            setDataByEnum(resJson)
        }
        fetchStatsData()
    }, [dataSetId, projectId, statsField, statsString])
    // console.log(dataByEnum)
    return (
        <div className="text" style={{ "height": "85vh", "width": "95%" }} >
            <AutoSizer>
                {({ height, width }) => {
                    const xMax = width;
                    const yMax = height - 120;

                    const values = dataByEnum.length ? dataByEnum.reduce((allValues, { data_for_box_plot }) => {
                        allValues.push(data_for_box_plot.min, data_for_box_plot.max);
                        return allValues;
                    }, []) : []
                    const minYValue = Math.min(...values);
                    const maxYValue = Math.max(...values);

                    const yScale = scaleLinear({
                        range: [yMax, 10],
                        round: true,
                        domain: [minYValue, maxYValue],
                    });

                    const xScale = scaleBand({
                        range: [0, xMax],
                        round: true,
                        domain: dataByEnum.map(el => el.enumerator),
                        padding: 0.4,
                    });

                    const boxWidth = xScale.bandwidth();
                    const constrainedWidth = Math.max(40, boxWidth)
                    return (
                        <div style={{ position: 'relative' }}>
                            <svg width={width} height={height}>
                                <LinearGradient id="statsplot" to="#19babe" from="#FBB430" />
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
                                <Group left={0} top={40} >
                                    {dataByEnum && dataByEnum.length && dataByEnum.map((datum, i) => {

                                        const violinPlotData = datum.data_for_violin_plot.sort((a, b) => b.value - a.value)
                                        const boxPlotData = datum.data_for_box_plot
                                        return (
                                            <g key={i}>
                                                <ViolinPlot
                                                    data={violinPlotData}
                                                    stroke="#dee2e6"
                                                    left={xScale(boxPlotData.enumerator)}
                                                    width={constrainedWidth}
                                                    valueScale={yScale}
                                                    fill="url(#hViolinLines)"
                                                    top={50}
                                                />
                                                <BoxPlot
                                                    min={boxPlotData.min}
                                                    max={boxPlotData.max}
                                                    left={xScale(boxPlotData.enumerator) + 0.3 * constrainedWidth}
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
                                                    minProps={{
                                                        onMouseOver: () => {
                                                            showTooltip({
                                                                tooltipTop: yScale(boxPlotData.min) ?? 0 + 40,
                                                                tooltipLeft: xScale(boxPlotData.enumerator) + constrainedWidth + 5,
                                                                tooltipData: {
                                                                    "min": boxPlotData.min,
                                                                    "name": boxPlotData.enumerator,
                                                                },
                                                            });
                                                        },
                                                        onMouseLeave: () => {
                                                            hideTooltip();
                                                        },
                                                    }}
                                                    maxProps={{
                                                        onMouseOver: () => {
                                                            showTooltip({
                                                                tooltipTop: yScale(boxPlotData.max) ?? 0 + 40,
                                                                tooltipLeft: xScale(boxPlotData.enumerator) + constrainedWidth + 5,
                                                                tooltipData: {
                                                                    "max": boxPlotData.max,
                                                                    "name": boxPlotData.enumerator,
                                                                },
                                                            });
                                                        },
                                                        onMouseLeave: () => {
                                                            hideTooltip();
                                                        },
                                                    }}
                                                    boxProps={{
                                                        onMouseOver: () => {
                                                            showTooltip({
                                                                tooltipTop: yScale(boxPlotData.median) ?? 0 + 40,
                                                                tooltipLeft: xScale(boxPlotData.enumerator) + constrainedWidth + 5,
                                                                tooltipData: {
                                                                    ...boxPlotData,
                                                                    "name": boxPlotData.enumerator,
                                                                },
                                                            });
                                                        },
                                                        onMouseLeave: () => {
                                                            hideTooltip();
                                                        },
                                                    }}
                                                    medianProps={{
                                                        style: {
                                                            stroke: 'white',
                                                        },
                                                        onMouseOver: () => {
                                                            showTooltip({
                                                                tooltipTop: yScale(boxPlotData.median) ?? 0 + 40,
                                                                tooltipLeft: xScale(boxPlotData.median) + constrainedWidth + 5,
                                                                tooltipData: {
                                                                    "median": boxPlotData.median,
                                                                    "name": boxPlotData.enumerator,
                                                                },
                                                            });
                                                        },
                                                        onMouseLeave: () => {
                                                            hideTooltip();
                                                        },
                                                    }}
                                                />
                                            </g>
                                        )
                                    })}
                                </Group>
                            </svg>
                            {tooltipOpen && tooltipData && (
                                <Tooltip
                                    top={tooltipTop}
                                    left={tooltipLeft}
                                    style={{ ...defaultTooltipStyles, backgroundColor: '#283238', color: 'white' }}
                                >
                                    <div>
                                        <strong>{tooltipData.name}</strong>
                                    </div>
                                    <div style={{ marginTop: '5px', fontSize: '12px' }}>
                                        {() => {
                                            return console.log(tooltipData)
                                        }}
                                        {tooltipData.max && <div>max: {tooltipData.max}</div>}
                                        {tooltipData.thirdQuartile && <div>third quartile: {tooltipData.thirdQuartile}</div>}
                                        {tooltipData.median && <div>median: {tooltipData.median}</div>}
                                        {tooltipData.firstQuartile && <div>first quartile: {tooltipData.firstQuartile}</div>}
                                        {tooltipData.min && <div>min: {tooltipData.min}</div>}
                                    </div>
                                </Tooltip>
                            )}
                        </div>
                    )
                }}
            </AutoSizer>
        </div>
    )
}

export default ByEnum
