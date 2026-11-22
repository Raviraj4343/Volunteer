import mongoose from "mongoose";
import { USER_ROLES } from "../config/constants.js";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    // Clerk identity
    clerkId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    // Personal information
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },

    avatarUrl: {
      type: String,
      default: null,
    },

    bio: {
      type: String,
      trim: true,
      maxlength: 300,
      default: "",
    },

    city: {
      type: String,
      trim: true,
      default: "",
    },

    // GeoJSON Point
    homeLocation: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        validate: {
          validator: function (coordinates) {
            if (!coordinates || coordinates.length === 0) return true;

            return (
              coordinates.length === 2 &&
              coordinates[0] >= -180 &&
              coordinates[0] <= 180 &&
              coordinates[1] >= -90 &&
              coordinates[1] <= 90
            );
          },
          message: "Invalid GeoJSON coordinates.",
        },
      },
    },

    // Authorization
    role: {
      type: String,
      enum: USER_ROLES,
      default: "user",
    },

    isBanned: {
      type: Boolean,
      default: false,
    },

    // Soft deletion
    deletedAt: {
      type: Date,
      default: null,
    },

    // Users blocked by this user
    blockedUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // User activity statistics
    stats: {
      missionsJoined: {
        type: Number,
        default: 0,
        min: 0,
      },
      missionsCompleted: {
        type: Number,
        default: 0,
        min: 0,
      },
      missionsHosted: {
        type: Number,
        default: 0,
        min: 0,
      },
      hoursContributed: {
        type: Number,
        default: 0,
        min: 0,
      },
      noShows: {
        type: Number,
        default: 0,
        min: 0,
      },
    },

    // Reliability score
    reliability: {
      average: {
        type: Number,
        default: 5,
        min: 1,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
        min: 0,
      },
    },

    // Achievements
    badges: [
      {
        key: {
          type: String,
          required: true,
        },
        label: {
          type: String,
          required: true,
        },
        earnedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // Activity tracking
    lastActiveAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,

    // Transform MongoDB document into API-friendly JSON
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;

        // Never expose private account information by default
        delete ret.email;
        delete ret.clerkId;

        return ret;
      },
    },
  }
);

// Geospatial index for nearby-user searches
userSchema.index(
  { homeLocation: "2dsphere" },
  { sparse: true }
);

export const User = mongoose.model("User", userSchema);
