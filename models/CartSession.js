import mongoose from 'mongoose'

const CartSessionSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
    index: true
  },
  userId: {
    type: String,
    index: true
  },
  sessionId: {
    type: String,
    index: true
  },
  items: [{
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    nameHindi: String,
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    type: String,
    packageId: String
  }],
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    index: { expireAfterSeconds: 0 }
  }
}, {
  timestamps: true
})

// Compound index for efficient queries
CartSessionSchema.index({ userEmail: 1, lastUpdated: -1 })
CartSessionSchema.index({ sessionId: 1, lastUpdated: -1 })

export default mongoose.models.CartSession || mongoose.model('CartSession', CartSessionSchema)