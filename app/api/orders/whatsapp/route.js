import { NextResponse } from 'next/server';

// WhatsApp API endpoint to send notifications
export async function POST(request) {
  try {
    const { orderData } = await request.json();
    
    if (!orderData) {
      return NextResponse.json({ error: 'Order data is required' }, { status: 400 });
    }
    
    // Create WhatsApp message for admin
    const adminMessage = createWhatsAppMessage(orderData, true);
    
    // Create WhatsApp message for customer
    const customerMessage = createWhatsAppMessage(orderData, false);
    
    // Send message to admin (91796 77292)
    const adminResponse = await sendWhatsAppMessage('919179677292', adminMessage);
    
    // Send message to customer if phone number is available
    let customerResponse = null;
    if (orderData.customerInfo && orderData.customerInfo.phone) {
      // Format the phone number (remove spaces, add country code if needed)
      let customerPhone = orderData.customerInfo.phone.replace(/\s+/g, '');
      if (!customerPhone.startsWith('91') && customerPhone.length === 10) {
        customerPhone = '91' + customerPhone;
      }
      
      customerResponse = await sendWhatsAppMessage(customerPhone, customerMessage);
    }
    
    return NextResponse.json({ 
      success: true,
      adminResponse,
      customerResponse,
      message: 'WhatsApp notifications sent successfully'
    });
  } catch (error) {
    console.error('Error sending WhatsApp notification:', error);
    return NextResponse.json(
      { error: 'Failed to send WhatsApp notification', details: error.message },
      { status: 500 }
    );
  }
}

// Function to create WhatsApp message
function createWhatsAppMessage(orderData, isAdmin) {
  // Create a formatted message with order details
  let message = isAdmin 
    ? `*नया ऑर्डर प्राप्त हुआ है!* (New Order Received!)\n\n`
    : `*आपका ऑर्डर बुक हो गया है* (Your Order is Confirmed!)\n\n`;
  
  message += `*ऑर्डर ID:* ${orderData.orderId}\n`;
  message += `*दिनांक:* ${orderData.orderDate}\n\n`;
  
  message += `*ग्राहक विवरण (Customer Details):*\n`;
  message += `नाम (Name): ${orderData.customerInfo.name}\n`;
  message += `फोन (Phone): ${orderData.customerInfo.phone}\n`;
  
  if (isAdmin) {
    message += `ईमेल (Email): ${orderData.customerInfo.email}\n`;
    message += `पता (Address): ${orderData.customerInfo.address}\n`;
    if (orderData.customerInfo.deliveryLocation) {
      message += `स्थान (Location): ${orderData.customerInfo.deliveryLocation}\n`;
    }
  }
  
  message += `\n*ऑर्डर विवरण (Order Details):*\n`;
  orderData.items.forEach((item, index) => {
    message += `${index + 1}. ${item.name} x ${item.quantity} - ₹${item.price * item.quantity}\n`;
  });
  
  message += `\n*कुल राशि (Total Amount):* ₹${orderData.total}\n`;
  message += `*भुगतान विधि (Payment Method):* ${orderData.paymentMethod === 'cash' ? 'कैश ऑन डिलीवरी (Cash on Delivery)' : 'ऑनलाइन (Online)'}\n`;
  
  if (!isAdmin) {
    message += `\nधन्यवाद! हम जल्द ही आपसे संपर्क करेंगे।\n`;
    message += `Thank you! We will contact you soon.`;
  }
  
  return message;
}

// Function to send WhatsApp message using WhatsApp Business API
async function sendWhatsAppMessage(phoneNumber, message) {
  // This is a placeholder for the actual WhatsApp API integration
  // In a real implementation, you would use the WhatsApp Business API or a service like Twilio
  
  console.log(`Sending WhatsApp message to ${phoneNumber}:`);
  console.log(message);
  
  // For now, we'll just return a success response
  // In a real implementation, you would make an API call to WhatsApp Business API
  return {
    success: true,
    message: 'WhatsApp message sent (simulated)',
    timestamp: new Date().toISOString()
  };
}