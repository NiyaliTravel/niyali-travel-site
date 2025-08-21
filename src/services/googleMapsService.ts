/**
 * Google Maps Service for NiyaliTravel.com
 * Handles integration with Google Maps API for location services
 */

// Google Maps API Key (should be stored in environment variables)
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

/**
 * Initialize Google Maps
 * @returns Promise that resolves when Google Maps API is loaded
 */
export const initializeGoogleMaps = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if Google Maps is already loaded
    if (typeof window.google !== 'undefined' && typeof window.google.maps !== 'undefined') {
      resolve();
      return;
    }

    // Create script element for Google Maps API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&loading=async`;
    script.async = true;
    script.defer = true;

    // Handle script load
    script.onload = () => {
      if (typeof window.google !== 'undefined' && typeof window.google.maps !== 'undefined') {
        resolve();
      } else {
        reject(new Error('Google Maps API failed to load'));
      }
    };

    // Handle script error
    script.onerror = () => {
      reject(new Error('Failed to load Google Maps API'));
    };

    // Add script to document
    document.head.appendChild(script);
  });
};

/**
 * Get geolocation from address
 * @param address Address string
 * @returns Promise with geolocation data
 */
export const getGeolocation = async (address: string): Promise<google.maps.GeocoderResult | null> => {
  try {
    await initializeGoogleMaps();
    
    const geocoder = new google.maps.Geocoder();
    const result = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results && results.length > 0) {
          resolve(results);
        } else {
          reject(new Error(`Geocoding failed: ${status}`));
        }
      });
    });

    return result[0];
  } catch (error) {
    console.error('Error getting geolocation:', error);
    return null;
  }
};

/**
 * Get place details from place ID
 * @param placeId Google Place ID
 * @returns Promise with place details
 */
export const getPlaceDetails = async (placeId: string): Promise<google.maps.places.PlaceResult | null> => {
  try {
    await initializeGoogleMaps();
    
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    const result = await new Promise<google.maps.places.PlaceResult>((resolve, reject) => {
      service.getDetails({ placeId }, (place, status) => {
        if (status === 'OK' && place) {
          resolve(place);
        } else {
          reject(new Error(`Place details failed: ${status}`));
        }
      });
    });

    return result;
  } catch (error) {
    console.error('Error getting place details:', error);
    return null;
  }
};

/**
 * Search places near a location
 * @param location Center location
 * @param radius Search radius in meters
 * @param type Place type
 * @returns Promise with search results
 */
export const searchNearbyPlaces = async (
  location: google.maps.LatLng | google.maps.LatLngLiteral,
  radius: number,
  type: string
): Promise<google.maps.places.PlaceResult[] | null> => {
  try {
    await initializeGoogleMaps();
    
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    const request: google.maps.places.NearbySearchRequest = {
      location,
      radius,
      type,
    };
    
    const results = await new Promise<google.maps.places.PlaceResult[]>((resolve, reject) => {
      service.nearbySearch(request, (results, status) => {
        if (status === 'OK' && results) {
          resolve(results);
        } else {
          reject(new Error(`Nearby search failed: ${status}`));
        }
      });
    });

    return results;
  } catch (error) {
    console.error('Error searching nearby places:', error);
    return null;
  }
};

/**
 * Create a map instance
 * @param container Element to attach map to
 * @param options Map options
 * @returns Promise with map instance
 */
export const createMap = async (
  container: HTMLElement,
  options: google.maps.MapOptions
): Promise<google.maps.Map | null> => {
  try {
    await initializeGoogleMaps();
    
    // Create map instance
    const map = new google.maps.Map(container, options);
    return map;
  } catch (error) {
    console.error('Error creating map:', error);
    return null;
  }
};

/**
 * Add marker to map
 * @param map Map instance
 * @param position Marker position
 * @param title Marker title
 * @returns Marker instance
 */
export const addMarker = (
  map: google.maps.Map,
  position: google.maps.LatLng | google.maps.LatLngLiteral,
  title?: string
): google.maps.Marker | null => {
  try {
    const marker = new google.maps.Marker({
      position,
      map,
      title,
    });
    
    return marker;
  } catch (error) {
    console.error('Error adding marker:', error);
    return null;
  }
};

/**
 * Calculate distance between two points
 * @param origin Origin point
 * @param destination Destination point
 * @returns Promise with distance in meters
 */
export const calculateDistance = async (
  origin: google.maps.LatLng | google.maps.LatLngLiteral,
  destination: google.maps.LatLng | google.maps.LatLngLiteral
): Promise<number | null> => {
  try {
    await initializeGoogleMaps();
    
    const service = new google.maps.DistanceMatrixService();
    const result = await new Promise<google.maps.DistanceMatrixResponse>((resolve, reject) => {
      service.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
      }, (response, status) => {
        if (status === 'OK' && response) {
          resolve(response);
        } else {
          reject(new Error(`Distance calculation failed: ${status}`));
        }
      });
    });

    if (result.rows[0].elements[0].status === 'OK') {
      return result.rows[0].elements[0].distance.value;
    }
    
    return null;
  } catch (error) {
    console.error('Error calculating distance:', error);
    return null;
  }
};

export default {
  initializeGoogleMaps,
  getGeolocation,
  getPlaceDetails,
  searchNearbyPlaces,
  createMap,
  addMarker,
  calculateDistance,
};