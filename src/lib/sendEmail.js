export const RECIPIENT_EMAILS = [
  'ventas@promosat.com',
  'test1@dilodigitalmx.com'
];

export async function sendFormSubmitEmail({ subject, formData }) {
  const payload = {
    ...formData,
    _subject: subject,
    _template: 'box', // Clean box template in FormSubmit
    _captcha: 'false',
    _language: 'es',
    _cc: RECIPIENT_EMAILS[1]
  };

  try {
    // Submit to FormSubmit endpoints for both recipients
    const request1 = fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAILS[0]}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const request2 = fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAILS[1]}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        ...formData,
        _subject: subject,
        _template: 'box',
        _captcha: 'false',
        _language: 'es'
      })
    });

    await Promise.allSettled([request1, request2]);
    return true;
  } catch (error) {
    console.error('FormSubmit email send notice:', error);
    return false;
  }
}
