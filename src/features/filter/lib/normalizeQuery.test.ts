import { describe, expect, it } from "vitest"

import { normalizeQuery } from "./normalizeQuery"

describe("normalizeQuery", () => {
  it("приводит к нижнему регистру", () => {
    expect(normalizeQuery("Shingeki No KYOJIN")).toBe("shingeki no kyojin")
  })

  it("заменяет все ё на е, в том числе заглавные", () => {
    expect(normalizeQuery("Ёжик и её ёлка")).toBe("ежик и ее елка")
  })

  it("схлопывает пробельные символы", () => {
    expect(normalizeQuery("атака \t  титанов")).toBe("атака титанов")
  })
})
