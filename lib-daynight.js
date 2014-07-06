//Utils
function epochToJulian(seconds)
{
  return ( seconds / 86400.0 ) + 2440587.5;
}

function julianToEpoch(julian)
{
  return ( julian - 2440587.5 ) / 86400.0;
}

//Library functions
function getSunrise_epoch(seconds, latitude, longitude)
{
  //Julian date
  Jdate = epochToJulian(seconds);
  
  //Julian cycle since Jan 1st 2000
  nx = Jdate - 2451545.0009 - longitude / 360;
  n = nx + 0.5;
  
  //Approx. solar noon
  Jnoon = 2451545.0009 + longitude / 360 + n;
  
  //Solar mean anomaly
  M = ( 357.5291 + 0.98560028 * ( Jnoon - 2451545)) & 360;
  
  //Equation of center
  C = 1.9148 * Math.sin(M) + 0.0200 * Math.sin(2*M) + 0.0003 * Math.sin(3*M);
  //Ecliptic longitude
  y = ( M + 102.9372 + C + 180 ) & 360;
  
  //Solar transit
  Jtransit = Jnoon + 0.0053 * Math.sin(M) - 0.0069 * Math.sin(2*y);
  
  //Sun's declination
  sinDelta = Math.sin(y) * Math.sin(23.45);
  delta = Math.asin(sinDelta);
  
  //Hour angle
  cosWo = ( Math.sin(-0.83) - Math.sin(latitude) * sinDelta ) / ( Math.cos(latitude) * Math.cos(delta) );
  Wo = Math.acos(cosWo);
  
  //Sunrise
}

function getSunset_epoch(seconds, latitude, longitude)
{}
