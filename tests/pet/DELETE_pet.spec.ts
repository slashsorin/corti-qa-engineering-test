import { test, expect } from '@playwright/test';

// Helper function used for generating a random id number:

test(`Successfull DELETE to /pet`, async ({ request }) => {
    const response = await request.delete(`https://petstore.swagger.io/v2/pet/91343627`, {
        headers: {
            Accept: "application/json",
            ContentType: "application/json",
            Api_key: 'special-key' // Doesn't seem to be enforced, the request works without it also.
        }
    });
    let responseData = await response.json()
    console.log('Data after DELETE: ', responseData)

    expect(response.ok()).toBeTruthy();
});

test(`Unsuccessfull DELETE to /pet`, async ({ request }) => {
    const response = await request.delete(`https://petstore.swagger.io/v2/pet/null`, {
        headers: {
            Accept: "application/json",
            ContentType: "application/json",
            Api_key: 'special-key' // Doesn't seem to be enforced, the request works without it also.
            // Bearer: 'Token special-key',
        }
    });
    let responseData = await response.json()
    console.log('Data after DELETE: ', responseData)

    expect(response.ok()).toBeFalsy();
});