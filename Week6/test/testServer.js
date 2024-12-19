
const { expect } = require("chai");
const { MongoClient } = require("mongodb");
const { fetchAllPizzas } = require("../../Week6/controllers");
const { getDB } = require("../util/d_base");

// Mock the getDB function
const mockGetDB = () => ({
  collection: () => ({
    find: () => ({
      toArray: async () => [
        { name: "Pepperoni", size: "Large", price: 15.99 },
        { name: "Margarita", size: "Medium", price: 12.99 },
      ],
    }),
  }),
});

describe("fetchAllPizzas", () => {
  before(() => {
    require.cache[require.resolve("../util/d_base")] = {
      exports: { getDB: mockGetDB },
    };
  });

  it("should fetch all pizzas from the database", async () => {
    const pizzas = await fetchAllPizzas();
    expect(pizzas).to.be.an("array");
    expect(pizzas).to.have.lengthOf(2);
    expect(pizzas[0]).to.deep.include({
      name: "Pepperoni",
      size: "Large",
      price: 15.99,
    });
    expect(pizzas[1]).to.deep.include({
      name: "Margarita",
      size: "Medium",
      price: 12.99,
    });
  });

  it("should handle empty collections", async () => {
    require.cache[require.resolve("../util/d_base")].exports.getDB = () => ({
      collection: () => ({
        find: () => ({
          toArray: async () => [],
        }),
      }),
    });

    const pizzas = await fetchAllPizzas();
    expect(pizzas).to.be.an("array").that.is.empty;
  });

  it("should handle errors gracefully", async () => {
    require.cache[require.resolve("../util/d_base")].exports.getDB = () => ({
      collection: () => ({
        find: () => ({
          toArray: async () => {
            throw new Error("Database error");
          },
        }),
      }),
    });

    try {
      await fetchAllPizzas();
    } catch (err) {
      expect(err).to.exist;
      expect(err.message).to.equal("Database error");
    }
  });
});
