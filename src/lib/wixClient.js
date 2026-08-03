import { createClient, OAuthStrategy } from '@wix/sdk';
import { items } from '@wix/data';

const WIX_CLIENT_ID = '3081c994-0ab4-41d7-9829-1022836f45a7';

export const wixClient = createClient({
  modules: { items },
  auth: OAuthStrategy({ clientId: WIX_CLIENT_ID })
});

export async function fetchTop5Rating() {
  try {
    const response = await wixClient.items
      .query('TOP5ReporteAutomatizado')
      .ascending('orden')
      .find();

    if (!response.items || response.items.length === 0) {
      return null;
    }

    const firstItem = response.items[0];
    const periodo = firstItem.periodoConAo || 'JUNIO, 2026';
    const personas = firstItem.personas || 'GENERAL';

    const stations = response.items.map((item) => {
      const isOwn = !!(item.grupo && item.grupo.toUpperCase().includes('PROMOSAT'));
      return {
        rank: item.orden || 0,
        name: item.title || '',
        siglas: item.siglas || '',
        rating: item.valor ? Number(item.valor) : 0,
        isOwn,
      };
    });

    return {
      periodo,
      personas,
      stations,
    };
  } catch (error) {
    console.error('Error fetching TOP5ReporteAutomatizado from Wix CMS:', error);
    return null;
  }
}
