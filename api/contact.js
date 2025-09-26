export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ ok: false, error: 'Method not allowed' });
  }
  try {
    const { name, email, message } = request.body || {};
    // TODO: Integrate with email service (Resend/SendGrid) or Formspree webhook.
    console.log('Contact form:', { name, email, message });
    return response.status(200).json({ ok: true });
  } catch (e) {
    return response.status(500).json({ ok: false, error: 'Internal error' });
  }
}