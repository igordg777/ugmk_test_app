# Используем базовый образ Node.js v16
FROM node:16

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем файлы приложения
COPY . .

# Открываем порты для сервера и клиента
EXPOSE 3000
EXPOSE 3001

# Запускаем команду для запуска приложения
CMD ["npm", "run", "start"]