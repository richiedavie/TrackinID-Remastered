export const initialVehicles = [
  {
    id: 'v1',
    name: 'Logistics Van #01',
    plate: 'B 1234 NJK',
    type: 'Cargo Van',
    status: 'online', // online, idle, offline
    speed: 48, // km/h
    fuel: 78, // %
    mileage: 42350, // km
    health: 'green', // green, yellow, red
    driver: 'Budi Santoso',
    location: { lat: -6.2088, lng: 106.8456, address: 'Jl. Sudirman, Jakarta Pusat' },
    geofenceStatus: 'inside',
    riskScore: 12,
    components: {
      oil: { status: 85, label: 'Good' },
      brakes: { status: 40, label: 'Attention Soon' },
      tires: { status: 90, label: 'Good' },
      battery: { status: 75, label: 'Good' }
    }
  },
  {
    id: 'v2',
    name: 'Heavy Truck TX-04',
    plate: 'B 8899 FLT',
    type: 'Semi Truck',
    status: 'online',
    speed: 62,
    fuel: 45,
    mileage: 128400,
    health: 'yellow',
    driver: 'Siti Rahma',
    location: { lat: -6.1754, lng: 106.8272, address: 'Jl. Gajah Mada, Jakarta Barat' },
    geofenceStatus: 'inside',
    riskScore: 68, // High risk prediction for Elite tier
    riskExplanation: 'Battery health trending down & brake pad wear elevated — service recommended within 14 days.',
    components: {
      oil: { status: 60, label: 'Fair' },
      brakes: { status: 25, label: 'Service Needed' },
      tires: { status: 80, label: 'Good' },
      battery: { status: 30, label: 'Service Needed' }
    }
  },
  {
    id: 'v3',
    name: 'Delivery Express #08',
    plate: 'B 4567 LGT',
    type: 'Box Truck',
    status: 'idle',
    speed: 0,
    fuel: 92,
    mileage: 18900,
    health: 'green',
    driver: 'Ahmad Fauzi',
    location: { lat: -6.2250, lng: 106.8000, address: 'Kuningan, Jakarta Selatan' },
    geofenceStatus: 'inside',
    riskScore: 8,
    components: {
      oil: { status: 95, label: 'Excellent' },
      brakes: { status: 90, label: 'Good' },
      tires: { status: 88, label: 'Good' },
      battery: { status: 92, label: 'Good' }
    }
  },
  {
    id: 'v4',
    name: 'Executive Sedan #02',
    plate: 'B 9012 RNT',
    type: 'Sedan',
    status: 'offline',
    speed: 0,
    fuel: 65,
    mileage: 65120,
    health: 'red',
    driver: 'Unassigned',
    location: { lat: -6.1900, lng: 106.8100, address: 'Tanah Abang Depot' },
    geofenceStatus: 'outside',
    riskScore: 85,
    riskExplanation: 'Engine warning light detected alongside geofence exit.',
    components: {
      oil: { status: 15, label: 'Critical' },
      brakes: { status: 60, label: 'Fair' },
      tires: { status: 55, label: 'Fair' },
      battery: { status: 40, label: 'Attention Soon' }
    }
  },
  {
    id: 'v5',
    name: 'City Pickup #05',
    plate: 'B 3344 PCK',
    type: 'Pickup Truck',
    status: 'online',
    speed: 35,
    fuel: 55,
    mileage: 38200,
    health: 'green',
    driver: 'Dewi Lestari',
    location: { lat: -6.2400, lng: 106.8500, address: 'Cawang, Jakarta Timur' },
    geofenceStatus: 'inside',
    riskScore: 15,
    components: {
      oil: { status: 80, label: 'Good' },
      brakes: { status: 75, label: 'Good' },
      tires: { status: 70, label: 'Good' },
      battery: { status: 85, label: 'Good' }
    }
  }
];
