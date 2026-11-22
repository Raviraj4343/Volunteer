import mongoose from "mongoose";
import{
  MISSION_CATEGORIES,MISSION_STATUSES,STUDY_LEVELS
} from "../config/constants.js";

const {schema} = mongoose;

const pointSchema = new schema(
  {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
      default: "Point",
    },

    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function (coordinates) {
          return (
            Array.isArray(coordinates) &&
            coordinates.length === 2 &&
            coordinates.every(Number.isFinite) &&
            coordinates[0] >= -180 &&
            coordinates[0] <= 180 &&
            coordinates[1] >= -90 &&
            coordinates[1] <= 90
          );
        },
        message: "Invalid GeoJSON coordinates. Expected [longitude, latitude].",
      },
    },
  },
  { _id: false }
);