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
    _language: 'es'
  };

  try {
    const promises = RECIPIENT_EMAILS.map(email =>
      fetch(`https://formsubmit.co/ajax/${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
    );

    const results = await Promise.allSettled(promises);
    results.forEach((r, idx) => {
      if (r.status === 'fulfilled') {
        r.value.json().then(data => {
          if (data.message && data.message.includes('Activation')) {
            console.warn(`FormSubmit activation needed for ${RECIPIENT_EMAILS[idx]}`);
          }
        }).catch(() => {});
      }
    });

    return true;
  } catch (error) {
    console.error('FormSubmit email send error:', error);
    return false;
  }
}
