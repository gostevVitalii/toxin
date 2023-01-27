/* eslint-disable */
'use strict';

// Генератор файлов блока

// Использование: node createBlock.js [имя блока] [доп. расширения через пробел]

const fs = require('fs');

const dir = './src/blocks/';
const pug = './src/blocks/blocks.pug';
const styles = './src/blocks/blocks.scss';
const scripts = './src/blocks/blocks.js';

const mkdirp = require('mkdirp');

const blockName = process.argv[2];
const defaultExtensions = ['scss', 'img']; // расширения по умолчанию
const extensions = uniqueArray(defaultExtensions.concat(process.argv.slice(3)));
const newLineChar = process.platform === 'win32' ? '\r\n' : '\n';

// Если есть имя блока
if (blockName) {
  const dirPath = `${dir}/${blockName}/`; // полный путь к создаваемой папке блока

  const made = mkdirp.sync(dirPath);
  console.log(`[NTH] Создание папки: ${made}`);

  // Обходим массив расширений и создаем файлы, если они еще не созданы
  extensions.forEach((extension) => {
    const filePath = `${dirPath + blockName}.${extension}`; // полный путь к создаваемому файлу
    let fileContent = '';                                   // будущий контент файла
    let fileCreateMsg = '';                                 // будущее сообщение в консоли при создании файла

    if (extension === 'scss') {
      fileContent = `.${blockName} {\n\n  $block-name:                &; // #{$block-name}__element\n}\n`;
      fs.appendFile(styles, `${newLineChar}@import "./${blockName}/${blockName}.scss";`, function (error) {
        if (error) throw error; // если возникла ошибка
      });
    }

    else if (extension === 'js') {
      fileContent = `/* global document */\n\n// import ready from 'Utils/documentReady.js';\n\n// ready(function() {\n//   \n// });\n`;
      fs.appendFile(scripts, `${newLineChar}import './${blockName}/${blockName}'`, function (error) {
        if (error) throw error; // если возникла ошибка
      });
    }

    else if (extension === 'md') {
      fileContent = '';
    }

    else if (extension === 'pug') {
      fileContent = `//- Все примеси в этом файле должны начинаться c имени блока (${blockName})\n\nmixin ${blockName}(text, mods)\n\n  //- Принимает:\n  //-   text    {string} - текст\n  //-   mods    {string} - список модификаторов\n  //- Вызов:\n        +${blockName}('Текст', 'some-mod')\n\n  -\n    // список модификаторов\n    var allMods = '';\n    if(typeof(mods) !== 'undefined' && mods) {\n      var modsList = mods.split(',');\n      for (var i = 0; i < modsList.length; i++) {\n        allMods = allMods + ' ${blockName}--' + modsList[i].trim();\n      }\n    }\n\n  .${blockName}(class=allMods)&attributes(attributes)\n    .${blockName}__inner\n      block\n`;
      fs.appendFile(pug, `${newLineChar}include ./${blockName}/${blockName}.pug`, function (error) {
        if (error) throw error; // если возникла ошибка
      });
    }

    if (fileExist(filePath) === false && extension !== 'img' && extension !== 'md') {
      fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
          return console.log(`[NTH] Файл НЕ создан: ${err}`);
        }
        console.log(`[NTH] Файл создан: ${filePath}`);
        if (fileCreateMsg) {
          console.warn(fileCreateMsg);
        }
      });
    }
    else if (extension !== 'img' && extension !== 'md') {
      console.log(`[NTH] Файл НЕ создан: ${filePath} (уже существует)`);
    }
    else if (extension === 'md') {
      fs.writeFile(`${dirPath}readme.md`, fileContent, (err) => {
        if (err) {
          return console.log(`[NTH] Файл НЕ создан: ${err}`);
        }
        console.log(`[NTH] Файл создан: ${dirPath}readme.md`);
        if (fileCreateMsg) {
          console.warn(fileCreateMsg);
        }
      });
    }
  });
} else {
  console.log('[NTH] Отмена операции: не указан блок');
}



function uniqueArray(arr) {
  const objectTemp = {};
  for (let i = 0; i < arr.length; i++) {
    const str = arr[i];
    objectTemp[str] = true;
  }
  return Object.keys(objectTemp);
}

function fileExist(path) {
  const fs = require('fs');
  try {
    fs.statSync(path);
  } catch (err) {
    return !(err && err.code === 'ENOENT');
  }
}