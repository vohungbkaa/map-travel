<template>
  <div class="public-area animate-fade-in">
    <!-- Drawer Backdrop Overlay for Mobile -->
    <div 
      v-if="isMobileDrawerOpen" 
      class="drawer-backdrop" 
      @click="isMobileDrawerOpen = false"
    ></div>

    <!-- Main Workspace -->
    <div class="workspace-grid">
      <!-- Sidebar List -->
      <aside class="places-sidebar" :class="{ 'mobile-visible': isMobileDrawerOpen }">
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

          <!-- Radius Filter -->
          <div class="radius-filter-box">
            <label for="radius-select" class="radius-label">Radius from center:</label>
            <select id="radius-select" v-model="activeRadius" class="form-control-select">
              <option :value="null">Show All</option>
              <option :value="1">Within 1 km</option>
              <option :value="2">Within 2 km</option>
              <option :value="5">Within 5 km</option>
            </select>
          </div>
        </div>

        <!-- Places List -->
        <div class="places-list">
          <div class="list-header">
            <h3>Key Landmarks ({{ filteredPlaces.length }})</h3>
          </div>
          
          <div v-if="filteredPlaces.length === 0" class="empty-state">
            <p>No places match your search or filters in this scope.</p>
          </div>
          
          <div 
            v-for="(place, index) in filteredPlaces" 
            :key="place.id"
            class="place-item"
            :class="{ active: selectedPlace?.id === place.id }"
            @click="selectPlace(place)"
          >
            <div class="place-meta">
              <span class="place-index">{{ index + 1 }}</span>
              <span class="place-category-badge">{{ place.category }}</span>
              <span class="place-distance">~{{ place.distance.toFixed(2) }} km</span>
            </div>
            <h4>{{ place.name }}</h4>
            <p class="place-summary">{{ place.summary }}</p>
          </div>
        </div>
      </aside>

      <!-- Map Display Container -->
      <section class="map-section">
        <PublicMap 
          v-if="areaConfig"
          :places="filteredPlaces"
          :selectedPlace="selectedPlace"
          :areaConfig="areaConfig"
          @select-place="selectPlace"
        />

        <!-- Floating Detail Sheet (Without backdrop overlay) -->
        <Transition name="slide-drawer">
          <div 
            v-if="selectedPlace" 
            class="detail-sheet"
            :class="[drawerWidthClass, { 'is-collapsed': !isSheetExpanded }]"
          >
          <!-- Drawer Collapse/Expand Toggle Tab -->
          <button 
            class="drawer-toggle-tab" 
            @click="isSheetExpanded = !isSheetExpanded"
            :aria-label="isSheetExpanded ? 'Collapse details panel' : 'Expand details panel'"
          >
            <svg 
              v-if="isSheetExpanded" 
              xmlns="http://www.w3.org/2000/svg" 
              width="14" 
              height="14" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2.5" 
              viewBox="0 0 24 24"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
            <svg 
              v-else 
              xmlns="http://www.w3.org/2000/svg" 
              width="14" 
              height="14" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2.5" 
              viewBox="0 0 24 24"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <!-- Sheet Header Row (Title, category & close button) -->
          <div class="sheet-header-row">
            <div class="sheet-title-container">
              <span class="sheet-category-badge">{{ selectedPlace.category }}</span>
              <h3>{{ selectedPlace.name }}</h3>
            </div>
            <button class="btn-close-sheet" @click="selectedPlace = null" aria-label="Close sheet">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <!-- Media Horizontal List View (Scroll ngang) -->
          <div 
            v-if="selectedPlace.media && selectedPlace.media.length > 0" 
            class="media-horizontal-list"
            ref="carouselRef"
            @mousedown="onMouseDown"
            @mousemove="onMouseMove"
            @mouseup="onMouseUp"
            @mouseleave="onMouseLeave"
            @scroll="onScroll"
          >
            <div 
              v-for="item in selectedPlace.media" 
              :key="item.id" 
              class="media-card"
              @click="openMediaViewer(item)"
            >
              <img :src="getMediaThumbnail(item, selectedPlace)" class="media-card-img" draggable="false" />
              <div v-if="item.type === 'video'" class="media-card-play-overlay">
                <div class="play-btn-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
              <div v-if="item.title" class="media-card-title-overlay">
                <span>{{ item.title }}</span>
              </div>
            </div>
          </div>

          <!-- Sheet Content Body -->
          <div class="detail-sheet-body">
            <p class="sheet-description">{{ selectedPlace.description }}</p>

            <div class="sheet-meta-fields">
              <div class="meta-field">
                <strong>Khoảng cách:</strong> ~{{ selectedPlace.distance.toFixed(2) }} km từ tâm khu vực
              </div>
              <div class="meta-field">
                <strong>Thời điểm tốt nhất:</strong> {{ selectedPlace.bestTime }}
              </div>
              <div class="meta-field">
                <strong>Mẹo nhỏ:</strong> {{ selectedPlace.localTip }}
              </div>
            </div>

            <div class="sheet-actions">
              <a 
                :href="`https://www.google.com/maps/dir/?api=1&destination=${selectedPlace.lat},${selectedPlace.lng}`" 
                target="_blank" 
                class="btn btn-primary"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
                Google Maps
              </a>
              <a 
                :href="`https://www.openstreetmap.org/directions?to=${selectedPlace.lat},${selectedPlace.lng}`" 
                target="_blank" 
                class="btn btn-secondary"
              >
                OSM Navigation
              </a>
            </div>
          </div>
        </div>
      </Transition>
    </section>
    </div>

    <!-- Media Fullscreen Viewer Modal -->
    <div 
      v-if="activeViewerMedia" 
      class="media-viewer-overlay animate-fade-in"
      @click="closeMediaViewer"
    >
      <div class="media-viewer-content" @click.stop>
        <button class="btn-close-viewer" @click="closeMediaViewer" aria-label="Close viewer">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        
        <div class="viewer-media-container">
          <!-- Image View -->
          <img 
            v-if="activeViewerMedia.type === 'image'" 
            :src="activeViewerMedia.url" 
            class="viewer-img" 
            alt="Viewer media" 
          />
          
          <!-- Video View -->
          <div v-else-if="activeViewerMedia.type === 'video'" class="viewer-video-wrapper">
            <!-- Direct Video MP4 -->
            <video 
              v-if="isVideoFile(activeViewerMedia.url)" 
              :src="activeViewerMedia.url" 
              controls 
              autoplay 
              class="viewer-video"
            ></video>
            
            <!-- YouTube Embed -->
            <iframe 
              v-else-if="getYoutubeId(activeViewerMedia.url)" 
              :src="getYoutubeEmbedUrl(activeViewerMedia.url)" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen 
              class="viewer-iframe"
            ></iframe>
            
            <!-- Vimeo Embed -->
            <iframe 
              v-else-if="getVimeoId(activeViewerMedia.url)" 
              :src="getVimeoEmbedUrl(activeViewerMedia.url)" 
              frameborder="0" 
              allow="autoplay; fullscreen; picture-in-picture" 
              allowfullscreen 
              class="viewer-iframe"
            ></iframe>
            
            <!-- Fallback Embed -->
            <iframe 
              v-else 
              :src="activeViewerMedia.url" 
              frameborder="0" 
              allowfullscreen 
              class="viewer-iframe"
            ></iframe>
          </div>
        </div>
        
        <div v-if="activeViewerMedia.title" class="viewer-caption">
          {{ activeViewerMedia.title }}
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, inject } from 'vue';
import type { Ref } from 'vue';
import { useRoute } from 'vue-router';
import PublicMap from '../../components/map/PublicMap.vue';
import { mockPlaces } from '../../data/mockPlaces';
import type { Place, PlaceMedia } from '../../data/mockPlaces';
import { MAP_CONFIG } from '../../config/map';

// Area metadata from route params
const route = useRoute();
const areaSlug = computed(() => route.params.areaSlug as string || 'ha-noi');

const areaConfig = computed(() => {
  return MAP_CONFIG.areas[areaSlug.value] || MAP_CONFIG.areas[MAP_CONFIG.defaultAreaSlug];
});

const areaName = computed(() => areaConfig.value?.name || 'Unknown Area');
const areaDescription = computed(() => areaConfig.value?.description || '');

interface PlaceWithDistance extends Place {
  distance: number;
}

// Selected Place State
const selectedPlace = ref<PlaceWithDistance | null>(null);
const isSheetExpanded = ref(true);

// Inject mobile menu drawer state from PublicLayout
const isMobileDrawerOpen = inject<Ref<boolean>>('isMobileDrawerOpen', ref(false));

const drawerWidthClass = computed(() => {
  if (!selectedPlace.value) return '';
  const mediaCount = selectedPlace.value.media?.length || 0;
  if (mediaCount === 0) return 'media-count-0';
  if (mediaCount === 1) return 'media-count-1';
  if (mediaCount === 2) return 'media-count-2';
  return 'media-count-3-plus';
});

// Reset selection on area change
watch(areaSlug, () => {
  selectedPlace.value = null;
  isSheetExpanded.value = true;
});

// Auto expand sheet on selection
watch(selectedPlace, (newVal) => {
  if (newVal) {
    isSheetExpanded.value = true;
  }
});

// Search & filter states
const searchQuery = ref('');
const activeCategory = ref('all');
const activeRadius = ref<number | null>(null);

// Dynamic center coordinates for distance computing
const centerCoords = computed(() => {
  const center = areaConfig.value?.center || [105.8521, 21.0285];
  return { lng: center[0], lat: center[1] };
});

// Helper to check if point falls within bounds bounding box
const isPlaceInBounds = (place: { lat: number; lng: number }, bounds: [[number, number], [number, number]]) => {
  const [[west, south], [east, north]] = bounds;
  return place.lng >= west && place.lng <= east && place.lat >= south && place.lat <= north;
};

// Haversine formula to compute distance in km
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Calculate distances from dynamic center
const placesWithDistance = computed(() => {
  return mockPlaces.map(place => {
    const distance = calculateDistance(centerCoords.value.lat, centerCoords.value.lng, place.lat, place.lng);
    return {
      ...place,
      distance
    };
  });
});

// Dynamic category list from all available places
const categories = computed(() => {
  return Array.from(new Set(mockPlaces.map(p => p.category)));
});

// Apply filters: bounds scope, search, category, and radius
const filteredPlaces = computed(() => {
  const currentBounds = areaConfig.value?.bounds;
  return placesWithDistance.value.filter(place => {
    // 1. Scope boundary filter
    if (currentBounds && !isPlaceInBounds(place, currentBounds)) {
      return false;
    }
    
    // 2. Search filter
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          place.summary.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          place.description.toLowerCase().includes(searchQuery.value.toLowerCase());
    
    // 3. Category filter
    const matchesCategory = activeCategory.value === 'all' || place.category === activeCategory.value;
    
    // 4. Radius filter
    const matchesRadius = activeRadius.value === null || place.distance <= activeRadius.value;
    
    return matchesSearch && matchesCategory && matchesRadius;
  });
});

// Select a place
const selectPlace = (place: Place) => {
  const foundPlace = placesWithDistance.value.find(p => p.id === place.id);
  if (foundPlace) {
    selectedPlace.value = foundPlace;
    // Close mobile menu drawer when landmark is selected
    isMobileDrawerOpen.value = false;
  }
};

// Media Carousel touch / click-drag handlers
const carouselRef = ref<HTMLDivElement | null>(null);
const currentSlideIndex = ref(0);
let isDown = false;
let startX = 0;
let scrollLeft = 0;

// Reset slide index when selectedPlace changes
watch(selectedPlace, () => {
  currentSlideIndex.value = 0;
  if (carouselRef.value) {
    carouselRef.value.scrollLeft = 0;
  }
});

const onMouseDown = (e: MouseEvent) => {
  if (!carouselRef.value) return;
  isDown = true;
  carouselRef.value.classList.add('grabbing');
  startX = e.pageX - carouselRef.value.offsetLeft;
  scrollLeft = carouselRef.value.scrollLeft;
};

const onMouseUp = () => {
  isDown = false;
  if (carouselRef.value) {
    carouselRef.value.classList.remove('grabbing');
  }
};

const onMouseLeave = () => {
  isDown = false;
  if (carouselRef.value) {
    carouselRef.value.classList.remove('grabbing');
  }
};

const onMouseMove = (e: MouseEvent) => {
  if (!isDown || !carouselRef.value) return;
  e.preventDefault();
  const x = e.pageX - carouselRef.value.offsetLeft;
  const walk = (x - startX) * 1.5;
  carouselRef.value.scrollLeft = scrollLeft - walk;
};

const onScroll = () => {
  if (!carouselRef.value) return;
  const width = carouselRef.value.clientWidth;
  if (width === 0) return;
  currentSlideIndex.value = Math.round(carouselRef.value.scrollLeft / width);
};

// Fullscreen media viewer logic
const activeViewerMedia = ref<PlaceMedia | null>(null);

const openMediaViewer = (media: PlaceMedia) => {
  activeViewerMedia.value = media;
};

const closeMediaViewer = () => {
  activeViewerMedia.value = null;
};

const getYoutubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const getMediaThumbnail = (item: PlaceMedia, place: Place) => {
  if (item.thumbnailUrl) return item.thumbnailUrl;
  if (item.type === 'video') {
    if (item.provider === 'youtube') {
      const id = getYoutubeId(item.url);
      if (id) {
        return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
      }
    }
  }
  return item.url || place.coverUrl;
};

const getYoutubeEmbedUrl = (url: string) => {
  const id = getYoutubeId(url);
  return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : url;
};

const getVimeoId = (url: string) => {
  const regExp = /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/posts\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

const getVimeoEmbedUrl = (url: string) => {
  const id = getVimeoId(url);
  return id ? `https://player.vimeo.com/video/${id}?autoplay=1` : url;
};

const isVideoFile = (url: string) => {
  return url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg');
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    closeMediaViewer();
  }
};

watch(activeViewerMedia, (newVal) => {
  if (newVal) {
    window.addEventListener('keydown', handleKeyDown);
  } else {
    window.removeEventListener('keydown', handleKeyDown);
  }
});
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
  grid-template-columns: 380px 1fr;
  overflow: hidden;
  position: relative;
}

.places-sidebar {
  border-right: 1px solid var(--border-color);
  background-color: var(--bg-card);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.search-filter-box {
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 12px;
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

.radius-filter-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-top: 1px solid var(--border-color);
  padding-top: 10px;
}

.radius-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.form-control-select {
  padding: 6px 12px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  background-color: var(--bg-app);
  color: var(--text-primary);
  font-size: 0.8rem;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  transition: border-color var(--transition-fast);
}

.form-control-select:focus {
  border-color: var(--primary);
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
  display: flex;
  align-items: center;
  gap: 8px;
}

.place-index {
  font-size: 0.75rem;
  font-weight: 800;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: var(--primary);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
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

.place-distance {
  font-size: 0.725rem;
  color: var(--text-muted);
  font-weight: 600;
  margin-left: auto;
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

.map-section {
  position: relative;
  height: 100%;
  overflow: hidden;
}

/* Detail Sheet (Floating Drawer Sliding Right-to-Left) */
.detail-sheet {
  position: absolute;
  top: 16px;
  right: 16px;
  bottom: 16px;
  max-height: calc(100% - 32px);
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  z-index: 90;
  display: flex;
  flex-direction: column;
  overflow: visible; /* Let toggle tab stick out to the left */
  transition: width 0.3s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity var(--transition-normal);
}

/* Dynamic width based on media count on Desktop */
.detail-sheet.media-count-0,
.detail-sheet.media-count-1 {
  width: 380px;
}

.detail-sheet.media-count-2 {
  width: 480px;
}

.detail-sheet.media-count-3-plus {
  width: 580px;
}

@media (max-width: 1200px) {
  .detail-sheet.media-count-3-plus {
    width: 480px;
  }
}

@media (max-width: 1024px) {
  .detail-sheet.media-count-2,
  .detail-sheet.media-count-3-plus {
    width: 420px;
  }
}

.detail-sheet.is-collapsed {
  transform: translateX(calc(100% + 16px));
}

/* Slide Drawer Transition */
.slide-drawer-enter-active,
.slide-drawer-leave-active {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
}

.slide-drawer-enter-from,
.slide-drawer-leave-to {
  transform: translateX(calc(100% + 16px));
  opacity: 0;
}

.drawer-toggle-tab {
  position: absolute;
  left: -32px;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 56px;
  border-radius: var(--radius-sm) 0 0 var(--radius-sm);
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-right: none;
  box-shadow: -4px 0 10px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-secondary);
  transition: background-color var(--transition-fast), color var(--transition-fast);
}

.drawer-toggle-tab:hover {
  background-color: var(--bg-app);
  color: var(--primary);
}

.sheet-header-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px 20px 12px;
  gap: 16px;
  flex-shrink: 0;
}

.sheet-title-container {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-start;
}

.sheet-category-badge {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--primary);
  background-color: var(--primary-light);
  padding: 2px 8px;
  border-radius: var(--radius-sm);
}

.sheet-title-container h3 {
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.35;
}

.btn-close-sheet {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--bg-app);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: background-color var(--transition-fast);
  flex-shrink: 0;
}

.btn-close-sheet:hover {
  background-color: var(--border-hover);
}

/* Media Horizontal Scrollable List */
.media-horizontal-list {
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding: 0 20px 14px;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  cursor: grab;
  flex-shrink: 0;
}

.media-horizontal-list.grabbing {
  cursor: grabbing;
}

.media-horizontal-list::-webkit-scrollbar {
  display: none;
}

.media-card {
  flex: 0 0 200px;
  height: 130px;
  border-radius: var(--radius-md);
  overflow: hidden;
  position: relative;
  scroll-snap-align: start;
  cursor: pointer;
  border: 1px solid var(--border-color);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.media-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.media-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.media-card-play-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
}

.play-btn-circle {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(8px);
  border: 2px solid #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.media-card:hover .play-btn-circle {
  transform: scale(1.1);
  background-color: rgba(255, 255, 255, 0.4);
}

.media-card-title-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 18px 12px 8px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.75), transparent);
  color: #ffffff;
  font-size: 0.725rem;
  font-weight: 500;
  pointer-events: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Detail sheet body */
.detail-sheet-body {
  flex: 1;
  overflow-y: auto;
  padding: 0 20px 20px;
}

.sheet-description {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 14px;
}

.sheet-meta-fields {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: var(--bg-app);
  padding: 14px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  margin-bottom: 20px;
}

.meta-field {
  font-size: 0.8rem;
  line-height: 1.45;
  color: var(--text-secondary);
}

.meta-field strong {
  color: var(--text-primary);
}

.sheet-actions {
  display: flex;
  gap: 12px;
}

.sheet-actions .btn {
  flex: 1;
}

/* Media Viewer Overlay (Fullscreen) */
.media-viewer-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(9, 13, 22, 0.95);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.media-viewer-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.btn-close-viewer {
  position: absolute;
  top: -48px;
  right: 0;
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  transition: opacity 0.2s;
}

.btn-close-viewer:hover {
  opacity: 0.8;
}

.viewer-media-container {
  max-width: 100%;
  max-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  background-color: #000000;
}

.viewer-img {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
}

.viewer-video-wrapper {
  width: 80vw;
  max-width: 960px;
  aspect-ratio: 16/9;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.viewer-video {
  width: 100%;
  height: 100%;
  border-radius: var(--radius-sm);
}

.viewer-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.viewer-caption {
  margin-top: 16px;
  color: #e2e8f0;
  font-size: 0.95rem;
  font-weight: 500;
  text-align: center;
}

/* Drawer Backdrop Overlay for Mobile */
.drawer-backdrop {
  display: none;
}

@media (max-width: 768px) {
  .drawer-backdrop {
    display: block;
    position: fixed;
    inset: 0;
    background-color: rgba(15, 23, 42, 0.4);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 990; /* Just below the mobile places-sidebar drawer */
  }

  .public-area {
    height: calc(100vh - 56px); /* Fix content container height */
    overflow: hidden;
  }
  
  .workspace-grid {
    display: block; /* Disable grid on mobile */
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  
  .places-sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 320px;
    max-width: 80vw;
    height: 100%;
    z-index: 1000; /* Float above map and details sheet */
    background-color: var(--bg-card);
    border-right: 1px solid var(--border-color);
    box-shadow: 8px 0 24px rgba(0, 0, 0, 0.15);
    transform: translateX(-100%);
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
  
  .places-sidebar.mobile-visible {
    transform: translateX(0) !important;
  }
  
  .map-section {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
    display: block;
  }

  .detail-sheet {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: auto;
    width: 100% !important;
    transform: translateY(0);
    max-height: 75vh;
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.15);
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 110; /* Float above map and other content */
  }

  .detail-sheet.is-collapsed {
    transform: translateY(100%) !important;
  }

  .drawer-toggle-tab {
    left: 50% !important;
    top: -24px !important;
    transform: translateX(-50%) !important;
    width: 56px !important;
    height: 24px !important;
    border-radius: var(--radius-sm) var(--radius-sm) 0 0 !important;
    border: 1px solid var(--border-color) !important;
    border-bottom: none !important;
    box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.08) !important;
  }

  /* Rotate arrows on mobile for vertical drawer */
  .drawer-toggle-tab svg {
    transform: rotate(90deg);
  }

  .detail-sheet.is-collapsed .drawer-toggle-tab svg {
    transform: rotate(-90deg) !important;
  }

  .viewer-video-wrapper {
    width: 90vw;
  }

  /* Slide up/down on mobile for transition entering and leaving */
  .slide-drawer-enter-from,
  .slide-drawer-leave-to {
    transform: translateY(100%) !important;
    opacity: 0;
  }
}
</style>
