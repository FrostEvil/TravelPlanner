// import { startLan, startLon } from "@/constants/starterMarkerCoords";

// function getDistanceToStartingCity(lat: number, lon: number) {
//   const R = 6371; // Radius of the earth in km
//   const dLat = deg2rad(lat - startLan); // deg2rad below
//   const dLon = deg2rad(lon - startLon);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(deg2rad(startLan)) *
//       Math.cos(deg2rad(lat)) *
//       Math.sin(dLon / 2) *
//       Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   const d = R * c; // Distance in km
//   return d;
// }

// function deg2rad(deg: number) {
//   return deg * (Math.PI / 180);
// }

// export default getDistanceToStartingCity;
