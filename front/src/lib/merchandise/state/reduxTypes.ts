export interface Todo {
    id: number;
    text: string;
    done: boolean;
}

export interface Store {
    todos: Todo[];
    newTodo: string;
}

export interface Externals {
    id: number;
    text: string;
    done: boolean;
}

export interface ObinsunData {
    info: Infos[];
    newInfo: string;
}

export interface Infos {
    username: Username;
    firstname: Firstname;
    lastname: Lastname;
    email: Email;
    ip: IP;
    cc: CountryCode;
}

export interface Username {
    id: number;
    text: string;
    done: boolean;
}

export interface Firstname {
    id: number;
    text: string;
    done: boolean;
}

export interface Lastname {
    id: number;
    text: string;
    done: boolean;
}

export interface Email {
    id: number;
    text: string;
    done: boolean;
}

export interface Password {
    id: number;
    text: string;
    done: boolean;
}

export interface IP {
    id: number;
    text: string;
    done: boolean;
}

export interface CountryCode {
    id: number;
    text: string;
    done: boolean;
}
