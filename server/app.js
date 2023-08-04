const express = require('express');
const app = express();
const products_export = require('./products_export');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');

app.use(cors({
    origin: '*'
}))

// если хотим деплоить приложение, то предварительно можно запустить в папке client команду npm run build и следующая строчка позволит считывать статичные файлы и не запускать react
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/products', function (req, res) {
  // если не считываем файл, то можно поступить просто получив импортируемые данные из файла
  res.status(200).json({products: products_export()})
  // в случае чтения файла 
//   const results = [];
// fs.createReadStream('./products.csv')
//   .pipe(csv())
//   .on('data', (data) => results.push(data))
//   .on('end', () => {
//     console.log(results);
//     // здесь может понадобиться проверка типа данных у product перед отправкой, в зависимости от версии csv-parser
//     res.status(200).json({products: results})
//   });

})

app.listen(3001, console.log('Сервер успешно запущен на порту 3001'));