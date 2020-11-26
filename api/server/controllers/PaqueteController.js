import PaqueteService from '../services/PaqueteService';

class PaqueteController {

    /* Metodos */
    static data(req, res) {
        Promise.all([PaqueteService.getAll(req.params.page, req.params.num)])
            .then(([result]) => {
                res.status(200).send({ result })
            })
            .catch(reason => {
                res.status(400).send({ 'message': reason })
            })
    }

    static listar(req, res) {
        Promise.all([PaqueteService.getList(req.params.name)])
            .then(([result]) => {
                res.status(200).send({ result })
            })
            .catch(reason => {
                res.status(400).send({ 'message': reason })
            })
    }

    static item(req, res) {
        Promise.all([PaqueteService.getId(req.params.id)])
            .then(([result]) => {
                res.status(200).send({ result })
            })
            .catch(reason => {
                res.status(400).send({ 'message': reason })
            })
    }

    static registrar(req, res) {
        if (req.body.nombre) {
            Promise.all([PaqueteService.add(req.body)])
                .then(([paquete]) => {
                    Promise.all([PaqueteService.getAll(1, 12)])
                        .then(([paquetes]) => {
                            res.status(200).json({ 'message': `Usuario ID: ${paquete.nombre} registrado`, 'result': paquetes })
                        })
                })
        } else {
            res.status(400).send({ 'message': 'datos faltantes' })
        }
    }

    static borrar(req, res) {
        Promise.all([PaqueteService.del(req.params.id)])
            .then(([paquete]) => {
                Promise.all([PaqueteService.getAll(1, 12)])
                    .then(([paquetes]) => {
                        res.status(200).json({ 'message': `Usuario ID: ${paquete} eliminado`, 'result': paquetes })
                    })
            })
            .catch(reason => {
                res.status(400).send({ 'message': reason.parent.message })
            })
    }

    static actualizar(req, res) {
        Promise.all([PaqueteService.update(req.body, req.params.id)])
            .then(([paquete]) => {
                Promise.all([PaqueteService.getAll(1, 12)])
                    .then(([paquetes]) => {
                        res.status(200).json({ 'message': `Usuario ID: ${req.params.id} actualizado`, 'result': paquetes })
                    })
            })
            .catch(reason => {
                res.status(400).send({ 'message': reason })
            })
    }



}

export default PaqueteController;