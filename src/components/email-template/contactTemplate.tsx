export const contactTemplate = ({
    name,
    email,
    phone,
    location,
    message,
}: {
    name: string
    email: string
    phone: string
    location: string
    message: string
}) => {
    return `
  <div style="width:100%;padding:20px 0;background:#f3f3f3;font-family:Calibri,Arial,sans-serif;">
    <center>
      <div style="max-width:600px;background:#ffffff;border-radius:6px;overflow:hidden;box-shadow:0 2px 6px rgba(0,0,0,0.15);">
        
        <div style="background:#004aad;padding:20px 0;">
          <h3 style="color:#ffffff;margin:0;font-size:22px;border-bottom:2px solid #ffffff;padding-bottom:5px;">
            Contact Form Submission
          </h3>
        </div>

        <table style="width:100%;border-collapse:collapse;margin:0;">
          <tr>
            <td style="padding:12px 15px;background:#f8f9fa;border:1px solid #eee;width:140px;">Name</td>
            <td style="padding:12px 15px;border:1px solid #eee;">${name}</td>
          </tr>
          
          <tr>
            <td style="padding:12px 15px;background:#f8f9fa;border:1px solid #eee;">Email</td>
            <td style="padding:12px 15px;border:1px solid #eee;">${email}</td>
          </tr>

          <tr>
            <td style="padding:12px 15px;background:#f8f9fa;border:1px solid #eee;">Phone</td>
            <td style="padding:12px 15px;border:1px solid #eee;">${phone}</td>
          </tr>

          <tr>
            <td style="padding:12px 15px;background:#f8f9fa;border:1px solid #eee;">Location</td>
            <td style="padding:12px 15px;border:1px solid #eee;">${location}</td>
          </tr>

          <tr>
            <td style="padding:12px 15px;background:#f8f9fa;border:1px solid #eee;">Message</td>
            <td style="padding:12px 15px;border:1px solid #eee;white-space:pre-line;">${message}</td>
          </tr>
        </table>

        <div style="padding:15px;background:#fafafa;border-top:1px solid #eee;color:#555;font-size:13px;">
          <p style="margin:0;">This email was generated from YourCenter contact form.</p>
        </div>

      </div>
    </center>
  </div>
  `
}
