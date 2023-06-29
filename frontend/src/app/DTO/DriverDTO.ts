export class DriverDTO {

    id: number

    name: string

    dateOfBirth: string

    address: string

    driversLicense: string

    idExpirationDate: string

    constructor(name: string, dateOfBirth: string, address: string, driversLicense: string, idExpirationDate: string) {
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
        this.driversLicense = driversLicense;
        this.idExpirationDate = idExpirationDate;
    }
}