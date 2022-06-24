import { AxiosInstance } from 'axios'

export type ServicesType = 'get' | 'post' | 'put' | 'patch' | 'options' | 'delete'

export type ApiService = Pick<AxiosInstance, ServicesType>
