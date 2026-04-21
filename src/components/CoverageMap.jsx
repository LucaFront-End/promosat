import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { stationsGDL } from '../data/content';
import './CoverageMap.css';

delete L.Icon.Default.prototype._getIconUrl;

/* ──────────────────────────────────────────────
   FULL STATIONS DATABASE (primary + secondary)
   ────────────────────────────────────────────── */

const allStations = [
  // ── JALISCO (Guadalajara) ──
  { name: 'Fiesta Mexicana', dial: '92.3 FM', city: 'Guadalajara', state: 'Jalisco', region: 'Occidente', genre: 'Regional Mexicana', slug: 'fiesta-mexicana' },
  { name: 'Zona Tres', dial: '91.5 FM', city: 'Guadalajara', state: 'Jalisco', region: 'Occidente', genre: 'Pop / Top 40', slug: 'zona-tres' },
  { name: 'Radio Mujer', dial: '92.7 FM', city: 'Guadalajara', state: 'Jalisco', region: 'Occidente', genre: 'Adulto Contemporáneo', slug: 'radio-mujer' },
  { name: 'Milenio', dial: '105.1 FM', city: 'Guadalajara', state: 'Jalisco', region: 'Occidente', genre: 'Bella Música', slug: 'milenio' },

  // ── GUANAJUATO (León / Bajío) ──
  { name: 'La Grande', dial: '95.5 FM', city: 'León', state: 'Guanajuato', region: 'Bajío', genre: 'Grupera / Regional', slug: 'la-grande' },
  { name: 'La Prima', dial: '105.1 FM', city: 'León', state: 'Guanajuato', region: 'Bajío', genre: 'Ranchera', slug: 'la-prima' },
  { name: 'Blu FM', dial: '92.3 FM', city: 'León', state: 'Guanajuato', region: 'Bajío', genre: 'Pop / Urbano', slug: 'blu-fm' },
  { name: 'Ultra', dial: '98.3 FM', city: 'León', state: 'Guanajuato', region: 'Bajío', genre: 'Rock / Alternativo', slug: 'ultra' },

  // ── TAMAULIPAS (Nuevo Laredo / Reynosa) ──
  { name: 'Candela FM 91.1', dial: '91.1 FM', city: 'Nuevo Laredo', state: 'Tamaulipas', region: 'Norte', genre: 'Grupera' },
  { name: 'Candela FM 96.3', dial: '96.3 FM', city: 'Reynosa', state: 'Tamaulipas', region: 'Norte', genre: 'Grupera' },
  { name: 'Candela FM 90.1', dial: '90.1 FM', city: 'Matamoros', state: 'Tamaulipas', region: 'Norte', genre: 'Grupera' },
  { name: 'Candela FM 94.1', dial: '94.1 FM', city: 'Cd. Victoria', state: 'Tamaulipas', region: 'Norte', genre: 'Grupera' },
  { name: 'Candela FM 95.3', dial: '95.3 FM', city: 'Tampico', state: 'Tamaulipas', region: 'Norte', genre: 'Grupera' },
  { name: 'Candela FM 104.7', dial: '104.7 FM', city: 'Mante', state: 'Tamaulipas', region: 'Norte', genre: 'Grupera' },
  { name: 'NotiGAPE', dial: '1460 AM', city: 'Nuevo Laredo', state: 'Tamaulipas', region: 'Norte', genre: 'Noticias' },
  { name: 'La Poderosa', dial: '97.7 FM', city: 'Nuevo Laredo', state: 'Tamaulipas', region: 'Norte', genre: 'Regional' },
  { name: 'La Mera Mera', dial: '107.9 FM', city: 'Reynosa', state: 'Tamaulipas', region: 'Norte', genre: 'Regional' },
  { name: 'La Mexicana', dial: '92.1 FM', city: 'Matamoros', state: 'Tamaulipas', region: 'Norte', genre: 'Regional Mexicana' },

  // ── SONORA ──
  { name: 'La Sonora de Nogales', dial: '94.9 FM', city: 'Nogales', state: 'Sonora', region: 'Noroeste', genre: 'Regional' },
  { name: 'Radio Plan de Agua Prieta', dial: '630 AM', city: 'Agua Prieta', state: 'Sonora', region: 'Noroeste', genre: 'Regional' },

  // ── CHIHUAHUA ──
  { name: 'La Rancherita de Paquimé', dial: '96.3 FM', city: 'Nuevo Casas Grandes', state: 'Chihuahua', region: 'Noroeste', genre: 'Ranchera' },
  { name: 'La Kañona', dial: '99.7 FM', city: 'Chihuahua', state: 'Chihuahua', region: 'Noroeste', genre: 'Regional' },

  // ── VERACRUZ ──
  { name: 'XEU 98.1', dial: '98.1 FM', city: 'Veracruz', state: 'Veracruz', region: 'Golfo', genre: 'Noticias / Hablada' },
  { name: 'Dominio FM', dial: '96.5 FM', city: 'Veracruz', state: 'Veracruz', region: 'Golfo', genre: 'Pop' },
  { name: 'Radio Fórmula Poza Rica', dial: '97.7 FM', city: 'Poza Rica', state: 'Veracruz', region: 'Golfo', genre: 'Noticias' },
  { name: 'Radio Sensación', dial: '95.7 FM', city: 'Córdoba', state: 'Veracruz', region: 'Golfo', genre: 'Regional' },
  { name: 'Radio Ola', dial: '103.5 FM', city: 'Xalapa', state: 'Veracruz', region: 'Golfo', genre: 'Pop / Tropical' },

  // ── YUCATÁN / MÉRIDA ──
  { name: 'Los 40 Mérida', dial: '97.7 FM', city: 'Mérida', state: 'Yucatán', region: 'Sureste', genre: 'Pop / Hits' },
  { name: 'Ke Buena Mérida', dial: '92.5 FM', city: 'Mérida', state: 'Yucatán', region: 'Sureste', genre: 'Grupera' },
  { name: 'Radio Turquesa', dial: '105.1 FM', city: 'Cancún', state: 'Quintana Roo', region: 'Sureste', genre: 'Pop / Tropical' },

  // ── TABASCO ──
  { name: 'La Grande de Tabasco', dial: '99.3 FM', city: 'Villahermosa', state: 'Tabasco', region: 'Sureste', genre: 'Grupera' },

  // ── MICHOACÁN ──
  { name: 'Fiesta Mexicana 90.9', dial: '90.9 FM', city: 'Morelia', state: 'Michoacán', region: 'Occidente', genre: 'Regional Mexicana' },
  { name: 'La Zamorana', dial: '100.3 FM', city: 'Zamora', state: 'Michoacán', region: 'Occidente', genre: 'Regional' },
  { name: 'Ultra 92.5', dial: '92.5 FM', city: 'Morelia', state: 'Michoacán', region: 'Occidente', genre: 'Rock' },

  // ── COLIMA ──
  { name: 'Super Colima', dial: '98.9 FM', city: 'Colima', state: 'Colima', region: 'Occidente', genre: 'Regional' },
  { name: 'Ángel Guardián', dial: '98.9 FM', city: 'Colima', state: 'Colima', region: 'Occidente', genre: 'Pop / Romántica' },

  // ── NUEVO LEÓN / MONTERREY ──
  { name: 'Súper Estéreo Miled', dial: '104.7 FM', city: 'Monterrey', state: 'Nuevo León', region: 'Norte', genre: 'Pop' },
  { name: 'Súper Estéreo Miled 97.1', dial: '97.1 FM', city: 'Monterrey', state: 'Nuevo León', region: 'Norte', genre: 'Pop' },

  // ── SINALOA ──
  { name: 'Adictiva 95.5', dial: '95.5 FM', city: 'Los Mochis', state: 'Sinaloa', region: 'Noroeste', genre: 'Regional' },
  { name: 'La Mejor', dial: '92.3 FM', city: 'Mazatlán', state: 'Sinaloa', region: 'Noroeste', genre: 'Regional' },
  { name: 'La Mejor FM 91.5', dial: '91.5 FM', city: 'Culiacán', state: 'Sinaloa', region: 'Noroeste', genre: 'Regional' },

  // ── NAYARIT ──
  { name: 'Fiesta Mexicana 94.5', dial: '94.5 FM', city: 'Tepic', state: 'Nayarit', region: 'Occidente', genre: 'Regional Mexicana' },
  { name: 'Fiesta Mexicana 97.5', dial: '97.5 FM', city: 'Puerto Vallarta', state: 'Jalisco', region: 'Occidente', genre: 'Regional Mexicana' },

  // ── AGUASCALIENTES ──
  { name: 'La Ke Buena', dial: '92.3 FM', city: 'Aguascalientes', state: 'Aguascalientes', region: 'Bajío', genre: 'Grupera' },
  { name: 'La Ke Buena 102.5', dial: '102.5 FM', city: 'Lagos de Moreno', state: 'Jalisco', region: 'Bajío', genre: 'Grupera' },

  // ── ZACATECAS ──
  { name: 'La Ranchera', dial: '93.5 FM', city: 'Zacatecas', state: 'Zacatecas', region: 'Bajío', genre: 'Ranchera' },
  { name: 'Catedral de la Música', dial: '91.7 FM', city: 'Zacatecas', state: 'Zacatecas', region: 'Bajío', genre: 'Norteño / Grupera' },

  // ── SAN LUIS POTOSÍ ──
  { name: 'Sonido Zeta', dial: '97.9 FM', city: 'San Luis Potosí', state: 'San Luis Potosí', region: 'Bajío', genre: 'Pop' },
  { name: 'La Acerera', dial: '106.3 FM', city: 'Monclova', state: 'Coahuila', region: 'Norte', genre: 'Regional' },

  // ── DURANGO ──
  { name: 'La Nuestra', dial: '96.1 FM', city: 'Durango', state: 'Durango', region: 'Noroeste', genre: 'Regional' },

  // ── OAXACA ──
  { name: 'Ori Stéreo FM', dial: '98.1 FM', city: 'Oaxaca', state: 'Oaxaca', region: 'Sureste', genre: 'Regional' },

  // ── GUERRERO ──
  { name: 'Mar FM', dial: '98.5 FM', city: 'Acapulco', state: 'Guerrero', region: 'Sureste', genre: 'Pop / Tropical' },

  // ── QUERÉTARO ──
  { name: 'La Bestia Grupera', dial: '98.9 FM', city: 'Querétaro', state: 'Querétaro', region: 'Bajío', genre: 'Grupera' },

  // ── OTROS ──
  { name: 'EXA', dial: '93.9 FM', city: 'Guadalajara', state: 'Jalisco', region: 'Occidente', genre: 'Pop / Hits' },
  { name: 'EXA 102.1', dial: '102.1 FM', city: 'León', state: 'Guanajuato', region: 'Bajío', genre: 'Pop / Hits' },
  { name: 'Los 40', dial: '101.7 FM', city: 'Guadalajara', state: 'Jalisco', region: 'Occidente', genre: 'Pop / Hits' },
  { name: 'Los 40 94.3', dial: '94.3 FM', city: 'León', state: 'Guanajuato', region: 'Bajío', genre: 'Pop / Hits' },
  { name: 'Retro FM', dial: '99.9 FM', city: 'Guadalajara', state: 'Jalisco', region: 'Occidente', genre: 'Retro / Clásicos' },
  { name: 'Retro FM 103.1', dial: '103.1 FM', city: 'León', state: 'Guanajuato', region: 'Bajío', genre: 'Retro / Clásicos' },
  { name: 'Soy FM', dial: '102.9 FM', city: 'Guadalajara', state: 'Jalisco', region: 'Occidente', genre: 'Pop Romántico' },
  { name: 'KT La Súper Estación', dial: '101.9 FM', city: 'Guadalajara', state: 'Jalisco', region: 'Occidente', genre: 'Pop / Urbano' },
  { name: 'Power 98', dial: '98.9 FM', city: 'Guadalajara', state: 'Jalisco', region: 'Occidente', genre: 'Urbano / Reggaeton' },
  { name: 'Max 105.3', dial: '105.3 FM', city: 'Guadalajara', state: 'Jalisco', region: 'Occidente', genre: 'Rock / Pop' },
  { name: 'Factor', dial: '102.5 FM', city: 'Guadalajara', state: 'Jalisco', region: 'Occidente', genre: 'Pop / Top 40' },
  { name: 'Stereo Rey', dial: '102.9 FM', city: 'Monterrey', state: 'Nuevo León', region: 'Norte', genre: 'Pop' },
  { name: 'FM Globo 99.7', dial: '99.7 FM', city: 'León', state: 'Guanajuato', region: 'Bajío', genre: 'Romántica' },
  { name: 'El Globo 96.9', dial: '96.9 FM', city: 'Guadalajara', state: 'Jalisco', region: 'Occidente', genre: 'Romántica' },
  { name: 'La Rancherita', dial: '94.3 FM', city: 'León', state: 'Guanajuato', region: 'Bajío', genre: 'Ranchera' },
  { name: 'Oye 99.9 FM', dial: '99.9 FM', city: 'León', state: 'Guanajuato', region: 'Bajío', genre: 'Pop / Clásicos' },
  { name: 'Súper FM', dial: '99.1 FM', city: 'Guadalajara', state: 'Jalisco', region: 'Occidente', genre: 'Pop' },
  { name: 'La Gran Compañía', dial: '96.3 FM', city: 'Guadalajara', state: 'Jalisco', region: 'Occidente', genre: 'Grupera' },
  { name: 'Banda 91 Stéreo', dial: '91.3 FM', city: 'Guadalajara', state: 'Jalisco', region: 'Occidente', genre: 'Banda' },
  { name: 'La Estación del Amor', dial: '90.7 FM', city: 'Guadalajara', state: 'Jalisco', region: 'Occidente', genre: 'Romántica' },
  { name: 'La Z', dial: '103.5 FM', city: 'Guadalajara', state: 'Jalisco', region: 'Occidente', genre: 'Urbano' },
  { name: 'Radio 620', dial: '620 AM', city: 'Guadalajara', state: 'Jalisco', region: 'Occidente', genre: 'Hablada / Noticias' },
  { name: 'Voz del Tiempo', dial: '1000 AM', city: 'Guadalajara', state: 'Jalisco', region: 'Occidente', genre: 'Hablada' },
  { name: 'Cadena 100.3', dial: '100.3 FM', city: 'Guadalajara', state: 'Jalisco', region: 'Occidente', genre: 'Noticias' },
  { name: 'Radio Juventud', dial: '89.7 FM', city: 'Aguascalientes', state: 'Aguascalientes', region: 'Bajío', genre: 'Pop' },
  { name: 'Halcón Stereo', dial: '97.5 FM', city: 'San Luis Potosí', state: 'San Luis Potosí', region: 'Bajío', genre: 'Regional' },
  { name: 'Stereo Plata', dial: '95.1 FM', city: 'Zacatecas', state: 'Zacatecas', region: 'Bajío', genre: 'Pop' },
  { name: 'Radio Cañón', dial: '1290 AM', city: 'Guadalajara', state: 'Jalisco', region: 'Occidente', genre: 'Hablada' },
  { name: 'Radio Mina', dial: '100.5 FM', city: 'Zacatecas', state: 'Zacatecas', region: 'Bajío', genre: 'Regional' },
  { name: 'Radio Mundo', dial: '102.1 FM', city: 'Tampico', state: 'Tamaulipas', region: 'Norte', genre: 'Pop' },
  { name: 'Radio Panorámica', dial: '99.3 FM', city: 'León', state: 'Guanajuato', region: 'Bajío', genre: 'Noticias' },
  { name: 'Radio Hit La Explosiva', dial: '94.7 FM', city: 'Reynosa', state: 'Tamaulipas', region: 'Norte', genre: 'Pop' },
  { name: 'Radio Mensajera', dial: '1570 AM', city: 'Matamoros', state: 'Tamaulipas', region: 'Norte', genre: 'Hablada' },
  { name: 'Radio Horizonte', dial: '95.3 FM', city: 'Chihuahua', state: 'Chihuahua', region: 'Noroeste', genre: 'Pop' },
  { name: 'Radio 65', dial: '650 AM', city: 'Guadalajara', state: 'Jalisco', region: 'Occidente', genre: 'Hablada' },
  { name: 'Ya 95.7 Radio Impactante', dial: '95.7 FM', city: 'Cd. Victoria', state: 'Tamaulipas', region: 'Norte', genre: 'Pop' },
  { name: 'XHVA FM', dial: '96.1 FM', city: 'Veracruz', state: 'Veracruz', region: 'Golfo', genre: 'Regional' },
  { name: 'La G.S.', dial: '99.3 FM', city: 'Guadalajara', state: 'Jalisco', region: 'Occidente', genre: 'Grupera' },
  { name: 'La J.L.', dial: '95.7 FM', city: 'Guadalajara', state: 'Jalisco', region: 'Occidente', genre: 'Pop' },
];

/* All unique regions */
const regions = [...new Set(allStations.map(s => s.region))];

/* Approximate geo-coordinates per city */
const cityGeo = {
  'Guadalajara': [20.672, -103.352], 'León': [21.122, -101.684],
  'Monterrey': [25.687, -100.316], 'Nuevo Laredo': [27.476, -99.507],
  'Reynosa': [26.064, -98.278], 'Matamoros': [25.879, -97.504],
  'Cd. Victoria': [23.737, -99.146], 'Tampico': [22.233, -97.861],
  'Mante': [22.741, -99.014], 'Mérida': [20.967, -89.593],
  'Cancún': [21.161, -86.851], 'Villahermosa': [17.986, -92.930],
  'Morelia': [19.706, -101.195], 'Zamora': [19.986, -102.283],
  'Colima': [19.243, -103.725], 'Tepic': [21.505, -104.895],
  'Puerto Vallarta': [20.653, -105.225], 'Veracruz': [19.173, -96.134],
  'Poza Rica': [20.533, -97.459], 'Córdoba': [18.884, -96.934],
  'Xalapa': [19.542, -96.910], 'Aguascalientes': [21.885, -102.291],
  'Lagos de Moreno': [21.357, -101.931], 'Zacatecas': [22.771, -102.583],
  'San Luis Potosí': [22.150, -100.976], 'Monclova': [26.907, -101.421],
  'Durango': [24.024, -104.653], 'Oaxaca': [17.061, -96.726],
  'Acapulco': [16.853, -99.824], 'Querétaro': [20.589, -100.390],
  'Mazatlán': [23.249, -106.411], 'Los Mochis': [25.790, -108.993],
  'Culiacán': [24.833, -107.394], 'Nogales': [31.312, -110.946],
  'Agua Prieta': [31.326, -109.549], 'Nuevo Casas Grandes': [30.413, -107.912],
  'Chihuahua': [28.633, -106.089],
};

/* Region map centers */
const regionCoords = {
  'Occidente': [20.5, -103.5, 7],
  'Bajío': [21.2, -101.5, 7],
  'Norte': [26.0, -99.5, 6],
  'Noroeste': [28.0, -107.0, 6],
  'Golfo': [19.5, -97.0, 7],
  'Sureste': [19.5, -89.5, 7],
};

/* ── Pin icon factory ── */
const createIcon = (isActive) => new L.DivIcon({
  className: 'map-pin-icon',
  html: `<div style="
    width:${isActive ? 28 : 18}px;height:${isActive ? 28 : 18}px;
    background:var(--color-accent, #275AF5);border-radius:50%;
    box-shadow:0 0 0 ${isActive ? 6 : 3}px rgba(39,90,245,${isActive ? 0.3 : 0.15}), 0 4px 12px rgba(39,90,245,0.5);
    border:3px solid white;
    transition:all 0.3s;
    cursor:pointer;
    ${isActive ? 'animation:coveragePulse 2s infinite;' : ''}
  "></div>`,
  iconSize: [isActive ? 28 : 18, isActive ? 28 : 18],
  iconAnchor: [isActive ? 14 : 9, isActive ? 14 : 9],
  popupAnchor: [0, isActive ? -16 : -12],
});

/* ── Map flyTo controller ── */
function MapController({ activeRegion }) {
  const map = useMap();
  useEffect(() => {
    if (activeRegion && regionCoords[activeRegion]) {
      const [lat, lng, zoom] = regionCoords[activeRegion];
      map.flyTo([lat, lng], zoom, { duration: 1.2 });
    } else {
      map.flyTo([23.5, -102.5], 5, { duration: 1.2 });
    }
  }, [activeRegion, map]);
  return null;
}

export default function CoverageMap() {
  const [activeRegion, setActiveRegion] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const filtered = useMemo(() => {
    if (!activeRegion) return allStations;
    return allStations.filter(s => s.region === activeRegion);
  }, [activeRegion]);

  const regionCounts = {};
  regions.forEach(r => { regionCounts[r] = allStations.filter(s => s.region === r).length; });

  const getCoords = (station) => {
    const geo = cityGeo[station.city];
    if (geo) {
      // Offset to prevent pin overlap for stations in the same city
      const hash = station.name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
      return [geo[0] + ((hash % 50) - 25) * 0.004, geo[1] + ((hash % 37) - 18) * 0.004];
    }
    return [23.5, -102.5];
  };

  const primarySlugs = stationsGDL.map(s => s.slug);

  return (
    <section className="coverage-map" id="cobertura">
      <div className="coverage-map__orb" aria-hidden="true" />
      <div className="container">
        <div className="coverage-map__header">
          <span className="coverage-map__tag">
            <span className="coverage-map__tag-dot" />
            Cobertura Nacional
          </span>
          <h2 className="coverage-map__title">
            Nuestra Señal en <span>Todo México</span>
          </h2>
        </div>

        {/* Region filters */}
        <div className="coverage-map__filters">
          <button
            className={`coverage-map__filter-btn ${!activeRegion ? 'coverage-map__filter-btn--active' : ''}`}
            onClick={() => { setActiveRegion(null); setSelectedId(null); }}
          >
            Todas ({allStations.length})
          </button>
          {regions.map(r => (
            <button
              key={r}
              className={`coverage-map__filter-btn ${activeRegion === r ? 'coverage-map__filter-btn--active' : ''}`}
              onClick={() => { setActiveRegion(prev => prev === r ? null : r); setSelectedId(null); }}
            >
              {r} ({regionCounts[r]})
            </button>
          ))}
        </div>

        {/* Map + Cards */}
        <div className="coverage-map__grid">
          <div className="coverage-map__map-wrap">
            <MapContainer
              center={[23.5, -102.5]} zoom={5}
              style={{ width: '100%', height: '100%' }}
              zoomControl={false} dragging={false} touchZoom={false}
              doubleClickZoom={false} scrollWheelZoom={false} boxZoom={false}
              keyboard={false} attributionControl={false}
            >
              <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
              <MapController activeRegion={activeRegion} />
              {filtered.map((station, i) => {
                const coords = getCoords(station);
                const id = station.name + station.dial;
                return (
                  <Marker key={id} position={coords}
                    icon={createIcon(selectedId === id)}
                    eventHandlers={{ click: () => setSelectedId(prev => prev === id ? null : id) }}
                  >
                    <Popup>
                      <div>
                        <div className="coverage-popup__name">{station.name}</div>
                        <div className="coverage-popup__dial">📡 {station.dial}</div>
                        <div className="coverage-popup__city">📍 {station.city}, {station.state}</div>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>

            {/* Info bar */}
            <div className="coverage-map__info-bar">
              <div>
                <div className="coverage-map__info-region">{activeRegion || 'Todo México'}</div>
                <div className="coverage-map__info-count">{filtered.length} emisoras mostrando · Click en un pin</div>
              </div>
              <div className="coverage-map__info-badge">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {allStations.length}+ emisoras
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="coverage-map__cards">
            {filtered.map((station) => {
              const id = station.name + station.dial;
              const isActive = selectedId === id;
              const isPrimary = station.slug && primarySlugs.includes(station.slug);
              return (
                <div
                  key={id}
                  className={`coverage-card ${isActive ? 'coverage-card--active' : ''}`}
                  onClick={() => setSelectedId(isActive ? null : id)}
                >
                  <div className="coverage-card__row">
                    <div className="coverage-card__icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="coverage-card__name">{station.name}</div>
                      <div className="coverage-card__meta">{station.city}, {station.state}</div>
                    </div>
                    <span className="coverage-card__tag">{station.region}</span>
                  </div>
                  {isActive && (
                    <div className="coverage-card__details">
                      <div className="coverage-card__detail-row">📡 {station.dial}</div>
                      <div className="coverage-card__detail-row">🎵 {station.genre}</div>
                      <div className="coverage-card__actions">
                        {isPrimary ? (
                          <Link to={`/emisora/${station.slug}`} className="coverage-card__action coverage-card__action--primary" onClick={e => e.stopPropagation()}>
                            Ver Emisora
                          </Link>
                        ) : (
                          <a href={`https://wa.me/525552508990?text=${encodeURIComponent(`SW- Hola quisiera información para publicidad en Radio en ${station.name}`)}`} target="_blank" rel="noopener noreferrer" className="coverage-card__action coverage-card__action--primary" onClick={e => e.stopPropagation()}>
                            Cotizar Espacio
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
