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
    const [boxPlotData, setBoxPlotData] = useState()
    const [violinPlotData, setViolinPlotData] = useState()

    const width = 500
    const height = 500
    const xMax = width;
    const yMax = height - 120;

    useEffect(() => {
        const fetchDataSetId = async () => {
            let res = await fetch(`/api/projects/${projectId}`)
            let resJson = await res.json()
            if (resJson.data_set_id) setDataSetId(resJson.data_set_id)
        }
        fetchDataSetId()
    }, [])

    useEffect(() => {
        const fetchStatsData = async () => {
            let res = await fetch(`/api/data/${dataSetId}/violinplot/${statsString}`)
            let resJson = await res.json()
            if (resJson.data_for_box_plot) setBoxPlotData(resJson.data_for_box_plot)
            if (resJson.data_for_violin_plot) setViolinPlotData(resJson.data_for_violin_plot)
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
            </svg>

        </div>
    )
}

export default Violinplot
