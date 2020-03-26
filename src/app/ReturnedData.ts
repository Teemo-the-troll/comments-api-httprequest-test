export interface ReturnedData {
    access_token : string;
    user : User;
    comments : Comment [] ;
    users : User [];
    page : number;
    page_count : number;
    
    
}

export interface User {
    email : string;
    id : number;
    username : string;
}

export interface Comment {
    email : string;
    id : number;
    username : string;
    author_id : Author
}

export interface Author {
    id : number;
    email: string;
    username: string
}