import { Medicine } from "./medicine";

export interface MedicineResource {
    status_code: string;
  status_message: string;
  datetime: string;
  data: {
    did_you_mean_result: any[];
    result: Medicine[];
  };
}
