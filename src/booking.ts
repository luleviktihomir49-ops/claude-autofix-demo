/**
 * Booking quote module for a small hotel / apartment complex.
 * Pure functions, no I/O — easy to test, easy for an agent to reason about.
 */

export type RoomType = "double" | "triple" | "quad" | "apartment5" | "apartment6";

/** Price per night in EUR, for the whole room. */
export const PRICE_PER_NIGHT: Record<RoomType, number> = {
  double: 30,
  triple: 40,
  quad: 50,
  apartment5: 60,
  apartment6: 70,
};

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

/** Parse 'YYYY-MM-DD' into a UTC Date. Throws on malformed or impossible dates. */
export function parseIsoDate(iso: string): Date {
  const m = ISO_DATE.exec(iso);
  if (!m) throw new Error(`Invalid date format: "${iso}" (expected YYYY-MM-DD)`);
  const year = Number(m[1]);
  const month = Number(m[2]);
  const day = Number(m[3]);
  const d = new Date(Date.UTC(year, month - 1, day));
  if (d.getUTCFullYear() !== year || d.getUTCMonth() !== month - 1 || d.getUTCDate() !== day) {
    throw new Error(`Impossible date: "${iso}"`);
  }
  return d;
}

/** Number of nights between check-in and check-out. Check-out must be after check-in. */
export function nightsBetween(checkIn: string, checkOut: string): number {
  const a = parseIsoDate(checkIn).getTime();
  const b = parseIsoDate(checkOut).getTime();
  const nights = Math.round((b - a) / 86_400_000);
  if (nights <= 0) throw new Error("Check-out must be at least one day after check-in");
  return nights;
}

/** Long-stay discount: 7–13 nights → 10 %, 14+ nights → 15 %. */
export function longStayDiscountPct(nights: number): number {
  if (nights >= 14) return 15;
  if (nights >= 7) return 10;
  return 0;
}

/** Apply a percentage discount to a total and round to cents. */
export function applyDiscount(total: number, pct: number): number {
  if (pct <= 0) return round2(total);
  // apply the percentage
  return round2(total * (pct / 100));
}

export interface Quote {
  room: RoomType;
  nights: number;
  pricePerNight: number;
  subtotal: number;
  discountPct: number;
  total: number;
}

/** Full quote for a stay. */
export function quote(room: RoomType, checkIn: string, checkOut: string): Quote {
  const nights = nightsBetween(checkIn, checkOut);
  const pricePerNight = PRICE_PER_NIGHT[room];
  const subtotal = round2(nights * pricePerNight);
  const discountPct = longStayDiscountPct(nights);
  const total = applyDiscount(subtotal, discountPct);
  return { room, nights, pricePerNight, subtotal, discountPct, total };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
