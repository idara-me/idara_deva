frappe.listview_settings['Item'] = {
    onload: function(listview) {
        listview.page.fields_dict.variant_of.get_query = function() {
            return {
                filters: {
                    has_variants: 1
                }
            };
        };
    }
};