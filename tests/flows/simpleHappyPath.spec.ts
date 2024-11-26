import { test, expect } from '@playwright/test';
import fs from "fs";
import path from "path";

// Helper function used for generating a random id number:
function generateRandomNumber(length) {
    return Math.floor(
        Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
    );
}

let randomId = generateRandomNumber(8)

test.describe('Happy pet flow', () => {
    test('Create, Update, Upload Image, Delete pet', async ({ request }) => {
        await test.step('Create pet (POST to /pet)', async () => {
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

            console.log('Reponse after POST: ', response)
            console.log('Data after POST: ', responseData)

            // Assertions based on the response data:
            expect(responseData.id).toEqual(randomId);
            expect(responseData.name).toEqual(requestBody.name);
            expect(responseData.status).toEqual('available');
        });

        await test.step('Add image to pet (POST to /pet/{petId}/uploadImage)', async () => {
            const file = path.resolve('./tests/flows/test_data/dog.jpg');
            const image = fs.readFileSync(file, 'binary');

            const response = await request.post(`https://petstore.swagger.io/v2/pet/${randomId}/uploadImage`, {
                headers: {
                    Accept: "application/json",
                    ContentType: "multipart/form-data;",
                },
                multipart: {
                    additionalMetadata: `Image for Sorin test pet ${randomId}`,
                    file: image,
                }
            });
            expect(response.ok()).toBeTruthy();
            let responseData = await response.json()

            console.log('Response after POST image: ', response)
            console.log('Data after POST image: ', responseData)
        });

        await test.step('Update pet info (PUT to /pet)', async () => {
            let requestBody = {
                "id": randomId,
                "category": {
                    "id": 0,
                    "name": "string"
                },
                "name": `(SOLD) Sorin test pet ${randomId}`,
                "photoUrls": [
                    "string"
                ],
                "tags": [
                    {
                        "id": 0,
                        "name": "string"
                    }
                ],
                "status": "sold"
            }

            const response = await request.put('https://petstore.swagger.io/v2/pet', {
                headers: {
                    Accept: "application/json",
                    ContentType: "application/json",
                },
                data: requestBody
            });
            expect(response.ok()).toBeTruthy();
            let responseData = await response.json()

            console.log('Response after PUT: ', response)
            console.log('Data after PUT: ', responseData)

            // Assertions based on the response data:
            expect(responseData.id).toEqual(randomId);
            expect(responseData.name).toEqual(requestBody.name);
            expect(responseData.status).not.toEqual('available');
            expect(responseData.status).toEqual('sold');
        });

        await test.step('Delete pet (DELETE to /pet/{petId})', async () => {
            const response = await request.delete(`https://petstore.swagger.io/v2/pet/${randomId}`, {
                headers: {
                    Accept: "application/json",
                    ContentType: "application/json",
                    Api_key: 'special-key' // Doesn't seem to be enforced, the request works without it also.
                }
            });
            expect(response.ok()).toBeTruthy();
            let responseData = await response.json()

            console.log('Response after DELETE: ', response)
            console.log('Data after DELETE: ', responseData)
        });
    });
});