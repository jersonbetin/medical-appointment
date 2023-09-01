export const TOKEN = 'TOKEN';
export const API = process.env.API_DOCTOC || 'localhost:3001';
export const NEXT_PUBLIC_GRAPHQL_URI =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3000/api/graphql'
    : process.env.NEXT_PUBLIC_GRAPHQL_URI;
