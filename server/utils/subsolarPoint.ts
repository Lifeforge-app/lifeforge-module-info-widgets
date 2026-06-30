export function getSubsolarPoint(now: number) {
  const date = new Date(now)
  const jd = date.getTime() / 86400000 + 2440587.5
  const jc = (jd - 2451545) / 36525

  const meanLon =
    ((280.46646 + jc * (36000.76983 + jc * 0.0003032)) * Math.PI) / 180
  const meanAnomaly =
    ((357.52911 + jc * (35999.05029 - 0.0001537 * jc)) * Math.PI) / 180
  const e = 0.016708634 - jc * (0.000042037 + 0.0000001267 * jc)

  const equationOfCenter =
    Math.sin(meanAnomaly) * (1.914602 - jc * (0.004817 + 0.000014 * jc)) +
    Math.sin(2 * meanAnomaly) * (0.019993 - 0.000101 * jc) +
    Math.sin(3 * meanAnomaly) * 0.000289

  const trueLon = meanLon + (equationOfCenter * Math.PI) / 180

  const omega = ((125.04 - 1934.136 * jc) * Math.PI) / 180
  const lambda =
    trueLon -
    (0.00569 * Math.PI) / 180 -
    (0.00478 * Math.PI) / 180 * Math.sin(omega)

  const obliquity =
    ((23.439291 - jc * (0.013004167 + 0.000000164 * jc) + 0.00256 * Math.cos(omega)) *
      Math.PI) /
    180

  const declination = Math.asin(Math.sin(obliquity) * Math.sin(lambda))

  const eqTime =
    4 *
    (Math.tan(obliquity / 2) ** 2 * Math.sin(2 * meanLon) -
      2 * e * Math.sin(meanAnomaly) +
      4 *
        e *
        Math.tan(obliquity / 2) ** 2 *
        Math.sin(meanAnomaly) *
        Math.cos(2 * meanLon) -
      0.5 * Math.tan(obliquity / 2) ** 4 * Math.sin(4 * meanLon) -
      1.25 * e * e * Math.sin(2 * meanAnomaly))

  const utcHours =
    date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600
  const hourAngle = ((utcHours * 15 + eqTime / 4 - 180) * Math.PI) / 180

  return { lat: declination, lng: hourAngle }
}

export function getTerminator(subsolarLat: number, subsolarLng: number) {
  const points: Array<{ lat: number; lng: number }> = []

  const sx = Math.cos(subsolarLat) * Math.cos(subsolarLng)
  const sy = Math.cos(subsolarLat) * Math.sin(subsolarLng)
  const sz = Math.sin(subsolarLat)

  const ux = -Math.sin(subsolarLng)
  const uy = Math.cos(subsolarLng)
  const uz = 0

  const vx = -Math.sin(subsolarLat) * Math.cos(subsolarLng)
  const vy = -Math.sin(subsolarLat) * Math.sin(subsolarLng)
  const vz = Math.cos(subsolarLat)

  for (let i = 0; i <= 360; i++) {
    const theta = (i * Math.PI) / 180
    const px = ux * Math.cos(theta) + vx * Math.sin(theta)
    const py = uy * Math.cos(theta) + vy * Math.sin(theta)
    const pz = uz * Math.cos(theta) + vz * Math.sin(theta)

    const lat = (Math.asin(pz) * 180) / Math.PI
    const lng = (Math.atan2(py, px) * 180) / Math.PI

    points.push({ lat, lng })
  }

  return points
}
