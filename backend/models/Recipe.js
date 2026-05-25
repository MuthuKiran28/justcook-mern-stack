import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    ingredients: [
      {
        type: String,
        required: true,
      },
    ],
    instructions: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      required: true,
    },
    cookingTime: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [
  {
    user: {
      type: String,
      required: true,
    },

    text: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
],

ratings: [
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    value: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
],

averageRating: {
  type: Number,
  default: 0,
},
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
