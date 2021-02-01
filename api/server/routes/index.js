import clienteRoutes from './ClienteRoutes'
import paqueteRoutes from './PaqueteRoutes'
import categoriaRoutes from './CategoriaRoutes'
import horarioRoutes from './HorarioRoutes'
import fileRoutes from './FileRoutes'
import sucursalRoutes from './SucursalRoutes'
import contratoRoutes from './ContratoRoutes'
import consultasRoutes from './ConsultasRoutes'
import usuarioRoutes from './UsuarioRoutes'
/*'

import procesoRoutes from './ProcesoRoutes'


import reporteRoutes from './ReporteRoutes'*/



export default (app) => {
	app.use('/api/clientes', clienteRoutes);
	app.use('/api/categorias', categoriaRoutes);
	app.use('/api/paquetes', paqueteRoutes);
	app.use('/api/horarios', horarioRoutes);
	app.use('/api/files', fileRoutes);
	app.use('/api/sucursales', sucursalRoutes);
	app.use('/api/horarios', horarioRoutes);
	app.use('/api/contratos', contratoRoutes);
	app.use('/api/consultas', consultasRoutes);
	app.use('/api/usuarios', usuarioRoutes);	

	/*app.use('/api/contratos', contratoRoutes);
	app.use('/api/procesos', procesoRoutes);
		
		
	app.use('/api/reportes', reporteRoutes);*/

}