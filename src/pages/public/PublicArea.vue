<template>
  <div class="public-area animate-fade-in">
    <!-- Main Workspace -->
    <div class="workspace-grid">
      <!-- Sidebar List -->
      <aside class="places-sidebar">
        <!-- Area Sidebar Header -->
        <div class="area-sidebar-header">
          <div class="banner-overlay"></div>
          <div class="header-content">
            <span class="badge">Destination</span>
            <h2>{{ areaName }}</h2>
            <p class="area-description">{{ areaDescription }}</p>
          </div>
        </div>
        <!-- Search & Filter Controls -->
        <div class="search-filter-box">
          <div class="form-group search-group">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input 
              type="text" 
              class="form-control" 
              placeholder="Search local places..." 
              v-model="searchQuery"
            />
          </div>

          <div class="category-filters">
            <button 
              class="filter-chip" 
              :class="{ active: activeCategory === 'all' }"
              @click="activeCategory = 'all'"
            >
              All
            </button>
            <button 
              v-for="cat in categories" 
              :key="cat"
              class="filter-chip"
              :class="{ active: activeCategory === cat }"
              @click="activeCategory = cat"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <!-- Places List -->
        <div class="places-list">
          <div class="list-header">
            <h3>Key Landmarks ({{ filteredPlaces.length }})</h3>
          </div>
          
          <div v-if="filteredPlaces.length === 0" class="empty-state">
            <p>No places match your search or filter.</p>
          </div>
          
          <div 
            v-for="place in filteredPlaces" 
            :key="place.id"
            class="place-item"
            :class="{ active: selectedPlace?.id === place.id }"
            @click="selectPlace(place)"
          >
            <div class="place-meta">
              <span class="place-category-badge">{{ place.category }}</span>
            </div>
            <h4>{{ place.name }}</h4>
            <p class="place-summary">{{ place.summary }}</p>
            <div class="place-actions" v-if="selectedPlace?.id === place.id">
              <a 
                :href="`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`" 
                target="_blank" 
                class="btn btn-secondary btn-xs"
                @click.stop
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
                Directions
              </a>
            </div>
          </div>
        </div>
      </aside>

      <!-- Map Display Container -->
      <section class="map-section">
        <div id="map-container" class="map-frame">
          <div v-if="mapLoading" class="map-loader">
            <div class="spinner"></div>
            <span>Initializing interactive map...</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Mock Area Meta
const route = useRoute();
const areaSlug = computed(() => route.params.areaSlug as string || 'ha-noi');

const areaName = computed(() => {
  return areaSlug.value === 'ha-noi' ? 'Hà Nội' : `Area: ${areaSlug.value}`;
});

const areaDescription = ref(
  'Khám phá các di tích lịch sử, không gian văn hóa nghệ thuật tiêu biểu và những ngóc ngách ẩm thực mang đậm nét cổ kính của thủ đô nghìn năm văn hiến.'
);

// Map References
const map = shallowRef<L.Map | null>(null);
const markers = shallowRef<L.Marker[]>([]);
const mapLoading = ref(true);

// Mock Places Database
interface Place {
  id: number;
  name: string;
  category: string;
  summary: string;
  description: string;
  lat: number;
  lng: number;
}

const places = ref<Place[]>([
  {
    id: 1,
    name: 'Hồ Hoàn Kiếm (Hồ Gươm)',
    category: 'Văn Hóa',
    summary: 'Trái tim xanh của thủ đô Hà Nội, gắn liền với truyền thuyết trả gươm thần.',
    description: 'Nằm giữa trung tâm Hà Nội cổ kính, là biểu tượng du lịch lịch sử với cầu Thê Húc đỏ tươi dẫn vào đền Ngọc Sơn trên đảo ngọc nhỏ giữa hồ.',
    lat: 21.0285,
    lng: 105.8521
  },
  {
    id: 2,
    name: 'Văn Miếu - Quốc Tử Giám',
    category: 'Lịch Sử',
    summary: 'Trường đại học đầu tiên của Việt Nam lập năm 1076 dưới triều Lý.',
    description: 'Một quần thể kiến trúc Nho học cổ kính tiêu biểu tại Hà Nội, thờ Khổng Tử và lưu giữ 82 bia Tiến sĩ vinh danh những người đỗ đạt.',
    lat: 21.0293,
    lng: 105.8360
  },
  {
    id: 3,
    name: 'Nhà Thờ Lớn Hà Nội',
    category: 'Kiến Trúc',
    summary: 'Công trình kiến trúc Gothic đặc trưng hoàn thành vào năm 1887.',
    description: 'Tên chính thức là Nhà thờ chính tòa Thánh Giuse, được xây dựng theo hình mẫu Nhà thờ Đức Bà Paris với hai tháp chuông cao vút.',
    lat: 21.0288,
    lng: 105.8490
  },
  {
    id: 4,
    name: 'Phố Bia Tạ Hiện',
    category: 'Ẩm Thực',
    summary: 'Trung tâm vui chơi giải trí về đêm tấp nập của giới trẻ và khách du lịch.',
    description: 'Ngã tư bia hơi nhộn nhịp nằm trong lòng phố cổ Hà Nội, nổi tiếng với các món ăn đường phố đậm vị và không khí quốc tế náo nhiệt.',
    lat: 21.0347,
    lng: 105.8525
  }
]);

// Search & Filter State
const searchQuery = ref('');
const activeCategory = ref('all');
const selectedPlace = ref<Place | null>(null);

const categories = computed(() => {
  return Array.from(new Set(places.value.map(p => p.category)));
});

const filteredPlaces = computed(() => {
  return places.value.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          place.summary.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = activeCategory.value === 'all' || place.category === activeCategory.value;
    return matchesSearch && matchesCategory;
  });
});

// Update markers when filtered places change
watch(filteredPlaces, () => {
  updateMapMarkers();
});

// Update marker icons styling when selected place changes (no refitting of bounds)
watch(selectedPlace, (newPlace) => {
  if (!map.value) return;
  filteredPlaces.value.forEach((place, index) => {
    const marker = markers.value[index];
    if (!marker) return;

    const catClass = getCategoryClass(place.category);
    const isActive = newPlace?.id === place.id;
    const markerIndex = index + 1;

    const iconHtml = `
      <div class="custom-pin ${catClass} ${isActive ? 'active' : ''}">
        <span class="custom-pin-inner">${markerIndex}</span>
      </div>
    `;

    const customIcon = L.divIcon({
      className: 'custom-marker-wrapper',
      html: iconHtml,
      iconSize: [32, 32],
      iconAnchor: [16, 24]
    });

    marker.setIcon(customIcon);
  });
});

// Map Initialization
onMounted(() => {
  // Leaflet image path fix
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });

  setTimeout(() => {
    mapLoading.value = false;
    
    // Default center at Hanoi
    map.value = L.map('map-container').setView([21.03, 105.845], 14);

    // High fidelity CartoDB Voyager Map (keeps natural colors for water/parks)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map.value);

    updateMapMarkers();
  }, 300);
});

// Place Selection Logic
const selectPlace = (place: Place) => {
  selectedPlace.value = place;
  if (map.value) {
    map.value.setView([place.lat, place.lng], 16);
    // Find matching marker and open its popup
    const marker = markers.value.find(m => {
      const latlng = m.getLatLng();
      return Math.abs(latlng.lat - place.lat) < 0.0001 && Math.abs(latlng.lng - place.lng) < 0.0001;
    });
    if (marker) {
      marker.openPopup();
    }
  }
};

// Category custom styles mapper
const getCategoryClass = (category: string) => {
  switch (category) {
    case 'Văn Hóa': return 'marker-van-hoa';
    case 'Lịch Sử': return 'marker-lich-su';
    case 'Kiến Trúc': return 'marker-kien-truc';
    case 'Ẩm Thực': return 'marker-am-thuc';
    default: return '';
  }
};

// Map Marker Updates
const updateMapMarkers = () => {
  if (!map.value) return;

  // Clear existing markers
  markers.value.forEach(m => m.remove());
  markers.value = [];

  // Add new markers
  filteredPlaces.value.forEach((place, index) => {
    if (!map.value) return;

    const popupHtml = `
      <div style="font-family: var(--font-body); padding: 5px; min-width: 180px;">
        <span style="font-size: 0.7rem; font-weight: 700; color: var(--primary); text-transform: uppercase; background-color: var(--primary-light); padding: 2px 6px; border-radius: 4px;">${place.category}</span>
        <h4 style="margin: 6px 0 4px; font-weight: 700; font-size: 0.95rem; color: var(--text-primary);">${place.name}</h4>
        <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 0 0 10px; line-height: 1.4;">${place.summary}</p>
        <a href="https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}" target="_blank" style="display: inline-block; padding: 6px 12px; font-size: 0.75rem; font-weight: 700; background: linear-gradient(135deg, var(--primary), var(--secondary)); color: #fff; border-radius: 6px; text-decoration: none;">Get Directions</a>
      </div>
    `;

    const catClass = getCategoryClass(place.category);
    const isActive = selectedPlace.value?.id === place.id;
    const markerIndex = index + 1;

    const iconHtml = `
      <div class="custom-pin ${catClass} ${isActive ? 'active' : ''}">
        <span class="custom-pin-inner">${markerIndex}</span>
      </div>
    `;

    const customIcon = L.divIcon({
      className: 'custom-marker-wrapper',
      html: iconHtml,
      iconSize: [32, 32],
      iconAnchor: [16, 24]
    });

    const marker = L.marker([place.lat, place.lng], { icon: customIcon })
      .addTo(map.value)
      .bindPopup(popupHtml);
      
    marker.on('click', () => {
      selectedPlace.value = place;
    });

    markers.value.push(marker);
  });

  // Fit bounds if we have markers
  if (markers.value.length > 0) {
    const group = L.featureGroup(markers.value);
    map.value.fitBounds(group.getBounds().pad(0.15));
  }
};
</script>

<style scoped>
.public-area {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 56px);
}

.area-sidebar-header {
  position: relative;
  background: linear-gradient(135deg, #1e1b4b, #311042);
  color: #ffffff;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
  overflow: hidden;
}

.banner-overlay {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.15), transparent 50%);
  pointer-events: none;
}

.header-content {
  position: relative;
  z-index: 1;
}

.area-sidebar-header h2 {
  color: #ffffff;
  font-size: 1.3rem;
  margin: 4px 0 6px;
  font-weight: 700;
}

.badge {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background-color: var(--primary);
  color: #ffffff;
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  display: inline-block;
}

.area-description {
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.825rem;
  line-height: 1.4;
}

.workspace-grid {
  flex: 1;
  display: grid;
  grid-template-columns: 360px 1fr;
  overflow: hidden;
}

.places-sidebar {
  border-right: 1px solid var(--border-color);
  background-color: var(--bg-card);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.search-filter-box {
  padding: 20px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.search-group {
  position: relative;
  margin-bottom: 0;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  pointer-events: none;
}

.search-group .form-control {
  padding-left: 44px;
  font-size: 0.9rem;
}

.category-filters {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.filter-chip {
  padding: 6px 12px;
  border-radius: var(--radius-full);
  border: 1px solid var(--border-color);
  background-color: var(--bg-app);
  color: var(--text-secondary);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all var(--transition-fast);
}

.filter-chip:hover {
  border-color: var(--border-hover);
  color: var(--text-primary);
}

.filter-chip.active {
  background-color: var(--primary);
  border-color: var(--primary);
  color: #ffffff;
}

.places-list {
  flex: 1;
  overflow-y: auto;
  padding: 12px 20px;
}

.list-header {
  margin-bottom: 12px;
}

.list-header h3 {
  font-size: 1rem;
  color: var(--text-secondary);
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.place-item {
  padding: 16px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  background-color: var(--bg-card);
  margin-bottom: 12px;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.place-item:hover {
  border-color: var(--border-hover);
  transform: translateY(-2px);
}

.place-item.active {
  border-color: var(--primary);
  box-shadow: 0 0 0 1px var(--primary);
  background-color: var(--primary-light);
}

.place-meta {
  margin-bottom: 6px;
}

.place-category-badge {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--primary);
  background-color: rgba(99, 102, 241, 0.1);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
}

.place-item h4 {
  font-size: 1.05rem;
  margin-bottom: 4px;
}

.place-summary {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

.place-actions {
  margin-top: 12px;
  display: flex;
  gap: 8px;
}

.btn-xs {
  font-size: 0.75rem;
  padding: 6px 12px;
  border-radius: var(--radius-sm);
}

.map-section {
  position: relative;
  height: 100%;
}

.map-frame {
  width: 100%;
  height: 100%;
  z-index: 10;
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

/* Custom Leaflet Marker Styling */
:deep(.custom-marker-wrapper) {
  background: none !important;
  border: none !important;
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.custom-pin) {
  width: 30px;
  height: 30px;
  border-radius: 50% 50% 50% 0;
  background: var(--marker-color, var(--primary));
  position: absolute;
  transform: rotate(-45deg);
  left: 50%;
  top: 50%;
  margin: -24px 0 0 -15px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.35), 0 0 0 2px #ffffff;
  transition: all var(--transition-normal);
}

:deep(.custom-pin::after) {
  content: '';
  width: 10px;
  height: 10px;
  background: #ffffff;
  position: absolute;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all var(--transition-normal);
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
  width: 6px;
  height: 6px;
  background: var(--marker-color, var(--primary));
}

@media (max-width: 768px) {
  .public-area {
    height: auto;
  }
  
  .workspace-grid {
    grid-template-columns: 1fr;
    height: auto;
    overflow: visible;
  }
  
  .places-sidebar {
    height: 400px;
    border-right: none;
    border-bottom: 1px solid var(--border-color);
  }
  
  .map-section {
    height: 450px;
  }
}
</style>
