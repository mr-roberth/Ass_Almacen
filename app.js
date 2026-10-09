const DATA=[
["Confiabilidad",[["Integridad de datos",["El Forecast incluye todos los SKU/PT requeridos","Cantidades completas para los periodos evaluados","Fechas o semanas de necesidad definidas","Inventario, llegadas y necesidades disponibles"]],["Exactitud y consistencia",["Forecast coincide con la fuente oficial","Sin duplicidades, omisiones ni inconsistencias relevantes","Unidades de medida correctas y homogéneas","Los datos coinciden con la realidad operativa"]],["Oportunidad y actualización",["Forecast actualizado según frecuencia establecida","Inventarios y llegadas registrados oportunamente","Cambios reflejados en la App sin retrasos relevantes","Las áreas usan información vigente"]],["Trazabilidad y validación",["Se identifica quién actualizó la información","Se registra fecha de cada actualización","La información es revisada antes de usarse","Correcciones y ajustes documentados"]]]],
["Comunicación",[["Flujo entre áreas",["Planeación, Compras, Producción y Almacén intercambian datos oportunamente","Las áreas conocen cambios que les impactan","Hay un canal definido de incidencias","La información compartida es clara para actuar"]],["Gestión de cambios",["Los cambios al Forecast se comunican formalmente","Se evalúa el impacto sobre inventarios, compras y producción","Se notifica a todos los responsables afectados","Está identificada la versión vigente del Forecast"]],["Seguimiento de acuerdos",["Revisiones generan acuerdos claros","Cada acuerdo tiene un responsable","Cada acuerdo tiene fecha compromiso","Se verifica el cierre de los acuerdos"]],["Escalamiento de riesgos",["Riesgos identificados antes del incumplimiento","Hay mecanismos claros para escalar problemas","Las decisiones se toman oportunamente","Riesgos críticos visibles para los responsables"]]]],
["Disciplina operativa",[["Claridad de roles",["Cada actividad tiene un responsable asignado","Los usuarios conocen su rol","Se define quién captura y quién valida","No existen vacíos de responsabilidad"]],["Cumplimiento de rutinas",["Forecast actualizado en fechas acordadas","Inventarios, llegadas y necesidades revisados periódicamente","Reuniones o cortes de seguimiento consistentes","La práctica continúa sin supervisión directa"]],["Competencia y capacitación",["Usuarios clave capacitados","Los usuarios interpretan correctamente la App","Saben actuar ante desviaciones y alertas","Existen guías o materiales de apoyo"]],["Responsabilidad y seguimiento",["Desviaciones atendidas oportunamente","Compromisos cumplidos a tiempo","Responsables cuidan la calidad de sus datos","Incumplimientos reconocidos y gestionados"]]]],
["Sostenibilidad",[["Medición de desempeño",["Hay indicadores de cumplimiento Forecast","Se mide cumplimiento por periodo","Se monitorean las desviaciones relevantes","Los resultados se revisan periódicamente"]],["Análisis de desviaciones",["Los incumplimientos tienen análisis de causa","Se distinguen causas humanas, operativas y tecnológicas","Se identifican desviaciones recurrentes","Se documentan los hallazgos"]],["Acciones correctivas",["Las desviaciones generan acciones concretas","Acciones tienen responsable y fecha","Se comprueba efectividad de las acciones","Se evita repetir problemas sin tratamiento"]],["Continuidad operativa",["La práctica no depende de una sola persona","Existen suplentes capacitados","El proceso cuenta con documentación mínima","Se mantiene ante cambios de personal o carga"]]]]
];

const ITEMS=DATA.flatMap(([pillar,els],p)=>els.flatMap(([element,criteria],e)=>criteria.map((criterion,c)=>({id:p+"-"+e+"-"+c,pillar,element,criterion,p,e,c}))));
const STEPS=DATA.flatMap(([pillar,els],p)=>els.map(([name],e)=>({pillar,name,p,e})));
const URL_DEFAULT="https://script.google.com/macros/s/AKfycbySBlGPjgi5f8b4pOKwEvaCKBfmjgsi16Hsnj4DM3hE11Iqc5fTyjZNfEjA5lpxJ-CT/exec";
const LOGO_URL="https://raw.githubusercontent.com/mr-roberth/Pruebas/main/assets/oleolab-logo.png";
const KEY="oleolab_forecast_assessments_v1",DRAFTKEY="oleolab_assessment_draft_v2",URLKEY="oleolab_assessment_gas_url";
const el=id=>document.getElementById(id);
const clone=a=>JSON.parse(JSON.stringify(a));
const escapeHTML=x=>String(x??"").replace(/[&<>"']/g,v=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[v]));
function getSaved(k,otherwise){try{return JSON.parse(localStorage.getItem(k))??otherwise}catch(e){return otherwise}}
let store=getSaved(KEY,[]).filter(x=>x&&x.id&&x.scores),current=getSaved(DRAFTKEY,null),step=0,radarChart=null,barsChart=null;
if(!current||!current.scores)current=store[0]?clone(store[0]):blank();
function blank(){const n=new Date();return {id:"ev"+Date.now().toString(36)+Math.random().toString(36).slice(2,7),period:"Evaluación "+n.toLocaleString("es-MX",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:false}),date:new Date(n.getTime()-n.getTimezoneOffset()*60000).toISOString().slice(0,10),area:"Almacén",owner:"",forecast:"",representative:"",scores:{},created:n.toISOString()}}
function rating(x){return [0,1,2].includes(Number(x))&&x!==undefined&&x!==null?Number(x):null}
function pct(n){return n==null?"—":Math.round(n)+"%"}
function level(n){return n==null?"Sin evaluar":n<=25?"Inicial":n<=50?"Básico":n<=75?"Estandarizado":n<=90?"Controlado":"Sostenible"}
function rowScore(ev,predicate){let vs=ITEMS.filter(predicate).map(i=>rating(ev.scores?.[i.id]?.value)).filter(v=>v!==null);return vs.length?vs.reduce((a,b)=>a+b,0)/vs.length*50:null}
function totalAnswered(ev){return ITEMS.filter(i=>rating(ev.scores?.[i.id]?.value)!==null).length}
function labelScore(v){return v===2?"Cumple":v===1?"Parcial":v===0?"No cumple":"Sin evaluar"}
function classScore(v){return v===2?"yes":v===1?"partial":v===0?"no":"na"}
function dateLabel(s){try{return new Date(s+"T12:00:00").toLocaleDateString("es-MX",{day:"2-digit",month:"short",year:"numeric"})}catch(e){return s||""}}
function localDraft(){try{localStorage.setItem(DRAFTKEY,JSON.stringify(current))}catch(e){status("Espacio local insuficiente. Descarga un respaldo JSON.",true)}}
function status(msg,bad=false){el("status").textContent=msg;el("status").classList.toggle("error",bad)}
function currentFields(){localDraft()}
function reflectFields(){}
function showPage(which){document.querySelectorAll("[data-tab]").forEach(b=>b.classList.toggle("active",b.dataset.tab===which));document.querySelectorAll(".view").forEach(v=>v.classList.toggle("active",v.id==="page-"+which));if(which==="evaluaciones")renderHistory();if(which==="dashboard")renderDashboard()}
function renderStepNav(){
 const html=STEPS.map((s,i)=>{const filtered=ITEMS.filter(x=>x.p===s.p&&x.e===s.e);const count=filtered.filter(x=>rating(current.scores[x.id]?.value)!==null).length;
 return '<button class="step-btn '+(i===step?"active ":"")+(count===filtered.length?"complete":"")+'" data-step="'+i+'" title="'+escapeHTML(s.pillar+" · "+s.name)+'"><span class="num">'+(i+1)+'</span><span>'+escapeHTML(s.name)+'<br><small class="subtle">'+count+'/'+filtered.length+' evaluados</small></span></button>'}).join("");
 el("step-nav").innerHTML=html;
 const answered=totalAnswered(current);el("progress-label").textContent=answered+" de "+ITEMS.length+" criterios evaluados";
 el("progress-fill").style.width=(answered/ITEMS.length*100)+"%";
 el("progress-global").textContent=pct(rowScore(current,()=>true));
}
function renderStep(){
 const s=STEPS[step];el("step-pillar").textContent=s.pillar;el("step-title").textContent=s.name;
 el("step-count").textContent="Elemento "+(step+1)+" de "+STEPS.length;
 const found=ITEMS.filter(x=>x.p===s.p&&x.e===s.e);
 el("step-questions").innerHTML=found.map((item,i)=>{const ans=current.scores[item.id]||{},v=rating(ans.value);const more=ans.evidence||ans.notes||ans.action;
 return '<article class="criterion"><div class="criterion-title"><b>'+String(i+1).padStart(2,"0")+'</b><span>'+escapeHTML(item.criterion)+'</span></div><div class="choice-row">'+[[2,"Cumple","yes"],[1,"Parcial","partial"],[0,"No cumple","no"]].map(([score,label,cls])=>'<button type="button" class="choice '+cls+(v===score?" on":"")+'" data-criterion="'+item.id+'" data-value="'+score+'" aria-pressed="'+(v===score?'true':'false')+'">'+label+'</button>').join("")+'</div><details class="more" '+(more?"open":"")+'><summary>Evidencia y observaciones (opcional)</summary><div class="field"><label for="evidence-'+item.id+'">Evidencia</label><input id="evidence-'+item.id+'" data-note="'+item.id+'" data-note-key="evidence" placeholder="Documento o registro" value="'+escapeHTML(ans.evidence||"")+'"></div><div class="field"><label for="notes-'+item.id+'">Observaciones</label><textarea id="notes-'+item.id+'" rows="2" data-note="'+item.id+'" data-note-key="notes" placeholder="Hallazgo o causa">'+escapeHTML(ans.notes||"")+'</textarea></div><div class="field"><label for="action-'+item.id+'">Acción</label><textarea id="action-'+item.id+'" rows="2" data-note="'+item.id+'" data-note-key="action" placeholder="Actividad de mejora">'+escapeHTML(ans.action||"")+'</textarea></div></details></article>'}).join("");
 el("prev-step").disabled=step===0;el("next-step").innerHTML=step===STEPS.length-1?'Ir a resultados <i class="fa-solid fa-chart-pie"></i>':'Siguiente elemento <i class="fa-solid fa-arrow-right"></i>';
 renderStepNav();
}
function setChoice(button){
 const id=button.dataset.criterion,n=Number(button.dataset.value);current.scores[id]??={};current.scores[id].value=n;
 document.querySelectorAll('[data-criterion="'+id+'"]').forEach(b=>{const on=Number(b.dataset.value)===n;b.classList.toggle("on",on);b.setAttribute("aria-pressed",String(on))});
 localDraft();renderStepNav();
}
function saveLocal(){
 currentFields();
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
  return "Enviado a GAS sin confirmación por restricciones CORS. Verifica la hoja de cálculo";
 }
}
async function saveEvaluation(){
 let saved;try{saved=saveLocal()}catch(e){return}
 status("Guardado en este navegador. Enviando a Google Sheets...");
 showPage("evaluaciones");
 try{const result=await gasSave(saved);status(result)}
 catch(e){status("Guardado local. Error de envío GAS: "+e.message,true)}
}
function startNew(){if(!confirm("¿Iniciar una nueva evaluación? Guarda la actual antes de continuar."))return;current=blank();step=0;reflectFields();renderStep();status("Nueva evaluación lista.");showPage("nueva")}
function openEval(id){const obj=store.find(x=>x.id===id);if(!obj)return;current=clone(obj);step=0;localDraft();reflectFields();renderStep();status("Evaluación cargada para revisar o actualizar.");showPage("nueva")}
function removeEval(id){if(!confirm("¿Eliminar esta evaluación del almacenamiento de este navegador? Los registros que ya llegaron a Sheets NO se eliminan."))return;store=store.filter(x=>x.id!==id);localStorage.setItem(KEY,JSON.stringify(store));renderHistory();status("Evaluación eliminada solo de este navegador.")}
function renderHistory(){
 const q=el("search-evals").value.toLowerCase().trim(),arr=store.filter(x=>!q||[x.period,x.date].join(" ").toLowerCase().includes(q));
 el("hist-count").textContent=store.length+" evaluaciones guardadas en este navegador";
 el("history-body").innerHTML=arr.length?arr.map(x=>{let k=rowScore(x,()=>true);return '<tr><td><strong>'+escapeHTML(x.period||("Evaluación "+dateLabel(x.date)))+'</strong></td><td>'+escapeHTML(dateLabel(x.date))+'</td><td>'+totalAnswered(x)+' / '+ITEMS.length+'</td><td><strong>'+pct(k)+'</strong><br><span class="subtle">'+escapeHTML(level(k))+'</span></td><td><div class="actions"><button class="btn" data-edit="'+escapeHTML(x.id)+'">Abrir</button><button class="btn" data-view="'+escapeHTML(x.id)+'">Resultados</button><button class="btn" data-delete="'+escapeHTML(x.id)+'" title="Eliminar local">×</button></div></td></tr>'}).join(""):'<tr><td colspan="5" class="subtle">No hay evaluaciones registradas.</td></tr>';
 syncDashboardSelector();
}
function syncDashboardSelector(){
 const sel=el("dashboard-select"),old=sel.value;
 sel.innerHTML=store.map(x=>'<option value="'+escapeHTML(x.id)+'">'+escapeHTML((x.period||"Sin periodo")+" · "+(x.area||"")+" · "+(x.date||""))+'</option>').join("");
 if(store.some(x=>x.id===old))sel.value=old;
 if(!sel.value&&store.length)sel.value=store[0].id;
}
function dashboardEvaluation(){return store.find(x=>x.id===el("dashboard-select").value)||current}
function summary(ev){const answered=totalAnswered(ev),overall=rowScore(ev,()=>true);return {answered,overall,pillars:DATA.map((d,p)=>rowScore(ev,x=>x.p===p)),elements:STEPS.map(s=>rowScore(ev,x=>x.p===s.p&&x.e===s.e))}}
function makeCharts(ev){
 const d=summary(ev);
 if(typeof Chart==="undefined"){el("graph-alert").textContent="No se cargó Chart.js. Verifica la conexión a Internet.";return}
 el("graph-alert").textContent="";
 if(radarChart)radarChart.destroy();if(barsChart)barsChart.destroy();
 const base={responsive:true,maintainAspectRatio:false,animation:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:ctx=>pct(ctx.raw)}}}};
 radarChart=new Chart(el("radarChart"),{type:"radar",data:{labels:DATA.map(x=>x[0]),datasets:[{label:"Madurez",data:d.pillars.map(x=>x??0),borderColor:"#197250",pointBackgroundColor:"#197250",backgroundColor:"rgba(32,139,88,.18)",borderWidth:2.5,pointRadius:4}]},options:{...base,layout:{padding:20},scales:{r:{min:0,max:100,ticks:{stepSize:25,backdropColor:"transparent",color:"#6c7c71"},angleLines:{color:"#d9e4dd"},grid:{color:"#d9e4dd"},pointLabels:{color:"#294a3c",font:{size:11,weight:"600"}}}}}});
 barsChart=new Chart(el("barsChart"),{type:"bar",data:{labels:STEPS.map(s=>s.name.length>25?s.name.slice(0,24)+"…":s.name),datasets:[{data:d.elements.map(x=>x??0),backgroundColor:STEPS.map((s,i)=>["#237755","#3b966f","#69ae81","#b4d9bf"][s.p]),borderRadius:5,maxBarThickness:18}]},options:{...base,indexAxis:"y",layout:{padding:4},scales:{x:{min:0,max:100,ticks:{callback:v=>v+"%"},grid:{color:"#e9efec"}},y:{grid:{display:false},ticks:{color:"#455f50",font:{size:10}}}}}});
}
function renderDashboard(){
 syncDashboardSelector();
 const ev=dashboardEvaluation(),d=summary(ev);
 el("kpi-global").textContent=pct(d.overall);
 el("kpi-level").textContent=level(d.overall);
 el("kpi-answered").textContent=d.answered+"/"+ITEMS.length;
 el("kpi-elements").textContent=STEPS.filter(s=>ITEMS.filter(x=>x.p===s.p&&x.e===s.e).every(x=>rating(ev.scores?.[x.id]?.value)!==null)).length+" / "+STEPS.length;
 el("kpi-met").textContent=ITEMS.filter(x=>rating(ev.scores?.[x.id]?.value)===2).length;
 el("dashboard-subtitle").textContent=(ev.period||"Evaluación") + " · " + (ev.date||"");
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
 const rows=[["ID","Evaluación","Fecha","Pilar","Elemento","Criterio","Resultado","Puntaje","Evidencia","Observaciones","Acción"]];
 all.forEach(ev=>ITEMS.forEach(x=>{const o=ev.scores?.[x.id]||{},v=rating(o.value);rows.push([ev.id,ev.period,ev.date,x.pillar,x.element,x.criterion,labelScore(v),v??"",o.evidence||"",o.notes||"",o.action||""])}));
 const content=rows.map(r=>r.map(c=>'"'+String(c??"").replace(/"/g,'""')+'"').join(",")).join("\r\n");
 downloadContent("oleolab_assessment_datos.csv","text/csv;charset=utf-8","\uFEFF"+content);
}
function exportJSON(){downloadContent("oleolab_assessment_respaldo.json","application/json",JSON.stringify(store,null,2))}
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
 const ev=dashboardEvaluation(),d=summary(ev);
 if(!window.jspdf||!window.jspdf.jsPDF){alert("No está disponible la librería PDF. Revisa tu conexión.");return}
 const pdf=new window.jspdf.jsPDF({unit:"mm",format:"a4"});
 const W=210,H=297,margin=14;
 const logo=await loadLogoData();
 pdf.setFillColor(23,79,60);pdf.rect(0,0,W,37,"F");
 if(logo){pdf.setFillColor(255,255,255);pdf.roundedRect(14,6,47,22,2,2,"F");pdf.addImage(logo,"PNG",17,10,41,14)}
 pdf.setTextColor(255,255,255);pdf.setFontSize(17);pdf.setFont("helvetica","bold");
 pdf.text("ASSESSMENT DE MADUREZ",logo?68:14,17);
 pdf.setFontSize(9);pdf.setFont("helvetica","normal");pdf.text("Evaluación de madurez de Almacén · Oleolab",logo?68:14,25);
 pdf.setTextColor(30,58,42);pdf.setFontSize(12);pdf.setFont("helvetica","bold");pdf.text(String(ev.period||"Evaluación").slice(0,80),margin,48);
 pdf.setFontSize(9);pdf.setFont("helvetica","normal");
 pdf.text("Fecha de evaluación: "+String(dateLabel(ev.date)||"—"),margin,54);
 pdf.text("Cuestionario: "+DATA.length+" pilares · "+STEPS.length+" elementos · "+ITEMS.length+" criterios",margin,60);
 
 const labels=[["MADUREZ GLOBAL",pct(d.overall)],["NIVEL",level(d.overall)],["CRITERIOS EVALUADOS",d.answered+"/"+ITEMS.length],["ELEMENTOS COMPLETOS",STEPS.filter(s=>ITEMS.filter(x=>x.p===s.p&&x.e===s.e).every(x=>rating(ev.scores?.[x.id]?.value)!==null)).length+"/"+STEPS.length]];
 const cardW=43.5;
 labels.forEach(([l,v],i)=>{const x=margin+i*46;pdf.setFillColor(239,246,241);pdf.roundedRect(x,75,cardW,24,2,2,"F");pdf.setTextColor(77,102,86);pdf.setFontSize(7);pdf.text(l,x+3,82);pdf.setTextColor(20,84,57);pdf.setFontSize(13);pdf.setFont("helvetica","bold");pdf.text(String(v),x+3,92);pdf.setFont("helvetica","normal")});
 pdf.setTextColor(25,76,53);pdf.setFont("helvetica","bold");pdf.setFontSize(10);
 pdf.text("Madurez por pilar",margin,112);pdf.text("Cumplimiento por elemento",110,112);
 if(radarChart){pdf.addImage(imageData(el("radarChart")),"PNG",margin,117,91,90)}
 if(barsChart){pdf.addImage(imageData(el("barsChart")),"PNG",110,117,89,113)}
 pdf.setTextColor(89,112,95);pdf.setFontSize(9);pdf.setFont("helvetica","normal");
 pdf.text("Escala: No cumple = 0 · Parcial = 1 · Cumple = 2. Sin evaluar se excluye del promedio.",margin,244);
 pdf.text("Resultados basados en los criterios respondidos para esta evaluación.",margin,250);
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
 try{const content=JSON.parse(await file.text());if(!Array.isArray(content)||!content.every(x=>x.id&&x.scores&&typeof x.scores==="object"))throw Error("El archivo no es un respaldo válido.");const map=new Map(store.map(x=>[x.id,x]));content.forEach(x=>map.set(x.id,x));store=[...map.values()];localStorage.setItem(KEY,JSON.stringify(store));renderHistory();status("Respaldo importado. "+content.length+" evaluaciones procesadas.")}catch(e){status("Error al importar: "+e.message,true)}
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
el("next-step").onclick=()=>{if(step===STEPS.length-1){saveLocal();showPage("dashboard")}else{step++;renderStep()}};
el("save-eval").onclick=saveEvaluation;el("new-eval").onclick=startNew;el("new-from-list").onclick=startNew;
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
reflectFields();renderStep();renderHistory();showPage("nueva");
