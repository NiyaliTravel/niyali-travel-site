// Type definitions for Google Maps API
// This file provides basic type definitions for Google Maps JavaScript API

declare global {
  interface Window {
    google: typeof google;
  }
}

declare namespace google {
  namespace maps {
    class Map {
      constructor(container: HTMLElement, options?: MapOptions);
      setCenter(latlng: LatLng | LatLngLiteral): void;
      setZoom(zoom: number): void;
      getCenter(): LatLng;
      getZoom(): number;
    }

    class Marker {
      constructor(options?: MarkerOptions);
      setMap(map: Map | null): void;
      setPosition(latlng: LatLng | LatLngLiteral): void;
    }

    class Geocoder {
      geocode(request: GeocoderRequest, callback: (results: GeocoderResult[], status: GeocoderStatus) => void): void;
    }

    class DistanceMatrixService {
      getDistanceMatrix(request: DistanceMatrixRequest, callback: (response: DistanceMatrixResponse, status: DistanceMatrixStatus) => void): void;
    }

    namespace places {
      class PlacesService {
        constructor(attrContainer: HTMLDivElement);
        getDetails(request: PlaceDetailsRequest, callback: (place: PlaceResult, status: PlacesServiceStatus) => void): void;
        nearbySearch(request: NearbySearchRequest, callback: (results: PlaceResult[], status: PlacesServiceStatus) => void): void;
      }
    }

    interface MapOptions {
      center?: LatLng | LatLngLiteral;
      zoom?: number;
      mapTypeId?: MapTypeId;
    }

    interface MarkerOptions {
      position?: LatLng | LatLngLiteral;
      map?: Map | null;
      title?: string;
    }

    interface GeocoderRequest {
      address?: string;
      location?: LatLng | LatLngLiteral;
    }

    interface GeocoderResult {
      address_components: GeocoderAddressComponent[];
      formatted_address: string;
      geometry: GeocoderGeometry;
      place_id: string;
      plus_code?: GeocoderPlusCode;
      types: string[];
    }

    interface GeocoderAddressComponent {
      long_name: string;
      short_name: string;
      types: string[];
    }

    interface GeocoderGeometry {
      bounds: LatLngBounds;
      location: LatLng;
      location_type: GeocoderLocationType;
      viewport: LatLngBounds;
    }

    interface GeocoderPlusCode {
      compound_code: string;
      global_code: string;
    }

    interface DistanceMatrixRequest {
      origins: (LatLng | LatLngLiteral)[];
      destinations: (LatLng | LatLngLiteral)[];
      travelMode: TravelMode;
      unitSystem: UnitSystem;
      avoidHighways?: boolean;
      avoidTolls?: boolean;
    }

    interface DistanceMatrixResponse {
      rows: DistanceMatrixResponseRow[];
    }

    interface DistanceMatrixResponseRow {
      elements: DistanceMatrixResponseElement[];
    }

    interface DistanceMatrixResponseElement {
      distance: Distance;
      duration: Duration;
      status: DistanceMatrixElementStatus;
    }

    interface Distance {
      text: string;
      value: number;
    }

    interface Duration {
      text: string;
      value: number;
    }

    interface PlaceDetailsRequest {
      placeId: string;
    }

    interface PlaceResult {
      address_components: GeocoderAddressComponent[];
      adr_address: string;
      formatted_address: string;
      geometry: PlaceGeometry;
      icon: string;
      id: string;
      name: string;
      place_id: string;
      plus_code?: GeocoderPlusCode;
      reference: string;
      scope: string;
      types: string[];
      url: string;
      utc_offset: number;
      vicinity: string;
    }

    interface PlaceGeometry {
      location: LatLng;
      viewport: LatLngBounds;
    }

    interface NearbySearchRequest {
      location: LatLng | LatLngLiteral;
      radius: number;
      type?: string;
    }

    class LatLng {
      constructor(lat: number, lng: number);
      lat(): number;
      lng(): number;
    }

    interface LatLngLiteral {
      lat: number;
      lng: number;
    }

    class LatLngBounds {
      constructor(sw?: LatLng | LatLngLiteral, ne?: LatLng | LatLngLiteral);
    }

    enum MapTypeId {
      ROADMAP = "roadmap",
      SATELLITE = "satellite",
      HYBRID = "hybrid",
      TERRAIN = "terrain"
    }

    enum GeocoderStatus {
      OK = "OK",
      ZERO_RESULTS = "ZERO_RESULTS",
      OVER_DAILY_LIMIT = "OVER_DAILY_LIMIT",
      OVER_QUERY_LIMIT = "OVER_QUERY_LIMIT",
      REQUEST_DENIED = "REQUEST_DENIED",
      INVALID_REQUEST = "INVALID_REQUEST",
      UNKNOWN_ERROR = "UNKNOWN_ERROR"
    }

    enum GeocoderLocationType {
      ROOFTOP = "ROOFTOP",
      RANGE_INTERPOLATED = "RANGE_INTERPOLATED",
      GEOMETRIC_CENTER = "GEOMETRIC_CENTER",
      APPROXIMATE = "APPROXIMATE"
    }

    enum TravelMode {
      DRIVING = "DRIVING",
      WALKING = "WALKING",
      BICYCLING = "BICYCLING",
      TRANSIT = "TRANSIT"
    }

    enum UnitSystem {
      METRIC = 0,
      IMPERIAL = 1
    }

    enum DistanceMatrixStatus {
      OK = "OK",
      INVALID_REQUEST = "INVALID_REQUEST",
      OVER_QUERY_LIMIT = "OVER_QUERY_LIMIT",
      REQUEST_DENIED = "REQUEST_DENIED",
      UNKNOWN_ERROR = "UNKNOWN_ERROR"
    }

    enum DistanceMatrixElementStatus {
      OK = "OK",
      ZERO_RESULTS = "ZERO_RESULTS",
      NOT_FOUND = "NOT_FOUND"
    }

    enum PlacesServiceStatus {
      OK = "OK",
      ZERO_RESULTS = "ZERO_RESULTS",
      OVER_QUERY_LIMIT = "OVER_QUERY_LIMIT",
      REQUEST_DENIED = "REQUEST_DENIED",
      INVALID_REQUEST = "INVALID_REQUEST",
      UNKNOWN_ERROR = "UNKNOWN_ERROR"
    }
  }
}

export {};