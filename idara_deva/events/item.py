import frappe

def calculate_variants(doc, method=None):
    if not doc.get("variant_of"):
        return
    
    item = frappe.get_doc("Item", doc.get("variant_of"))
    item.custom_variants_item = []
    item.custom_variants_count = 0

    filters = { "variant_of": doc.get("variant_of") }
    if method == "on_trash":
        filters["name"] = ["!=", doc.get("name")]
    
    child_items = frappe.get_all("Item", filters)    
    child_items = set([row.name for row in child_items])
    
    for row in child_items:
        item.append("custom_variants_item", {
            "item": row
        })
    
    item.custom_variants_count = len(item.custom_variants_item)
    item.save()
    
@frappe.whitelist()
def calculate_qty(name=None):
    # default Values
    quantities = {
        "actual_qty": 0,
        "projected_qty": 0,
        "sold": 0,
        "purchased": 0,
        "prices": 0,
    }
    
    if name:
        item_names = [name] 
        # for template item fetch the details of variants of this item
        is_template_item = frappe.db.get_value("Item", name, "has_variants")
        if is_template_item:
            variants = frappe.db.get_all("Item", { "variant_of": name })
            variants = set([row.name for row in variants])
            item_names.extend(variants)
        
        # filters with an item code key and a list of item names as values 
        filters = {"item_code" : item_names}
        # Query the database to get aggregated quantities from the 'tabBin' table
        data = frappe.db.sql("""
            SELECT
                SUM(ordered_qty) as ordered_qty,
                SUM(actual_qty) as actual_qty,
                SUM(projected_qty) as projected_qty
            FROM `tabBin`
            where item_code IN %(item_code)s
        """, values=filters, as_dict=1)
        # Query the database to get distinct parent values from the 'tabSales Invoice Item' table
        sold = frappe.db.sql("""
            SELECT
                DISTINCT(parent)
            FROM `tabSales Invoice Item`
            where item_code IN %(item_code)s
        """, values=filters, as_dict=1)
        # Query the database to get distinct parent values from the 'tabPurchase Invoice Item' table
        purchased = frappe.db.sql("""
            SELECT
                DISTINCT(parent)
            FROM `tabPurchase Invoice Item`
            where item_code IN %(item_code)s
        """, values=filters, as_dict=1)
        # Query the database to get distinct parent values from the 'tabItem Price' table
        prices = frappe.db.sql("""
            SELECT
                DISTINCT(name)
            FROM `tabItem Price`
            where item_code IN %(item_code)s
        """, values=filters, as_dict=1)
        # store the data
        if len(data):
            quantities["actual_qty"] = data[0].get("actual_qty")
            quantities["projected_qty"] = data[0].get("projected_qty")
            quantities["sold"] = len(sold)
            quantities["purchased"] = len(purchased)
            quantities["prices"] = len(prices)
        
    return quantities