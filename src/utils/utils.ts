const hexToRgb = (hex) => {
  let c
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('')
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]]
    }
    c = '0x' + c.join('')
    return [(c >> 16) & 255, (c >> 8) & 255, c & 255]
  }
  throw new Error('Bad Hex')
}

export const getShade = (hex, percent) => {
  const rgb = hexToRgb(hex)
  return rgb.map((value) => Math.round(value * percent))
}

const getForeGroundColor = (cols) => {
  const color = Math.round((parseInt(cols[0]) * 299 + parseInt(cols[1]) * 587 + parseInt(cols[2]) * 114) / 1000)
  return color > 125 ? [0, 0, 0] : [255, 255, 255]
}

export const getForeGroundColorRgb = (cols) => {
  const fontColor = getForeGroundColor(cols)
  return `rgb(${fontColor.join(', ')})`
}
