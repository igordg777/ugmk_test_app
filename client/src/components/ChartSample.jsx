import React, {useState, useContext} from 'react';
import { Column } from '@ant-design/plots';
import { useNavigate } from 'react-router-dom';
import FabricContext from '../context';

const ChartSample = (props) => {
  const [redirectToPie, setRedirectToPie] = useState(null);
  const state = useContext(FabricContext);
  const legendItems = [
    { name: 'Red244', color: '#ff4d4f' },
    
    { name: 'Blue', color: '#1890ff' },
  ];
  const navigate = useNavigate();
    const config = {
        data: props.someProduct.length > 0 ? props.someProduct : [],
        isGroup: true,
        xField: 'month',
        yField: 'sumProduct',
        seriesField: 'name',
        color: ['red', 'blue'], 
        legend: { 
            position: 'bottom',
            flipPage: false
        },
        label: {
            position: 'middle',
            layout: [
                {
                    type: 'interval-adjust-position',
                },
                {
                    type: 'interval-hide-overlap',
                },
                {
                    type: 'adjust-color',
                },
            ],
            
        },
        onReady: (plot) => {
       plot.on('element:click', (args) => {
        const choosMonth = args.data.data.month;
        const factory_id = args.data.data.name;
       const month_number = state.year.findIndex(element => element === choosMonth) + 1;
        setRedirectToPie({ month_number, factory_id});
       })}
    };

    if (redirectToPie) {
        navigate(`/details/${redirectToPie.factory_id}/${redirectToPie.month_number}`);
        state.setPie(redirectToPie)
      }
    return <Column  {...config} />;
};

export default ChartSample;