import { test, expect } from '@playwright/test';

// Helper function used for generating a random id number:
function generateRandomNumber(length) {
    return Math.floor(
        Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
    );
}
let randomId = generateRandomNumber(8)

test(`Successfull POST to /pet`, async ({ request }) => {
    let requestBody = {
        "id": randomId,
        "category": {
            "id": 0,
            "name": "string"
        },
        "name": `Sorin test pet ${randomId}`,
        "photoUrls": [
        ],
        "tags": [
            {
                "id": 0,
                "name": "string"
            }
        ],
        "status": "available"
    }

    const response = await request.post(`https://petstore.swagger.io/v2/pet`, {
        headers: {
            Accept: "application/json",
            ContentType: "application/json",
        },
        data: requestBody
    });
    // Assert the request returned 200 OK: 
    expect(response.ok()).toBeTruthy();
    let responseData = await response.json()
    console.log('Data after POST: ', responseData)
    // Assertions based on the response data:
    expect(responseData.id).toEqual(randomId);
    expect(responseData.name).toEqual(requestBody.name);
    expect(responseData.status).toEqual('available');
});

[
    // Create with the same (non-unique) id more than once.
    // Requires business decision.
    { petId: randomId },
    // Testing edges and beyond
    { petId: 4566200812351087231323 },
    // Invalid/unsupported id values
    // Requires documentation regarding what is supported & what not.
    { petId: -111 },
    { petId: 11.5 },
    { petId: 'myCustomPetId' },
].forEach(({ petId }) => {
    test(`Unsuccessfull POST to /pet with id: ${petId}`, async ({ request }) => {
        let requestBody = {
            "id": petId,
            "category": {
                "id": 0,
                "name": "string"
            },
            "name": "",
            "photoUrls": [
            ],
            "tags": [
                {
                    "id": 0,
                    "name": "string"
                }
            ],
            "status": "available"
        }

        const response = await request.post(`https://petstore.swagger.io/v2/pet`, {
            headers: {
                Accept: "application/json",
                ContentType: "application/json",
            },
            data: requestBody
        });
        // Assert the request did not return 200 OK: 
        expect(response.ok()).toBeFalsy();
    });
});