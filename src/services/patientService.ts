import patientData from '../../data/patients';
import { Patient, WithoutSsnPatient, NewPatient } from '../types';
import * as uuid from "uuid";

const getPatients = (): WithoutSsnPatient[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
  
const addPatient = ( newPatient: NewPatient ): Patient => {

    const id: string = uuid.v1();

    const newPatientsEntry = {
        id,
        ...newPatient
    };
    
    patientData.push(newPatientsEntry);
    return newPatientsEntry;
};
  
export default {
    getPatients,
    addPatient
};