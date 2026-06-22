// Map Configuration for MapLibre GL JS

export interface AreaScope {
  slug: string;
  name: string;
  provinceCode: string;
  level: 'province' | 'ward';
  parentSlug?: string;
  center: [number, number]; // [lng, lat] for MapLibre
  zoom: number;
  bounds: [[number, number], [number, number]]; // [[west, south], [east, north]]
  boundaryGeoJson?: any;
  boundaryGeoJsonUrl?: string;
  description: string;
}

export const MAP_CONFIG = {
  defaultAreaSlug: 'tien-thang',
  
  // Center of our demo area (Xã Tiến Thắng, Mê Linh, Hà Nội)
  defaultCenter: [105.6775, 21.195] as [number, number], // [lng, lat] for MapLibre
  defaultZoom: 13.2,
  minZoom: 10,
  maxZoom: 18,

  // Selected basemap style
  // OpenFreeMap Positron is an open-source vector tile style that mimics CartoDB Positron:
  // clean, light grey theme, muted park green and water blue, minimal clutter.
  // This serves as our "Google-light" style for the prototype.
  styleUrl: 'https://tiles.openfreemap.org/styles/positron',

  // Other available styles for easy switching
  availableStyles: {
    positron: 'https://tiles.openfreemap.org/styles/positron', // Light, clean, low contrast (Google-light)
    liberty: 'https://tiles.openfreemap.org/styles/liberty',   // Standard OSM vector style
    bright: 'https://tiles.openfreemap.org/styles/bright',     // High contrast colorful style
    dark: 'https://tiles.openfreemap.org/styles/dark'          // Dark mode
  },

  // Map areas scope configs
  areas: {
    'tien-thang': {
      slug: 'tien-thang',
      name: 'Xã Tiến Thắng',
      provinceCode: 'hn',
      level: 'ward',
      center: [105.6775, 21.195],
      zoom: 13.2,
      bounds: [[105.61, 21.145], [105.745, 21.245]],
      description: 'Khám phá xã Tiến Thắng, huyện Mê Linh, Hà Nội với các di tích văn hóa lịch sử lâu đời như đình Bạch Trữ, đình Diến Táo và cuộc sống làng quê thanh bình.',
      boundaryGeoJson: undefined,
      boundaryGeoJsonUrl: undefined
    },
    'ha-noi': {
      slug: 'ha-noi',
      name: 'Hà Nội',
      provinceCode: 'hn',
      level: 'province',
      center: [105.8521, 21.0285],
      zoom: 13,
      bounds: [[105.75, 20.95], [105.95, 21.10]],
      description: 'Khám phá các di tích lịch sử, không gian văn hóa nghệ thuật tiêu biểu và những ngóc ngách ẩm thực mang đậm nét cổ kính của thủ đô nghìn năm văn hiến.',
      boundaryGeoJson: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [105.75, 20.95],
            [105.95, 20.95],
            [105.95, 21.10],
            [105.75, 21.10],
            [105.75, 20.95]
          ]]
        }
      }
    },
    'ba-dinh': {
      slug: 'ba-dinh',
      name: 'Quận Ba Đình',
      provinceCode: 'hn',
      level: 'ward',
      parentSlug: 'ha-noi',
      center: [105.8360, 21.0345],
      zoom: 14.5,
      bounds: [[105.81, 21.02], [105.85, 21.05]],
      description: 'Quận trung tâm hành chính - chính trị của thủ đô, tập trung nhiều di tích lịch sử trọng điểm như Lăng Bác, Hoàng Thành Thăng Long và Chùa Một Cột.',
      boundaryGeoJson: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [105.81, 21.02],
            [105.85, 21.02],
            [105.85, 21.05],
            [105.81, 21.05],
            [105.81, 21.02]
          ]]
        }
      }
    }
  } as Record<string, AreaScope>,

  // Configuration options for self-hosting transition
  selfHosted: {
    // To self-host using OpenMapTiles:
    // styleUrl: 'http://localhost:8080/styles/osm-bright/style.json'
    // To self-host using Protomaps PMTiles:
    // Need to initialize maplibre-gl-pmtiles plugin in useMap.ts / PublicMap.vue
    // styleUrl: {
    //   version: 8,
    //   sources: {
    //     protomaps: {
    //       type: 'vector',
    //       url: 'pmtiles://path/to/hanoi.pmtiles'
    //     }
    //   },
    //   layers: [...]
    // }
  }
};
