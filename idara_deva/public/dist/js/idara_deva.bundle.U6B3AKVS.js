(()=>{(function(){$(document).keydown(function(o){o.ctrlKey&&o.keyCode==13&&$(document.activeElement).parents("[data-fieldtype=Table]").find(".grid-add-row").click()})})();(function(){let o=()=>{let e,r,n,i=frappe.get_list_view(cur_frm.doc.doctype);if(i)e=i.get_filters_for_args(),r=i.sort_by,n=i.sort_order;else{let t=frappe.get_user_settings(cur_frm.doc.doctype).List;t&&(e=t.filters,r=t.sort_by,n=t.sort_order)}let a={doctype:cur_frm.doc.doctype,docname:cur_frm.doc.name,filters:e,sort_order:n,sort_field:r};frappe.call("idara_deva.events.item.get_cur_doc_index",a).then(t=>{if(t.message){let s=$(`
				<button class="text-muted btn btn-default pagination-btn icon-btn">
				${t.message}
				</button>
			`);$(".page-icon-group").append(s)}})};frappe.router.on("change",function(){var e=frappe.get_route();if(e[0]==="Form"){let r=setInterval(()=>{$(".page-icon-group:visible").length&&(o(),clearInterval(r))},500)}})})();var u=["Sales Order","Delivery Note","Purchase Order","Purchase Receipt"];for(let o of u)frappe.ui.form.on(o,{onload:function(e){e.savesubmit=function(r,n,i){var a=this;return new Promise(t=>{a.script_manager.trigger("before_submit").then(function(){frappe.validated=!0,a.save("Submit",function(s){s.exc?a.handle_save_fail(r,i):(frappe.utils.play_sound("submit"),n&&n(),a.script_manager.trigger("on_submit").then(()=>t(a)).then(()=>{if(frappe.route_hooks.after_submit){let c=frappe.route_hooks.after_submit;delete frappe.route_hooks.after_submit,c(a)}}))},r,()=>a.handle_save_fail(r,i),t)})})}}});var _=["Sales Order","Sales Invoice","Purchase Order","Purchase Invoice"];for(let o of _)frappe.ui.form.on(o,{custom_item_template:function(e){let r=e.doctype;["Sales Order","Sales Invoice"].includes(r)&&!e.doc.customer&&frappe.throw("Please select Customer first!"),["Purchase Order","Purchase Invoice"].includes(r)&&!e.doc.supplier&&frappe.throw("Please select Supplier first!"),frappe.prompt([{label:"Item Template",fieldname:"item_template",fieldtype:"Link",options:"Item",get_query:function(){return{filters:{has_variants:1}}}}],function(n){let i=n.item_template;i||frappe.throw("Please select Item Template first!");let a={query:"idara_deva.events.item_variants.get_variants",filters:{variant_of:i}},t=new frappe.ui.form.MultiSelectDialog({doctype:"Item",target:e,setters:{},add_filters_group:1,date_field:"",columns:["name","qty"],get_query:function(){return a},action:function(s){for(let c of s){let l=e.add_child("items"),p=l.doctype,d=l.name,f=$(t.$parent[0]).find(`[data-variant_item_name="${c}"]`).val();frappe.model.set_value(p,d,"item_code",c),frappe.model.set_value(p,d,"qty",f),e.refresh_field("items")}$(t.$parent[0]).parents(".modal").click()}})})}});})();
//# sourceMappingURL=idara_deva.bundle.U6B3AKVS.js.map
