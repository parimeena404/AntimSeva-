import mongoose from 'mongoose';

const OfflineBookingSchema = new mongoose.Schema({
  tokenNumber: {
    type: String,
    required: true,
    unique: true
  },
  shopId: {
    type: String,
    required: true
  },
  shopName: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Allow non-registered users
  },
  customerDetails: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: false
    }
  },
  packageDetails: {
    packageId: String,
    packageName: String,
    items: [String],
    totalPrice: Number
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  preferredCollectionDate: {
    type: Date,
    required: false
  },
  notes: {
    type: String,
    required: false
  },
  repeatBooking: {
    type: Boolean,
    default: false
  },
  originalTokenNumber: {
    type: String,
    required: false // For repeat bookings
  }
}, {
  timestamps: true
});

// Create indexes
OfflineBookingSchema.index({ tokenNumber: 1 });
OfflineBookingSchema.index({ shopId: 1 });
OfflineBookingSchema.index({ userId: 1 });
OfflineBookingSchema.index({ 'customerDetails.email': 1 });

const OfflineBooking = mongoose.models.OfflineBooking || mongoose.model('OfflineBooking', OfflineBookingSchema);

export default OfflineBooking;