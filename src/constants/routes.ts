export const ROUTES = {
  HOME: '/'
} as const

export const parseRoutes = [
  {
    name: "Libro de Recetas",
    route: "recipes"
  },
  {
    name: "Eventos",
    route: "events"
  }
] as const

export interface RouteConfig {
  name: string;
  route: string;
}
