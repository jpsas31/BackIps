
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const { QuillDeltaToHtmlConverter } = require('quill-delta-to-html');
const fs = require('fs');
const puppeteer = require('puppeteer');

const createTable = (data) => {
    let filas = '';
    for (let i = 0; i < data.length; i++) {
      let fila = '';
      const values = Object.values(data[i]);
      for (let j = 0; j < values.length; j++) {
        fila += `<td style="width: 25%; height: 18px; text-align: center;">${values[j]}</td>`;
      }
      filas += fila;
    }
    return ` <table style="border-collapse: collapse; width: 100%; height: 71px;" border="1">
    <tbody>
    <tr style="height: 17px;">
    <td style="width: 25%; height: 17px; text-align: center;">
    <h2>Periodo</h2>
    </td>
    <td style="width: 25%; height: 17px; text-align: center;">
    <h2>Tipo</h2>
    </td>
    <td style="width: 25%; height: 17px; text-align: center;">
    <h2>Instituci&oacute;n</h2>
    </td>
    <td style="width: 25%; height: 17px; text-align: center;">
    <h2>Funci&oacute;n</h2>
    </td>
    </tr>
    ${filas}
    </tbody>
    </table>`;
  };
  
  const PDFcreate = async (data) => {
    // saveDir es la direccion donde se quiere guardar el archivo
  
    const browser = await puppeteer.launch({
      headless: true,
    });
  
    const page = await browser.newPage();
  
    //const table = createTable(data[0].actores);
    // uno define el pdf como un html y le insertas los deltas convertidos a html como se ve abajo
    const file = `<!DOCTYPE html>
      <html>
        <style>
        table, th, td {
          border: 1px solid black; 
        }
        </style>
        <head>
          <meta charset="utf-8" />
        </head>
        <body>
        <h2 style="text-align: center;">Entrada No. ${data[3]}</h2>
        <table style = "width:100%">
          <tr>
            <th> Informacion de la entrada clinica </th>
            <table style = "width:100%">
              <tr>
                <th> Id Entrada </th>
                <td>  ${data[3]} </td>
                <th> Fecha </th>
                <td> ${data[2].slice(0, 10)} </td>
              </tr>
              <table style = "width:100%">
                <th> Informacion del medico </th>
                <table style = "width:100%">
                  <tr>
                    <th> Tipo id </th> 
                    <td> ${data[4]} </td>
                    <th> Identificacion </th>
                    <td> ${data[5]} </td>
                    <th> Nombre  </th>
                    <td> ${data[6] + " " + data[7]}  </td>
                  </tr>
                  <table style = "width:100%">
                    <tr>
                      <th> Correo </th>
                      <td>  ${data[8]} </td>
                    </tr>
                    <table style = "width:100%">
                      <th> Informacion del paciente </th>
                      <table style ="width:100%">
                        <tr>
                          <th> Tipo paciente </th>
                          <td> ${data[9]} </td>
                          <th> Id </th> 
                          <td> ${data[10]} </td>
                          <th> Nombre  </th>
                          <td> ${data[11] + " " + data[12] } </td>
                        </tr>
                        <table style = "width:100%">
                          <tr>
                            <th> Edad </th> 
                            <td> ${data[13]} </td>
                            <th> Correo </th> 
                            <td> ${data[14]} </td>
                            <th> Telefono </th>
                            <td> ${data[16]} </td>
                          </tr>
                          <table style = "width:100%">
                            <tr>
                              <th> Direccion </th>
                              <td> ${data[15]} </td>
                            </tr>
                            <table style = "width:100%">
                              <tr>
                                <th> Descripcion de la entrada clinica </th>
                              </tr>
                              <tr> 
                                <td> ${data[0]} </td>
                              </tr>
                            </table>
                          </table>
                        </table>
                    </table>
                      </table>
                    
                  </table>
                </table>
                </table>
                
                
              </table>
            </table>
          </tr>
          <tr>
          
          </tr>
          <tr> 
            
          </tr>
          <tr>
            
          </tr>
          <tr>
            
          </tr>
          <tr> 
          </tr>
        </table>
        <h2 style="text-align: center;">&nbsp;</h2>
        <h2 style="text-align: center;"> Formula medica </h2>
        <h4> Formula Medica ID: ${data[17]} </h4>
        <table style = "width:100%">
          <tr>
            <th> Prescripcion de la formula medica</th>
          </tr>
          <tr>
            <td> ${data[1]} </td>
          </tr>
        </table>
        </body>
      </html>`;
    
    await page.setContent(file, {
      waitUntil: 'domcontentloaded',
    });
    
    // esto lo descarga
    /*
    await page.pdf({
       format: 'A4'
       //path: 'D:\\Escritorio\\Universidad\\Septimo semestre\\DS2\\proyecto\\ips\\BackIps\\prueba.pdf',
     });
     */
    // esto crea un buffer para que lo envies al front
    
    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: {
        top: 80,
        bottom: 80,
        left: 30,
        right: 30
      }
    });
  
  
    await browser.close();
    return pdfBuffer; 
  };

  const PDFcreateCertificado = async (data) => {
    // saveDir es la direccion donde se quiere guardar el archivo
  
    const browser = await puppeteer.launch({
      headless: true,
    });
  
    const page = await browser.newPage();
    const dia = data[2].slice(8, 10)
    const mes = data[2].slice(5, 7)
    const año = data[2].slice(0, 4)
    //const table = createTable(data[0].actores);
    // uno define el pdf como un html y le insertas los deltas convertidos a html como se ve abajo
    const file = `<!DOCTYPE html>
      <html>
        <style>
        table, th, td {
          border: 1px solid black; 
        }
        </style>
        <head>
          <meta charset="utf-8" />
        </head>
        <body>
        <p style="text-align: center;"><img src="data:image/png;base64,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" style="width: 202px;"></p>
        <p style="text-align: center;">CERTIFICADO MEDICO IPS-VIRTUAL</p>
        <p>El que suscribe  ${data[6] + ' ' +data[7]}, medico general legalmente autorizado para ejercer su profesion.</p>
        <p><br></p>
        <p style="text-align: center;"><strong>CERTIFICA</strong></p>
        <p>Que habiendo practicado reconocimiento medico a ${data[11] + " " + data[12]} con numero de identificacion ${data[10]} de ${data[13]} años de edad. Se encuentra indispuesto por lo que se considera para las actividades que desea el interesado;</p>
        <p><br></p>
        <table style = "width:100%">
          <tr>
            <th> Estado de salud del paciente </th>
            <table style = "width:100%">
              <tr>
                <th> Peso </th>
                <td>  ${data[18]} </td>
                <th> Talla </th>
                <td> ${data[19]} </td>
              </tr>
              <table style = "width:100%">
                <th> Tipo de sangre </th>
                <table style = "width:100%">
                  <tr>
                    <th> Grupo sanguineo </th> 
                    <td> ${data[20]} </td>
                    <th> RH </th>
                    <td> ${data[21]} </td>
                    <th> Frecuencia cardiaca  </th>
                    <td style="text-align: center;"> ${data[22]}  </td>
                  </tr>
                </table>
              </table>
            </table>
          </tr>
        </table>
        <table style = "width:100%">
          <tr>
            <th> Medicamentos - Formula Medica</th>
          </tr>
          <tr>
            <td> ${data[1]} </td>
          </tr>
        </table>
        <p>Se extiende el presente certificado para los fines que al interesado convenga en la ciudad de Santiago de Cali, Valle del cauca a los ${dia} dias del mes de ${mes} del ${año}</p>
        <p><br></p>
        <p><br></p>
        <p><u>${data[6] + " " + data[7]}</u></p>
        <p><u>${data[4] + " " + data[5]}</u></p>  
        <p style="text-align: left;"><br></p>
        </body>
      </html>`;
    
    await page.setContent(file, {
      waitUntil: 'domcontentloaded',
    });
    
    // esto lo descarga
    /*
    await page.pdf({
       format: 'A4'
       //path: 'D:\\Escritorio\\Universidad\\Septimo semestre\\DS2\\proyecto\\ips\\BackIps\\prueba.pdf',
     });
     */
    // esto crea un buffer para que lo envies al front
    
    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: {
        top: 80,
        bottom: 80,
        left: 30,
        right: 30
      }
    });
  
  
    await browser.close();
    return pdfBuffer; 
  };

  async function getAll(req, res) {
    const deltas = req.body.datos_toConvert
    console.log(deltas)
    const datos = [];
    for (let i = 0; i < deltas.length; i++) {
      var data = deltas[i]; 
      const cfg = {
        inlineStyles: true,
        renderAsBlock: true,
        
        customTagAttributes: (op) => {
          if (op.insert.type === 'image') {
            if (op.attributes.style != null) {
              if (op.attributes.style.includes('left'))
              return {
                style: `${op.attributes.style} margin-right:100%`,
              };
            if (op.attributes.style.includes('right'))
              return {
                style: `${op.attributes.style} margin-left:100%`,
              };
            return {
              style: `${op.attributes.style}`,
            };
          } else {
            return { style: `` }
          }
          }
          
        },
        };
        // aqui se pasan los datos de quill a html
        const converter = new QuillDeltaToHtmlConverter(data.ops, cfg);
        const html = converter.convert();
        if (html !== '') data = html;
      
  
      datos.push(data);
    }
    
    console.log('heyyy', datos); 
    console.log('se creo');
    const datosOrganizados = await PDFcreate(datos);
    console.log(datosOrganizados, 'a ver si si ')
    res.contentType("application/pdf");
    
    return res.send(datosOrganizados)
  }
  
  async function getAll2(req, res) {
    const deltas = req.body.datos_toConvert
    console.log(deltas)
    const datos = [];
    for (let i = 0; i < deltas.length; i++) {
      var data = deltas[i]; 
      const cfg = {
        inlineStyles: true,
        renderAsBlock: true,
        
        customTagAttributes: (op) => {
          if (op.insert.type === 'image') {
            if (op.attributes.style != null) {
              if (op.attributes.style.includes('left'))
              return {
                style: `${op.attributes.style} margin-right:100%`,
              };
              if (op.attributes.style.includes('right'))
                return {
                  style: `${op.attributes.style} margin-left:100%`,
                };
              return {
                style: `${op.attributes.style}`,
              };
            } else {
              return { style: `` }
            }
          }
        },
        };
        // aqui se pasan los datos de quill a html
        const converter = new QuillDeltaToHtmlConverter(data.ops, cfg);
        const html = converter.convert();
        if (html !== '') data = html;
      
  
      datos.push(data);
    }
    
    console.log('heyyy', datos); 
    console.log('se creo');
    const datosOrganizados = await PDFcreateCertificado(datos);
    console.log(datosOrganizados, 'a ver si si ')
    res.contentType("application/pdf");
    
    return res.send(datosOrganizados)
  }

  module.exports = {
    getAll,
    getAll2,
    PDFcreate,
    createTable
}

