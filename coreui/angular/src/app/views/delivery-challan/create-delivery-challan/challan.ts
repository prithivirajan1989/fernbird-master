export class Resume {
    profilePic: string;
    name: string;
    address: string;
    contactNo: number;
    email: string;
    socialProfile: string;
    challanNo:string;
    challanDate:string;
    challanType:String;
    experiences: Experience[] = [];
    delivery: Delivery[] = [];
    otherDetails: string;
    skills: Skill[] = [];

    constructor() {
        this.experiences.push(new Experience());
        this.delivery.push(new Delivery());
        this.skills.push(new Skill());
    }
}


export class Experience {
    employer: string;
    jobTitle: string;
    jobDescription: string;
    startDate: string;
    experience: number;
}

export class Delivery {
    itemDetails: string;
    quantity: number;
    rate:number;
    discount: number;
    ammount: number;  
}

export class Skill {
    value: string;
}