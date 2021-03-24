const { buildTables, populateInitialData } = require('../db/init_db');
const { client, createReport, getAllProducts, getProductById } = require('../db');

const builtProduct = {
    name: "A Product",
    description: "This is a test product.",
    price: 100,
    category: "testing"
}

describe('Database', () => {
    beforeAll(async() => {
        await client.connect();
        await buildTables();
        await populateInitialData();
    })
    afterAll(async() => {
        await client.end();
    })
    describe('Products', () => {
        let testProduct, testAllProducts, testProductById;
        describe('createProduct', () => {
            beforeAll(async() => {
                testProduct = await createProduct(builtProduct)
            })
            it('Returns an Object', () => {
                expect(typeof testProduct).toBe('object')
            })
            it('Contains name, description, price, category, imageURL, inStock values', () => {
                expect(testProduct).toEqual(expect.objectContaining({
                    name: expect.any(String),
                    description: expect.any(String),
                    price: expect.any(Number),
                    category: expect.any(String),
                    imageURL: expect.any(String),
                    inStock: expect.any(String)
                }))
            })
        })
        /*describe('getAllProducts', () => {
            beforeAll(async () => {

            })
        })*/
    })
})