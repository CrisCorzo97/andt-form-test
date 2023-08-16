import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL;

export async function GET(req: NextRequest) {
  const { data } = await axios.get(`${API_URL}/users`, {
    // params: {
    //   page: params.page,
    //   items_per_page: params.items_per_page,
    // },
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6IjRqWHA4aUt0aTh0MWdrc3oiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjg5NzMwNjQ5LCJpYXQiOjE2ODk3MjcwNDksImlzcyI6Imh0dHBzOi8vaHR0cHM6Ly91cHFzZmdza2l5emlnemh4aG9raC5zdXBhYmFzZS5jby9hdXRoL3YxIiwic3ViIjoiZTk0NWJlZWUtYTAyZC00ODIyLWJiZjktNDQzNTM4ZmEwODQ1IiwiZW1haWwiOiJjcmNvcnpvMDRAaG90bWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7ImN1aWwiOiIyMDM5ODg2MDE4OCIsImZpcnN0X25hbWUiOiJDcmlzdGlhbiIsImxhc3RfbmFtZSI6IkNvcnpvIiwidXNlcl9wb3NpdGlvbiI6IkFkbWluaXN0cmFkb3IifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTY4OTcyNzA0OX1dLCJzZXNzaW9uX2lkIjoiNDYxZGJhNGQtYmNmMC00M2M1LWE0ZjAtMWJlMjZmYmM2MDMyIn0.sRfaG7374GKSX1ys-aPrxJ92rfK5KZ9hwkHNrSm7ueM",
    },
  });
}

export const getUsers = async (input: {
  page?: number;
  items_per_page?: number;
}) => {
  try {
    const { data } = await axios.get(`${API_URL}/users`, {
      params: {
        page: input.page,
        items_per_page: input.items_per_page,
      },
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6IjRqWHA4aUt0aTh0MWdrc3oiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjg5NzMwNjQ5LCJpYXQiOjE2ODk3MjcwNDksImlzcyI6Imh0dHBzOi8vaHR0cHM6Ly91cHFzZmdza2l5emlnemh4aG9raC5zdXBhYmFzZS5jby9hdXRoL3YxIiwic3ViIjoiZTk0NWJlZWUtYTAyZC00ODIyLWJiZjktNDQzNTM4ZmEwODQ1IiwiZW1haWwiOiJjcmNvcnpvMDRAaG90bWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7ImN1aWwiOiIyMDM5ODg2MDE4OCIsImZpcnN0X25hbWUiOiJDcmlzdGlhbiIsImxhc3RfbmFtZSI6IkNvcnpvIiwidXNlcl9wb3NpdGlvbiI6IkFkbWluaXN0cmFkb3IifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTY4OTcyNzA0OX1dLCJzZXNzaW9uX2lkIjoiNDYxZGJhNGQtYmNmMC00M2M1LWE0ZjAtMWJlMjZmYmM2MDMyIn0.sRfaG7374GKSX1ys-aPrxJ92rfK5KZ9hwkHNrSm7ueM",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};
