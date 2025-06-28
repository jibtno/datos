const fs = require('fs');

const listings = require('../public/lamudi-listings.json');

// Minimal manual mapping for demo:
const addressToCoord = {
  "Makati": [121.028, 14.554],
  "Quezon City": [121.0437, 14.6760],
  // ...add mappings as needed
};

const geoJson = {
  type: "FeatureCollection",
  features: listings.map(listing => {
    const city = Object.keys(addressToCoord).find(c => listing.location.includes(c));
    const coords = city ? addressToCoord[city] : [121.000, 14.500];
    return {
      type: "Feature",
      properties: {
        price: listing.price,
        title: listing.title,
        type: "For Sale", // or parse from title
        link: listing.link,
        location: listing.location,
      },
      geometry: {
        type: "Point",
        coordinates: coords,
      }
    };
  })
};

fs.writeFileSync('./public/listings.geojson', JSON.stringify(geoJson, null, 2));
console.log("GeoJSON saved.");