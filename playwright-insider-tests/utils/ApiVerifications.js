const { expect } = require('@playwright/test');

class ApiVerifications {

    static async verifyStatusCode(response,expectedStatus){
        try {
            const status = await response.status();
            expect(status).toBe(expectedStatus);
        } catch (error) {
            console.log('Error on assertion statuses :',error);
            throw error;
        }
    }


    static async verifyStatusCodes(response, expectedStatuses) {
        try {
            const status = await response.status();
            expect(expectedStatuses).toContain(status);
        } catch (error) {
            console.log('Error on assertion statuses (multiple):', error);
            throw error;
        }
    }


    static async verifyFields(response, fieldName, expectedValue) {
        try {
          const body = await response.json();
          expect(body[fieldName]).toBe(expectedValue);
       } catch (error) {
         console.log('Error on fieldname assertions :', error);
         throw error;
    }
  }
}

module.exports = ApiVerifications;
