import {describe, expect, it} from "vitest";
import {
  buildLegend,
  CHART_COLORS,
  clamp,
  formatX,
  getSeriesColor,
  inferXKind,
  isChartX,
  nextChartId,
  normalizeMargin,
  padDomain,
  pathFromPoints,
  polarPoint,
  toDate,
  toNumber,
  uniqueStrings
} from "../lib/utils";

describe("toNumber", () => {
  it("returns finite numbers as-is", () => {
    expect(toNumber(0)).toBe(0);
    expect(toNumber(42)).toBe(42);
    expect(toNumber(-3.14)).toBe(-3.14);
  });
  it("parses numeric strings", () => {
    expect(toNumber("0")).toBe(0);
    expect(toNumber(" 5 ")).toBe(5);
  });
  it("returns null for non-finite, empty, or junk values", () => {
    expect(toNumber(Number.NaN)).toBeNull();
    expect(toNumber(Number.POSITIVE_INFINITY)).toBeNull();
    expect(toNumber("")).toBeNull();
    expect(toNumber("abc")).toBeNull();
    expect(toNumber(null)).toBeNull();
    expect(toNumber(undefined)).toBeNull();
    expect(toNumber({})).toBeNull();
  });
});

describe("toDate", () => {
  it("accepts Date instances", () => {
    const d = new Date("2024-06-01");
    expect(toDate(d)).toBe(d);
  });
  it("parses ISO date strings", () => {
    expect(toDate("2024-01-01")?.getUTCFullYear()).toBe(2024);
  });
  it("parses epoch numbers", () => {
    expect(toDate(0)?.getTime()).toBe(0);
  });
  it("returns null for invalid input", () => {
    expect(toDate("not a date")).toBeNull();
    expect(toDate(null)).toBeNull();
    expect(toDate(undefined)).toBeNull();
    const invalid = new Date("not a date");
    expect(toDate(invalid)).toBeNull();
  });
});

describe("isChartX", () => {
  it("accepts strings, numbers, and Dates", () => {
    expect(isChartX("a")).toBe(true);
    expect(isChartX(1)).toBe(true);
    expect(isChartX(new Date())).toBe(true);
  });
  it("rejects everything else", () => {
    expect(isChartX(null)).toBe(false);
    expect(isChartX(undefined)).toBe(false);
    expect(isChartX({})).toBe(false);
    expect(isChartX(true)).toBe(false);
  });
});

describe("inferXKind", () => {
  it("returns 'point' for empty input", () => {
    expect(inferXKind([])).toBe("point");
  });
  it("returns 'time' for all Date instances", () => {
    expect(inferXKind([new Date(), new Date(0)])).toBe("time");
  });
  it("returns 'time' for all-string ISO date arrays (regression for C3)", () => {
    expect(inferXKind(["2024-01-01", "2024-02-01"])).toBe("time");
  });
  it("returns 'linear' for all numbers", () => {
    expect(inferXKind([1, 2, 3])).toBe("linear");
  });
  it("returns 'point' for non-date string arrays", () => {
    expect(inferXKind(["a", "b", "c"])).toBe("point");
  });
  it("returns 'point' for mixed types", () => {
    expect(inferXKind([1, "abc"])).toBe("point");
  });
});

describe("padDomain", () => {
  it("expands when min === max", () => {
    expect(padDomain(5, 5)).toEqual([4, 6]);
  });
  it("pads symmetrically by default (regression for C4)", () => {
    expect(padDomain(50, 100)).toEqual([47, 103]);
    expect(padDomain(0, 100)).toEqual([-6, 106]);
  });
  it("clamps to zero when includeZero=true and min >= 0", () => {
    expect(padDomain(50, 100, {includeZero: true})).toEqual([0, 103]);
  });
  it("pads negatives outward when includeZero=true", () => {
    expect(padDomain(-50, -10, {includeZero: true})).toEqual([-52.4, 0]);
  });
  it("crosses zero correctly when includeZero=true", () => {
    expect(padDomain(-10, 10, {includeZero: true})).toEqual([-11.2, 11.2]);
  });
});

describe("pathFromPoints", () => {
  it("returns empty string for empty input", () => {
    expect(pathFromPoints([])).toBe("");
  });
  it("emits a single move-to", () => {
    expect(pathFromPoints([[0, 0]])).toBe("M 0 0 Z");
  });
  it("emits move-to + line-to + close by default", () => {
    expect(pathFromPoints([[0, 0], [10, 10], [20, 0]])).toBe(
      "M 0 0 L 10 10 L 20 0 Z"
    );
  });
  it("omits close when close=false", () => {
    expect(pathFromPoints([[0, 0], [10, 10]], false)).toBe("M 0 0 L 10 10");
  });
});

describe("polarPoint", () => {
  it("places angle 0 along +x axis", () => {
    const [x, y] = polarPoint(10, 0);
    expect(x).toBeCloseTo(10);
    expect(y).toBeCloseTo(0);
  });
  it("places angle π/2 along +y axis", () => {
    const [x, y] = polarPoint(10, Math.PI / 2);
    expect(x).toBeCloseTo(0);
    expect(y).toBeCloseTo(10);
  });
});

describe("clamp", () => {
  it("clamps below min", () => {
    expect(clamp(-1, 0, 10)).toBe(0);
  });
  it("clamps above max", () => {
    expect(clamp(11, 0, 10)).toBe(10);
  });
  it("returns input when in range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });
});

describe("uniqueStrings", () => {
  it("deduplicates by formatted output", () => {
    expect(uniqueStrings(["a", "a", "b"])).toEqual(["a", "b"]);
  });
  it("formats numbers and Dates to strings", () => {
    const result = uniqueStrings([1, 1, 2]);
    expect(result).toHaveLength(2);
    expect(result[0]).toBe("1");
  });
});

describe("getSeriesColor", () => {
  it("uses series.color when provided", () => {
    expect(getSeriesColor({key: "x", color: "#abc"}, 0)).toBe("#abc");
  });
  it("falls back to chart palette by index, wrapping around", () => {
    expect(getSeriesColor({key: "x"}, 0)).toBe(CHART_COLORS[0]);
    expect(getSeriesColor({key: "x"}, CHART_COLORS.length)).toBe(CHART_COLORS[0]);
  });
});

describe("buildLegend", () => {
  it("maps series to legend items with key/label/color", () => {
    expect(
      buildLegend([
        {key: "a", label: "Apples"},
        {key: "b", color: "#fff"}
      ])
    ).toEqual([
      {key: "a", label: "Apples", color: CHART_COLORS[0]},
      {key: "b", label: "b", color: "#fff"}
    ]);
  });
});

describe("normalizeMargin", () => {
  const fallback = {top: 1, right: 2, bottom: 3, left: 4};
  it("uses fallback when margin is undefined", () => {
    expect(normalizeMargin(undefined, fallback)).toEqual(fallback);
  });
  it("merges partial margins over fallback", () => {
    expect(normalizeMargin({top: 99}, fallback)).toEqual({...fallback, top: 99});
  });
});

describe("formatX", () => {
  it("formats Date with month/day", () => {
    const out = formatX(new Date("2024-06-01T12:00:00Z"));
    expect(out).toMatch(/Jun|May/); // locale tz drift permitted
  });
  it("falls back to String() for primitives", () => {
    expect(formatX(1)).toBe("1");
    expect(formatX("hello")).toBe("hello");
    expect(formatX(null)).toBe("");
  });
});

describe("nextChartId", () => {
  it("emits unique, prefixed ids", () => {
    const a = nextChartId("test");
    const b = nextChartId("test");
    expect(a).not.toBe(b);
    expect(a).toMatch(/^test-\d+$/);
  });
});
