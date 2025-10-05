

class PetApi {
    constructor(request, baseUrl, endpoint) {
        this.request = request;
        this.baseUrl = baseUrl;
        this.endpoint = endpoint;
        this.fullUrl = baseUrl + endpoint;
    }

    async createPet(petData) {
        return await this.request.post(this.fullUrl, { data: petData });
    }

    async getPet(petId) {
        return await this.request.get(`${this.fullUrl}/${petId}`);
    }

    async updatePet(petData) {
        return await this.request.put(this.fullUrl, { data: petData });
    }

    async deletePet(petId) {
        return await this.request.delete(`${this.fullUrl}/${petId}`);
    }
}

module.exports = PetApi;

