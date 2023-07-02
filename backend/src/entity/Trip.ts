import { Column, Entity, JoinColumn, ManyToOne, ObjectId, ObjectIdColumn, RelationId } from "typeorm";
import { Vehicle } from './Vehicle';
import { Driver } from "./Driver";
import { TripPurpose } from "./TripPurpose";

@Entity("trips")
export class Trip {

    @ObjectIdColumn()
    _id: ObjectId

    @Column("objectId")
    driver: ObjectId

    @Column("objectId")
    vehicle: ObjectId

    @Column("date")
    date: Date

    @Column("enum", { enum: TripPurpose })
    purpose: TripPurpose

    @Column()
    startLocation: string

    @Column()
    endLocation: string

    @Column()
    distance: number

    constructor(driver: ObjectId, vehicle: ObjectId, date: Date, purpose: TripPurpose, startLocation: string, endLocation: string, distance: number) {
        this.driver = driver
        this.vehicle = vehicle
        this.date = date
        this.purpose = purpose
        this.startLocation = startLocation
        this.endLocation = endLocation
        this.distance = distance
    }

}