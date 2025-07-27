function hexToHsl(hex: string): [number, number, number] {
  // Transforma el valor hex a RGB normalizado
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  // En HSL, la luz es el promedio entre el color mas bajo y el color
  // mas alto del RGB normalizado
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h: number = 0, s: number = 0;
  const l: number = (max + min) / 2;

  // La saturacion se calcula con la diferencia del color mas bajo y
  // el color mas alto del RGB normalizado, siguiendo lo siguiente:
  if (max !== min) {
    const delta = max - min;
    s = (l > 0.5)
    // Si la luz es alta se usa la formula:
    ? delta / (2 - max - min)
    // Si la luz es baja:
    : delta / (max + min);
    // Estas formulas se usan con RGB normalizado, para calcular el tono
    switch (max) {
      case r: h = (g - b) / delta + (g < b ? 6 : 0); break;
      case g: h = (b - r) / delta + 2; break;
      case b: h = (r - g) / delta + 4; break;
    }
    // Finalmente se le multiplica 60
    h *= 60;
  }

  return [h, s, l];
}

function hslToHex(h: number, s: number, l: number): string {
  // Se calcula el "croma" del HSL
  const c = (1 - Math.abs(2 * l - 1)) * s;
  // Se calcula "x" del HSL
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  // Se calcula el ajuste "m" del HSL
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  // Formulas
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  // Formula para convertir a HEX usando RGB y el ajuste "m"
  const toHex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Retorna un color con una minima variacion de saturación e iluminación
export const GetRandomizedColor = ({
  baseHex = '#FFFFFF',
  sVariation = 0.2,
  lVariation = 0.2,
}) => {
  const [h, s, l] = hexToHsl(baseHex);
  const newS = Math.min(1, Math.max(0, s + (Math.random() - 0.5) * sVariation));
  const newL = Math.min(1, Math.max(0, l + (Math.random() - 0.5) * lVariation));
  return hslToHex(h, newS, newL);
}