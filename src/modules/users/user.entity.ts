import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;
    
    @Column()
    // @Exclude()
    password: string;
    
    @Column()
    userName: string;

    @Column()
    fullName: string;

    @Column()
    phoneNumber: string;

    @AfterInsert()
    logInsert() {
        console.log(`User with id = ${this.id} is Inserted.`);
    }

    @AfterRemove()
    logDelete() {
        console.log(`User with id = ${this.id} is Deleted.`);
    }

    @AfterUpdate()
    logUpdate() {
        console.log(`User with id = ${this.id} is Updated.`);
    }
}