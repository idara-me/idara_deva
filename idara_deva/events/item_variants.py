import frappe

@frappe.whitelist()
def get_variants(doctype, txt, searchfield, start, page_len, filters):
    if txt:
        filters[searchfield] = ["like", f"%{txt}%"]

    docs =  frappe.get_all(doctype=doctype, filters=filters, start=start, page_length=page_len)
    for row in docs:
        row["qty"] = f"""<input type='text' class='form-control bold' placeholder='Qty' data-variant_item_name='{row.name}' />"""
    
    return docs