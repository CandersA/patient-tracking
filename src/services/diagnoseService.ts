import diagnoseData from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getDiagnoses = (): Diagnosis[] => {
    return diagnoseData;
};

const getDiagnose = (code: Diagnosis['code']): Diagnosis | undefined => {
    return diagnoseData.find(diagnose => diagnose.code == code);
};
  
const addDiagnose = () => {
    return null;
};
  
export default {
    getDiagnoses,
    getDiagnose,
    addDiagnose
};