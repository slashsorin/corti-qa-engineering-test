import { test, expect } from '@playwright/test';

// Helper function used for generating a random id number:
// Helper function used for generating a random id number:
function generateRandomNumber(length) {
    return Math.floor(
        Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
    );
}

test(`Successfull DELETE to /pet`, async ({ request }) => {
    // Requirement: existing petId. Creating one before:
    let randomId = generateRandomNumber(8)

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

    const postResponse = await request.post(`https://petstore.swagger.io/v2/pet`, {
        headers: {
            Accept: "application/json",
            ContentType: "application/json",
        },
        data: requestBody
    });
    // Assert the request returned 200 OK: 
    expect(postResponse.ok()).toBeTruthy();
    let postResponseData = await postResponse.json()
    
    const response = await request.delete(`https://petstore.swagger.io/v2/pet/${postResponseData.id}`, {
        headers: {
            Accept: "application/json",
            ContentType: "application/json",
            Api_key: 'special-key' // Doesn't seem to be enforced, the request works without it also.
        }
    });
    
    console.log('Response after DELETE: ', response);
    expect(response.ok()).toBeTruthy();
    let responseData = await response.json();
    console.log('Data after DELETE: ', responseData);
});

test(`Unsuccessfull DELETE to /pet`, async ({ request }) => {
    const response = await request.delete(`https://petstore.swagger.io/v2/pet/null`, {
        headers: {
            Accept: "application/json",
            ContentType: "application/json",
            Api_key: "special-key" // The request seems to be working without it also?
        }
    });
    let responseData = await response.json();
    console.log('Data after DELETE: ', responseData);
    expect(response.ok()).toBeFalsy();
});