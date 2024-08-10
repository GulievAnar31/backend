# Используем базовый образ Node.js
FROM node:20

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN yarn install

# Копируем все остальные файлы приложения
COPY . .

# Компилируем TypeScript в JavaScript
RUN yarn build

# Указываем команду запуска приложения
CMD ["yarn", "start:dev"]

# Указываем порт, который будет слушать приложение
EXPOSE 3000
