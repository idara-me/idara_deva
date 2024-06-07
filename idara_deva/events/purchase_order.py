import frappe

def create_purchase_receipt(doc , method = 'None'):
    pr = frappe.get_doc({
        'doctype': 'Purchase Receipt',
        'supplier': doc.supplier
    })
  
    for item in doc.items:
         pr.append("items",{
              "item_code":item.item_code,
              "rate":item.rate
         })

    pr.insert()
    frappe.db.commit()

   
   
 