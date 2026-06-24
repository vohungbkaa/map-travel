import json

def is_inside_polygon(x, y, poly):
    num = len(poly)
    j = num - 1
    c = False
    for i in range(num):
        if ((poly[i][1] > y) != (poly[j][1] > y)) and \
                (x < (poly[j][0] - poly[i][0]) * (y - poly[i][1]) / (poly[j][1] - poly[i][1]) + poly[i][0]):
            c = not c
        j = i
    return c

geojson_path = "/Users/vvhung/Documents/local-map-vue-plan/public/data/tien-thang.geojson"

with open(geojson_path, "r", encoding="utf-8") as f:
    geojson_data = json.load(f)

# Extract coordinates ring
coords = geojson_data["geometry"]["coordinates"][0]

points_to_check = [
    {"name": "Đình Bạch Trữ", "lng": 105.6925, "lat": 21.2018},
    {"name": "Đình làng Phú Mỹ", "lng": 105.6582, "lat": 21.1895},
    {"name": "Mô hình dưa lưới", "lng": 105.6770, "lat": 21.2025}
]

print("Checking points against Xã Tiến Thắng boundary polygon:")
for p in points_to_check:
    inside = is_inside_polygon(p["lng"], p["lat"], coords)
    print(f"- {p['name']}: [{p['lng']}, {p['lat']}] -> {'INSIDE' if inside else 'OUTSIDE'}")

# Find some coordinates that are definitely inside the polygon to help position things
inside_points = []
for i in range(0, len(coords), len(coords)//10):
    # A point slightly shifted inside from the border vertices
    v = coords[i]
    # Simple search for points inside: let's print a few vertices themselves
    # Since they are on the boundary, let's find some internal coordinates by averaging
    pass

# Compute simple centroid of the polygon to check if it's inside
sum_lng = sum(pt[0] for pt in coords[:-1])
sum_lat = sum(pt[1] for pt in coords[:-1])
centroid_lng = sum_lng / (len(coords) - 1)
centroid_lat = sum_lat / (len(coords) - 1)
centroid_inside = is_inside_polygon(centroid_lng, centroid_lat, coords)
print(f"\nCentroid: [{centroid_lng:.6f}, {centroid_lat:.6f}] -> {'INSIDE' if centroid_inside else 'OUTSIDE'}")

# Print boundary bounding box
min_lng = min(pt[0] for pt in coords)
max_lng = max(pt[0] for pt in coords)
min_lat = min(pt[1] for pt in coords)
max_lat = max(pt[1] for pt in coords)
print(f"Bounding Box: Lng [{min_lng:.6f} to {max_lng:.6f}], Lat [{min_lat:.6f} to {max_lat:.6f}]")

# Let's list 5 points on the vertices that we can use as references
print("\nSample boundary vertices:")
for i in range(0, len(coords), len(coords)//5):
    print(f"Vertex {i}: [{coords[i][0]:.6f}, {coords[i][1]:.6f}]")
