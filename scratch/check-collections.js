import { createClient, OAuthStrategy } from '@wix/sdk';
import { items } from '@wix/data';

const WIX_CLIENT_ID = '3081c994-0ab4-41d7-9829-1022836f45a7';

const wixClient = createClient({
  modules: { items },
  auth: OAuthStrategy({ clientId: WIX_CLIENT_ID })
});

async function main() {
  const candidateCollections = [
    'BrochureDownloads',
    'Consultas',
    'Leads',
    'Contactos',
    'Brochure',
    'DescargasBrochure',
    'FormularioBrochure',
    'SolicitudesBrochure'
  ];

  for (const name of candidateCollections) {
    try {
      const res = await wixClient.items.query(name).find();
      console.log(`Collection "${name}" EXISTS! Total items:`, res.items.length);
    } catch (err) {
      // ignore collection non-existent errors
    }
  }
}

main();
