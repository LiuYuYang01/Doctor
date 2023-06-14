import type { Patient } from "@/types/User";
import Request from "@/utils/Request";

// 添加患者
export const addPatientAPI = (patient: Patient) => Request('POST', '/patient/add', patient)

// 获取患者
export const getPatientAPI = () => Request<Patient[]>("GET", "/patient/mylist")

// 修改患者
export const editPatientAPI = (patient: Patient) => Request('PUT', '/patient/update', patient)

// 删除患者
export const delPatientAPI = (id: string) => Request('DELETE', `/patient/del/${id}`)
