import clienteRoutes from './ClienteRoutes'
import categoriaRoutes from './CategoriaRoutes'
import contratoRoutes from './ContratoRoutes'
import procesoRoutes from './ProcesoRoutes'
import fileRoutes from './FileRoutes'
import paqueteRoutes from './PaqueteRoutes'
import consultasRoutes from './ConsultasRoutes'
import sucursalRoutes from './SucursalRoutes'



export default (app) => {
	app.use('/api/clientes', clienteRoutes);
	app.use('/api/contratos', contratoRoutes);
	app.use('/api/procesos', procesoRoutes);
	app.use('/api/categorias', categoriaRoutes);
	app.use('/api/files', fileRoutes);
	app.use('/api/paquetes', paqueteRoutes);
	app.use('/api/consultas', consultasRoutes);
	app.use('/api/sucursales', sucursalRoutes);

}