import diagnoseData from '../../data/diagnoses';
import { Diagnoses } from '../types';

const getDiagnoses = (): Diagnoses[] => {
    return diagnoseData;
};
  
const addDiagnose = () => {
    return null;
};
  
export default {
    getDiagnoses,
    addDiagnose
};