import patientData from '../../data/patients';
import { 
    Patient, 
    WithoutSsnPatient, 
    NewPatient,
    EntryWithoutId,
    Entry
} from '../types';
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

const getPatient = (id: string): Patient => {
    const patient = patientData.find(patient => patient.id == id);

    if (patient && !patient.entries) {
        return {...patient, entries: []};
    } else if (patient) {
        return patient;
    } else {
        throw new Error('Could not find patient with that id');
    }

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

const addEntry = ( patientId: string, newEntry: EntryWithoutId): Entry => {
    
    const patient = getPatient(patientId);

    const id: string = uuid.v1();

    const newEntryForPatient = {
        id,
        ...newEntry
    };

    patient.entries.push(newEntryForPatient);
    
    const patientIndex = patientData.findIndex(p => p.id === patient.id);
    patientData[patientIndex] = patient;

    return newEntryForPatient;
};
  
export default {
    getPatients,
    getPatient,
    addPatient,
    addEntry
};