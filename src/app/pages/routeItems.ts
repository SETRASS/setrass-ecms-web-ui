// routes.ts

export const routeItems = [
    {
      role: "staff-client",
      route: "/staff",
      name: "Staff",
      childRoutes: []
    },
    {
      role: "patrono-empleador-client",
      route: "/patrono-empleador",
      name: "Patrono y empleador",
      childRoutes: []
    },
    {
      role: "inspection-client",
      route: "/inspeccion",
      name: "Inspeccion",
      childRoutes: [
        {
          role: "inspection-client",
          route: "/atenciones",
          name: "Atenciones"
        },
        {
          role: "inspection-client",
          route: "/parametrizacion",
          name: "Parametrización"
        },
        {
          role: "inspection-client",
          route: "/inspeccion/solicitudes-inspeccion",
          name: "Solicitudes de Inspección"
        },
        {
          role: "inspection-client",
          route: "/inspeccion/citas-permisos",
          name: "Calendario"
        },
        {
          role: "inspection-client",
          route: "/inspeccion/escritos-acreditaciones",
          name: "Escritos y acreditaciones"
        },
      ]
    }
  ];  