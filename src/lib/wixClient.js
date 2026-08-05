import { createClient, OAuthStrategy } from '@wix/sdk';
import { items } from '@wix/data';

const WIX_CLIENT_ID = '3081c994-0ab4-41d7-9829-1022836f45a7';
export const WIX_LEADS_COLLECTION = 'Descargarboletin'; // Wix CMS Collection ID for Brochure downloads / Consultas

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
    const periodo = firstItem.periodoConAo || firstItem.periodo || 'JUNIO, 2026';
    const personas = firstItem.personas || firstItem.demografico || 'GENERAL';
    const mercado = firstItem.mercado || firstItem.ciudad || null;
    const headline = firstItem.titulo || firstItem.headline || null;
    const subtitle = firstItem.subtitulo || firstItem.subtitle || null;
    const fuente = firstItem.fuente || 'INRA';

    const stations = response.items.map((item) => {
      const grupoStr = (item.grupo || item.cadena || item.empresa || '').toString().toUpperCase();
      const isOwn = grupoStr.includes('PROMOSAT') ||
                    grupoStr.includes('PROMO SAT') ||
                    item.promosat === true ||
                    item.esPromosat === true ||
                    item.isOwn === true ||
                    item.esPropia === true;

      return {
        rank: item.orden ? Number(item.orden) : 0,
        name: item.title || item.nombre || '',
        siglas: item.siglas || '',
        rating: item.valor ? Number(item.valor) : 0,
        isOwn,
      };
    });

    return {
      periodo,
      personas,
      mercado,
      headline,
      subtitle,
      fuente,
      stations,
    };
  } catch (error) {
    console.error('Error fetching TOP5ReporteAutomatizado from Wix CMS:', error);
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
