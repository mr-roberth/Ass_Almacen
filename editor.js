/* Editor local del catálogo de evaluación. Cada evaluación conserva una instantánea de sus preguntas. */
let catalogDirty=false;
let catalogOpenPillar=0;
const catalogCount=c=>({elements:c.reduce((sum,p)=>sum+p[1].length,0),criteria:c.reduce((sum,p)=>sum+p[1].reduce((n,e)=>n+e[1].length,0),0)});
function catalogStatus(){
 const n=catalogCount(editingCatalog);
 el("catalog-count").textContent=n.criteria+" criterios · "+n.elements+" elementos"+(catalogDirty?" · sin guardar":"");
 el("catalog-save").disabled=!catalogDirty;
 el("catalog-pending").hidden=!catalogDirty;
}
function joinQuestion(question,evidence){
 const q=String(question||"").trim(),ev=String(evidence||"").trim();
 return ev?q+" ("+ev+")":q;
}
function renderEditor(){
 el("catalog-editor").innerHTML=editingCatalog.map(([pillar,elements],p)=>{
   const amount=elements.reduce((sum,e)=>sum+e[1].length,0);
   return '<details class="catalog-pillar" '+(p===catalogOpenPillar?'open':'')+'><summary><strong>'+escapeHTML(pillar)+'</strong><span>'+amount+' preguntas</span></summary><div class="catalog-body">'+
   elements.map(([name,questions],e)=>'<div class="catalog-element">'+
     '<div class="catalog-element-title"><label class="field">Elemento<input data-edit="element" data-p="'+p+'" data-e="'+e+'" maxlength="120" value="'+escapeHTML(name)+'" aria-label="Nombre del elemento"></label>'+
     '<button type="button" class="btn btn-secondary-action" data-action="remove-element" data-p="'+p+'" data-e="'+e+'" '+(elements.length===1?"disabled":"")+' title="Quitar el elemento con todas sus preguntas"><i class="fa-regular fa-trash-can"></i> Quitar elemento</button></div>'+
     questions.map((q,c)=>{
       const parts=criterionParts(q);
       return '<div class="catalog-question"><span class="catalog-number">'+(c+1)+'</span><div class="catalog-question-fields">'+
       '<label class="field">Pregunta<textarea rows="2" maxlength="650" data-edit="question" data-p="'+p+'" data-e="'+e+'" data-c="'+c+'" placeholder="Escribe una pregunta clara y fácil de comprobar">'+escapeHTML(parts.question)+'</textarea></label>'+
       '<label class="field">¿Cómo comprobarlo? <span class="subtle">Opcional</span><input maxlength="180" data-edit="evidence" data-p="'+p+'" data-e="'+e+'" data-c="'+c+'" value="'+escapeHTML(parts.evidence)+'" placeholder="Ej. correo de entrega, inventario, conteo, bitácora"></label></div>'+
       '<button type="button" class="btn danger catalog-remove" data-action="remove-question" data-p="'+p+'" data-e="'+e+'" data-c="'+c+'" '+(questions.length===1?"disabled":"")+' title="Eliminar esta pregunta" aria-label="Eliminar pregunta"><i class="fa-solid fa-trash"></i></button></div>';
     }).join("")+
     '<button type="button" class="btn add-criterion" data-action="add-question" data-p="'+p+'" data-e="'+e+'" '+(questions.length>=25?"disabled":"")+'><i class="fa-solid fa-plus"></i> Agregar pregunta a este elemento</button></div>'
   ).join("")+
   '<button type="button" class="btn add-element" data-action="add-element" data-p="'+p+'" '+(elements.length>=12?"disabled":"")+'><i class="fa-solid fa-plus"></i> Agregar elemento a '+escapeHTML(pillar)+'</button></div></details>';
 }).join("");
 catalogStatus();
}
function persistCatalog(){
 if(!validCatalog(editingCatalog)){status("Revisa que todos los elementos tengan nombre y que cada pregunta tenga al menos 5 caracteres.",true);return false}
 const next=clone(editingCatalog);
 try{localStorage.setItem(CATALOG_KEY,JSON.stringify(next))}
 catch(e){status("No fue posible guardar las preguntas en este dispositivo.",true);return false}
 catalogTemplate=next;
 catalogDirty=false;
 const notes=Object.values(current.scores||{}).some(x=>x&&(x.value!==undefined||x.notes||x.action||x.evidence));
 if(!notes&&validCatalog(current.catalog)){
   current.catalog=clone(catalogTemplate);
   step=0;activateCatalog(current);localDraft();
 }
 renderEditor();
 status("Preguntas actualizadas en este dispositivo. Pulsa Nueva evaluación para usar la versión guardada.");
 return true;
}
el("catalog-editor").addEventListener("toggle",e=>{
 if(e.target.matches(".catalog-pillar")&&e.target.open){
  const idx=[...el("catalog-editor").querySelectorAll(".catalog-pillar")].indexOf(e.target);
  if(idx>=0)catalogOpenPillar=idx;
 }
},true);
el("catalog-editor").addEventListener("input",e=>{
 const input=e.target;
 if(!input.dataset.edit)return;
 const p=Number(input.dataset.p),e=Number(input.dataset.e),c=Number(input.dataset.c);
 const target=editingCatalog[p]?.[1]?.[e];
 if(!target)return;
 if(input.dataset.edit==="element")target[0]=input.value;
 else if(target[1]?.[c]!==undefined){
  const root=input.closest(".catalog-question");
  const q=root.querySelector('[data-edit="question"]').value;
  const evidence=root.querySelector('[data-edit="evidence"]').value;
  target[1][c]=joinQuestion(q,evidence);
 }
 catalogDirty=true;catalogStatus();
});
el("catalog-editor").addEventListener("click",e=>{
 const btn=e.target.closest("[data-action]");if(!btn)return;
 const action=btn.dataset.action,p=Number(btn.dataset.p),eIndex=Number(btn.dataset.e),c=Number(btn.dataset.c);
 if(!editingCatalog[p])return;
 catalogOpenPillar=p;
 const els=editingCatalog[p][1],element=els[eIndex];
 if(action==="add-element"&&els.length<12)els.push(["Nuevo elemento",["¿Qué necesitamos revisar para sostener esta práctica? (Registro de seguimiento)"]]);
 if(action==="remove-element"&&els.length>1){
  if(!confirm("¿Eliminar este elemento y sus preguntas del catálogo para próximas evaluaciones?"))return;
  els.splice(eIndex,1);
 }
 if(action==="add-question"&&element&&element[1].length<25)element[1].push("¿Qué necesitamos comprobar para sostener esta práctica? (Registro de seguimiento)");
 if(action==="remove-question"&&element&&element[1].length>1){
  if(!confirm("¿Eliminar esta pregunta del cuestionario de las próximas evaluaciones?"))return;
  element[1].splice(c,1);
 }
 catalogDirty=true;renderEditor();
});
el("catalog-save").onclick=()=>persistCatalog();
el("catalog-reset").onclick=()=>{
 if(!confirm("¿Restablecer las 29 preguntas oficiales? Esto no modifica las evaluaciones anteriores."))return;
 editingCatalog=clone(DEFAULT_CATALOG);catalogDirty=true;renderEditor();status("Cargadas las 29 preguntas oficiales. Pulsa Guardar cambios para aplicarlas.");
};
el("catalog-cancel").onclick=()=>{
 if(!catalogDirty)return;
 if(!confirm("¿Descartar los cambios sin guardar?"))return;
 editingCatalog=clone(catalogTemplate);catalogDirty=false;renderEditor();status("Se descartaron los cambios sin guardar.");
};
el("catalog-export").onclick=()=>{
 if(!validCatalog(editingCatalog)){status("Completa primero las preguntas para exportarlas.",true);return}
 downloadContent("oleolab_preguntas_assessment.json","application/json",JSON.stringify({type:"oleolab_assessment_catalog",version:2,catalog:editingCatalog},null,2));
};
el("catalog-import").onchange=async e=>{
 const file=e.target.files?.[0];if(!file)return;
 try{
  const raw=JSON.parse(await file.text()),cat=Array.isArray(raw)?raw:raw.catalog;
  if(!validCatalog(cat))throw Error("El catálogo debe tener cuatro pilares y preguntas completas.");
  editingCatalog=clone(cat);catalogDirty=true;renderEditor();status("Preguntas importadas. Pulsa Guardar cambios para aplicarlas.");
 }catch(err){status("No se pudieron importar las preguntas: "+err.message,true)}
 e.target.value="";
};
