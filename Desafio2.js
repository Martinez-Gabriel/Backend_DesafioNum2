// >> Consigna: Implementar programa que contenga una clase llamada Contenedor que reciba el nombre del archivo con el que va a trabajar e implemente los siguientes métodos:

// save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
// getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
// getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
// deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
// deleteAll(): void - Elimina todos los objetos presentes en el archivo.

// >> Aspectos a incluir en el entregable: 
// El método save incorporará al producto un id numérico, que deberá ser siempre uno más que el id del último objeto agregado (o id 1 si es el primer objeto que se agrega) y no puede estar repetido.
// Tomar en consideración el contenido previo del archivo, en caso de utilizar uno existente.
// Implementar el manejo de archivos con el módulo fs de node.js, utilizando promesas con async/await y manejo de errores.
// Probar el módulo creando un contenedor de productos, que se guarde en el archivo: “productos.txt”
// Incluir un llamado de prueba a cada método, y mostrando por pantalla según corresponda para verificar el correcto funcionamiento del módulo construído. 
// El formato de cada producto será : 

const fs = require ('fs')


class Contenedor {

  constructor( archivo ) {
      this.archivo = archivo
  }

  
  async getAll() {
    try{
      const objetos = await fs.promises.readFile( this.archivo, 'utf-8')
      return JSON.parse(objetos)

    } catch(error) {
      console.log(`Ocurrio un error: ${error}`)
    }
  }
 
  
  async saveFile ( archivos, objetos ) {
    try {
      await fs.promises.writeFile(
        archivos, JSON.stringify( objetos, null, 2 )
        )
    } catch(error) {
      console.log(`Ocurrio un error: ${error}`)
    }
  }


  async save( objetos ) {
    const objetos = await this.getAll()
    try{
        let nuevaId
        objetos.length === 0 
          ? nuevaId = 1
          : nuevaId = objetos[ objetos.length - 1 ].id + 1
        
        const nuevoObjeto = { id: nuevaId, ...objetos }       
        objetos.push(nuevoObjeto)        
        await this.saveFile(this.archivo, objetos)
        return nuevaId

    } catch(err) {
      console.log(`Ocurrio un error: ${error}`)
    }
  }


  async getById( id ) {
    const objetos = await this.getAll()
    try {
      const objeto = objetos.find( elemento => elemento.id === id)
      return objeto ? objeto : null

    } catch(error) {
      console.log(`Ocurrio un error: ${error}`)
    }
  }


  async deleteById( id ) {
    let objetos = await this.getAll()
    
    try {
      objetos = objetos.filter( elemento => elemento.id != id )
      await this.saveFile( this.archivo, objetos)
    
    } catch(error) {
      console.log(`Ocurrio un error: ${error}`)
    }
  }


  async deleteAll() {
    await this.saveFile(this.archivo, [])
  }

}



const productos = new Contenedor('productos.txt')

const prueba = async() => {
  try {
      /*save*/
      await productos.save(
        { "title": "productoNumero6",
          "price": 20000,
          "thumbnail": "ruta6"
        }
      )
      array = await productos.getAll()
      console.log(array)
    
      /*getById*/
      let idResp = await productos.getById(0)
      console.log(idResp)
      idResp = await productos.getById(2)
      console.log(idResp)
      
      /*getAll*/
      let array = await productos.getAll()
      console.log(array)

      /*deleteById*/
      await productos.deleteById(2)
      array = await productos.getAll()
      console.log(array)

      /*deleteAll*/
      await productos.deleteAll()
      array = await productos.getAll()
      console.log(array)

  } catch(err) {
    console.log(err)
  }
}




prueba()