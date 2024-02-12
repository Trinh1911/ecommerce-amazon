import { useMutation } from '@tanstack/react-query'
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