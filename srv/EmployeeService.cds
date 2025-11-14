using { ust.sneha.kancharla.db as demo } from '../db/schema';

service EmployeeService {



    entity Employee as projection on demo.Employee;

    

}