import './App.css';
import Chart from './components/Chart';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FabricContext from './context';
import { useState, useEffect } from 'react';
import Pie from './components/Pie'
function App() {

const [pie, setPie] = useState(null);
const [allProducts, setAllProducts] = useState(null);
const year = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];
const [products, setProducts] = useState([]);
const [firstProduct, setFirstProduct] = useState([]);
const [secondProduct, setSecondProduct] = useState([]);
const [thirdProduct, setThirdProduct] = useState([]);

// По запросу на сервер формируем и обрабатываем массивы данных для графиков, добавляем в стейт приложения для удобства использования в разных частях системы. Для создания стейта выбран хук useContext
    useEffect(() => {
        fetch('http://localhost:3001/products')
            .then(res => res.json())
            .then(res => {
                // setProducts(res)
                let data = res.products.filter(item => item.date !== null);

                 let allProducts = [];
                 let firstProduct = {};
                 let secondProduct = {};
                 let thirdProduct = {};
                 let allProductsData = {};

                for (let i = 0; i < year.length; i++) {
                    firstProduct[year[i]] = {};
                    secondProduct[year[i]] = {};
                    thirdProduct[year[i]] = {};
                    allProductsData[year[i]] = {};
                }
                              
                let qualityProducts = 3;
                let namesGroupProduct = [firstProduct, secondProduct, thirdProduct];

                // Формируем массив с объектами данных для графиков. Необходим такой синтаксис
                // {
                //     name: 'London',
                //     month: 'Jan.',
                //     product: 18.9,
                // },

                // распредел
                for (let i = 0; i < data.length; i++) {
                    for (let j = 0; j < qualityProducts; j++) {
                        let productName = 'product' + (j+1);
                        let nameFromGroupProduct = namesGroupProduct[j];
                        if (data[i][productName]) {
                            let month = year.filter(item => {
                                let date = new Date(data[i].date);
                                return year[date.getMonth()] ===  item;
                              })[0];
    
                              if(month){
                                !nameFromGroupProduct[month][data[i].factory_id] ?
                                nameFromGroupProduct[month][data[i].factory_id] = {
                                    name: data[i].factory_id,
                                    month: month,
                                    sumProduct: data[i][productName],
                                } : 
                                nameFromGroupProduct[month][data[i].factory_id].sumProduct += data[i][productName];

                                !allProductsData[month][data[i].factory_id] ?
                                allProductsData[month][data[i].factory_id] = {
                                    name: data[i].factory_id,
                                    month: month,
                                    sumProduct: data[i][productName],
                                } : 
                                allProductsData[month][data[i].factory_id].sumProduct += data[i][productName];
                                data[i].month = month;
                              }
                           
                        } 
                        
                    }
                    
                }

               const resultFirstProduct = Object.values(firstProduct).map(item =>Object.values(item)).flat();
               const resultSecondProduct = Object.values(secondProduct).map(item =>Object.values(item)).flat();
               const resultThirdProduct = Object.values(thirdProduct).map(item =>Object.values(item)).flat();
               const resultAllProductsData = Object.values(allProductsData).map(item =>Object.values(item)).flat();
              allProducts.push([resultFirstProduct, resultSecondProduct, resultThirdProduct, resultAllProductsData].flat());

                setFirstProduct(resultFirstProduct);
                setSecondProduct(resultSecondProduct);
                setThirdProduct(resultThirdProduct);
                setProducts(resultAllProductsData);
                setAllProducts(data);            
            })
    }, [])
  
  const router = createBrowserRouter([
    {
      path: "/details/:id/:name",
      element: <Pie />,
    },
    {
      path: "/",
      element: <Chart />,
    },
  
  ]);

  return (
    <FabricContext.Provider value={{ pie, setPie, allProducts, setAllProducts, year, products, firstProduct, secondProduct, thirdProduct  }}>
      <div className="App">
       <RouterProvider router={router} />
       </div>
    </FabricContext.Provider>
  );
}

export default App;
