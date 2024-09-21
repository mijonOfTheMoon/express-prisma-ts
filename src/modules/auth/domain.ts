export interface RegisterUserDomain {
    email: string;
    name: string;  
    password: string;    
}

export interface FindUserWithItemsDomain {
    email: string;
    name: string;
    items: string[];
}