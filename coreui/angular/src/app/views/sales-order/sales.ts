export class Resume {
    profilePic: string;
    name: string;
    address: string;
    contactNo: number;
    email: string;
    socialProfile: string;
    saleOrderNo:string;
    salesPerson:string;
    salesOrderDate:string;
    shipmentDate:string;
    paymentType:String;
    experiences: Experience[] = [];
    products: Products[] = [];
    otherDetails: string;
    skills: Skill[] = [];

    constructor() {
        this.experiences.push(new Experience());
        this.products.push(new Products());
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

export class Products {
    itemDetails: string;
    quantity: number;
    rate:number;
    discount: number;
    ammount: number;  
}

export class Skill {
    value: string;
}
