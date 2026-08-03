import { createClient, OAuthStrategy } from '@wix/sdk';
import { items } from '@wix/data';

const WIX_CLIENT_ID = '3081c994-0ab4-41d7-9829-1022836f45a7';

const wixClient = createClient({
  modules: { items },
  auth: OAuthStrategy({ clientId: WIX_CLIENT_ID })
});

async function testInsert() {
  try {
    console.log('Testing insert into collection: Descargarboletin');
    const res = await wixClient.items.insert('Descargarboletin', {
      title: 'Prueba Lead - Empresa',
      nombre: 'Prueba Antigravity',
      telefono: '+52 5512345678',
      lada: '+52',
      correo: 'contacto@empresaPrueba.com',
      ciudad: 'Jalisco',
      tipoEmpresa: 'Empresa / Marca'
    });
    console.log('Insert SUCCESS into Descargarboletin:', res);
  } catch (err) {
    console.error('Insert Error on Descargarboletin:', err.message || err);
  }
}

testInsert();
