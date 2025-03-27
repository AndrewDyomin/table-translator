require("./db");
const xlsx = require("xlsx");
const read = require("./operations/read-excel");
const Item = require("./models/item");

async function addToDb() {
  const workbook = xlsx.readFile(
    "../table-translator/for_import/21.03.2025.xlsx"
  );
  const itemsArray = read(workbook);
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
      console.log(`Added ${newItems} new items.`);
    }
  }
  console.log('addToDb finished =)')
}

async function latinACheck() { 
  const targetArray = await Item.find({ art: { $regex: "А", $options: "i" } }).exec();

  console.log(`We finded ${targetArray.length} targets.`);

  for (const item of targetArray) {
    const newArt = item.art.replace(/А/g, "A");

    await Item.updateOne({ _id: item._id }, { $set: { art: newArt } });
    
    console.log(`Updated ${item._id}: "${item.art}" → "${newArt}"`);
  }

  console.log("Update complited! :)");
}

async function addGermanInfo() {
  const workbook = xlsx.readFile(
    "./for_import/Mirco_Artikel_UA_1.xlsb"
  );
  const itemsArray = read(workbook);
  
  for (const item of itemsArray) {
    const art = item['Артикул'];
    const target = await Item.findOne({ art }).exec()
    console.log(target)
    break
  }
}

// addToDb();
// latinACheck();
addGermanInfo()