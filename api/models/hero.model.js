//Схема героя
const heroSchema = {
  name: "String",
  strength: "Integer",
  dexterity: "Integer",
  intellect: "Integer",
  isInvincible: "Boolean",
};

//Текущее состояние героя
const heroStats = {
  name: "",
  strength: 0,
  dexterity: 0,
  intellect: 0,
  isInvincible: false,
};

const validator = (obj, schema) => {
  const errors = [];

  //Проверка на наличие всех свойств
  const objKeysErr = [];
  Object.keys(schema).forEach((schemaKey) => {
    if (!obj.hasOwnProperty(schemaKey)) {
      objKeysErr.push(schemaKey);
    }
  });
  if (objKeysErr.length > 0)
    errors.push({ error: `${objKeysErr.join(", ")} is required` });

  //Проверка на отсутствие лишних свойств
  const schemaKeysErr = [];
  Object.keys(obj).forEach((objKey) => {
    if (!schema.hasOwnProperty(objKey)) {
      schemaKeysErr.push(objKey);
    }
  });
  if (schemaKeysErr.length > 0)
    errors.push({ error: `${schemaKeysErr.join(", ")} is excess` });

  //Проверка типов
  for (let key in schema) {
    switch (schema[key]) {
      case "String":
        if (typeof obj[key] != "string") {
          errors.push({ error: `${key} must be String` });
        }
        break;
      case "Boolean":
        if (typeof obj[key] != "boolean") {
          errors.push({ error: `${key} must be Boolean` });
        }
        break;
      case "Integer":
        if (!Number.isInteger(obj[key])) {
          errors.push({ error: `${key} must be Integer` });
        }
        break;
    }
  }

  return errors;
};

const Hero = {
  get() {
    return heroStats;
  },
  set(stats, cb) {
    //Валидация характеристик
    const errors = validator(stats, heroSchema);
    if (errors.length > 0) {
      return cb(errors);
    }

    Object.assign(heroStats, stats);
    //Возвращает героя с новыми характеристиками
    cb(null, heroStats);
  },
};

module.exports = Hero;
