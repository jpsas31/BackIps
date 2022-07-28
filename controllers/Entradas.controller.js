
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
                <td> ${data[2]} </td>
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
                    <td> ${data[6] + data[7]}  </td>
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
    const dia = data[2].slice(0, 10)
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
        <h2 style="text-align: center;">Certficado medico No. ${data[3]}</h2>
        <p> La ips Salud en casa certifica que el paciente ${data[11] + " " + data[12] } con identificacion ${data[9] + " " +data[10] }
        fue atendido por el medico ${data[6] + " " + data[7]} con identificacion ${data[4] + " " + data[5]} el dia ${dia}.</p>
        <p> <br> Se anexa formula medica: </p>
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

