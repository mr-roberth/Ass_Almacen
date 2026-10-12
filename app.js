const LEGACY_DATA=[
["Confiabilidad",[["Integridad de datos",["El Forecast incluye todos los SKU/PT requeridos","Cantidades completas para los periodos evaluados","Fechas o semanas de necesidad definidas","Inventario, llegadas y necesidades disponibles"]],["Exactitud y consistencia",["Forecast coincide con la fuente oficial","Sin duplicidades, omisiones ni inconsistencias relevantes","Unidades de medida correctas y homogéneas","Los datos coinciden con la realidad operativa"]],["Oportunidad y actualización",["Forecast actualizado según frecuencia establecida","Inventarios y llegadas registrados oportunamente","Cambios reflejados en la App sin retrasos relevantes","Las áreas usan información vigente"]],["Trazabilidad y validación",["Se identifica quién actualizó la información","Se registra fecha de cada actualización","La información es revisada antes de usarse","Correcciones y ajustes documentados"]]]],
["Comunicación",[["Flujo entre áreas",["Planeación, Compras, Producción y Almacén intercambian datos oportunamente","Las áreas conocen cambios que les impactan","Hay un canal definido de incidencias","La información compartida es clara para actuar"]],["Gestión de cambios",["Los cambios al Forecast se comunican formalmente","Se evalúa el impacto sobre inventarios, compras y producción","Se notifica a todos los responsables afectados","Está identificada la versión vigente del Forecast"]],["Seguimiento de acuerdos",["Revisiones generan acuerdos claros","Cada acuerdo tiene un responsable","Cada acuerdo tiene fecha compromiso","Se verifica el cierre de los acuerdos"]],["Escalamiento de riesgos",["Riesgos identificados antes del incumplimiento","Hay mecanismos claros para escalar problemas","Las decisiones se toman oportunamente","Riesgos críticos visibles para los responsables"]]]],
["Disciplina operativa",[["Claridad de roles",["Cada actividad tiene un responsable asignado","Los usuarios conocen su rol","Se define quién captura y quién valida","No existen vacíos de responsabilidad"]],["Cumplimiento de rutinas",["Forecast actualizado en fechas acordadas","Inventarios, llegadas y necesidades revisados periódicamente","Reuniones o cortes de seguimiento consistentes","La práctica continúa sin supervisión directa"]],["Competencia y capacitación",["Usuarios clave capacitados","Los usuarios interpretan correctamente la App","Saben actuar ante desviaciones y alertas","Existen guías o materiales de apoyo"]],["Responsabilidad y seguimiento",["Desviaciones atendidas oportunamente","Compromisos cumplidos a tiempo","Responsables cuidan la calidad de sus datos","Incumplimientos reconocidos y gestionados"]]]],
["Sostenibilidad",[["Medición de desempeño",["Hay indicadores de cumplimiento Forecast","Se mide cumplimiento por periodo","Se monitorean las desviaciones relevantes","Los resultados se revisan periódicamente"]],["Análisis de desviaciones",["Los incumplimientos tienen análisis de causa","Se distinguen causas humanas, operativas y tecnológicas","Se identifican desviaciones recurrentes","Se documentan los hallazgos"]],["Acciones correctivas",["Las desviaciones generan acciones concretas","Acciones tienen responsable y fecha","Se comprueba efectividad de las acciones","Se evita repetir problemas sin tratamiento"]],["Continuidad operativa",["La práctica no depende de una sola persona","Existen suplentes capacitados","El proceso cuenta con documentación mínima","Se mantiene ante cambios de personal o carga"]]]]
];

let catalogTemplate=normalizeCatalog(upgradeUntouchedDefault(getSaved(CATALOG_KEY,DEFAULT_CATALOG)),"Almacén");
const catalogByArea={"Almacén":catalogTemplate};
function templateFor(area){const key=["Almacén","Producción","Mantenimiento"].includes(area)?area:"Almacén";if(!catalogByArea[key])catalogByArea[key]=normalizeCatalog(getSaved(catalogStorageKey(key),areaCatalog(key)),key);return catalogByArea[key]}
let editorArea="Almacén";
let editingCatalog=JSON.parse(JSON.stringify(catalogTemplate));
let DATA=JSON.parse(JSON.stringify(catalogTemplate)),ITEMS=[],STEPS=[],NAV_STEPS=[];
function catalogFor(ev){return ev&&validCatalog(ev.catalog)?ev.catalog:LEGACY_DATA}
function itemsOf(c){return c.flatMap(([pillar,els],p)=>els.flatMap(([element,criteria],e)=>criteria.map((criterion,k)=>({id:p+"-"+e+"-"+k,pillar,element,criterion,p,e,c:k}))))}
function stepsOf(c){return c.flatMap(([pillar,els],p)=>els.map(([name],e)=>({pillar,name,p,e})))}
function itemsFor(ev){return itemsOf(catalogFor(ev))}
function stepsFor(ev){return stepsOf(catalogFor(ev))}
function groupedMaintenance(ev){return (ev?.area==="Mantenimiento")&&DATA[0]?.[0]===MAINTENANCE_DEFAULT_CATALOG[0][0]}
function stepCriteria(s){return ITEMS.filter(x=>x.p===s.p&&(s.e===null||x.e===s.e))}
function activateCatalog(ev){
 DATA=catalogFor(ev);ITEMS=itemsOf(DATA);STEPS=stepsOf(DATA);
 // El nuevo mantenimiento tiene 28 elementos, muchos de una sola pregunta.
 // Captura por sus 4 pilares; análisis y gráficos siguen por elemento.
 NAV_STEPS=groupedMaintenance(ev)?DATA.map(([name],p)=>({pillar:name,name,p,e:null})):STEPS;
 step=Math.min(step,Math.max(0,NAV_STEPS.length-1));
}

const URL_DEFAULT="https://script.google.com/macros/s/AKfycbySBlGPjgi5f8b4pOKwEvaCKBfmjgsi16Hsnj4DM3hE11Iqc5fTyjZNfEjA5lpxJ-CT/exec";
const LOGO_URL="https://raw.githubusercontent.com/mr-roberth/Pruebas/main/assets/oleolab-logo.png";
const KEY="oleolab_forecast_assessments_v1",DRAFTKEY="oleolab_assessment_draft_v2",URLKEY="oleolab_assessment_gas_url";
const el=id=>document.getElementById(id);
const clone=a=>JSON.parse(JSON.stringify(a));
const escapeHTML=x=>String(x??"").replace(/[&<>"']/g,v=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[v]));
function getSaved(k,otherwise){try{return JSON.parse(localStorage.getItem(k))??otherwise}catch(e){return otherwise}}
let store=getSaved(KEY,[]).filter(x=>x&&x.id&&x.scores),current=getSaved(DRAFTKEY,null),step=0,radarChart=null,barsChart=null;
if(!current||!current.scores)current=blank();
else if(!validCatalog(current.catalog)&&!Object.values(current.scores).some(x=>x&&x.value!==undefined))current=blank();
// Actualiza únicamente un borrador sin respuestas ni observaciones que use
// exactamente la versión anterior de las preguntas de fábrica.
else if(isPreviousDefault(current.catalog)&&!Object.values(current.scores).some(x=>x&&(x.value!==undefined||x.notes||x.action||x.evidence))){
 current.catalog=clone(catalogTemplate);localStorage.setItem(DRAFTKEY,JSON.stringify(current));
}
activateCatalog(current);
function blank(area="Almacén"){const n=new Date();return {id:"ev"+Date.now().toString(36)+Math.random().toString(36).slice(2,7),period:"Evaluación "+area+" · "+n.toLocaleString("es-MX",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:false}),date:new Date(n.getTime()-n.getTimezoneOffset()*60000).toISOString().slice(0,10),area,owner:"",forecast:"",representative:"",scores:{},catalog:clone(templateFor(area)),created:n.toISOString()}}
const MAINTENANCE_BASELINE_ID="mant_diagnostico_20261012";
function addMaintenanceBaseline(){
 if(store.some(ev=>ev.id===MAINTENANCE_BASELINE_ID))return false;
 const assessment={
  id:MAINTENANCE_BASELINE_ID,
  period:"Diagnóstico inicial de Mantenimiento · datos proporcionados",
  date:"",
  area:"Mantenimiento",
  owner:"",
  forecast:"",
  representative:"",
  scores:clone(MAINTENANCE_BASELINE_SCORES),
  catalog:clone(MAINTENANCE_DEFAULT_CATALOG),
  source:"Respuestas de Mantenimiento proporcionadas el 12/10/2026",
  originalScale:"0=No cumple; 1=Cumple",
  conversion:"0 → 0; 1 → 2 (escala de la App)",
  created:new Date().toISOString()
 };
 store.push(assessment);
 try{localStorage.setItem(KEY,JSON.stringify(store));return true}
 catch(e){store=store.filter(x=>x.id!==MAINTENANCE_BASELINE_ID);return false}
}
function rating(x){return [0,1,2].includes(Number(x))&&x!==undefined&&x!==null?Number(x):null}
function pct(n){return n==null?"—":Math.round(n)+"%"}
function levelIndex(n){return n==null?null:n<=25?1:n<=50?2:n<=75?3:n<=90?4:5}
function levelName(n){return ["Inicial","Básico","Estandarizado","Controlado","Sostenible"][(levelIndex(n)||1)-1]}
function level(n){return n==null?"Sin evaluar":("Nivel "+levelIndex(n)+" de 5 · "+levelName(n))}
function rowScore(ev,predicate){let vs=itemsFor(ev).filter(predicate).map(i=>rating(ev.scores?.[i.id]?.value)).filter(v=>v!==null);return vs.length?vs.reduce((a,b)=>a+b,0)/vs.length*50:null}
function totalAnswered(ev){return itemsFor(ev).filter(i=>rating(ev.scores?.[i.id]?.value)!==null).length}
function labelScore(v){return v===2?"Cumple":v===1?"Parcial":v===0?"No cumple":"Sin evaluar"}
function classScore(v){return v===2?"yes":v===1?"partial":v===0?"no":"na"}
function criterionParts(text){const m=String(text||"").match(/^(.+?)\s+\(([^()]*)\)\s*$/);return m?{question:m[1],evidence:m[2]}:{question:String(text||""),evidence:""}}
function dateLabel(s){try{return new Date(s+"T12:00:00").toLocaleDateString("es-MX",{day:"2-digit",month:"short",year:"numeric"})}catch(e){return s||""}}
function localDraft(){try{localStorage.setItem(DRAFTKEY,JSON.stringify(current))}catch(e){status("Espacio local insuficiente. Descarga un respaldo JSON.",true)}}
function status(msg,bad=false){el("status").textContent=msg;el("status").classList.toggle("error",bad)}
function currentFields(){localDraft()}
function reflectFields(){}
function showPage(which){document.querySelectorAll("[data-tab]").forEach(b=>b.classList.toggle("active",b.dataset.tab===which));document.querySelectorAll(".view").forEach(v=>v.classList.toggle("active",v.id==="page-"+which));if(which==="nueva")renderStep();if(which==="evaluaciones")renderHistory();if(which==="dashboard")renderDashboard();if(which==="criterios"){el("catalog-area").value=editorArea;renderEditor()}}
function renderStepNav(){
 const html=NAV_STEPS.map((s,i)=>{const filtered=stepCriteria(s);const count=filtered.filter(x=>rating(current.scores[x.id]?.value)!==null).length;
 return '<button class="step-btn '+(i===step?"active ":"")+(count===filtered.length?"complete":"")+'" data-step="'+i+'" title="'+escapeHTML(s.pillar+" · "+s.name)+'"><span class="num">'+(i+1)+'</span><span>'+escapeHTML(s.name)+'<br><small class="subtle">'+count+'/'+filtered.length+' evaluados</small></span></button>'}).join("");
 el("step-nav").innerHTML=html;
 const answered=totalAnswered(current);el("progress-label").textContent=answered+" de "+ITEMS.length+" criterios evaluados";
 el("progress-fill").style.width=(answered/ITEMS.length*100)+"%";
 el("progress-global").textContent=pct(rowScore(current,()=>true));
 const older=JSON.stringify(current.catalog)!==JSON.stringify(templateFor(current.area||"Almacén"));
 el("catalog-version-note").hidden=!older;
 el("catalog-version-note").textContent=older?"Esta evaluación usa su cuestionario original ("+ITEMS.length+" preguntas). Para usar las "+itemsOf(templateFor(current.area||"Almacén")).length+" actuales, pulsa Nueva evaluación.":"";
}
function renderStep(){
 activateCatalog(current);
 document.querySelectorAll("[data-area]").forEach(b=>{const selected=b.dataset.area===(current.area||"Almacén");b.classList.toggle("selected",selected);b.setAttribute("aria-pressed",String(selected))});
 el("area-questions").textContent=ITEMS.length+" criterios · "+STEPS.length+" elementos · "+DATA.length+" pilares";
 el("view-maintenance-baseline").hidden=(current.area!=="Mantenimiento");
 el("header-counts").textContent=(current.area||"Almacén")+" · "+ITEMS.length+" criterios";
 const s=NAV_STEPS[step];el("step-pillar").textContent=s.pillar;el("step-title").textContent=s.name;
 const found=stepCriteria(s);
 el("step-count").textContent=(s.e===null?"Pilar ":"Elemento ")+(step+1)+" de "+NAV_STEPS.length+" · "+found.length+" preguntas";
 el("step-questions").innerHTML=found.map((item,i)=>{const ans=current.scores[item.id]||{},v=rating(ans.value);const more=ans.evidence||ans.notes||ans.action,parts=criterionParts(item.criterion);
 return '<article class="criterion">'+(s.e===null?'<div class="criterion-element">'+escapeHTML(item.element)+'</div>':'')+'<div class="criterion-title"><b>'+String(i+1).padStart(2,"0")+'</b><span>'+escapeHTML(parts.question)+'</span></div>'+(parts.evidence?'<div class="criterion-proof"><i class="fa-regular fa-circle-check"></i> Para comprobarlo: '+escapeHTML(parts.evidence)+'</div>':'')+'<div class="choice-row">'+[[2,"Cumple","yes"],[1,"Parcial","partial"],[0,"No cumple","no"]].map(([score,label,cls])=>'<button type="button" class="choice '+cls+(v===score?" on":"")+'" data-criterion="'+item.id+'" data-value="'+score+'" aria-pressed="'+(v===score?'true':'false')+'">'+label+'</button>').join("")+'</div><details class="more" '+(more?"open":"")+'><summary>Agregar evidencia, observaciones o acciones</summary><div class="field"><label for="evidence-'+item.id+'">Evidencia</label><input id="evidence-'+item.id+'" data-note="'+item.id+'" data-note-key="evidence" placeholder="Ej. conteo, correo, fecha, registro o enlace" value="'+escapeHTML(ans.evidence||"")+'"></div><div class="field"><label for="notes-'+item.id+'">Observaciones</label><textarea id="notes-'+item.id+'" rows="2" data-note="'+item.id+'" data-note-key="notes" placeholder="Hallazgo o causa">'+escapeHTML(ans.notes||"")+'</textarea></div><div class="field"><label for="action-'+item.id+'">Acción</label><textarea id="action-'+item.id+'" rows="2" data-note="'+item.id+'" data-note-key="action" placeholder="Actividad de mejora">'+escapeHTML(ans.action||"")+'</textarea></div></details></article>'}).join("");
 el("prev-step").disabled=step===0;el("next-step").innerHTML=step===NAV_STEPS.length-1?'Guardar y ver resultados <i class="fa-solid fa-chart-pie"></i>':'Siguiente <i class="fa-solid fa-arrow-right"></i>';
 renderStepNav();
}
function setChoice(button){
 const id=button.dataset.criterion,n=Number(button.dataset.value);current.scores[id]??={};current.scores[id].value=n;
 document.querySelectorAll('[data-criterion="'+id+'"]').forEach(b=>{const on=Number(b.dataset.value)===n;b.classList.toggle("on",on);b.setAttribute("aria-pressed",String(on))});
 localDraft();renderStepNav();
}
function saveLocal(){
 currentFields();
 if(!validCatalog(current.catalog)&&current.catalog)throw Error("Los criterios de esta evaluación no son válidos");
 const pos=store.findIndex(x=>x.id===current.id);
 const data=clone(current);data.modified=new Date().toISOString();
 if(pos>=0)store[pos]=data;else store.unshift(data);
 try{localStorage.setItem(KEY,JSON.stringify(store));localDraft()}catch(e){status("No se pudo guardar en el navegador; exporta JSON.",true);throw e}
 return data;
}
async function gasSave(ev){
 const url=localStorage.getItem(URLKEY)||URL_DEFAULT,body=JSON.stringify({action:"saveBatch",assessments:[ev]});
 try{
  const response=await fetch(url,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body,redirect:"follow"});
  if(!response.ok)throw new Error("HTTP "+response.status);
  const result=await response.json();
  if(!result.ok)throw new Error(result.error||"GAS devolvió error");
  return "Guardado en Google Sheets confirmado";
 }catch(err){
  if(!(err instanceof TypeError))throw err;
  await fetch(url,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body});
  return "Guardado localmente y enviado a GAS; el navegador no pudo confirmar la recepción. Compruébala en la hoja Evaluaciones de la base de datos.";
 }
}
async function saveEvaluation(showResults=false){
 let saved;try{saved=saveLocal()}catch(e){status("No se pudo guardar: "+e.message,true);return}
 status("Evaluación guardada en este dispositivo. Sincronizando con GAS...");
 if(showResults)showPage("dashboard");
 try{const result=await gasSave(saved);status(result)}
 catch(e){status("Respaldo local conservado. No se confirmó la sincronización: "+e.message,true)}
}
function startNew(area=current.area||"Almacén"){if(!["Almacén","Producción","Mantenimiento"].includes(area))area=current.area||"Almacén";const hasAnswers=totalAnswered(current)>0;if(hasAnswers&&!confirm("¿Iniciar una nueva evaluación de "+area+"? El avance actual se guardará en el historial de este navegador."))return;if(hasAnswers)try{saveLocal()}catch(e){status("No fue posible guardar la evaluación actual.",true);return}current=blank(area);step=0;reflectFields();renderStep();localDraft();status("Nueva evaluación de "+area+". Empieza por las preguntas del primer elemento.");showPage("nueva")}
function switchArea(area){if(area===(current.area||"Almacén"))return;startNew(area)}
function openEval(id){const obj=store.find(x=>x.id===id);if(!obj)return;current=clone(obj);step=0;localDraft();reflectFields();renderStep();status("Evaluación cargada para revisar o actualizar.");showPage("nueva")}
function removeEval(id){if(!confirm("¿Eliminar esta evaluación del almacenamiento de este navegador? Los registros que ya llegaron a Sheets NO se eliminan."))return;store=store.filter(x=>x.id!==id);localStorage.setItem(KEY,JSON.stringify(store));renderHistory();status("Evaluación eliminada solo de este navegador.")}
function renderHistory(){
 const q=el("search-evals").value.toLowerCase().trim(),arr=store.filter(x=>!q||[x.period,x.date,x.area].join(" ").toLowerCase().includes(q));
 el("hist-count").textContent=store.length+" evaluaciones guardadas en este navegador";
 el("history-body").innerHTML=arr.length?arr.map(x=>{let k=rowScore(x,()=>true);return '<tr><td><strong>'+escapeHTML(x.period||("Evaluación "+dateLabel(x.date)))+'</strong><br><span class="subtle">'+escapeHTML(x.area||"Almacén")+'</span></td><td>'+escapeHTML(dateLabel(x.date))+'</td><td>'+totalAnswered(x)+' / '+itemsFor(x).length+'</td><td><strong>'+pct(k)+'</strong><br><span class="subtle">'+escapeHTML(level(k))+'</span></td><td><div class="actions"><button class="btn" data-edit="'+escapeHTML(x.id)+'">Abrir</button><button class="btn" data-view="'+escapeHTML(x.id)+'">Resultados</button><button class="btn" data-delete="'+escapeHTML(x.id)+'" title="Eliminar local">×</button></div></td></tr>'}).join(""):'<tr><td colspan="5" class="subtle">No hay evaluaciones registradas.</td></tr>';
 syncDashboardSelector();
}
function syncDashboardSelector(){
 const sel=el("dashboard-select"),old=sel.value;
 sel.innerHTML=store.map(x=>'<option value="'+escapeHTML(x.id)+'">'+escapeHTML((x.area||"Almacén")+" · "+(x.period||"Sin periodo"))+'</option>').join("");
 if(store.some(x=>x.id===old))sel.value=old;
 if(!sel.value&&store.length)sel.value=store[0].id;
}
function dashboardEvaluation(){return store.find(x=>x.id===el("dashboard-select").value)||current}
function summary(ev){const active=catalogFor(ev),steps=stepsFor(ev);const answered=totalAnswered(ev),overall=rowScore(ev,()=>true);return {answered,overall,pillars:active.map((d,p)=>rowScore(ev,x=>x.p===p)),elements:steps.map(s=>rowScore(ev,x=>x.p===s.p&&x.e===s.e))}}
function makeCharts(ev){
 const d=summary(ev);
 if(typeof Chart==="undefined"){el("graph-alert").textContent="No se cargaron las gráficas. Verifica tu conexión a Internet.";return}
 el("graph-alert").textContent="";
 if(radarChart)radarChart.destroy();if(barsChart)barsChart.destroy();
 const base={responsive:true,maintainAspectRatio:false,animation:false};
 const pillarData=d.pillars.map(x=>x??0);
 const pillarNames=DATA.map(x=>x[0]);
 const useRadar=DATA.length>=3;
 el("pillar-chart-type").textContent=useRadar?"Radar de madurez (%)":"Madurez por pilar (%)";
 radarChart=new Chart(el("radarChart"),useRadar?{
  type:"radar",data:{labels:pillarNames,datasets:[{label:"Madurez (%)",data:pillarData,borderColor:"#197250",pointBackgroundColor:"#197250",backgroundColor:"rgba(32,139,88,.18)",borderWidth:2.5,pointRadius:4}]},
  options:{...base,layout:{padding:20},plugins:{legend:{display:false},tooltip:{callbacks:{label:ctx=>pct(ctx.raw)}}},scales:{r:{min:0,max:100,ticks:{stepSize:25,backdropColor:"transparent",color:"#6c7c71"},angleLines:{color:"#d9e4dd"},grid:{color:"#d9e4dd"},pointLabels:{color:"#294a3c",font:{size:11,weight:"600"}}}}}
 }:{
  type:"bar",data:{labels:pillarNames,datasets:[{label:"Madurez (%)",data:pillarData,backgroundColor:["#237755","#63ad87"],borderRadius:7,maxBarThickness:62}]},
  options:{...base,indexAxis:"y",plugins:{legend:{display:false},tooltip:{callbacks:{label:ctx=>pct(ctx.raw)}}},scales:{x:{min:0,max:100,ticks:{callback:v=>v+"%"},grid:{color:"#e9efec"}},y:{grid:{display:false}}}}
 });
 const groups=STEPS.map(s=>ITEMS.filter(x=>x.p===s.p&&x.e===s.e));
 const counts=v=>groups.map(g=>g.filter(x=>rating(ev.scores?.[x.id]?.value)===v).length);
 const labelPlugin={id:"oleolabCountLabels",afterDatasetsDraw(chart){
   const ctx=chart.ctx;ctx.save();ctx.font="700 11px Arial";ctx.textAlign="center";ctx.textBaseline="middle";
   chart.data.datasets.forEach((set,di)=>chart.getDatasetMeta(di).data.forEach((bar,i)=>{
     const count=Number(set.data[i]||0),start=Number(bar.base),end=Number(bar.x);
     if(!count||Math.abs(end-start)<23)return;
     ctx.fillStyle="#ffffff";ctx.fillText(String(count),(start+end)/2,bar.y);
   }));ctx.restore();
 }};
 const h=Math.max(360,STEPS.length*50+105);el("barsChart").parentElement.style.height=h+"px";
 barsChart=new Chart(el("barsChart"),{
  type:"bar",data:{labels:STEPS.map(s=>s.name),datasets:[
    {label:"Cumple",data:counts(2),backgroundColor:"#278359",borderRadius:4},
    {label:"Parcial",data:counts(1),backgroundColor:"#d0a039",borderRadius:3},
    {label:"No cumple",data:counts(0),backgroundColor:"#c7625b",borderRadius:3}
  ]},
  options:{...base,indexAxis:"y",layout:{padding:{right:12}},plugins:{
    legend:{display:true,position:"bottom",labels:{boxWidth:13,color:"#385846",font:{size:11}}},
    tooltip:{callbacks:{label:ctx=>ctx.dataset.label+": "+ctx.raw+" criterios"}}
   },
   scales:{x:{min:0,stacked:true,ticks:{precision:0,stepSize:2},grid:{color:"#e9efec"},title:{display:true,text:"Número de criterios",color:"#456253"}},
     y:{stacked:true,grid:{display:false},ticks:{font:{size:11},color:"#405b4b",autoSkip:false}}}
  },
  plugins:[labelPlugin]
 });
}
function renderDashboard(){
 syncDashboardSelector();
 const ev=dashboardEvaluation();activateCatalog(ev);const d=summary(ev);
 el("kpi-global").textContent=pct(d.overall);
 el("kpi-level").textContent=level(d.overall);
 el("kpi-index").textContent=levelIndex(d.overall)==null?"—":levelIndex(d.overall)+" / 5";
 el("kpi-answered").textContent=d.answered+"/"+ITEMS.length;
 el("kpi-elements").textContent=STEPS.filter(s=>ITEMS.filter(x=>x.p===s.p&&x.e===s.e).every(x=>rating(ev.scores?.[x.id]?.value)!==null)).length+" / "+STEPS.length;
 el("kpi-met").textContent=ITEMS.filter(x=>rating(ev.scores?.[x.id]?.value)===2).length;
 const assessed=itemsFor(ev).filter(x=>rating(ev.scores?.[x.id]?.value)!==null);
 const evidenceCount=assessed.filter(x=>String(ev.scores?.[x.id]?.evidence||"").trim().length>0).length;
 el("kpi-evidence").textContent=evidenceCount+" de "+assessed.length+" respuestas con evidencia";
 el("dashboard-subtitle").textContent=(ev.area||"Almacén")+" · "+(ev.period||"Evaluación")+" · "+(ev.date||"")+(d.answered<ITEMS.length?" · Parcial: "+d.answered+"/"+ITEMS.length+" respondidas":"");
 makeCharts(ev);
 renderDetails(ev);
}
function renderDetails(ev){
 el("detail-criteria").innerHTML=DATA.map(([pName,els],p)=>{let v=rowScore(ev,x=>x.p===p);
 return '<details class="detail-group" '+(p===0?"open":"")+'><summary>'+escapeHTML(pName)+' · '+pct(v)+'</summary><section>'+els.map(([eName,questions],e)=>'<h4>'+escapeHTML(eName)+' · '+pct(rowScore(ev,x=>x.p===p&&x.e===e))+'</h4>'+questions.map((question,c)=>{const o=ev.scores?.[p+"-"+e+"-"+c]||{},v=rating(o.value);return '<div class="detail-line"><span>'+escapeHTML(question)+'</span><span class="tag '+classScore(v)+'">'+labelScore(v)+'</span></div>'+(o.notes||o.evidence||o.action?'<div class="detail-notes">'+escapeHTML([o.evidence&&"Evidencia: "+o.evidence,o.notes&&"Hallazgo: "+o.notes,o.action&&"Acción: "+o.action].filter(Boolean).join(" · "))+'</div>':"")}).join("")).join("")+'</section></details>'}).join("");
}
function downloadContent(filename,type,data){
 const blob=new Blob([data],{type}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500)
}
function exportCSV(){
 const all=store.some(x=>x.id===current.id)?store:store.concat(current);
 const rows=[["ID","Área","Evaluación","Fecha","Pilar","Elemento","Criterio","Resultado","Puntaje","Evidencia","Observaciones","Acción"]];
 all.forEach(ev=>itemsFor(ev).forEach(x=>{const o=ev.scores?.[x.id]||{},v=rating(o.value);rows.push([ev.id,ev.area||"Almacén",ev.period,ev.date,x.pillar,x.element,x.criterion,labelScore(v),v??"",o.evidence||"",o.notes||"",o.action||""])}));
 const content=rows.map(r=>r.map(c=>'"'+String(c??"").replace(/"/g,'""')+'"').join(",")).join("\r\n");
 downloadContent("oleolab_assessment_datos.csv","text/csv;charset=utf-8","\uFEFF"+content);
}
function exportJSON(){downloadContent("oleolab_assessment_respaldo.json","application/json",JSON.stringify({version:3,catalog:templateFor("Almacén"),catalogs:Object.fromEntries(["Almacén","Producción","Mantenimiento"].map(a=>[a,templateFor(a)])),assessments:store},null,2))}
function downloadWhiteCanvas(canvas,name){
 if(!canvas)return;
 const target=document.createElement("canvas");target.width=canvas.width;target.height=canvas.height;
 const ctx=target.getContext("2d");ctx.fillStyle="white";ctx.fillRect(0,0,target.width,target.height);ctx.drawImage(canvas,0,0);
 target.toBlob(blob=>{if(blob){const u=URL.createObjectURL(blob),a=document.createElement("a");a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1400)}}, "image/png");
}
function imageData(canvas){const c=document.createElement("canvas");c.width=canvas.width;c.height=canvas.height;const ctx=c.getContext("2d");ctx.fillStyle="white";ctx.fillRect(0,0,c.width,c.height);ctx.drawImage(canvas,0,0);return c.toDataURL("image/png")}
async function loadLogoData(){
 try{const img=new Image();img.crossOrigin="anonymous";img.src=LOGO_URL;await img.decode();const cn=document.createElement("canvas");cn.width=img.naturalWidth;cn.height=img.naturalHeight;cn.getContext("2d").drawImage(img,0,0);return cn.toDataURL("image/png")}catch(e){return null}
}
async function generatePDF(){
 const ev=dashboardEvaluation();activateCatalog(ev);const d=summary(ev);
 if(!window.jspdf||!window.jspdf.jsPDF){alert("No está disponible la librería PDF. Revisa tu conexión.");return}
 const pdf=new window.jspdf.jsPDF({unit:"mm",format:"a4"});
 const W=210,H=297,margin=14;
 const logo=await loadLogoData();
 pdf.setFillColor(23,79,60);pdf.rect(0,0,W,37,"F");
 if(logo){pdf.setFillColor(255,255,255);pdf.roundedRect(14,6,47,22,2,2,"F");pdf.addImage(logo,"PNG",17,10,41,14)}
 pdf.setTextColor(255,255,255);pdf.setFontSize(17);pdf.setFont("helvetica","bold");
 pdf.text("ASSESSMENT DE MADUREZ",logo?68:14,17);
 pdf.setFontSize(9);pdf.setFont("helvetica","normal");pdf.text("Área: "+(ev.area||"Almacén")+" · Oleolab",logo?68:14,25);
 pdf.setTextColor(30,58,42);pdf.setFontSize(12);pdf.setFont("helvetica","bold");pdf.text(String(ev.period||"Evaluación").slice(0,80),margin,48);
 pdf.setFontSize(9);pdf.setFont("helvetica","normal");
 pdf.text("Fecha de evaluación: "+String(dateLabel(ev.date)||"—"),margin,54);
 pdf.text("Cuestionario: "+DATA.length+" pilares · "+STEPS.length+" elementos · "+ITEMS.length+" criterios",margin,60);
 
 const labels=[["MADUREZ GLOBAL",pct(d.overall)],["NIVEL / 5",levelIndex(d.overall)==null?"—":levelIndex(d.overall)+"/5"],["CRITERIOS EVALUADOS",d.answered+"/"+ITEMS.length],["ELEMENTOS COMPLETOS",STEPS.filter(s=>ITEMS.filter(x=>x.p===s.p&&x.e===s.e).every(x=>rating(ev.scores?.[x.id]?.value)!==null)).length+"/"+STEPS.length]];
 const cardW=43.5;
 labels.forEach(([l,v],i)=>{const x=margin+i*46;pdf.setFillColor(239,246,241);pdf.roundedRect(x,75,cardW,24,2,2,"F");pdf.setTextColor(77,102,86);pdf.setFontSize(7);pdf.text(l,x+3,82);pdf.setTextColor(20,84,57);pdf.setFontSize(13);pdf.setFont("helvetica","bold");pdf.text(String(v),x+3,92);pdf.setFont("helvetica","normal")});
 pdf.setTextColor(25,76,53);pdf.setFont("helvetica","bold");pdf.setFontSize(10);
 pdf.text("Madurez por pilar",margin,112);pdf.text("Cumplimiento por elemento",110,112);
 if(radarChart){pdf.addImage(imageData(el("radarChart")),"PNG",margin,117,91,90)}
 if(barsChart){pdf.addImage(imageData(el("barsChart")),"PNG",110,117,89,113)}
 pdf.setTextColor(89,112,95);pdf.setFontSize(9);pdf.setFont("helvetica","normal");
 pdf.text("Escala: No cumple = 0 · Parcial = 1 · Cumple = 2. Sin evaluar se excluye del promedio.",margin,244);
 pdf.text("Madurez: "+level(d.overall)+" · Resultado basado solo en respuestas registradas.",margin,250);
 pdf.text("Informe generado: "+new Date().toLocaleString("es-MX"),margin,258);
 const hasAutoTable=typeof pdf.autoTable==="function";
 for(let p=0;p<DATA.length;p++){
  const [pillar,els]=DATA[p];pdf.addPage();pdf.setFillColor(23,79,60);pdf.rect(0,0,W,21,"F");pdf.setTextColor(255,255,255);pdf.setFontSize(12);pdf.setFont("helvetica","bold");pdf.text("PILAR "+(p+1)+" · "+pillar.toUpperCase(),margin,13);
  pdf.setTextColor(39,79,54);pdf.setFontSize(10);pdf.text("Madurez: "+pct(d.pillars[p])+" | Evaluación: "+(ev.period||"Sin periodo"),margin,30);
  const rows=[];
  els.forEach(([element,questions],e)=>questions.forEach((question,c)=>{const o=ev.scores?.[p+"-"+e+"-"+c]||{},v=rating(o.value);let details=[o.evidence&&"Evidencia: "+o.evidence,o.notes&&"Observación: "+o.notes,o.action&&"Acción: "+o.action].filter(Boolean).join("\n");rows.push([element+"\n"+question,labelScore(v),details||"—"])}));
  if(hasAutoTable){
   pdf.autoTable({startY:36,head:[["ELEMENTO Y CRITERIO","RESULTADO","EVIDENCIA, OBSERVACIONES Y ACCIONES"]],body:rows,margin:{left:margin,right:margin,top:20,bottom:17},theme:"grid",tableWidth:"auto",headStyles:{fillColor:[40,111,79],fontSize:8},styles:{fontSize:7.7,cellPadding:2.5,overflow:"linebreak",valign:"top",textColor:[36,58,46]},columnStyles:{0:{cellWidth:89},1:{cellWidth:27},2:{cellWidth:66}},didDrawPage:()=>{}});
  }else{
   let y=37;rows.forEach(row=>{const text=pdf.splitTextToSize(row[0]+" — "+row[1]+" — "+row[2],180);if(y+text.length*4>280){pdf.addPage();y=20}pdf.setFontSize(8);pdf.setTextColor(38,62,44);pdf.text(text,margin,y);y+=text.length*4+3});
  }
 }
 const pageCount=pdf.getNumberOfPages();
 for(let i=1;i<=pageCount;i++){pdf.setPage(i);pdf.setTextColor(112,131,117);pdf.setFontSize(8);pdf.text("Oleolab · Assessment de madurez",margin,289);pdf.text("Página "+i+" / "+pageCount,196,289,{align:"right"})}
 const filename="Oleolab_Assessment_"+String(ev.period||ev.date||"evaluacion").replace(/[^\w-]/g,"_")+".pdf";pdf.save(filename);
}
async function importJSON(file){
 if(!file)return;
 try{
  const raw=JSON.parse(await file.text()),list=Array.isArray(raw)?raw:raw.assessments;
  if(!Array.isArray(list)||!list.every(x=>x&&x.id&&x.scores&&typeof x.scores==="object"))throw Error("El archivo no es un respaldo válido.");
  if(!Array.isArray(raw)&&raw.catalogs&&typeof raw.catalogs==="object"){
   for(const area of ["Almacén","Producción","Mantenimiento"]){
    if(raw.catalogs[area]===undefined)continue;
    if(!validCatalog(raw.catalogs[area],area))throw Error("Catálogo inválido: "+area);
    catalogByArea[area]=clone(raw.catalogs[area]);
    localStorage.setItem(catalogStorageKey(area),JSON.stringify(catalogByArea[area]));
   }
   catalogTemplate=catalogByArea["Almacén"];editingCatalog=clone(templateFor(editorArea));
  }else if(!Array.isArray(raw)&&raw.catalog!==undefined){
   if(!validCatalog(raw.catalog,"Almacén"))throw Error("Catálogo de Almacén inválido.");
   catalogByArea["Almacén"]=clone(raw.catalog);
   catalogTemplate=catalogByArea["Almacén"];
   if(editorArea==="Almacén")editingCatalog=clone(catalogTemplate);
   localStorage.setItem(CATALOG_KEY,JSON.stringify(catalogTemplate));
  }
  const map=new Map(store.map(x=>[x.id,x]));list.forEach(x=>map.set(x.id,x));store=[...map.values()];
  localStorage.setItem(KEY,JSON.stringify(store));renderHistory();
  status("Respaldo importado. "+list.length+" evaluaciones procesadas; las anteriores mantienen sus preguntas.");
 }catch(e){status("Error al importar: "+e.message,true)}
}
async function fetchCloud(){
 const url=localStorage.getItem(URLKEY)||URL_DEFAULT;
 try{const res=await fetch(url+"?action=list");const data=await res.json();if(!data.ok||!Array.isArray(data.assessments))throw Error(data.error||"Respuesta inválida");
 const map=new Map(store.map(x=>[x.id,x]));data.assessments.forEach(x=>{if(x.id&&x.scores)map.set(x.id,x)});
 store=[...map.values()];localStorage.setItem(KEY,JSON.stringify(store));renderHistory();status("Recuperación desde Sheets confirmada: "+data.assessments.length+" registros")}catch(err){status("No se pudo recuperar directamente del GAS ("+err.message+"). Si es un bloqueo CORS, los registros locales están a salvo.",true)}
}
document.querySelectorAll("[data-tab]").forEach(b=>b.addEventListener("click",()=>showPage(b.dataset.tab)));


el("step-nav").addEventListener("click",e=>{const b=e.target.closest("[data-step]");if(b){step=Number(b.dataset.step);renderStep()}});
el("step-questions").addEventListener("click",e=>{const b=e.target.closest("[data-criterion]");if(b)setChoice(b)});
el("step-questions").addEventListener("input",e=>{const node=e.target;if(node.dataset.note){current.scores[node.dataset.note]??={};current.scores[node.dataset.note][node.dataset.noteKey]=node.value;localDraft()}});
el("prev-step").onclick=()=>{step=Math.max(0,step-1);renderStep()};
el("next-step").onclick=()=>{if(step===NAV_STEPS.length-1){saveEvaluation(true)}else{step++;renderStep()}};
el("save-eval").onclick=()=>saveEvaluation(false);el("new-eval").onclick=()=>startNew();el("new-from-list").onclick=()=>startNew();
document.querySelectorAll("[data-area]").forEach(b=>b.addEventListener("click",()=>switchArea(b.dataset.area)));
el("view-maintenance-baseline").onclick=()=>{const existing=store.find(x=>x.id===MAINTENANCE_BASELINE_ID);if(!existing){status("No se encontró la evaluación inicial precargada.",true);return}el("dashboard-select").value=existing.id;showPage("dashboard")};
el("history-body").addEventListener("click",e=>{const t=e.target.closest("button");if(!t)return;if(t.dataset.edit)openEval(t.dataset.edit);if(t.dataset.view){el("dashboard-select").value=t.dataset.view;showPage("dashboard")}if(t.dataset.delete)removeEval(t.dataset.delete)});
el("search-evals").oninput=renderHistory;el("dashboard-select").onchange=renderDashboard;
el("chart-radar-png").onclick=()=>downloadWhiteCanvas(el("radarChart"),"oleolab_madurez_pilares.png");
el("chart-bars-png").onclick=()=>downloadWhiteCanvas(el("barsChart"),"oleolab_cumplimiento_elementos.png");
el("report-pdf").onclick=generatePDF;
el("export-csv").onclick=exportCSV;el("export-json").onclick=exportJSON;
el("import-json").onchange=e=>importJSON(e.target.files[0]);
el("refresh-cloud").onclick=fetchCloud;
el("save-gas-url").onclick=()=>{localStorage.setItem(URLKEY,el("gas-url").value.trim()||URL_DEFAULT);status("URL de GAS guardada.")};
el("gas-url").value=localStorage.getItem(URLKEY)||URL_DEFAULT;
const initialMaintenanceAdded=addMaintenanceBaseline();
reflectFields();renderStep();renderHistory();showPage("nueva");
if(initialMaintenanceAdded)status("Diagnóstico inicial de Mantenimiento precargado. Abre Historial o selecciona Mantenimiento para verlo.");
