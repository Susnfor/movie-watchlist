import mongoose from "mongoose";

const WatchListItemSchema = new mongoose.Schema(
  {
    userId: String,
    movieId: String,
    title: String,
    posterPath: String,
    year:Number
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.WatchlistItem || mongoose.model('WatchlistItem', WatchlistItemSchema);