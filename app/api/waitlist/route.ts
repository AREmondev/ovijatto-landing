import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, phone } = await request.json();

    // Log the submission (you would see this in your server logs)
    console.log('New Waitlist Submission:', { name, email, phone });

    // For a real implementation, you would use a service like Resend, SendGrid, or AWS SES
    // Example using a simple mailto fallback logic or a placeholder for an email service
    
    /* 
    // Example with Resend (if installed):
    const { data, error } = await resend.emails.send({
      from: 'Ovijatto <onboarding@resend.dev>',
      to: ['info@ovijatto.com'],
      subject: `New Waitlist Signup: ${name}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email || 'N/A'}</p>
             <p><strong>Phone:</strong> ${phone}</p>`,
    });
    */

    return NextResponse.json({ success: true, message: 'Submission received' }, { status: 200 });
  } catch (error) {
    console.error('Error in waitlist API:', error);
    return NextResponse.json({ success: false, message: 'Failed to process submission' }, { status: 500 });
  }
}
