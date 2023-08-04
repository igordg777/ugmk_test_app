import React, { useState, useEffect, useContext } from "react";
import ChartSample from './ChartSample';
import './styles/chartSample.css';
import FabricContext from '../context';

function Chart() {
  const state = useContext(FabricContext);
    const [choosArrProducts, setchoosArrProducts] = useState([]);
    const [selectValue, setSelectValue] = useState("Все продукты");

    useEffect(()=>{
let chooseChart = localStorage.getItem('chooseChart');

chooseChart === null ? setchoosArrProducts(state.products) :  handleChange(chooseChart); 
    }, [state.products])
    
const saveStorage = (chooseChartType) =>{
  localStorage.setItem('chooseChart', chooseChartType);
  setSelectValue(chooseChartType);
}

    const handleChange = (value) => {
        switch(value){
          case "Продукт 1":
            setchoosArrProducts(state.firstProduct);
            saveStorage("Продукт 1");
            break;
          case "Продукт 2":
            setchoosArrProducts(state.secondProduct);
            saveStorage("Продукт 2");
            break;
          case "Продукт 3":
            setchoosArrProducts(state.thirdProduct);
            saveStorage("Продукт 3");
            break;
            case "Все продукты":
            setchoosArrProducts(state.products);
            saveStorage("Все продукты");
            break;
          default:
            break;
        }
      };
    return (
        <>
<div className="chart-container">
  <div className="chart-select">
   <span style={{marginRight: '5px'}}>Фильтр по типу продукции</span>
    <select name="" id="" onChange={(e)=>handleChange(e.target.value)} value={selectValue}>
      <option value="Все продукты" >Все продукты</option>
      <option value="Продукт 1">Продукт 1</option>
      <option value="Продукт 2">Продукт 2</option>
      <option value="Продукт 3">Продукт 3</option>
    </select>
  </div>
  <div className="chart">
    {choosArrProducts.length > 0 &&
    <>
  <ChartSample someProduct={choosArrProducts}/>
  <span className="f-a">&#128997; Фабрика А</span> <span className="f-b">&#128998; Фабрика Б</span>
  </>
    }
  </div>
</div>
        </>
    )
}

export default Chart;