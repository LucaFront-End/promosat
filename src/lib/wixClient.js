import { createClient, OAuthStrategy } from '@wix/sdk';
import { items } from '@wix/data';

export const WIX_CLIENT_ID = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_WIX_CLIENT_ID) || '3081c994-0ab4-41d7-9829-1022836f45a7';
export const WIX_LEADS_COLLECTION = 'Descargarboletin'; // Wix CMS Collection ID for Brochure downloads / Consultas

export const wixClient = createClient({
  modules: { items },
  auth: OAuthStrategy({ clientId: WIX_CLIENT_ID }),
});

/**
 * Fetches the Top 5 Rating leaderboard from the Wix CMS collection "TOP5ReporteAutomatizado".
 * Fields confirmed from the live CMS: orden, title, siglas, valor, periodoConAo, personas, grupo.
 */
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

    const stations = response.items.map((item) => ({
      rank: Number(item.orden ?? 0),
      name: item.title || '',
      siglas: item.siglas || '',
      rating: Number(item.valor ?? 0),
      isOwn: (item.grupo || '').toString().toUpperCase().includes('PROMOSAT'),
    }));

    // Ensure stations are ordered by rank ascending
    stations.sort((a, b) => a.rank - b.rank);

    return {
      periodo: firstItem.periodoConAo || '',
      personas: firstItem.personas || 'GENERAL',
      mercado: firstItem.mercado || null,
      headline: firstItem.titulo || null,
      subtitle: firstItem.subtitulo || null,
      fuente: firstItem.fuente || 'INRA',
      stations,
    };
  } catch (error) {
    console.error('Error fetching ratings from Wix CMS:', error);
    return null;
  }
}

export async function saveBrochureLead(leadData, collectionId = WIX_LEADS_COLLECTION) {
  try {
    const payload = {
      title: `${leadData.nombre} - ${leadData.tipoEmpresa}`,
      nombre: leadData.nombre,
      telefono: leadData.telefonoFull || `${leadData.lada} ${leadData.telefono}`,
      lada: leadData.lada,
      correo: leadData.correo,
      ciudad: leadData.ciudad,
      tipoEmpresa: leadData.tipoEmpresa,
    };

    const result = await wixClient.items.insert(collectionId, payload);
    console.log(`Lead saved successfully to Wix CMS collection "${collectionId}":`, result);
    return { success: true, result };
  } catch (error) {
    console.warn(`Wix CMS insert notice on "${collectionId}":`, error.message || error);
    return { success: false, error };
  }
}
