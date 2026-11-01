import { describe, expect, it } from "vitest";
import { longStayDiscountPct, nightsBetween, parseIsoDate, quote } from "../src/booking";

describe("parseIsoDate", () => {
  it("parses a valid ISO date as UTC midnight", () => {
    const d = parseIsoDate("2027-07-15");
    expect(d.toISOString()).toBe("2027-07-15T00:00:00.000Z");
  });

  it("rejects malformed input", () => {
    expect(() => parseIsoDate("15.07.2027")).toThrow(/Invalid date format/);
  });

  it("rejects impossible dates", () => {
    expect(() => parseIsoDate("2027-02-30")).toThrow(/Impossible date/);
  });
});

describe("nightsBetween", () => {
  it("counts nights across a month boundary", () => {
    expect(nightsBetween("2027-07-30", "2027-08-02")).toBe(3);
  });

  it("counts nights across a year boundary", () => {
    expect(nightsBetween("2027-12-30", "2028-01-02")).toBe(3);
  });

  it("rejects check-out before or on check-in", () => {
    expect(() => nightsBetween("2027-07-15", "2027-07-15")).toThrow();
    expect(() => nightsBetween("2027-07-15", "2027-07-14")).toThrow();
  });
});

describe("longStayDiscountPct", () => {
  it("gives no discount under 7 nights", () => {
    expect(longStayDiscountPct(1)).toBe(0);
    expect(longStayDiscountPct(6)).toBe(0);
  });

  it("gives 10 % for 7–13 nights and 15 % for 14+", () => {
    expect(longStayDiscountPct(7)).toBe(10);
    expect(longStayDiscountPct(13)).toBe(10);
    expect(longStayDiscountPct(14)).toBe(15);
  });
});

describe("quote", () => {
  it("quotes a short stay with no discount", () => {
    const q = quote("triple", "2027-07-15", "2027-07-18");
    expect(q).toEqual({
      room: "triple",
      nights: 3,
      pricePerNight: 40,
      subtotal: 120,
      discountPct: 0,
      total: 120,
    });
  });
});
