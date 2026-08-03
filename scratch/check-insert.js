import { createClient, OAuthStrategy } from '@wix/sdk';
import { items } from '@wix/data';

const WIX_CLIENT_ID = '3081c994-0ab4-41d7-9829-1022836f45a7';

const wixClient = createClient({
  modules: { items },
  auth: OAuthStrategy({ clientId: WIX_CLIENT_ID })
});

async function main() {
  const names = [
    'Consultas',
    'Brochure',
    'BrochureDownloads',
    'Leads',
    'Contactos',
    'Descargas',
    'Formulario',
    'Solicitudes',
    'DescargasBrochure',
    'TOP5ReporteAutomatizado' // we know this exists
  ];

  for (const collectionId of names) {
    try {
      const res = await wixClient.items.insert(collectionId, {
        title: 'Test Lead',
        nombre: 'Test',
        correo: 'test@empresa.com'
      });
      console.log(`SUCCESS inserting into "${collectionId}":`, res._id);
    } catch (err) {
      console.log(`Failed "${collectionId}":`, err.message || err);
    }
  }
}

main();
