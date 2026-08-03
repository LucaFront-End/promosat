import { createClient, OAuthStrategy } from '@wix/sdk';
import { items } from '@wix/data';

const WIX_CLIENT_ID = '3081c994-0ab4-41d7-9829-1022836f45a7';

const wixClient = createClient({
  modules: { items },
  auth: OAuthStrategy({ clientId: WIX_CLIENT_ID })
});

async function main() {
  const names = [
    'Prospectos',
    'BrochureLeads',
    'SolicitudBrochure',
    'FormularioBrochure',
    'PromosatLeads',
    'Respuestas',
    'Submissions',
    'ContactosWeb',
    'ConsultasWeb',
    'BaseDeDatos',
    'Clientes',
    'Brochures',
    'Registro',
    'Registros',
    'Descargas_Brochure'
  ];

  for (const collectionId of names) {
    try {
      const res = await wixClient.items.query(collectionId).find();
      console.log(`EXISTS collection "${collectionId}"! Items count:`, res.items.length);
    } catch (err) {
      if (err.message && !err.message.includes('does not exist')) {
        console.log(`EXISTS (Permission/Other) "${collectionId}":`, err.message);
      }
    }
  }
}

main();
