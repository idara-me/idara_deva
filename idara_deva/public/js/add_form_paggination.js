
(function() {
	const get_cur_doc_index = () => {
		const dt = cur_frm.doc.doctype
		let filters, sort_field, sort_order;
		let list_view = frappe.get_list_view(dt);

		if (list_view) {
			filters = list_view.get_filters_for_args();
			sort_field = list_view.sort_by;
			sort_order = list_view.sort_order;
		} else {
			let list_settings = frappe.get_user_settings(dt)["List"];
			if (list_settings) {
			filters = list_settings.filters;
			sort_field = list_settings.sort_by;
			sort_order = list_settings.sort_order;
			}
		}

		let args = {
			doctype: cur_frm.doc.doctype,
			docname: cur_frm.doc.name,
			filters,
			sort_order,
			sort_field,
		};
		
		if (cur_frm.is_new()) return;
		frappe.call("idara_deva.events.item.get_cur_doc_index", args).then((r) => {
			if (r.message) {
				let id = 'page-' + dt.replace(/\s/g, '\\ ');
				let selector = '#' + id;	
				
				const button = $(`
					<button class="text-muted btn btn-default pagination-btn icon-btn">
					${r.message}
					</button>
				`);

				$(".pagination-btn").remove()
				$(selector).find(".standard-actions").prepend(button);
			}
		});
	};

	frappe.router.on("change", function() {
		var route = frappe.get_route();
		if (route.length > 2 && route[0] === "Form" && route[1] != route[2]) {
			let get_page_number_interval= setInterval(() => {
				if ($(".page-icon-group:visible").length) {
					get_cur_doc_index();
					clearInterval(get_page_number_interval);
				}
			}, 500);
		}
	});
})();