import FileService from '../services/FileService';
import ClienteService from '../services/ClienteService';

class FileController {
  static upload(req, res) {
    Promise.all([FileService.uploads(req, res)])
      .then(([file]) => {
        const art = {}
        art.filename = file.filename
        Promise.all([ClienteService.updt(art, req.params.id)])
          .then(([libro]) => {
            Promise.all([ClienteService.getId(req.params.id)])
              .then(([result]) => {
                res.status(200).send({ result })
              })
          })
      })
      .catch(reason => {
        console.log(reason)
        res.status(400).send({ 'message': reason })
      })

  }
  static uploads(req, res) {
    Promise.all([FileService.puploads(req, res)])
      .then(([file]) => {
        const art = {}
        art.portada = file.filename
        Promise.all([ClienteService.updt(art, req.params.id)])
          .then(([libro]) => {
            Promise.all([ClienteService.getId(req.params.id)])
              .then(([result]) => {
                res.status(200).send({ result })
              })
          })
      })
      .catch(reason => {
        console.log(reason)
        res.status(400).send({ 'message': reason })
      })

  }

  static banner(req, res) {
    Promise.all([FileService.banner(req, res)])
      .then(([file]) => {
        const art = {}
        art.banner = file.filename
        Promise.all([ClienteService.updt(art, req.params.id)])
          .then(([libro]) => {
            Promise.all([ClienteService.getId(req.params.id)])
              .then(([result]) => {
                res.status(200).send({ result })
              })
          })
      })
      .catch(reason => {
        console.log(reason)
        res.status(400).send({ 'message': reason })
      })

  }

  static slider(req, res) {
    Promise.all([FileService.slider(req, res)])
      .then(([file]) => {
        const art = {}
        console.log(req.params.slider)
        switch(req.params.slider)
        {
          case '1':  
          art.slider1 = file.filename          
          break
          case '2':  
          art.slider2 = file.filename
          break
          case '3':  
          art.slider3 = file.filename
          break
        }
        
        Promise.all([ClienteService.updt(art, req.params.id)])
          .then(([libro]) => {
            Promise.all([ClienteService.getId(req.params.id)])
              .then(([result]) => {
                res.status(200).send({ result })
              })
          })
      })
      .catch(reason => {
        console.log(reason)
        res.status(400).send({ 'message': reason })
      })

  }
}
export default FileController;