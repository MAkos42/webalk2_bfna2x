import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Vehicle } from './Vehicle';
import { Driver } from "./Driver";
import { TripPurpose } from "./TripPurpose";

@Entity("trips")
export class Trip {

    @PrimaryGeneratedColumn({ name: "tripid" })
    id: number

    @ManyToOne(() => Driver, { eager: true })
    @JoinColumn()
    driver: Driver

    @ManyToOne(() => Vehicle, { eager: true })
    @JoinColumn()
    vehicle: Vehicle

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

    constructor(driver: Driver, vehicle: Vehicle, date: Date, purpose: TripPurpose, startLocation: string, endLocation: string, distance: number) {
        this.driver = driver
        this.vehicle = vehicle
        this.date = date
        this.purpose = purpose
        this.startLocation = startLocation
        this.endLocation = endLocation
        this.distance = distance
    }

}