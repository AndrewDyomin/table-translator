const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  art: {
    type: String,
    required: [true, "Article is required"],
  },
  parentArt: {
    type: String,
    default: '',
  },
  name: {
    GB: {
      type: String,
      default: "",
    },
    RU: {
      type: String,
      default: "",
    },
    UA: {
      type: String,
      default: "",
    },
  },
  description: {
    GB: {
      type: String,
      default: '',
    },
    RU: {
      type: String,
      default: '',
    },
    UA: {
      type: String,
      default: '',
    },
  },
  shortDescription: {
    GB: {
      type: String,
      default: '',
    },
    RU: {
      type: String,
      default: '',
    },
    UA: {
      type: String,
      default: '',
    },
  },
  brand: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    default: '',
  },
  subCategory: {
    type: String,
    default: '',
  },
  price: {
    UAH: {
      type: Number,
      default: 0,
    },
    EUR: {
      type: Number,
      default: 0,
    },
  },
  oldPrice: {
    UAH: {
      type: Number,
      default: 0,
    },
    EUR: {
      type: Number,
      default: 0,
    },
  },
  images: {
    type: Array,
    default: [''],
  },
  color: {
    type: String,
    default: '',
  },
  htmlTitle: {
    RU: {
      type: String,
      default: '',
    },
    UA: {
      type: String,
      default: '',
    },
  },
  metaKeywords: {
    RU: {
      type: String,
      default: '',
    },
    UA: {
      type: String,
      default: '',
    },
  },
  metaDescription: {
    RU: {
      type: String,
      default: '',
    },
    UA: {
      type: String,
      default: '',
    },
  },
});

module.exports = mongoose.model("Item", itemSchema);
