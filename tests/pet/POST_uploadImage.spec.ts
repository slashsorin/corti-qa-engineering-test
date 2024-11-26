import { test, expect } from '@playwright/test';
import fs from "fs";
import path from "path";

[
    // Mix of valid/supported id values & file types
    { petId: 45662008, filePath: './tests/pet/test_data/dog.jpg' },
].forEach(({ petId, filePath }) => {
    test(`Successful POST to /pet/${petId}/uploadImage`, async ({ request }) => {
        const file = path.resolve(filePath);
        const image = fs.readFileSync(file, 'binary');

        const response = await request.post(`https://petstore.swagger.io/v2/pet/${petId}/uploadImage`, {
            headers: {
                Accept: "application/json",
                ContentType: "multipart/form-data;",
            },
            multipart: {
                additionalMetadata: `Image for Sorin test pet ${petId}`,
                file: image,
            }
        });
        console.log(response)
        expect(response.ok()).toBeTruthy();
        let data = await response.json()
        console.log('Data after POST image: ', data)
    });
});

[
    // Mix of invalid/unsupported id values & file types
    // These first 4 cases should be treated before the request itself:
    { petId: 45662008, filePath: './tests/pet/test_data/not_found.jpg' },
    { petId: 45662008, filePath: '' },
    { petId: 45662008, filePath: './' },
    { petId: 45662008, filePath: './tests/pet/test_data' },
    // The next cases require documentation (business & technical agreement) regarding what is supported & what not.
    { petId: -111, filePath: './tests/pet/test_data/dog.jpg' },
    { petId: 11.5, filePath: './tests/pet/test_data/dog.jpg' },
    { petId: 'myCustomTestId', filePath: './tests/pet/test_data/dog.jpg' },
    { petId: 45662008, filePath: './tests/pet/test_data/test.pdf' },
    { petId: 45662008, filePath: './tests/pet/test_data/test.xlsx' },
].forEach(({ petId, filePath }) => {
    test(`Unsuccessful POST to /pet/${petId}/uploadImage with file: ${filePath}`, async ({ request }) => {
        const file = path.resolve(filePath);
        const image = fs.readFileSync(file, { encoding: 'binary' });

        const response = await request.post(`https://petstore.swagger.io/v2/pet/${petId}/uploadImage`, {
            headers: {
                Accept: "application/json",
                ContentType: "multipart/form-data;",
            },
            multipart: {
                additionalMetadata: `Image for Sorin test pet ${petId}`,
                file: image,
            }
        });
        console.log(response)
        expect(response.ok()).toBeFalsy();
    });
});