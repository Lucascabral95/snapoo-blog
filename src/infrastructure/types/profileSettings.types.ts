export interface PersonalData {
    nombre: string;
    apellido: string;
    provincia: string;
    pais: string;
    edad: number;
    bio: string;
}

export interface PersonalDataPayload extends PersonalData {
    user: string;
}

export interface PersonalDataResponse extends PersonalData {
    id: string;
    user: string;
}
