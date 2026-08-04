async function testFormSubmit() {
  const emails = ['test1@dilodigitalmx.com', 'ventas@promosat.com'];

  for (const email of emails) {
    try {
      console.log(`Sending test request to FormSubmit for ${email}...`);
      const res = await fetch(`https://formsubmit.co/ajax/${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          'Nombre': 'Prueba Sistema',
          'Mensaje': 'Mensaje de prueba de envio de formulario',
          '_subject': 'Prueba de Formulario',
          '_template': 'box',
          '_captcha': 'false',
          '_language': 'es'
        })
      });
      const data = await res.json();
      console.log(`Response for ${email}:`, data);
    } catch (err) {
      console.error(`Error testing ${email}:`, err);
    }
  }
}

testFormSubmit();
