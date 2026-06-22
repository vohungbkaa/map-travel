<template>
  <div class="map-container-wrapper">
    <div ref="mapContainer" class="map-frame"></div>
    <div v-if="loading" class="map-loader">
      <div class="spinner"></div>
      <span>Loading vector map...</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, onMounted, onUnmounted, watch, nextTick } from 'vue';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MAP_CONFIG } from '../../config/map';
import type { AreaScope } from '../../config/map';
import type { Place } from '../../data/mockPlaces';

const props = defineProps<{
  places: Place[];
  selectedPlace: Place | null;
  areaConfig: AreaScope;
}>();

const emit = defineEmits<{
  (e: 'select-place', place: Place): void;
}>();

const mapContainer = ref<HTMLDivElement | null>(null);
const map = shallowRef<maplibregl.Map | null>(null);
const loading = ref(true);

// Keep track of markers to update active states and open popups
const markersMap = new Map<number, { marker: maplibregl.Marker; element: HTMLElement }>();

const localizedLabelExpression = [
  'let',
  'nameVal',
  [
    'coalesce',
    ['get', 'name:vi'],
    ['get', 'name'],
    ['get', 'name:nonlatin'],
    ['get', 'name:latin'],
    ['get', 'name_en'],
    ['get', 'name:en']
  ],
  [
    'case',
    ['==', ['var', 'nameVal'], 'Phú My'],
    'Phú Mỹ',
    ['var', 'nameVal']
  ]
];

const usesNameField = (value: unknown): boolean => {
  if (typeof value === 'string') {
    return value.includes('name');
  }

  if (!Array.isArray(value)) {
    return false;
  }

  return value.some(usesNameField);
};

const mergePaint = (layer: any, paint: Record<string, unknown>) => ({
  ...layer,
  paint: {
    ...layer.paint,
    ...paint
  }
});

const applySoftGoogleLikePalette = (layer: any) => {
  switch (layer.id) {
    case 'background':
      return mergePaint(layer, { 'background-color': '#f8f7f2' });
    case 'park':
    case 'landcover_wood':
      return mergePaint(layer, { 'fill-color': '#dcefd8', 'fill-opacity': 0.72 });
    case 'landuse_residential':
      return mergePaint(layer, { 'fill-color': '#f4f1ea', 'fill-opacity': 0.55 });
    case 'water':
      return mergePaint(layer, { 'fill-color': '#c8e6f5' });
    case 'waterway':
      return mergePaint(layer, { 'line-color': '#b7dff0' });
    case 'building':
      return mergePaint(layer, {
        'fill-color': '#ebe8df',
        'fill-outline-color': '#ddd8cd'
      });
    case 'highway_minor':
    case 'highway_major_inner':
    case 'highway_motorway_inner':
    case 'highway_motorway_bridge_inner':
    case 'tunnel_motorway_inner':
      return mergePaint(layer, { 'line-color': '#ffffff' });
    case 'highway_path':
      return mergePaint(layer, { 'line-color': '#f2f0ea', 'line-opacity': 0.95 });
    case 'highway_major_casing':
    case 'highway_motorway_casing':
    case 'highway_motorway_bridge_casing':
    case 'tunnel_motorway_casing':
      return mergePaint(layer, { 'line-color': '#ded9ce' });
    case 'highway_major_subtle':
    case 'highway_motorway_subtle':
      return mergePaint(layer, { 'line-color': '#eee9df' });
    case 'boundary_2':
    case 'boundary_3':
    case 'boundary_disputed':
      return mergePaint(layer, { 'line-color': '#c7c0b4', 'line-opacity': 0.65 });
    case 'waterway_line_label':
    case 'water_name_point_label':
    case 'water_name_line_label':
      return mergePaint(layer, {
        'text-color': '#4f84a3',
        'text-halo-color': 'rgba(255,255,255,0.85)'
      });
    case 'highway-name-path':
    case 'highway-name-minor':
    case 'highway-name-major':
    case 'label_other':
    case 'label_village':
    case 'label_town':
    case 'label_state':
    case 'label_city':
    case 'label_city_capital':
    case 'label_country_1':
    case 'label_country_2':
    case 'label_country_3':
      return mergePaint(layer, {
        'text-color': '#5f5b53',
        'text-halo-color': 'rgba(255,255,255,0.9)'
      });
    default:
      return layer;
  }
};

const loadLocalizedMapStyle = async () => {
  const response = await fetch(MAP_CONFIG.styleUrl);
  if (!response.ok) {
    throw new Error(`Failed to load map style: ${response.status}`);
  }

  const style = await response.json();

  style.layers = style.layers.map((rawLayer: any) => {
    const layer = applySoftGoogleLikePalette(rawLayer);

    if (
      layer.type !== 'symbol' ||
      !layer.layout?.['text-field'] ||
      !usesNameField(layer.layout['text-field'])
    ) {
      return layer;
    }

    return {
      ...layer,
      layout: {
        ...layer.layout,
        'text-field': localizedLabelExpression
      }
    };
  });

  return style;
};

const getPaddedBounds = (
  bounds: [[number, number], [number, number]],
  paddingRatio = 0.18
): [[number, number], [number, number]] => {
  const [[west, south], [east, north]] = bounds;
  const lngPadding = (east - west) * paddingRatio;
  const latPadding = (north - south) * paddingRatio;

  return [
    [west - lngPadding, south - latPadding],
    [east + lngPadding, north + latPadding]
  ];
};

const loadBoundaryData = async () => {
  if (props.areaConfig?.boundaryGeoJson) {
    return props.areaConfig.boundaryGeoJson;
  }

  if (!props.areaConfig?.boundaryGeoJsonUrl) {
    return null;
  }

  const response = await fetch(props.areaConfig.boundaryGeoJsonUrl);
  if (!response.ok) {
    throw new Error(`Failed to load boundary GeoJSON: ${response.status}`);
  }

  return response.json();
};

// Category specific styling classes
const getCategoryClass = (category: string) => {
  switch (category) {
    case 'Văn Hóa': return 'marker-van-hoa';
    case 'Lịch Sử': return 'marker-lich-su';
    case 'Kiến Trúc': return 'marker-kien-truc';
    case 'Ẩm Thực': return 'marker-am-thuc';
    default: return '';
  }
};

// Initialize Map
onMounted(async () => {
  await nextTick();
  if (!mapContainer.value) return;

  try {
    const initialCenter = props.areaConfig ? props.areaConfig.center : MAP_CONFIG.defaultCenter;
    const initialZoom = props.areaConfig ? props.areaConfig.zoom : MAP_CONFIG.defaultZoom;
    const initialBounds = props.areaConfig ? getPaddedBounds(props.areaConfig.bounds) : undefined;
    const localizedStyle = await loadLocalizedMapStyle();

    map.value = new maplibregl.Map({
      container: mapContainer.value,
      style: localizedStyle,
      center: initialCenter,
      zoom: initialZoom,
      minZoom: MAP_CONFIG.minZoom,
      maxZoom: MAP_CONFIG.maxZoom,
      maxBounds: initialBounds,
      attributionControl: false // Custom control added below
    });

    // Add navigation controls (zoom, compass)
    map.value.addControl(new maplibregl.NavigationControl({ showCompass: true }), 'top-right');
    
    // Add custom attribution control
    map.value.addControl(
      new maplibregl.AttributionControl({
        compact: false,
        customAttribution: '&copy; <a href="https://openfreemap.org" target="_blank">OpenFreeMap</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap contributors</a>'
      }),
      'bottom-right'
    );

    map.value.on('load', () => {
      loading.value = false;
      updateBoundaryLayer();
      updateMarkers();
      
      // Fit to initial area bounds
      if (props.areaConfig) {
        map.value!.fitBounds(props.areaConfig.bounds, {
          padding: { top: 60, bottom: 60, left: 60, right: 60 },
          maxZoom: props.areaConfig.level === 'ward' ? 16 : 14,
          duration: 0
        });
      }
    });

  } catch (error) {
    console.error('Failed to load MapLibre Map:', error);
    loading.value = false;
  }
});

// Clean up Map instance on unmount
onUnmounted(() => {
  if (map.value) {
    map.value.remove();
  }
});

// Update boundary polygon layer
const updateBoundaryLayer = async () => {
  if (!map.value) return;
  
  const sourceId = 'area-boundary';
  const fillLayerId = 'area-boundary-fill';
  const lineLayerId = 'area-boundary-line';
  
  // Remove existing boundary layer/source if they exist
  if (map.value.getLayer(fillLayerId)) map.value.removeLayer(fillLayerId);
  if (map.value.getLayer(lineLayerId)) map.value.removeLayer(lineLayerId);
  if (map.value.getSource(sourceId)) map.value.removeSource(sourceId);
  
  let boundaryData = null;
  try {
    boundaryData = await loadBoundaryData();
  } catch (error) {
    console.error('Failed to load area boundary:', error);
  }

  if (boundaryData) {
    map.value.addSource(sourceId, {
      type: 'geojson',
      data: boundaryData
    });
    
    map.value.addLayer({
      id: fillLayerId,
      type: 'fill',
      source: sourceId,
      paint: {
        'fill-color': '#ef4444',
        'fill-opacity': 0.03
      }
    });
    
    map.value.addLayer({
      id: lineLayerId,
      type: 'line',
      source: sourceId,
      paint: {
        'line-color': '#ef4444',
        'line-width': 2.25,
        'line-opacity': 0.95,
        'line-dasharray': [1.2, 1.4]
      }
    });
  }
};

// Update markers function
const updateMarkers = () => {
  if (!map.value) return;

  // Clear existing markers
  markersMap.forEach(({ marker }) => marker.remove());
  markersMap.clear();

  if (props.places.length === 0) return;

  props.places.forEach((place, index) => {
    const el = document.createElement('div');
    el.className = 'custom-marker-wrapper';

    const catClass = getCategoryClass(place.category);
    const isActive = props.selectedPlace?.id === place.id;
    const markerIndex = index + 1;

    el.innerHTML = `
      <div class="custom-pin ${catClass} ${isActive ? 'active' : ''}">
        <span class="custom-pin-inner">${markerIndex}</span>
      </div>
    `;

    // Create MapLibre Marker
    const marker = new maplibregl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat([place.lng, place.lat])
      .addTo(map.value!);

    // Handle marker click (set selected place)
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      emit('select-place', place);
    });

    markersMap.set(place.id, { marker, element: el });
  });
};

// Watchers
watch(() => props.places, () => {
  updateMarkers();
}, { deep: true });

watch(() => props.areaConfig, (newConfig) => {
  if (!map.value || !newConfig) return;
  
  // Update max bounds
  map.value.setMaxBounds(getPaddedBounds(newConfig.bounds));
  
  // Fit bounds
  map.value.fitBounds(newConfig.bounds, {
    padding: { top: 60, bottom: 60, left: 60, right: 60 },
    maxZoom: newConfig.level === 'ward' ? 16 : 14,
    duration: 1000
  });
  
  // Update boundary
  updateBoundaryLayer();
}, { deep: true });

watch(() => props.selectedPlace, (newPlace) => {
  if (!map.value) return;

  // Reset all markers' active classes
  markersMap.forEach(({ element }, id) => {
    const pinEl = element.querySelector('.custom-pin');
    if (pinEl) {
      if (id === newPlace?.id) {
        pinEl.classList.add('active');
      } else {
        pinEl.classList.remove('active');
      }
    }
  });

  // Center/fly to selected place
  if (newPlace) {
    map.value.easeTo({
      center: [newPlace.lng, newPlace.lat],
      zoom: 15.5,
      duration: 1000
    });
  }
});
</script>

<style>
/* Global Popup custom styles to override MapLibre default popup styling */
.maplibregl-popup-content {
  padding: 12px !important;
  border-radius: 12px !important;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1) !important;
  border: 1px solid var(--border-color) !important;
  background-color: var(--bg-card) !important;
  color: var(--text-primary) !important;
  font-family: var(--font-body, system-ui, -apple-system, sans-serif) !important;
}

.maplibregl-popup-tip {
  border-top-color: var(--bg-card) !important;
  border-bottom-color: var(--bg-card) !important;
}

.map-popup-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.popup-category {
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--primary);
  text-transform: uppercase;
  background-color: var(--primary-light);
  padding: 2px 6px;
  border-radius: 4px;
  align-self: flex-start;
}

.popup-title {
  margin: 4px 0 2px;
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--text-primary);
}

.popup-summary {
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.4;
  margin: 0;
}

.popup-meta {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 4px;
}

.popup-btn-direction {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 8px;
  padding: 6px 12px;
  font-size: 0.75rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: #ffffff !important;
  border-radius: 6px;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.popup-btn-direction:hover {
  opacity: 0.9;
}
</style>

<style scoped>
.map-container-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.map-frame {
  width: 100%;
  height: 100%;
}

.map-loader {
  position: absolute;
  inset: 0;
  background-color: var(--bg-app);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  z-index: 100;
  color: var(--text-secondary);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--border-color);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Marker / Pin Styling matching Leaflet but tailored for MapLibre positioning */
:deep(.custom-marker-wrapper) {
  background: none !important;
  border: none !important;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

:deep(.custom-pin) {
  width: 30px;
  height: 30px;
  border-radius: 50% 50% 50% 0;
  background: var(--marker-color, var(--primary));
  transform: rotate(-45deg);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.35), 0 0 0 2px #ffffff;
  transition: all var(--transition-normal, 0.25s ease);
  /* Adjust anchor alignment point */
  margin-bottom: 15px; 
}

:deep(.custom-pin::after) {
  content: '';
  width: 8px;
  height: 8px;
  background: #ffffff;
  position: absolute;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all var(--transition-normal, 0.25s ease);
  z-index: 1;
}

:deep(.custom-pin-inner) {
  transform: rotate(45deg);
  z-index: 2;
  color: #ffffff;
  font-size: 0.7rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Category Specific Colors */
:deep(.marker-van-hoa) {
  --marker-color: #a855f7; /* Violet */
}
:deep(.marker-lich-su) {
  --marker-color: #10b981; /* Emerald */
}
:deep(.marker-kien-truc) {
  --marker-color: #3b82f6; /* Blue */
}
:deep(.marker-am-thuc) {
  --marker-color: #f59e0b; /* Amber */
}

/* Hover and Active states */
:deep(.custom-pin:hover) {
  transform: rotate(-45deg) scale(1.15);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.4), 0 0 0 2px #ffffff;
}

:deep(.custom-pin.active) {
  transform: rotate(-45deg) scale(1.3);
  box-shadow: 0 0 0 6px var(--primary-light), 0 6px 16px rgba(0, 0, 0, 0.45), 0 0 0 2.5px #ffffff;
  z-index: 1000 !important;
}

:deep(.custom-pin.active::after) {
  width: 5px;
  height: 5px;
  background: var(--marker-color, var(--primary));
}
</style>
