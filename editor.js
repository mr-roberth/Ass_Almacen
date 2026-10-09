/* Editor local de catálogo: no altera versiones históricas. */
let catalogDirty=false;
function catalogCount(c){return {elements:c.reduce((n,p)=>n+p[1].length,0),criteria:c.reduce((n,p)=>n+p[1].reduce((v,e)=>v+e[1].length,0),0)}}
function renderEditor(){
 const counts=catalogCount(editingCatalog);
 el("catalog-count").textContent=counts.criteria+" criterios · "+counts.elements+" elementos"+(catalogDirty?" · sin guardar":"");
 el("catalog-editor").innerHTML=editingCatalog.map(([pillar,elements],p)=>{
  const count=elements.reduce((n,e)=>n+e[1].length,0);
  return '<details class="catalog-pillar" '+(p===0?'open':'')+'><summary><strong>'+escapeHTML(pillar)+'</strong><span>'+count+' criterios</span></summary><div class="catalog-body">'+
  elements.map(([name,questions],e)=>
   '<div class="catalog-element"><div class="catalog-element-title"><label class="field">Elemento<input data-edit="element" data-p="'+p+'" data-e="'+e+'" maxlength="120" value="'+escapeHTML(name)+'" aria-label="Nombre del elemento"></label><button class="btn" data-action="remove-element" data-p="'+p+'" data-e="'+e+'" '+(elements.length===1?"disabled":"")+'><i class="fa-solid fa-trash"></i> Quitar elemento</button></div>'+
    questions.map((question,c)=>'<div class="catalog-question"><span class="catalog-number">'+(c+1)+'</span><label class="field">Pregunta o criterio verificable<textarea rows="2" maxlength="700" data-edit="question" data-p="'+p+'" data-e="'+e+'" data-c="'+c+'" aria-label="Editar criterio">'+escapeHTML(question)+'</textarea></label><button class="btn danger" data-action="remove-question" data-p="'+p+'" data-e="'+e+'" data-c="'+c+'" '+(questions.length===1?"disabled":"")+' title="Quitar pregunta" aria-label="Quitar pregunta"><i class="fa-solid fa-xmark"></i></button></div>').join("")+
    '<button class="btn" data-action="add-question" data-p="'+p+'" data-e="'+e+'" '+(questions.length>=25?"disabled":"")+'><i class="fa-solid fa-plus"></i> Agregar criterio</button></div>'
  ).join("")+
  '<button class="btn" data-action="add-element" data-p="'+p+'" '+(elements.length>=12?"disabled":"")+'><i class="fa-solid fa-plus"></i> Agregar elemento</button></div></details>'
 }).join("");
}
function persistCatalog(){
 if(!validCatalog(editingCatalog)){status("Revisa las preguntas: cada pilar necesita un elemento y cada elemento al menos una pregunta de 5 caracteres.",true);return false}
 catalogTemplate=clone(editingCatalog);
 try{localStorage.setItem(CATALOG_KEY,JSON.stringify(catalogTemplate))}
 catch(e){status("No se pudieron guardar las preguntas en el navegador.",true);return false}
 catalogDirty=false;
 if(totalAnswered(current)===0&&validCatalog(current.catalog)){
   current.catalog=clone(catalogTemplate);
   step=0;activateCatalog(current);localDraft();
 }
 renderEditor();
 status("Preguntas guardadas. Se aplicarán a nuevas evaluaciones; las anteriores conservan su cuestionario.");
 return true;
}
el("catalog-editor").addEventListener("input",e=>{
 const n=e.target;
 if(!n.dataset.edit)return;
 const p=Number(n.dataset.p),i=Number(n.dataset.e);
 if(!editingCatalog[p]?.[1]?.[i])return;
 if(n.dataset.edit==="element")editingCatalog[p][1][i][0]=n.value;
 if(n.dataset.edit==="question")editingCatalog[p][1][i][1][Number(n.dataset.c)]=n.value;
 catalogDirty=true;
 const count=catalogCount(editingCatalog);
 el("catalog-count").textContent=count.criteria+" criterios · "+count.elements+" elementos · sin guardar";
});
el("catalog-editor").addEventListener("click",e=>{
 const button=e.target.closest("[data-action]");if(!button)return;
 const action=button.dataset.action,p=Number(button.dataset.p),i=Number(button.dataset.e),c=Number(button.dataset.c);
 if(!editingCatalog[p])return;
 const elements=editingCatalog[p][1];
 if(action==="add-element"&&elements.length<12)elements.push(["Nuevo elemento",["¿Se cumple la meta definida en el proceso? (Indicar evidencia y plazo)"]]);
 if(action==="remove-element"&&elements.length>1){if(!confirm("¿Quitar este elemento y sus preguntas del catálogo futuro? Las evaluaciones guardadas no se modifican."))return;elements.splice(i,1)}
 if(action==="add-question"&&elements[i]&&elements[i][1].length<25)elements[i][1].push("¿Se cumple el indicador en el plazo definido? (Indicar meta y registro de evidencia)");
 if(action==="remove-question"&&elements[i]&&elements[i][1].length>1)elements[i][1].splice(c,1);
 catalogDirty=true;renderEditor();
});
el("catalog-save").onclick=()=>persistCatalog();
el("catalog-reset").onclick=()=>{
 if(!confirm("¿Restablecer las 24 preguntas iniciales? Solo reemplazará el catálogo para futuras evaluaciones."))return;
 editingCatalog=clone(DEFAULT_CATALOG);catalogDirty=true;renderEditor();status("Catálogo inicial cargado. Pulsa Guardar criterios para confirmar.");
};
el("catalog-export").onclick=()=>{
 if(!validCatalog(editingCatalog)){status("Corrige las preguntas antes de exportarlas.",true);return}
 downloadContent("oleolab_preguntas_assessment.json","application/json",JSON.stringify({type:"oleolab_assessment_catalog",version:1,catalog:editingCatalog},null,2));
};
el("catalog-import").onchange=async e=>{
 const file=e.target.files?.[0];if(!file)return;
 try{
  const obj=JSON.parse(await file.text()),c=Array.isArray(obj)?obj:obj.catalog;
  if(!validCatalog(c))throw Error("Formato no válido. Se requieren los cuatro pilares y preguntas completas.");
  editingCatalog=clone(c);catalogDirty=true;renderEditor();
  status("Preguntas importadas. Pulsa Guardar criterios para aplicar el nuevo catálogo.");
 }catch(err){status("No se pudo importar: "+err.message,true)}
 e.target.value="";
};
