import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // tiwarianurag342407@gmail.com
      pass: process.env.SMTP_PASS, // iwah godq nkfe sqqd
    },
  });
};

// Generate order confirmation email HTML
const generateOrderEmailHTML = (orderData) => {
  const { customerInfo, items, total, paymentMethod, orderId, orderDate } = orderData;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation - Antim Seva</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #92400e; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
            .order-details { background-color: white; padding: 15px; border-radius: 8px; margin: 15px 0; }
            .item-row { padding: 10px; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; }
            .item-row:last-child { border-bottom: none; }
            .total-row { font-weight: bold; background-color: #fef3c7; padding: 10px; border-radius: 4px; }
            .footer { text-align: center; padding: 20px; color: #6b7280; }
            .contact-info { background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🙏 Antim Seva - अंतिम सेवा</h1>
                <p>Order Confirmation / ऑर्डर पुष्टि</p>
            </div>
            
            <div class="content">
                <h2>Dear ${customerInfo.name} / प्रिय ${customerInfo.name}</h2>
                <p>Thank you for your order! Your booking has been confirmed. / आपके ऑर्डर के लिए धन्यवाद! आपकी बुकिंग कन्फर्म हो गई है।</p>
                
                <div class="order-details">
                    <h3>Order Details / ऑर्डर विवरण:</h3>
                    <p><strong>Order ID / ऑर्डर आईडी:</strong> ${orderId}</p>
                    <p><strong>Order Date / ऑर्डर दिनांक:</strong> ${orderDate}</p>
                    <p><strong>Payment Method / भुगतान विधि:</strong> ${paymentMethod === 'cash' ? 'Cash on Delivery / डिलीवरी पर नकद' : 'Online Payment / ऑनलाइन भुगतान'}</p>
                </div>

                <div class="order-details">
                    <h3>Customer Information / ग्राहक जानकारी:</h3>
                    <p><strong>Name / नाम:</strong> ${customerInfo.name}</p>
                    <p><strong>Email / ईमेल:</strong> ${customerInfo.email}</p>
                    <p><strong>Phone / फोन:</strong> ${customerInfo.phone}</p>
                    <p><strong>Address / पता:</strong> ${customerInfo.address}</p>
                    ${customerInfo.deliveryLocation ? `<p><strong>Delivery Location / डिलीवरी स्थान:</strong> ${customerInfo.deliveryLocation}</p>` : ''}
                </div>

                <div class="order-details">
                    <h3>Ordered Items / ऑर्डर की गई वस्तुएं:</h3>
                    ${items.map(item => `
                        <div class="item-row">
                            <div>
                                <strong>${item.name}</strong><br>
                                <small>Quantity / मात्रा: ${item.quantity}</small>
                            </div>
                            <div>₹${(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                    `).join('')}
                    
                    <div class="item-row total-row">
                        <div><strong>Total Amount / कुल राशि:</strong></div>
                        <div><strong>₹${total.toFixed(2)}</strong></div>
                    </div>
                </div>

                <div class="contact-info">
                    <h3>Contact Information / संपर्क जानकारी:</h3>
                    <p><strong>Phone / फोन:</strong> +91 91796 77292</p>
                    <p><strong>Email / ईमेल:</strong> tiwarianurag342407@gmail.com</p>
                    <p><strong>Address / पता:</strong> Indore, Madhya Pradesh</p>
                    <p><strong>Service Hours / सेवा समय:</strong> 24/7 Emergency Service Available</p>
                </div>

                <p style="color: #92400e; font-weight: bold;">
                    Our team will contact you shortly for delivery arrangements. / 
                    हमारी टीम डिलीवरी की व्यवस्था के लिए जल्द ही आपसे संपर्क करेगी।
                </p>
            </div>

            <div class="footer">
                <p>Thank you for choosing Antim Seva / अंतिम सेवा चुनने के लिए धन्यवाद</p>
                <p>🙏 अंतिम संस्कार आवश्यक वस्तुएं 🙏</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

export async function POST(request) {
  try {
    const orderData = await request.json();
    console.log('📧 Email sending request received:', {
      customerEmail: orderData.customerInfo?.email,
      orderId: orderData.orderId,
      itemsCount: orderData.items?.length
    });

    // Validate required fields
    if (!orderData.customerInfo?.email || !orderData.customerInfo?.name) {
      return NextResponse.json(
        { error: 'Customer email and name are required' },
        { status: 400 }
      );
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('❌ SMTP credentials missing');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = createTransporter();

    // Verify SMTP connection
    await transporter.verify();
    console.log('✅ SMTP connection verified');

    // Generate email HTML
    const emailHTML = generateOrderEmailHTML(orderData);

    // Send email to customer
    const mailOptions = {
      from: {
        name: 'Antim Seva - अंतिम सेवा',
        address: process.env.SMTP_USER
      },
      to: orderData.customerInfo.email,
      subject: `Order Confirmation #${orderData.orderId} - Antim Seva / ऑर्डर पुष्टि`,
      html: emailHTML,
    };

    console.log('📤 Sending email to:', orderData.customerInfo.email);
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', result.messageId);

    // Also send a copy to admin for order tracking
    const adminMailOptions = {
      from: {
        name: 'Antim Seva - Order System',
        address: process.env.SMTP_USER
      },
      to: process.env.SMTP_USER, // Send to admin email
      subject: `New Order Received #${orderData.orderId} - ${orderData.customerInfo.name}`,
      html: emailHTML,
    };

    console.log('📤 Sending admin copy...');
    const adminResult = await transporter.sendMail(adminMailOptions);
    console.log('✅ Admin email sent successfully:', adminResult.messageId);

    return NextResponse.json({
      success: true,
      message: 'Order confirmation email sent successfully',
      messageId: result.messageId,
      adminMessageId: adminResult.messageId
    });

  } catch (error) {
    console.error('❌ Email sending error:', error);
    
    // Return more specific error information
    let errorMessage = 'Failed to send email';
    if (error.code === 'EAUTH') {
      errorMessage = 'SMTP authentication failed';
    } else if (error.code === 'ECONNREFUSED') {
      errorMessage = 'SMTP connection refused';
    } else if (error.message) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
