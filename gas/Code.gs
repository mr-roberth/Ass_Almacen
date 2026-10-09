/** Assessment Forecast · Oleolab
 * Crear una hoja de Google Sheets, copiar su ID y establecer la propiedad
 * de proyecto SPREADSHEET_ID. Publicar como aplicación web.
 * IMPORTANTE: Un despliegue público SIN autenticación permite leer/escribir
 * evaluaciones; emplear controles de acceso de Google Workspace.
 */
const SHEET_NAME = "Evaluaciones";
const HEADERS = ["id","updated_at","period","date","area","owner","forecast","payload_json"];
function sheet_(){
  const id=PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
  if(!id)throw Error("Configura la propiedad SPREADSHEET_ID en el proyecto GAS.");
  const ss=SpreadsheetApp.openById(id);
  let sh=ss.getSheetByName(SHEET_NAME);
  if(!sh){sh=ss.insertSheet(SHEET_NAME);sh.appendRow(HEADERS);sh.setFrozenRows(1);}
  return sh;
}
function reply_(obj){
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
function records_(){
  const values=sheet_().getDataRange().getValues();
  return values.slice(1).filter(r=>r[0]).map(r=>{
    try{return JSON.parse(r[7]);}catch(e){return null;}
  }).filter(Boolean);
}
function doGet(e){
  try {
    const action=(e&&e.parameter&&e.parameter.action)||"health";
    if(action==="list")return reply_({ok:true,assessments:records_()});
    return reply_({ok:true,service:"Assessment Forecast",now:new Date().toISOString()});
  } catch(ex){return reply_({ok:false,error:String(ex.message||ex)});}
}
function doPost(e){
  const lock=LockService.getScriptLock();
  try{
    const req=JSON.parse(e.postData.contents||"{}");
    if(req.action!=="saveBatch"||!Array.isArray(req.assessments))throw Error("Solicitud inválida");
    if(req.assessments.length>500)throw Error("Máximo 500 evaluaciones por lote");
    lock.waitLock(30000);
    const sh=sheet_(),old=sh.getDataRange().getValues();
    const index=new Map(old.slice(1).map((r,i)=>[String(r[0]),i+2]));
    let saved=0;
    for(const a of req.assessments){
      if(!a||typeof a.id!=="string"||!/^[a-zA-Z0-9_-]{4,100}$/.test(a.id)||typeof a.scores!=="object")continue;
      const json=JSON.stringify(a);
      if(json.length>45000)continue;
      const row=[a.id,new Date(),String(a.period||""),String(a.date||""),String(a.area||""),String(a.owner||""),String(a.forecast||""),json];
      const number=index.get(a.id);
      if(number)sh.getRange(number,1,1,row.length).setValues([row]);
      else {sh.appendRow(row);index.set(a.id,sh.getLastRow());}
      saved++;
    }
    return reply_({ok:true,saved});
  }catch(ex){return reply_({ok:false,error:String(ex.message||ex)});}
  finally{try{lock.releaseLock()}catch(ignore){}}
}