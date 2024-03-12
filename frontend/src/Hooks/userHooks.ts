import { useMutation, useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { UserInfo } from '../types/UserInfo.ts'

export const useSigninMutation = () =>
  useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string
      password: string
    }) =>
      (
        // UserInfo là kiểu trả về của api
        await apiClient.post<UserInfo>(`api/users/signin`, {
          email,
          password,
        })
      ).data,
  })
export const useSignupMutation = () =>
  useMutation({
    mutationFn: async ({ name,
      email,
      password }: {
        name: string
        email: string
        password: string
      }) => (
        await apiClient.post<UserInfo>(`/api/users/signup`, {
          name,
          email,
          password
        })
      ).data
  })
export const useUpdateProfileMutation = () =>
  useMutation({
    mutationFn: async ({
      name,
      email,
      password,
      address,
      phone
    }: {
      name: string
      email: string
      password: string
      address: string
      phone: string
    }) =>
      (
        await apiClient.put<UserInfo>(`api/users/profile`, {
          name,
          email,
          password,
          address,
          phone
        })
      ).data,
  })
export const useGetAllUser = () =>
  useQuery({
    queryKey: ['all-users'],
    queryFn: async () =>
      (await apiClient.get<UserInfo[]>(`/api/users/getAllUsers`)).data,
  })
export const useUpdateUserMutation = () =>
  useMutation({
    mutationFn: async ({
      id,
      name,
      email,
      address,
      phone
    }: {
      id: string,
      name: string
      email: string
      address: string
      phone: string
    }) =>
      (
        await apiClient.put<UserInfo>(`api/users/updateUser`, {
          id,
          name,
          email,
          address,
          phone
        })
      ).data,
  })