// distance formula:
/** Converts numeric degrees to radians */
if (typeof Number.prototype.toRad == 'undefined') {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  }
}

function getDistance(lat1, lon1, lat2, lon2) {
  var R = 6371; // km
  var dLat = (lat2 - lat1).toRad();
  var dLon = (lon2 - lon1).toRad();
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
          Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c / 1.60934; // distance in mtext/javascripti
}

// make array at beginning of function
var distances = [];
// returns distances to all parks in km:
function getAllDistances(obj, userLat, userLon) {
  // loop
  for (var i in obj.features) {
    parkName = obj.features[i].properties.name;
    parkLat = obj.features[i].geometry.coordinates[1];
    parkLon = obj.features[i].geometry.coordinates[0];
    distance = getDistance(parkLat, parkLon, userLat, userLon);
    distances.push([parkName, distance]);
  }
  // return array
  return distances;
}

function sortArray(arr) {
  arr.sort(function(a, b) {
    var valueA, valueB;
    // index of the outer array to sort by:
    var sortBy = 1;
    valueA = a[sortBy]; 
    valueB = b[sortBy];
    if (valueA < valueB) {
        return -1;
    }
    else if (valueA > valueB) {
        return 1;
    }
    return 0;
  }
)}

function formatDistances(arr, id) {
  // sort:
  sortArray(arr);
  // html:
  for (var i in arr) {
    dist = "<tr><td width=30>" + arr[i][1].toFixed(1) + " mi</td><td>" + arr[i][0] + "</td></tr><br>";
    $(id).append(dist);
  }
}
