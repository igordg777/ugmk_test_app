import React, { useContext } from 'react';
import { Pie } from '@ant-design/plots';
import FabricContext from '../context';

const PieChart = () => {
  const state = useContext(FabricContext);
//   ищем параметры строки для того чтобы при необходимости не возвращаться на предудщую страницу выбора значения
const urlSearchParams = new URLSearchParams(window.location.href);
const params = Object.fromEntries(urlSearchParams.entries());
const str = Object.keys(params)[0]
const paramSearch = 'details/';
const resultParams = str.substring(str.indexOf(paramSearch)+paramSearch.length, str.length).split('/'); 
const factory_id = resultParams[0];
const choosMonth = state.year[resultParams[1]-1];
let data = [{ type: 'product1', value: 0 },
{ type: 'product2', value: 0 }]

if(state.allProducts !== null){
    let resultToPieAllProducts = state.allProducts.filter((item) => item.month === choosMonth && item.factory_id === +factory_id);
    data = resultToPieAllProducts.reduce((acc, item) => {
        acc[0].value += item.product1; 
        acc[1].value += item.product2; 
        return acc;
      }, [
        { type: 'Продукт 1', value: 0 },
        { type: 'Продукт 2', value: 0 }
      ]);
   console.log({state, choosMonth, resultToPieAllProducts});
}
 
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
    },
    color: ['orange', 'green',  '#FFAA00'],
    legend: {
      position: 'bottom', // Позиция легенды: 'top', 'bottom', 'left', 'right'
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  return(
    <>
    <h1>Статистика по продукции фабрики {factory_id === '1' ? "А" : "Б" } за {choosMonth} </h1>
    <Pie {...config} />
    </>
  ) ;
};

export default PieChart;