//Library functions

function getSunrise(day, month, year, latitude, longitude)
{
	//Day of year
	n = Math.floor(275 * month / 9) - (Math.floor((month + 9) / 12) * (1 + Math.floor((year - 4 * Math.floor(year / 4) + 2) / 3))) + day - 30;
	
	lh = longitude / 15;
	t = n + ((6 - lh) 24);
	
	//Sun's mean anomaly
	M = (0.9856 * t) - 3.289;
	
}

function getSunset(day, month, year, latitude, longitude)
{
	
}

//Math constants (degrees)
PI = Math.PI;
degToRad = PI/180;
radToDeg = 180/PI;
