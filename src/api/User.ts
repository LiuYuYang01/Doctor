import Request from "@/utils/Request";
import type { UserInfo, Patient } from '@/types/User'

// 获取用户信息
export const getUserInfo = () => Request<UserInfo>("GET", "/patient/myuser")

// 获取患者信息
export const getPatientList = () => Request<Patient[]>("GET", "/patient/mylist")