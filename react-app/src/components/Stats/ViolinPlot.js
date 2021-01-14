import React from 'react';
import { ViolinPlot, BoxPlot } from '@vx/stats';
import { LinearGradient } from '@vx/gradient';
import { scaleBand, scaleLinear } from '@vx/scale';
import { withTooltip, Tooltip, defaultStyles as defaultTooltipStyles } from '@vx/tooltip';
import { WithTooltipProvidedProps } from '@vx/tooltip/lib/enhancers/withTooltip';
import { PatternLines } from '@vx/pattern';

function Violinplot() {

    const width = 500
    const height = 500

    return (
        <div style={{ position: 'relative' }}>
            <svg width={width} height={height}>
                <rect x={0} y={0} width={width} height={height} fill={<LinearGradient id="statsplot" to="#8b6ce7" from="#87f2d4" />} rx={14} />
            </svg>

        </div>
    )
}

export default Violinplot
