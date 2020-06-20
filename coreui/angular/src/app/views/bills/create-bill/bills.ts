export class Resume {
    profilePic: string;
    vendorName: string;
    address: string;
    vendorNo: number;
    vendorEmail: string;
    socialProfile: string;
    billNo:string;
    billDate:string;
    dueDate:string;
    billType:String;
    experiences: Experience[] = [];
    bill: Bill[] = [];
    otherDetails: string;
    skills: Skill[] = [];

    constructor() {
        this.experiences.push(new Experience());
        this.bill.push(new Bill());
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

export class Bill {
    itemDetails: string;
    quantity: number;
    rate:number;
    discount: number;
    ammount: number;  
}

export class Skill {
    value: string;
}
