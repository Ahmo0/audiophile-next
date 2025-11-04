import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      to,
      customerName,
      orderId,
      items,
      shippingAddress,
      subtotal,
      shipping,
      tax,
      total,
    } = body;

    if (!to || !customerName || !orderId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
          }
          .container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .header {
            border-bottom: 2px solid #D87D4A;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .header h1 {
            color: #D87D4A;
            margin: 0;
            font-size: 28px;
          }
          .order-id {
            background-color: #f5f5f5;
            padding: 15px;
            border-radius: 4px;
            margin: 20px 0;
          }
          .order-id strong {
            color: #D87D4A;
          }
          .items-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          .items-table th,
          .items-table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #e0e0e0;
          }
          .items-table th {
            background-color: #f9f9f9;
            font-weight: 600;
          }
          .totals {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 2px solid #e0e0e0;
          }
          .totals-row {
            display: flex;
            justify-content: space-between;
            margin: 8px 0;
          }
          .total-row {
            font-size: 18px;
            font-weight: 600;
            color: #D87D4A;
            margin-top: 10px;
            padding-top: 10px;
            border-top: 1px solid #e0e0e0;
          }
          .shipping-info {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 4px;
            margin: 20px 0;
          }
          .cta-button {
            display: inline-block;
            margin-top: 30px;
            padding: 15px 30px;
            background-color: #D87D4A;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 600;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e0e0e0;
            text-align: center;
            color: #666;
            font-size: 14px;
          }
          @media only screen and (max-width: 600px) {
            body {
              padding: 10px;
            }
            .container {
              padding: 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmation</h1>
          </div>
          
          <p>Hi ${customerName},</p>
          
          <p>Thank you for your order! We're excited to get your items ready for you.</p>
          
          <div class="order-id">
            <strong>Order ID:</strong> ${orderId}
          </div>
          
          <h2>Order Summary</h2>
          
          <table class="items-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              ${items
                .map(
                  (item: any) => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.quantity}</td>
                  <td>$${item.price.toFixed(2)}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
          
          <div class="totals">
            <div class="totals-row">
              <span>Subtotal:</span>
              <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div class="totals-row">
              <span>Shipping:</span>
              <span>$${shipping.toFixed(2)}</span>
            </div>
            <div class="totals-row">
              <span>Tax:</span>
              <span>$${tax.toFixed(2)}</span>
            </div>
            <div class="totals-row total-row">
              <span>Total:</span>
              <span>$${total.toFixed(2)}</span>
            </div>
          </div>
          
          <div class="shipping-info">
            <h3>Shipping Address</h3>
            <p>
              ${shippingAddress.street}<br>
              ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zipCode}<br>
              ${shippingAddress.country}
            </p>
          </div>
          
          <p>We'll send you another email when your order ships. If you have any questions, please don't hesitate to contact us.</p>
          
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/order-confirmation/${orderId}" class="cta-button">
            View Your Order
          </a>
          
          <div class="footer">
            <p>Thank you for shopping with Audiophile!</p>
            <p>Need help? Contact us at support@audiophile.com</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: "Audiophile <onboarding@resend.dev>", // Update this with your verified domain
      to: [to],
      subject: `Order Confirmation - ${orderId}`,
      html: emailHtml,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

