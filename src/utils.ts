import { 
    NewPatient, 
    Gender, 
    EntryWithoutId, 
    Discharge, 
    BaseEntryWithoutId, 
    Diagnosis, 
    HealthCheckRating
} from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isNumber = (number: unknown): number is number => {
    return typeof number === 'number' || number instanceof Number;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const isHealthRating = (rating: number): rating is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(rating);
};

const isDischarge = (discharge: unknown): discharge is Discharge => {
    return Object.prototype.hasOwnProperty.call(discharge, "date") && Object.prototype.hasOwnProperty.call(discharge, "criteria");
};

const parseDischarge = (discharge: unknown): Discharge => {

    if (isDischarge(discharge)) {
        return discharge;
    } else {
        throw new Error('Incorrect or missing discharge: ' + discharge);
    }

};

const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }

    return date;
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }

    return gender;
};

const parseString = (input: unknown, inputTitle: string): string => {
    if (!isString(input)) {
        throw Error('Incorrect or missing: ' + inputTitle);
    }

    return input;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      // we will just trust the data to be in correct form
      return [] as Array<Diagnosis['code']>;
    }
  
    return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
    if (!isNumber(rating) || !isHealthRating(rating)) {
        throw new Error('Incorrect or missing rating: ' + rating);
    }

    return rating;
};

const toNewPatientEntry = (object: unknown): NewPatient => {

    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }

    if (
        'name' in object && 
        'dateOfBirth' in object && 
        'ssn' in object && 
        'gender' in object && 
        'occupation' in object
        )  {

        const newEntry: NewPatient = {
            "name": parseString(object.name, "Name"),
            "dateOfBirth": parseDate(object.dateOfBirth),
            "ssn": parseString(object.ssn, "SSN"),
            "gender": parseGender(object.gender),
            "occupation": parseString(object.occupation, "Occupation"),
            "entries": []
        };

        return newEntry;
    }

    throw new Error('Incorrect data: some fields are missing');
};

const toNewEntryForPatient = (object: unknown): EntryWithoutId => {
    
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }

    if (
        'date' in object && 
        'description' in object && 
        'specialist' in object &&
        'type' in object
    )  {

        const newEntry: BaseEntryWithoutId = {
            "date": parseDate(object.date),
            "description": parseString(object.description, "description"),
            "specialist": parseString(object.specialist, "specialist"),
            "diagnosisCodes": 'diagnosesCodes' in object ? parseDiagnosisCodes(object.diagnosesCodes) : undefined
        };

        if (object.type === 'HealthCheck' && 'healthCheckRating' in object) {
            const newHealthCheckEntry: EntryWithoutId = {
                ...newEntry,
                "type": object.type,
                "healthCheckRating": parseHealthCheckRating(object.healthCheckRating)
            };

            return newHealthCheckEntry;

        } else if (object.type === 'Hospital' && 'discharge' in object) {
            const newHospitalEntry: EntryWithoutId = {
                ...newEntry,
                "type": object.type,
                "discharge": parseDischarge(object.discharge),
            };

            return newHospitalEntry;
        } else {
            throw new Error('Incorrect patient entry type or missing fields for specified type');
        }
    }

    throw new Error('Incorrect data: some fields are missing');
};

export {
    toNewPatientEntry,
    toNewEntryForPatient
};