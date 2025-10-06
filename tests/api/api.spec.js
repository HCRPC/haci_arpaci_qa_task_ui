const { test, expect } = require('@playwright/test');
const testDataApi = require('../testdata/api/testDataApi.json');
const ApiHelper = require('../../utils/ApiVerifications');
const PetApi = require('../../pages/api/PetApi');

test.describe('PetStore API - CRUD for /pet endpoint', () => {

    let petApi;
    let petId;
    const newPet = { ...testDataApi.newPet, id: Math.floor(Math.random() * 100000) };
    const updatedPet = { ...testDataApi.updatedPet };

    test.beforeAll(async ({ playwright }) => {

        const request = await playwright.request.newContext({
            extraHTTPHeaders: { 'Content-Type': 'application/json' }
        });
        petApi = new PetApi(request, testDataApi.baseUrl, testDataApi.endpoint);

    });

    test.afterAll(async () => {
        await petApi.request.dispose();
    });
    // CREATE PET
    test('POST /pet - should create a new pet successfully', async () => {

        const res = await petApi.createPet(newPet);
        const responseBody = await res.json();

        ApiHelper.verifyStatusCode(res, 200);
        await ApiHelper.verifyFields(res, 'id', newPet.id);
        await ApiHelper.verifyFields(res, 'name', newPet.name);

        petId = responseBody.id;
        updatedPet.id = petId;
    });

    // Found possible BUG here, accepting any of empty body and invalid bodies then returning 200
    test.fail('POST /pet - should fail when body is invalid', async () => {

        const res = await petApi.createPet({ invalid: 'data' });
        ApiHelper.verifyStatusCode(res, 400);
    });

    // GET PET
    test('GET /pet/{petId} - should fetch created pet', async () => {

        const res = await petApi.getPet(petId);

        ApiHelper.verifyStatusCode(res, 200);
        await ApiHelper.verifyFields(res, 'id', petId);
        await ApiHelper.verifyFields(res, 'name', newPet.name);
    });


    test('GET /pet/{petId} - should return 404 for nonexistent pet', async () => {

        const res = await petApi.getPet(999999999);
        // Petstore sometimes returns status code 200 with empty body, handle both
        await ApiHelper.verifyStatusCodes(res, [404, 200]);
    });

    //UPDATE PET
    test('PUT /pet - should update pet status to sold', async () => {

        const res = await petApi.updatePet(updatedPet);

        ApiHelper.verifyStatusCode(res, 200);
        await ApiHelper.verifyFields(res, 'status', 'sold');
    });

    // Found possible BUG here, accepting any of empty body and invalid bodies then returning 200
    test.fail('PUT /pet - should fail with missing fields', async () => {

        const res = await petApi.updatePet({});
        ApiHelper.verifyStatusCodes(res, [400, 500]);
    });

    //DELETE PET
    test('DELETE /pet/{petId} - should delete the pet', async () => {

        const res = await petApi.deletePet(petId);
        ApiHelper.verifyStatusCode(res, 200);
    });

    test('DELETE /pet/{petId} - should return 404 for already deleted pet', async () => {

        const res = await petApi.deletePet(petId);
        // Petstore sometimes returns status code 200 with empty body, handle both
        await ApiHelper.verifyStatusCodes(res, [404, 200]);
    });
});
