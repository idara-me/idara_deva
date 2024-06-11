frappe.ui.form.on(cur_frm.doc.doctype, {
    custom_item_template: function(frm) {
        const dt = frm.doctype;

        if (["Sales Order", "Sales Invoice"].includes(dt) && !frm.doc.customer) {
            frappe.throw("Please select Customer first!");
        }

        if (["Purchase Order", "Purchase Invoice"].includes(dt) && !frm.doc.supplier) {
            frappe.throw("Please select Supplier first!");
        }

        frappe.prompt([
            {
                label: "Item Template",
                fieldname: "item_template",
                fieldtype: "Link",
                options: "Item",
                get_query: function() {
                    return {
                        filters: {
                            has_variants: 1,
                        },
                    };
                },
            },
        ],
        function(values) {
            let template_item = values.item_template;

            if (!template_item) {
                frappe.throw("Please select Item Template first!");
            }
            
            let query_args = {
                query:"idara_deva.events.item_variants.get_variants",
                filters: { variant_of: template_item }
            }

            let add_items = new frappe.ui.form.MultiSelectDialog({
                doctype: "Item",
                target: frm,
                setters: {},
                add_filters_group: 1,
                date_field: "",
                columns: ["name", "qty"],
                get_query: function() {
                    return query_args
                },
                action: function(selections) {
                    for (let row of selections) {
                        let child = frm.add_child("items");
                        const cdt = child.doctype;
                        const cdn = child.name;

                        let qty = $(add_items.$parent[0]).find(`[data-variant_item_name="${row}"]`).val()
                        frappe.model.set_value(cdt, cdn, "item_code", row);
                        frappe.model.set_value(cdt, cdn, "qty", qty);
                        frm.refresh_field("items");
                    }

                    $(add_items.$parent[0]).parents(".modal").click();
                },
            });
        });
    }
});






