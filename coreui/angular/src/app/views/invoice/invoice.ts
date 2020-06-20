export class Resume {
    profilePic: string;
    name: string;
    address: string;
    contactNo: number;
    email: string;
    socialProfile: string;
    gstIn:string;
    invoice:string;
    date:String;
    transport:string;
    lrNo:string;
    from:string;
    to:string;
    experiences: Experience[] = [];
    educations: Education[] = [];
    otherDetails: string;
    skills: Skill[] = [];

    constructor() {
        this.experiences.push(new Experience());
        this.educations.push(new Education());
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

export class Education {
    product: string;
    hsnCode: string;
    packType: string;
    noOfPacks: number;
    total: number;
    rate:number;
    ammount:number;
}

export class Skill {
    value: string;
}
