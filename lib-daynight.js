//Library functions

//The hell does this return? I forgot! D:
function getSunset_epoch(millis, latitude, longitude)
{
  var data = sunriseCalculus(millis/1000.0, latitude, longitude);
  
  //Sunrise
  var Jset = 2451545.0009 + (data.Wo + longitude) / 360 + data.n + 0.0053 * Math.sin(data.M) - 0.0069 * Math.sin(2*data.y);
  
  return julianToEpoch(Jset);
}

function getSunrise_epoch(millis, latitude, longitude)
{
  var data = sunriseCalculus(millis/1000.0, latitude, longitude);
  
  var Jset = 2451545.0009 + (data.Wo + longitude) / 360 + data.n + 0.0053 * Math.sin(data.M) - 0.0069 * Math.sin(2*data.y);
	
  var Jrise = data.Jtransit - ( Jset - data.Jtransit);
  return julianToEpoch(Jrise);
}

//Math constants (degrees)
PI = Math.PI;
degToRad = PI/180;
radToDeg = 180/PI;

//Utils
function epochToJulian(seconds)
{
  return ( seconds / 86400.0 ) + 2440587.5;
}

function julianToEpoch(julian)
{
  return ( julian - 2440587.5 ) / 86400.0;
}

function sunriseCalculus(seconds, latitude, longitude)
{
  var data = {};
  
  //Julian date
  data.Jdate = epochToJulian(seconds);
  
  //Julian cycle since Jan 1st 2000
  data.nx = data.Jdate - 2451545.0009 - longitude / 360;
  data.n = data.nx + 0.5;
  
  //Approx. solar noon
  data.Jnoon = 2451545.0009 + longitude / 360 + data.n;
  
  //Solar mean anomaly
  data.M = ( 357.5291 + 0.98560028 * ( data.Jnoon - 2451545)) % 360;
  
  //Equation of center
  data.C = 1.9148 * Math.sin(data.M) + 0.0200 * Math.sin(2*data.M) + 0.0003 * Math.sin(3*data.M);
  //Ecliptic longitude
  data.y = ( data.M + 102.9372 + data.C + 180 ) % 360;
  
  //Solar transit
  data.Jtransit = data.Jnoon + 0.0053 * Math.sin(data.M) - 0.0069 * Math.sin(2*data.y);
  
  //Sun's declination
  data.sinDelta = Math.sin(data.y) * Math.sin(23.45);
  data.delta = Math.asin(data.sinDelta);
  
  //Hour angle
  data.cosWo = ( Math.sin(-0.83) - Math.sin(latitude) * data.sinDelta ) / ( Math.cos(latitude) * Math.cos(data.delta) );
  data.Wo = Math.acos(data.cosWo); //a bug occurs here, cosWo shouldn't have its abs value greater than 1
  
  return data;
}
