tokenSecurity: Oiuy & TreWq20200704xmlm80033GaBg1=(id + 4745 * 3)
tokenConfirmacion: Wser & TreWq20200704xmlm80033GaBg1=(id + 4745 * 3)

sequelize model: create--name Rol--attributes nombre: string
sequelize model: create--name Modulo--attributes path: string, name: string, icon: string, component: string, layout: string, enabled: boolean, rolId: integer
sequelize model: create--name Cliente--attributes nombres: string, direccion: string, telefono: string, celular: string, web: string, filename: string, descripcion: string, registrado: boolean, habilitado: boolean, username: string, password: string, estado: boolean, rolId: integer
sequelize model: create--name Contrato--attributes motivo: string, subTotal: decimal, totalSaldo: decimal, total: decimal, estado: boolean, fContrato: date, fVencimiento: date, clienteId: integer
sequelize model: create--name NotaCobranza--attributes nro: string, monto: decimal, estado: boolean, imagen: string, contratoId: integer
sequelize model: create--name PlanPagos--attributes monto: decimal, cuota: integer, fecha: date, estado: string, notaId: integer
sequelize model: create--name Proceso--attributes proceso: string, usuarioId: integer, ingreso: boolean
sequelize model: create--name Empresa--attributes nombre: string, direccion: string, telefono: string, smtpUser: string, smtpPort: string, smtpHost: string, smtpUser: string, smtpPassword: string

sequelize model: create--name Categoria--attributes nombre: string, estado: boolean



sequelize model: create-- name Sucursal--attributes nombre: string, estado: boolean, direccion: string, hinicio: string, hfin: string, hestado: boolean, coordenadas: string, clienteId: integer
