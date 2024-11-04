require('dotenv').config();
const path= require('path');
const fs = require('fs');
const {Telegraf} = require('telegraf');
const Markup = require('telegraf/markup');

const currentDirImage = path.join(__dirname, './files/');

const bot = new Telegraf(process.env.BOT_TWO_TOKEN, {});

bot.start((ctx) => {
  ctx.reply('Привет! Я Маруся бот. Для показа меню напишите /menu')
})

bot.help((ctx) => {
  ctx.reply('Отправьте /start для приветствия');
  ctx.reply('Отправьте /menu для показа меню');
});

bot.command('menu', (ctx) => {
  ctx.reply(
    'Выберите действие',
    Markup.inlineKeyboard([
      Markup.button.callback('Получить тестовое сообщение', 'getfile'),
    ])
  );
});

const sendLocalFileWithTimeout = (ctx, time) => {

  // read and send full json file
  
  const datanew = fs.readFileSync(`${currentDirImage}test.json`, 'utf-8');
  const jsonFromDataNew = JSON.parse(datanew);

  Object.values(jsonFromDataNew).forEach((item) => {
    const markdownnew = `
    title: *${item.title}*\ndescription: _${item.description}_
    `;
    ctx.reply(markdownnew, { parse_mode: 'Markdown' });
  });

  // read and send small part json file

  /*
  let titleone = null;
  let titletwo = null;
  let descriptionone = null;
  let descriptiontwo = null;
  let titleall = null;

  const readJsonLocal = async() => {
    const data = fs.readFileSync(`${currentDirImage}test.json`, 'utf-8');
    const jsonFromData = JSON.parse(data);
    
    titleall = jsonFromData.title;
    titleone = jsonFromData[0].title;
    titletwo = jsonFromData[1].title;
    descriptionone = jsonFromData[0].description;
    descriptiontwo = jsonFromData[1].description;
  }

  const prom = new Promise((resolve, reject) => {
    resolve("done promise!")
  });

  prom.then(() => {
    readJsonLocal()
    .then(() =>{
      const markdownnew = `
      title: *${titleall}*\ndescription: _${descriptionone}_
      `;
        ctx.reply(markdownnew, { parse_mode: 'Markdown' });
    })
  });
  */

  setTimeout(() => {
    ctx.reply(
      'Выберите действие',
      Markup.inlineKeyboard([
        Markup.button.callback('Получить тестовое сообщение', 'getfile')
      ])
    );
  }, time)
}

bot.on('callback_query', async(ctx) => {
  if (ctx.callbackQuery.data === 'getfile') {
    try {
      sendLocalFileWithTimeout(ctx, 150);
    } catch (error) {
      console.log('Ошибка получения файла =>', error)
    }
  }
});

bot.launch();
