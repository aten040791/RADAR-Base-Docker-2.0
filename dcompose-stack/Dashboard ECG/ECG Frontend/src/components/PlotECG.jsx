import Plot from 'react-plotly.js';

const PlotECGDiagram = ({timeArray, amplitudeArray}) => {
    return (
        <Plot
        data={[
            {
                x: timeArray,
                y: amplitudeArray,
                mode: 'lines',
                line: { color: 'blue' },
            },
        ]}
        layout={{
            title: 'ECG Signal',
            xaxis: {
                title: 'Time (s)',
                rangeslider: { visible: true },  // Enable the range slider
                rangeselector: {               // Add range selector buttons
                    buttons: [
                        {
                            count: 1,
                            label: '1s',
                            step: 'second',
                            stepmode: 'backward',
                        },
                        {
                            count: 10,
                            label: '10s',
                            step: 'second',
                            stepmode: 'backward',
                        },
                        { step: 'all', label: 'All' },
                    ],
                },
            },
            yaxis: {
                title: 'Amplitude (mV)',
                fixedrange: false,  // Allow zooming on the Y-axis
            },
            autosize: true,
        }}
        config={{ responsive: true }}
        style={{ width: "100%", height: "850px" }}
        />
    )
}

export default PlotECGDiagram