export class Resume {
    profilePic: string;
    name: string;
    address: string;
    contactNo: number;
    email: string;
    socialProfile: string;
    gstIn:string;
    invoiceNumber:string;
    date:String;
    transport:string;
    lrNo:string;
    from:string;
    to:string;
    experiences: Experience[] = [];
    invoice: Invoice[] = [];
    otherDetails: string;
    skills: Skill[] = [];

    constructor() {
        this.experiences.push(new Experience());
        this.invoice.push(new Invoice());
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

export class Invoice {
    itemDetails: string;
    quantity: number;
    rate:number;
    discount: number;
    ammount: number;  
}


export class Skill {
    value: string;
}
