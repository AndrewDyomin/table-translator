require("./db");
const read = require("./operations/read-excel");
const Item = require("./models/item");

async function addToDb() {
  const itemsArray = read();
  let newItems = 0;

  for (const element of itemsArray) {
    let art = element["Артикул"];
    let imagesArray = element["Фото"] ? element["Фото"].split(/;\s*\n?/) : [];

    let item = await Item.findOne({ art });

    if (!item) {
      await Item.create({
        art,
        parentArt: element["Родительский артикул"],
        name: {
          GB: "",
          RU: element["Название(RU)"],
          UA: element["Название(UA)"],
        },
        description: {
          GB: "",
          RU: element["Описание товара(RU)"],
          UA: element["Описание товара(UA)"],
        },
        shortDescription: {
          GB: "",
          RU: element["Короткое описание(RU)"],
          UA: element["Короткое описание(UA)"],
        },
        brand: element["Бренд"],
        category: element["Раздел"],
        subCategory: element["Дополнительные разделы"],
        price: {
          UAH: parseFloat(element["Цена"]) || 0, // Преобразуем в число
          EUR: 0,
        },
        oldPrice: {
          UAH: parseFloat(element["Старая цена"]) || 0, // Преобразуем в число
          EUR: 0,
        },
        images: imagesArray,
        color: element["Цвет"] || null,
        htmlTitle: {
          RU: element["HTML title(RU)"] || "",
          UA: element["HTML title(UA)"] || "",
        },
        metaKeywords: {
          RU: element["META keywords(RU)"] || "",
          UA: element["META keywords(UA)"] || "",
        },
        metaDescription: {
          RU: element["META description(RU)"] || "",
          UA: element["META description(UA)"] || "",
        },
      });
      newItems += 1;
    }
    console.log(`Added ${newItems} new items.`);
  }
}

addToDb();
